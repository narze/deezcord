/**
 * 9armbot Console
 *   Features:
 *   - db : Database Service [services/db.ts]
 *   - bot : Bot Service [services/bot.ts]
 */

import repl from 'repl';
import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { muteHandler } from '../src/muteHandler';
// import _ from 'lodash';
//  import { Db } from './services/db'
//  import commands from './services/bot'
//  import Player from './services/models/player'
//  import Widget from './services/widget'
//  import setting from './services/setting'
//  import prisma from '../prisma/client'

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
  console.log(`${client.user!.tag}!`);
});

client.on('messageCreate', muteHandler);

const token = process.env.DISCORD_TOKEN;

client.login(token);
//  const db = new Db()
//  const widget = new Widget(true)

//  const dbName = process.env.DATABASE_URL!.split(':')[1]
//  console.log(`Database "${dbName}" loaded, press enter to continue.`)

//  // Access db eg. `await db.read()`
//  //   Since it is asynchronous function you have to use await keyword.
//  //   Type `db.` then press Tab to see all available commands
//  replServer.context.db = db
//  replServer.context.prisma = prisma
//  replServer.context.Player = Player

//  // Bot commands eg. `await bot.coin(username)`
//  replServer.context.bot = commands

//  // Widget commands eg. `widget.testWidget()`
//  replServer.context.widget = widget

//  setting.init().then(() => {
//    setting.startAutoSync(false)
//    replServer.context.setting = setting
//  })

//  // Lodash (_ is reserved, use l or __ instead)
//  replServer.context.l = _
//  replServer.context.__ = _
