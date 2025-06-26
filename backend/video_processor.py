import asyncio
import aiohttp
import re
from typing import Dict, Optional
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter
import logging

logger = logging.getLogger(__name__)

class VideoProcessor:
    def __init__(self):
        self.formatter = TextFormatter()
    
    async def get_video_info(self, video_id: str) -> Dict[str, str]:
        """Get basic video information"""
        try:
            async with aiohttp.ClientSession() as session:
                url = f"https://www.youtube.com/watch?v={video_id}"
                async with session.get(url) as response:
                    html = await response.text()
                    
                    title_match = re.search(r'<title>(.+?) - YouTube</title>', html)
                    title = title_match.group(1) if title_match else "Unknown Title"
                    
                    duration_match = re.search(r'"lengthSeconds":"(\d+)"', html)
                    duration = None
                    if duration_match:
                        seconds = int(duration_match.group(1))
                        minutes = seconds // 60
                        seconds = seconds % 60
                        duration = f"{minutes}:{seconds:02d}"
                    
                    return {
                        "title": title,
                        "duration": duration,
                        "video_id": video_id
                    }
        except Exception as e:
            logger.warning(f"Could not fetch video info: {e}")
            return {
                "title": "Unknown Title",
                "duration": None,
                "video_id": video_id
            }
    
    async def get_transcript(self, video_id: str) -> Optional[str]:
        """Get video transcript using youtube-transcript-api"""
        try:
            loop = asyncio.get_event_loop()
            transcript_list = await loop.run_in_executor(
                None, 
                lambda: YouTubeTranscriptApi.get_transcript(video_id)
            )
            
            transcript_text = " ".join([entry["text"] for entry in transcript_list])
            return self._clean_transcript(transcript_text)

        except Exception as e:
            logger.error(f"Error getting transcript for {video_id}: {e}")
            
            try:
                transcript_list = await loop.run_in_executor(
                    None,
                    lambda: YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
                )
                transcript_text = " ".join([entry["text"] for entry in transcript_list])
                return self._clean_transcript(transcript_text)
            except Exception as e2:
                logger.error(f"Error getting auto-generated transcript: {e2}")
                return None
    
    def _clean_transcript(self, transcript: str) -> str:
        """Clean and format transcript text"""
        transcript = re.sub(r'\s+', ' ', transcript)
        transcript = re.sub(r'\[.*?\]', '', transcript)
        transcript = re.sub(r'\(.*?\)', '', transcript)
        transcript = transcript.replace(' .', '.')
        transcript = transcript.replace(' ,', ',')
        transcript = transcript.replace(' !', '!')
        transcript = transcript.replace(' ?', '?')
        return transcript.strip()
