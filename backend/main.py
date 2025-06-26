from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
import uvicorn
import re
from typing import Optional
import logging

# Import our modules
from video_processor import VideoProcessor
from summarizer import Summarizer

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="YouTube Video Summarizer API",
    description="AI-powered YouTube video summarization service",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
video_processor = VideoProcessor()
summarizer = Summarizer()

class SummarizeRequest(BaseModel):
    video_url: str
    summary_type: str = "abstractive"

class SummarizeResponse(BaseModel):
    title: str
    summary: str
    duration: Optional[str] = None
    word_count: Optional[int] = None
    summary_type: str

def extract_video_id(url: str) -> str:
    """Extract YouTube video ID from URL"""
    patterns = [
        r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)',
        r'youtube\.com\/watch\?.*v=([^&\n?#]+)'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    
    raise ValueError("Invalid YouTube URL")

@app.get("/")
async def root():
    return {"message": "YouTube Video Summarizer API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "youtube-summarizer"}

@app.post("/summarize", response_model=SummarizeResponse)
async def summarize_video(request: SummarizeRequest):
    try:
        logger.info(f"Processing video: {request.video_url}")
        
        # Extract video ID
        video_id = extract_video_id(request.video_url)
        logger.info(f"Extracted video ID: {video_id}")
        
        # Get video info and transcript
        video_info = await video_processor.get_video_info(video_id)
        transcript = await video_processor.get_transcript(video_id)
        
        if not transcript:
            raise HTTPException(
                status_code=422, 
                detail="No transcript available for this video. The video may not have captions or subtitles."
            )
        
        logger.info(f"Transcript length: {len(transcript)} characters")
        
        # Generate summary
        summary = await summarizer.generate_summary(
            transcript, 
            summary_type=request.summary_type
        )
        
        # Calculate word count
        word_count = len(summary.split())
        
        response = SummarizeResponse(
            title=video_info.get("title", "Unknown Title"),
            summary=summary,
            duration=video_info.get("duration"),
            word_count=word_count,
            summary_type=request.summary_type
        )
        
        logger.info("Summary generated successfully")
        return response
        
    except ValueError as e:
        logger.error(f"Invalid URL: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error processing video: {e}")
        if "Private video" in str(e) or "not available" in str(e):
            raise HTTPException(status_code=404, detail="Video not found or is private")
        elif "No transcript" in str(e) or "transcript" in str(e).lower():
            raise HTTPException(status_code=422, detail="No transcript available for this video")
        else:
            raise HTTPException(status_code=500, detail="Internal server error while processing video")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)