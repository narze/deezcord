/**
 * Deezcord CLI
 *   Features:
 *   - m (msg) : Send message to specific channel in a guild
 *   - u (user) : Get user tag from name
 *   - f (fetch messages) : Fetch messages from a channel
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

async function msg(
  guildId: string,
  channelName: string,
  message: string,
  ping: boolean = false
) {
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

  const msg = await channel.send(message);

  if (ping) {
    msg.delete();
  }
}

async function fetchMessages(
  guildId: string,
  channelName: string,
  limit: number = 20
) {
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

  try {
    const messages = await channel.messages.fetch({ limit });

    return messages
      .map(msg => ({
        content: msg.content,
        name: msg.author.username,
        createdAt: msg.createdAt,
      }))
      .reverse();
  } catch (err) {
    console.error(err);
    return [];
  }
}

function getUserTagFromName(name: string) {
  const user = client.users.cache.find(user => user.username === name);
  return user?.toString() || 'Not found!';
}

replServer.context.m = msg;
replServer.context.u = getUserTagFromName;
replServer.context.f = fetchMessages;
