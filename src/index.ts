import { Client } from 'discord.js';
const client = new Client();

client.on('ready', () => {
  console.log(`${client.user!.tag}!`);
});

client.on('message', async message => {
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
    await message.delete();
    console.log('Muted role added to', message.author.username);
    let mutedRole = message.guild!.roles.cache.find(
      role => role.name === 'Muted'
    );
    let defaultRole = message.guild!.roles.cache.find(
      role => role.name === 'Default'
    );

    message!.member!.roles.add(mutedRole!);
    message!.member!.roles.remove(defaultRole!);

    message.reply('You are muted for 10s!');

    setTimeout(() => {
      message.member!.roles.remove(mutedRole!);
      message.member!.roles.add(defaultRole!);
    }, 10 * 1000);
  }
});

const token = process.env.DISCORD_TOKEN;
client.login(token);
