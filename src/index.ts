import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { muteHandler } from './muteHandler';
import { pingHandler } from './pingHandler';
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

client.on('ready', () => {
  console.log(`${client.user!.tag}!`);
});

client.on('messageCreate', muteHandler);
client.on('messageCreate', pingHandler);

const token = process.env.DISCORD_TOKEN;

client.login(token);

export { client };
