import { Message, Role } from 'discord.js';

export const pingHandler = async (message: Message) => {
  console.log(message.content);

  if (message.content.startsWith('ping')) {
    message.reply('Pong!');
  }
};
