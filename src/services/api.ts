import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface SummarizeRequest {
  video_url: string;
  summary_type: 'abstractive' | 'extractive';
}

export interface SummarizeResponse {
  title: string;
  summary: string;
  duration?: string;
  word_count?: number;
  summary_type: 'abstractive' | 'extractive';
}

export const summarizeVideo = async (request: SummarizeRequest): Promise<SummarizeResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/summarize`, request, {
      timeout: 60000, // 60 seconds timeout
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error(error.response.data.detail || 'Invalid video URL or video not accessible');
      } else if (error.response?.status === 404) {
        throw new Error('Video not found or private');
      } else if (error.response?.status === 422) {
        throw new Error('Video has no captions available');
      } else if (error.response?.status === 500) {
        throw new Error('Server error while processing video');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - video processing took too long');
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('Unable to connect to the server. Please make sure the backend is running.');
      }
    }
    throw new Error('An unexpected error occurred');
  }
};