import { useRef, useState } from 'react';

import { convertTextToVoice, convertVoiceToText, getAIResponse } from '@/api';
import { IMessage } from '@/type';

export const useChatPage = () => {
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

  return {
    messages,
    loading,
    handleRecord,
    handleStopSpeaking,
    isSpeaking,
    messagesEndRef,
    audioRef,
  };
};
