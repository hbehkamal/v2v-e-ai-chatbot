import { FC } from 'react';

import { IMessageItem } from '@/type';

const MessageItem: FC<IMessageItem> = ({ user, content }) => {
  return (
    <div
      className={`flex mb-4 ${
        user === 'user' ? 'justify-end' : 'justify-start'
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
};

export default MessageItem;
