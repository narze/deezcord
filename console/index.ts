/**
 * Deezcord CLI
 *   Features:
 *   - m (msg) : Send message to specific channel in a guild
 *   - u (user) : Get user tag from name
 */

import repl from 'repl';
import { Client, Intents, TextChannel } from 'discord.js';
import dotenv from 'dotenv';

const replServer = repl.start({
  prompt: `deezcord(${process.env.NODE_ENV || 'development'}) > `,
});

replServer.setupHistory('./.node_repl_history', () => {});

dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

client.on('ready', () => {
  console.log(`Connected as ${client.user!.tag}!`);
  console.log(
    client.guilds.cache.map(guild => ({ name: guild.name, id: guild.id }))
  );
});

const token = process.env.DISCORD_TOKEN;

client.login(token);

async function msg(guildId: string, channelName: string, message: string) {
  console.log('msg', { channelName, message });
  const guild = client.guilds.cache.find(guild => guild.id === guildId);

  if (!guild) {
    console.warn('Guild not found!');
    return;
  }

  const channel = guild.channels.cache.find(
    channel => channel.name === channelName
  ) as TextChannel;

  if (!channel) {
    console.warn('Channel not found!');
    return;
  }

  channel.send(message);
}

function getUserTagFromName(name: string) {
  const user = client.users.cache.find(user => user.username === name);
  return user?.toString() || 'Not found!';
}

replServer.context.m = msg;
replServer.context.u = getUserTagFromName;
