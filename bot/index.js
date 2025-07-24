// Grament Bot Backend (Node.js)
const { Telegraf } = require('telegraf');
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const OWNER_ID = process.env.OWNER_ID; // Telegram user ID of the owner
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; // TON contract address

const bot = new Telegraf(BOT_TOKEN);

// --- In-memory state (replace with DB for production) ---
let usernamePrice = 0;
let withdrawalsEnabled = false;

// --- Admin check ---
function isOwner(ctx) {
  return ctx.from && ctx.from.id.toString() === OWNER_ID;
}

// --- Commands ---
bot.start((ctx) => {
  ctx.reply('Welcome to Grament! Use /buy to buy a username.');
});

bot.command('setprice', (ctx) => {
  if (!isOwner(ctx)) return ctx.reply('Only owner can set price.');
  const parts = ctx.message.text.split(' ');
  if (parts.length !== 2) return ctx.reply('Usage: /setprice <price_in_nanotons>');
  usernamePrice = parseInt(parts[1]);
  ctx.reply(`Username price set to ${usernamePrice} nanotons.`);
  // TODO: Call contract to set price
});

bot.command('enable_withdrawals', (ctx) => {
  if (!isOwner(ctx)) return ctx.reply('Only owner can enable withdrawals.');
  withdrawalsEnabled = true;
  ctx.reply('Withdrawals enabled.');
  // TODO: Call contract to enable withdrawals
});

bot.command('disable_withdrawals', (ctx) => {
  if (!isOwner(ctx)) return ctx.reply('Only owner can disable withdrawals.');
  withdrawalsEnabled = false;
  ctx.reply('Withdrawals disabled.');
  // TODO: Call contract to disable withdrawals
});

bot.command('price', (ctx) => {
  ctx.reply(`Current username price: ${usernamePrice} nanotons.`);
});

bot.command('buy', (ctx) => {
  ctx.reply('To buy a username, open the Mini App: [Open Mini App](https://your-miniapp-url)', { parse_mode: 'Markdown' });
});

// --- Placeholder for TON Connect integration ---
// TODO: Integrate with TON Connect and contract

// --- Launch bot ---
bot.launch();

console.log('Grament Bot started.'); 