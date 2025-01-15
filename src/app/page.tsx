'use client';
import { useRef, useState } from 'react';

import { Loading, MessageItem, RecorderButton } from '@/components';
import { IMessageItem } from '@/type';
import { convertTextToVoice, convertVoiceToText, getAIResponse } from '@/api';

const ChatPage = () => {
  const [messages, setMessages] = useState<IMessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleRecord = async (blob: Blob) => {
    setLoading(true);
    try {
      // Step 1: Convert Voice to Text
      const userMessage = await convertVoiceToText(blob);
      setMessages((prev) => [...prev, { content: userMessage, user: 'user' }]);

      // Step 2: Get AI Response
      const aiResponse = await getAIResponse(userMessage);
      setMessages((prev) => [...prev, { content: aiResponse, user: 'system' }]);

      // Step 3: Convert AI Response to Voice
      const { audio } = await convertTextToVoice(aiResponse);
      audioRef.current = new Audio(audio);
      audioRef.current?.play();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          🎙️ Voice Chat
        </h1>
        <div className="mt-6 h-96 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner">
          {messages.map((msg, index) => (
            <MessageItem key={index} {...msg} />
          ))}
          {loading && <Loading />}
        </div>
        <div className="mt-6 flex justify-center">
          <RecorderButton onRecord={handleRecord} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
