import { IMessage } from '@/type';

export interface IMessageItem extends IMessage {
  isSpeaking: boolean;
  ref?: React.RefObject<HTMLDivElement>;
}
