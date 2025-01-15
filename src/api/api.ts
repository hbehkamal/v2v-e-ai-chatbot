import axios from 'axios';

export const convertVoiceToText = async (blob: Blob) => {
  try {
    const formData = new FormData();
    formData.append('file', blob, 'blob.mp3');

    const response = await axios.post('/api/transcriptions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.text;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getAIResponse = async (text: string): Promise<string> => {
  const response = await axios.post('/api/chat', { text });

  return response.data;
};

export const convertTextToVoice = async (
  text: string
): Promise<ArrayBuffer> => {
  const response = await axios.post(
    '/api/text-to-speech',
    { text },
    {
      responseType: 'arraybuffer',
    }
  );
  console.log('convertTextToVoice: ', response);
  return response.data;
};
