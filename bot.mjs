console.log("✅ Running CLEAN bot.js");

import dotenv from 'dotenv';
dotenv.config();

import { Telegraf } from 'telegraf';
import { Connection, PublicKey } from '@solana/web3.js';

// Load ENV variables
const {
  TELEGRAM_BOT_TOKEN,
  CHAT_ID,
  TOKEN_SYMBOL,
  PUMP_FUN_URL,
  RPC_URL,
  TOKEN_ADDRESS,
} = process.env;

if (!TELEGRAM_BOT_TOKEN) throw new Error('TELEGRAM_BOT_TOKEN is missing');
if (!CHAT_ID) throw new Error('CHAT_ID is missing');
if (!RPC_URL || !RPC_URL.startsWith('http')) throw new Error('Invalid RPC_URL');

// Setup Telegram and Solana
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
const connection = new Connection(RPC_URL, 'confirmed');

let lastSlot = 0;

// Detect sniper wallet (basic)
async function detectSniper(buyer) {
  const balance = await connection.getBalance(new PublicKey(buyer));
  return balance < 1 * 10 ** 9; // < 1 SOL
}

// Send Telegram alert
async function sendTelegramAlert(buyer, amount, txHash) {
  const buyLink = '${PUMP_FUN_URL}/${TOKEN_SYMBOL}';

  let message = '💰 *New Buy!*\n👤 Buyer: \${buyer}\\n💸 Amount: ${amount} ${TOKEN_SYMBOL}\n🔗 [View TX](https://solscan.io/tx/${txHash})\n🛒 [Buy More](${buyLink})';

  const isSniper = await detectSniper(buyer);
  if (isSniper) {
    'message += \n⚠ *Possible Sniper Detected!*';
  }

  await bot.telegram.sendMessage(CHAT_ID, message, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  });
}

// Monitor buys
async function fetchRecentBuys() {
  const token = new PublicKey("4Nd1m9iKjvExXz6NaUMgyfLFvpp8F35EZyU2DmvCkq8t");
 const confirmed = await connection.getSignaturesForAddress(token, { limit: 5 });

  for (const tx of confirmed.reverse()) {
    if (tx.slot <= lastSlot) continue;

    const txDetails = await connection.getParsedTransaction(tx.signature);
    if (!txDetails) continue;

    const buyer = txDetails.transaction.message.accountKeys[0].pubkey;
    const amount = 1; // TODO: Parse real amount
    await sendTelegramAlert(buyer.toBase58(), amount, tx.signature);
    lastSlot = tx.slot;
  }
}

// Poll every 10s
setInterval(fetchRecentBuys, 10000);

// Start bot
bot.launch();
console.log('🚀 Bot running...');