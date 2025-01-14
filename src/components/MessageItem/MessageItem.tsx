import { FC } from 'react';

import { IMessageItem } from '@/type';

const MessageItem: FC<IMessageItem> = ({ user, text }) => {
  return (
    <div
      className={`flex mb-4 ${
        user === 'You' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`${
          user === 'You'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-gray-800'
        } max-w-xs p-3 rounded-lg`}
      >
        <p className="text-sm font-medium">{text}</p>
      </div>
    </div>
  );
};

export default MessageItem;
