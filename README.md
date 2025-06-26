# YouTube Video Summarizer 🤖

A terminal‑based tool to summarize YouTube videos using AI-powered transcription and summarization. Paste a YouTube URL, let the tool fetch the transcript, and get a clean, concise summary.

---

## 🚀 Features

- **Transcript Fetching**: Extracts video subtitles via YouTube APIs or `youtube-dl`.
- **AI Summarization**: Sends the transcript to OpenAI (ChatGPT, GPT‑3, etc.) to generate a summary.
- **CLI Experience**: Run it locally in your terminal — no GUI needed.
- **Configurable**: Choose your summary length, temperature, and API keys.

---

## 🛠 Installation

1. Clone this repo:
   ```bash
   git clone https://github.com/gopireddy99/Youtube_Video_Summarizer.git
   cd Youtube_Video_Summarizer
   
2. Install dependencies:
   ```bash
   pip install -r requirements.txt

3. Add OpenAI API key:
export OPENAI_API_KEY="your_api_key_here"
(Or add to .env if using python-dotenv.)

4. (Optional) Install youtube-dl or yt-dlp for transcript retrieval:
pip install yt-dlp

# ▶️ Usage
python summarize.py https://www.youtube.com/watch?v=VIDEO_

# ✅ Requirements
Python 3.7+

OpenAI API key

Internet access

yt-dlp or youtube-transcript-api (for transcript extraction)

# ⚠️ Troubleshooting
Transcript not found: Video may lack captions.

API errors: Check OPENAI_API_KEY, account limits.

Rate limits: Large transcripts may need chunking.

Unicode issues: Use Python 3 and utf-8 encoding.

# 📄 License
MIT License

# 👥 Contributing
Contributions welcome — feel free to open issues or PRs for bugs, feature requests, or improvements!


