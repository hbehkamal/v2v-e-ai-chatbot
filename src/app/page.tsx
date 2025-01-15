'use client';
import { Loading, MessageItem, RecorderButton } from '@/components';

import { useChatPage } from './chat.hook';

const ChatPage = () => {
  const {
    messages,
    loading,
    handleRecord,
    handleStopSpeaking,
    isSpeaking,
    messagesEndRef,
    audioRef,
  } = useChatPage();

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
