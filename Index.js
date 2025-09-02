import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID; // will set later in Render

const bot = new TelegramBot(token, { polling: true });

let isActive = false;

bot.onText(/\/start/, (msg) => {
  isActive = true;
  bot.sendMessage(msg.chat.id, "✅ Bot started! You will now receive trading signals.");
});

bot.onText(/\/stop/, (msg) => {
  isActive = false;
  bot.sendMessage(msg.chat.id, "⏹ Bot stopped. No signals will be sent.");
});

function sendSignal(signal) {
  if (isActive) {
    bot.sendMessage(chatId, `📊 Trading Signal: ${signal}`);
  } else {
    console.log("Bot inactive, no signals sent.");
  }
}

// test signal every 30s
setInterval(() => {
  sendSignal("BUY EUR/USD at 1.0850");
}, 30000);