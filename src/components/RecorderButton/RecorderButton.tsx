import { FC, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

import { IRecorderButton } from './RecorderButton.type';

const RecorderButton: FC<IRecorderButton> = ({ onRecord }) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const toggleRecording = () => {
    if (status === 'recording') {
      stopRecording();
    } else {
      startRecording();
    }
  };

  useEffect(() => {
    if (mediaBlobUrl) {
      handleGetBlob();
    }
  }, [mediaBlobUrl]);

  const handleGetBlob = async () => {
    if (mediaBlobUrl) {
      try {
        const blob = await fetch(mediaBlobUrl).then((r) => r.blob());
        onRecord(blob);
      } catch (error) {
        console.error('Error Converting Blob: ', error);
      }
    }
  };

  return (
    <>
      <button
        onClick={toggleRecording}
        className={`px-4 py-2 text-white rounded ${
          status === 'recording' ? 'bg-red-500' : 'bg-blue-500'
        }`}
      >
        {status === 'recording' ? 'Stop Recording' : 'Start Recording'}
      </button>
      <audio src={mediaBlobUrl} controls autoPlay />
    </>
  );
};

export default RecorderButton;
