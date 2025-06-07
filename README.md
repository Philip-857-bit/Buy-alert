# 📈 Buy-alert – Telegram Buy Notification Bot

*Buy-alert* is a real-time Telegram bot that sends instant alerts when someone buys your token — perfect for Pump.fun launches, meme coins, or any Solana-based token. Engage your community instantly with live buy notifications.

---

## 🚀 Features

- 🔔 Instant Buy Alerts
- 🐋 Whale Detection
- 📈 Chart Link
- 🚀 Buy Button
- 👻 Anti-Bot Filtering
- 📊 Daily Stats

---

## 🛠 Getting Started

### 1. Clone the Repo

git clone https://github.com/your-username/Buy-alert.git
cd Buy-alert


### 2. Install Dependencies


pip install -r requirements.txt


### 3. Configure Environment

Create a .env file in the root directory:


TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
RPC_URL=https://api.mainnet-beta.solana.com
TOKEN_ADDRESS=your_token_address
MIN_BUY_AMOUNT_SOL=0.1


> 🔐 Keep your .env file private!

---

## ▶ Running the Bot


python bot.py


---

## 💬 Example Telegram Message


🛒 New Buy Detected!

💰 Amount: 4.2 SOL  
👤 Wallet: 9xA...Tq2r  
🔥 Total Buys Today: 25  

📈 View Chart: https://pump.fun/your-token  
🚀 Buy Now


---

## 📁 Project Structure


📦 buyping/
 ┣ 📄 bot.py
 ┣ 📁 utils/
 ┣ 📁 alerts/
 ┣ 📄 .env
 ┣ 📄 README.md
 ┣ 📄 requirements.txt


---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Got improvements? Want to add auto-sniping, sell alerts, or Farcaster support? Fork it, suggest features, or submit a PR!

---

✨ Made for meme coin builders, by degens.
