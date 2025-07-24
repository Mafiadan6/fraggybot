# 🤖 Grament Telegram Bot

The Grament Bot is the admin and user interface for your TON-based username honeypot system. It lets you (the owner) set the username price, control withdrawals, and monitor activity. Users interact with the Mini App, but the bot is your control center!

---

## 🌟 Features
- **Set Username Price:** Instantly update the price users see in the Mini App.
- **Enable/Disable Withdrawals:** Toggle whether users can transfer tokens (honeypot control).
- **Admin Panel:** Only the owner (by Telegram user ID) can use admin commands.
- **Purchase History:** (Planned) View who reserved usernames and when.
- **Mini App Link:** Sends users to the Mini App for username reservation.
- **Status & Help:** Check current price, bot status, and get help.

---

## 🛠️ Commands

| Command                | Who Can Use | What It Does                                              |
|------------------------|-------------|-----------------------------------------------------------|
| /start                 | Anyone      | Welcome message and Mini App link                         |
| /buy                   | Anyone      | Sends Mini App link for username reservation              |
| /price                 | Anyone      | Shows the current username price (in TON)                 |
| /setprice <price>      | Owner       | Set the username price (in nanotons)                      |
| /enable_withdrawals    | Owner       | Allow users to transfer tokens (disable honeypot)         |
| /disable_withdrawals   | Owner       | Block user withdrawals (enable honeypot)                  |
| /stats                 | Owner       | (Planned) Show contract stats and user activity           |
| /help                  | Anyone      | Show help and available commands                          |

---

## ⚙️ How It Works
- The bot uses your .env for secrets and contract address.
- Admin commands are restricted to your Telegram user ID.
- The bot interacts with the TON contract to update price and withdrawal status.
- Users are always directed to the Mini App for actual username reservation (and payment).

---

## 🚀 Quick Start
1. Copy `.env.example` to `.env` and fill in your details.
2. Run `npm install`.
3. Start the bot with `node index.js` (or use PM2 for production).

---

## 💡 Example Usage
- `/setprice 2000000000000` — Set price to 2000 TON (in nanotons)
- `/enable_withdrawals` — Allow users to transfer tokens
- `/disable_withdrawals` — Block user withdrawals
- `/buy` — Get the Mini App link

---

## 📝 Notes
- The bot is for owner/admin use. Users interact via the Mini App.
- All TON paid by users is instantly forwarded to you (the owner) by the contract.
- Withdrawals are disabled by default (honeypot mode).

---

## 🏆 Enjoy your new Telegram username honeypot system! 