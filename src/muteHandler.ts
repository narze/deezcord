import { Message, Role } from 'discord.js';

export const muteHandler = async (message: Message) => {
  // console.log('user', message.author.id);
  // console.log('guild', message.guildId);
  // console.log('roles', message.member?.roles.cache);
  console.log(message.content);

  if (message.content.startsWith('!hello')) {
    message.reply('Hello!');
  }

  // if message includes discorcl / .ru / knife : Add role "Muted"
  const msg = message.content.toLowerCase();

  if (
    msg.includes('.ru') ||
    msg.includes('discorcl') ||
    msg.includes('knife')
  ) {
    // Delete message
    // console.log('Muted role added to', message.author.username);
    let mutedRole = message.guild!.roles.cache.find(
      (role: Role) => role.name === 'Muted'
    );

    await message.member!.roles.add(mutedRole!);

    await message.reply('You are muted for 10s!');
    await message.delete();

    setTimeout(() => {
      message.member!.roles.remove(mutedRole!);
    }, 10 * 1000);
  }
};
