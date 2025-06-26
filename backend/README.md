# YouTube Video Summarizer Backend

This is the Python FastAPI backend for the YouTube Video Summarizer application. It provides AI-powered summarization of YouTube videos using multiple approaches.

## Features

- **Multiple AI Models**: Supports OpenAI GPT-3.5/4 and Hugging Face transformers (BART)
- **Dual Summarization Types**: Abstractive and extractive summarization
- **Robust Error Handling**: Handles private videos, missing captions, and API failures
- **Transcript Extraction**: Uses youtube-transcript-api for reliable transcript fetching
- **Fallback Mechanisms**: Multiple fallback options if primary models fail

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Variables (Optional)

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: OpenAI API key is optional. The system will use Hugging Face models as fallback.

### 3. Run the Server

```bash
python main.py
```

The server will start on `http://localhost:8000`

## API Endpoints

### POST /summarize

Summarize a YouTube video.

**Request Body**:
```json
{
  "video_url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "summary_type": "abstractive"
}
```

**Response**:
```json
{
  "title": "Video Title",
  "summary": "Generated summary text...",
  "duration": "10:30",
  "word_count": 150,
  "summary_type": "abstractive"
}
```

### GET /health

Health check endpoint.

## AI Models

### 1. OpenAI GPT-3.5/4 (Primary)
- Best quality summaries
- Requires API key
- Used for abstractive summarization

### 2. Hugging Face BART (Fallback)
- Local model (facebook/bart-large-cnn)
- No API key required
- Good quality abstractive summaries

### 3. Simple Extractive (Final Fallback)
- Rule-based sentence extraction
- Always available
- Used when other models fail

## Error Handling

The API handles various error cases:

- **400**: Invalid YouTube URL
- **404**: Video not found or private
- **422**: No transcript available
- **500**: Server error during processing

## Performance Notes

- First run may take longer due to model downloads
- CUDA GPU acceleration supported for faster processing
- Large videos are automatically chunked for processing

## Development

To run in development mode with auto-reload:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Architecture

- `main.py`: FastAPI application and API endpoints
- `video_processor.py`: YouTube video information and transcript extraction
- `summarizer.py`: AI-powered summarization logic with multiple models
- `requirements.txt`: Python dependencies