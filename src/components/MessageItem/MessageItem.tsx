import { FC, forwardRef } from 'react';

import { IMessageItem } from './MessageItem.type';

const MessageItem = forwardRef<HTMLDivElement, IMessageItem>(
  ({ content, user, isSpeaking }, ref) => {
    // const MessageItem: FC<IMessageItem> = ({ user, content, isSpeaking, ref }) => {
    return (
      <div
        ref={ref}
        className={`flex mb-4 ${
          user === 'user'
            ? 'justify-end'
            : `justify-start ${isSpeaking && 'animate-pulse'}`
        }`}
      >
        <div
          className={`${
            user === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-800'
          } max-w-xs p-3 rounded-lg`}
        >
          <p className="text-sm font-medium">{content}</p>
        </div>
      </div>
    );
  }
);

MessageItem.displayName = 'MessageItem';

export default MessageItem;
