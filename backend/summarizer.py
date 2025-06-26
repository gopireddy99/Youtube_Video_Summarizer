import asyncio
import openai
import os
from typing import Optional
import logging
from transformers import pipeline
import torch

logger = logging.getLogger(__name__)

class Summarizer:
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.huggingface_model = None
        self._load_local_model()
    
    def _load_local_model(self):
        """Load local Hugging Face model for summarization"""
        try:
            # Check if CUDA is available
            device = 0 if torch.cuda.is_available() else -1
            
            # Load BART model for summarization
            self.huggingface_model = pipeline(
                "summarization",
                model="facebook/bart-large-cnn",
                device=device,
                max_length=512,
                min_length=100,
                do_sample=False
            )
            logger.info("Loaded BART model for local summarization")
        except Exception as e:
            logger.warning(f"Could not load local model: {e}")
            self.huggingface_model = None
    
    async def generate_summary(self, transcript: str, summary_type: str = "abstractive") -> str:
        """Generate summary using available AI models"""
        
        # Truncate transcript if too long (models have token limits)
        max_length = 8000  # Conservative limit for most models
        if len(transcript) > max_length:
            transcript = transcript[:max_length] + "..."
        
        if summary_type == "abstractive":
            return await self._generate_abstractive_summary(transcript)
        else:
            return await self._generate_extractive_summary(transcript)
    
    async def _generate_abstractive_summary(self, transcript: str) -> str:
        """Generate abstractive summary"""
        
        # Try OpenAI first if API key is available
        if self.openai_api_key:
            try:
                return await self._openai_summary(transcript)
            except Exception as e:
                logger.warning(f"OpenAI API failed: {e}")
        
        # Fallback to Hugging Face model
        if self.huggingface_model:
            try:
                return await self._huggingface_summary(transcript)
            except Exception as e:
                logger.warning(f"Hugging Face model failed: {e}")
        
        # Final fallback to simple extractive summary
        return await self._simple_extractive_summary(transcript)
    
    async def _generate_extractive_summary(self, transcript: str) -> str:
        """Generate extractive summary"""
        return await self._simple_extractive_summary(transcript)
    
    async def _openai_summary(self, transcript: str) -> str:
        """Generate summary using OpenAI API"""
        try:
            client = openai.AsyncOpenAI(api_key=self.openai_api_key)
            
            response = await client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that creates concise, informative summaries of video transcripts. Focus on the main points, key insights, and important details. Keep the summary engaging and well-structured."
                    },
                    {
                        "role": "user",
                        "content": f"Please summarize this video transcript in 3-5 paragraphs, highlighting the main points and key insights:\n\n{transcript}"
                    }
                ],
                max_tokens=500,
                temperature=0.3
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"OpenAI API error: {e}")
            raise
    
    async def _huggingface_summary(self, transcript: str) -> str:
        """Generate summary using Hugging Face model"""
        try:
            loop = asyncio.get_event_loop()
            
            # Split transcript into chunks if too long
            max_chunk_length = 1000
            chunks = [transcript[i:i+max_chunk_length] for i in range(0, len(transcript), max_chunk_length)]
            
            summaries = []
            for chunk in chunks:
                if len(chunk.strip()) < 50:  # Skip very short chunks
                    continue
                    
                result = await loop.run_in_executor(
                    None,
                    lambda: self.huggingface_model(chunk, max_length=200, min_length=50, do_sample=False)
                )
                
                if result and len(result) > 0:
                    summaries.append(result[0]['summary_text'])
            
            # Combine summaries
            if summaries:
                combined_summary = ' '.join(summaries)
                
                # If we have multiple summaries, try to summarize again
                if len(summaries) > 1 and len(combined_summary) > 800:
                    final_result = await loop.run_in_executor(
                        None,
                        lambda: self.huggingface_model(combined_summary, max_length=300, min_length=100, do_sample=False)
                    )
                    return final_result[0]['summary_text']
                
                return combined_summary
            else:
                raise Exception("No summary generated")
                
        except Exception as e:
            logger.error(f"Hugging Face model error: {e}")
            raise
    
    async def _simple_extractive_summary(self, transcript: str) -> str:
        """Simple extractive summary as fallback"""
        try:
            sentences = transcript.split('.')
            sentences = [s.strip() for s in sentences if len(s.strip()) > 10]
            
            # Take first, middle, and last sentences as a simple summary
            if len(sentences) < 3:
                return transcript
            
            summary_sentences = []
            
            # First sentence
            summary_sentences.append(sentences[0])
            
            # Middle sentences (take a few from the middle)
            middle_start = len(sentences) // 3
            middle_end = 2 * len(sentences) // 3
            middle_sentences = sentences[middle_start:middle_end]
            
            # Select important-looking sentences (longer ones, those with keywords)
            keywords = ['important', 'key', 'main', 'significant', 'conclusion', 'result', 'summary']
            
            for sentence in middle_sentences[:5]:  # Limit to 5 sentences
                if any(keyword in sentence.lower() for keyword in keywords) or len(sentence) > 100:
                    summary_sentences.append(sentence)
            
            # Last sentence
            if len(sentences) > 1:
                summary_sentences.append(sentences[-1])
            
            # Remove duplicates while preserving order
            seen = set()
            unique_sentences = []
            for sentence in summary_sentences:
                if sentence not in seen:
                    seen.add(sentence)
                    unique_sentences.append(sentence)
            
            summary = '. '.join(unique_sentences)
            
            # Add proper ending if needed
            if not summary.endswith('.'):
                summary += '.'
            
            return summary
            
        except Exception as e:
            logger.error(f"Simple extractive summary failed: {e}")
            return "Unable to generate summary. Please try again."