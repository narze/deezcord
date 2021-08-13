import { Client, Intents, Role } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    // Intents.FLAGS.GUILD_MEMBERS,
    // Intents.FLAGS.GUILD_BANS,
    // Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    // Intents.FLAGS.GUILD_INTEGRATIONS,
    // Intents.FLAGS.GUILD_WEBHOOKS,
    // Intents.FLAGS.GUILD_INVITES,
    // Intents.FLAGS.GUILD_VOICE_STATES,
    // Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

client.once('ready', () => {
  console.log('Ready!');
});

client.on('ready', () => {
  console.log(`${client.user!.tag}!`);
});

client.on('messageCreate', async message => {
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
    console.log('Muted role added to', message.author.username);
    let mutedRole = message.guild!.roles.cache.find(
      (role: Role) => role.name === 'Muted'
    );
    let defaultRole = message.guild!.roles.cache.find(
      (role: Role) => role.name === 'Default'
    );

    message!.member!.roles.add(mutedRole!);
    message!.member!.roles.remove(defaultRole!);

    message.reply('You are muted for 10s!');
    await message.delete();

    setTimeout(() => {
      message.member!.roles.remove(mutedRole!);
      message.member!.roles.add(defaultRole!);
    }, 10 * 1000);
  }
});

const token = process.env.DISCORD_TOKEN;

client.login(token);
