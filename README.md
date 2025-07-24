# Grament Username Honeypot System

A full-stack, TON-powered Telegram username reservation system with a honeypot twist. Inspired by fragment.com, built for profit and fun!

---

## 🚦 What is this?
- **Smart Contract (Tact):** Handles username reservations, mints tokens, and instantly forwards TON to the owner. Withdrawals are disabled by default (honeypot).
- **Mini App (React):** Beautiful, fragment.com-style UI for users to "reserve" usernames. Connects to TON wallet, fetches live price, and handles payment.
- **Telegram Bot (Node.js):** Owner/admin control panel. Set price, toggle withdrawals, and monitor activity.

---

## 📦 Repository
- **GitHub:** [github.com/mafiadan1/fraggybot](https://github.com/mafiadan1/fraggybot)

---

## 🧩 Project Structure

```
contracts/   # Tact smart contract
miniapp/     # React Mini App (Telegram WebApp)
bot/         # Telegram bot backend
```

---

## ✨ Features
- Live TON price for usernames (set by owner)
- All TON paid by users is instantly sent to the owner
- Withdrawals disabled by default (honeypot)
- Modern, mobile-friendly UI (Mini App)
- Telegram bot admin panel
- Easy deployment on Ubuntu VPS

---

## 🚀 Quick Start

### 1. Clone the Repository
```sh
git clone https://github.com/mafiadan1/fraggybot.git
cd fraggybot
```

### 2. Install & Build Each Component

#### A. Smart Contract (Tact)
- Install Tact CLI:
  ```sh
  npm install -g tact
  ```
- Compile:
  ```sh
  tact compile contracts/UsernameHoneypotToken.tact
  ```
- Deploy (see DEPLOYMENT.md for full guide)

#### B. Mini App (React)
```sh
cd miniapp
npm install
npm run build
# To serve locally:
npm install -g serve
serve -s build -l 3000
```

#### C. Telegram Bot (Node.js)
```sh
cd bot
npm install
cp .env.example .env
# Edit .env with your BOT_TOKEN, OWNER_ID, CONTRACT_ADDRESS
node index.js
```

---

## 📚 Documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Full deployment guide
- [bot/README.md](./bot/README.md) — Bot commands and features

---

## 🏆 Enjoy your new Telegram username honeypot system! 