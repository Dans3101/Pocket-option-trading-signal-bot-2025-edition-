import TelegramBot from "node-telegram-bot-api";

// 1. Load environment variables
const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID; // your Telegram user/channel ID

// 2. Create bot instance (polling mode)
const bot = new TelegramBot(token, { polling: true });

// 3. Track if bot is active
let isActive = false;

// 4. Handle /start command
bot.onText(/\/start/, (msg) => {
  isActive = true;
  bot.sendMessage(msg.chat.id, "✅ Bot started! You will now receive trading signals.");
});

// 5. Handle /stop command
bot.onText(/\/stop/, (msg) => {
  isActive = false;
  bot.sendMessage(msg.chat.id, "⏹ Bot stopped. No signals will be sent.");
});

// 6. Function to send signals (only if active)
function sendSignal(signal) {
  if (isActive) {
    bot.sendMessage(chatId, `📊 Trading Signal: ${signal}`);
  } else {
    console.log("Bot is inactive. No signals sent.");
  }
}

// Example: test signal every 30s
setInterval(() => {
  sendSignal("BUY EUR/USD at 1.0850");
}, 30000);
