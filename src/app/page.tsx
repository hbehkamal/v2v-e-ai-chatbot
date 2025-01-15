'use client';
import { useRef, useState } from 'react';

import { convertTextToVoice, convertVoiceToText, getAIResponse } from '@/api';
import { Loading, MessageItem, RecorderButton } from '@/components';
import { IMessage } from '@/type';

const ChatPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToNewMessage = () => {
    messagesEndRef.current?.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  };

  const handleRecord = async (blob: Blob) => {
    setLoading(true);
    try {
      // Step 1: Convert Voice to Text
      const userMessage = await convertVoiceToText(blob);
      setMessages((prev) => [...prev, { content: userMessage, user: 'user' }]);

      // Step 2: Get AI Response
      const aiResponse = await getAIResponse(userMessage);
      setMessages((prev) => [...prev, { content: aiResponse, user: 'system' }]);
      scrollToNewMessage();

      // Step 3: Convert AI Response to Voice
      const { audio } = await convertTextToVoice(aiResponse);
      audioRef.current = new Audio(audio);
      audioRef.current?.play();

      // Simple voice animation
      setIsSpeaking(true);
      audioRef.current.addEventListener('ended', () => setIsSpeaking(false));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStopSpeaking = () => {
    audioRef.current?.pause();
    setIsSpeaking(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          🎙️ Voice Chat
        </h1>
        <div className="mt-6 h-96 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner">
          {messages.map((msg, index) => (
            <MessageItem
              key={index}
              {...msg}
              isSpeaking={isSpeaking}
              ref={index == messages.length - 1 ? messagesEndRef : undefined}
            />
          ))}
          <div />
          {loading && <Loading />}
        </div>
        <div className="mt-6 flex justify-center">
          <RecorderButton onRecord={handleRecord} />
          {isSpeaking && !audioRef.current?.paused ? (
            <button
              onClick={handleStopSpeaking}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
            >
              Stop
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
