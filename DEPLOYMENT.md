# 🚀 Deployment Guide for Grament Username Honeypot Project

This guide will walk you through deploying the entire Grament stack:
- Tact smart contract (TON blockchain)
- Mini App (React, fragment.com style)
- Telegram Bot (Node.js)

---

## 1. Prerequisites
- Ubuntu VPS (for Mini App and Bot)
- TON wallet (Tonkeeper, Tonhub, etc.)
- Node.js v18+ and npm
- (Optional) NGINX for production Mini App

---

## 2. Deploy the Smart Contract

### A. Install Tact CLI
```sh
sudo apt update
sudo apt install -y nodejs npm
npm install -g tact
```

### B. Compile the Contract
```sh
cd ~/Project/fragment
# Edit contracts/UsernameHoneypotToken.tact if needed
# Make sure get fun usernamePrice(): int is present

tact compile contracts/UsernameHoneypotToken.tact
```

### C. Deploy to TON
- Fund your TON wallet (testnet: use a faucet, mainnet: buy TON)
- Deploy (replace price with your initial price in nanotons):
```sh
tact deploy contracts/UsernameHoneypotToken.tact --args "2000000000000" --network testnet
```
- Save the contract address output by the deploy command.

---

## 3. Deploy the Mini App (React)

### A. Build the Mini App
```sh
cd ~/Project/fragment/miniapp
npm install
npm run build
```

### B. Serve the Mini App
#### Option 1: Quick Start (serve)
```sh
npm install -g serve
serve -s build -l 3000
```
- Access at http://your-vps-ip:3000

#### Option 2: Production (NGINX)
```sh
sudo apt install -y nginx
sudo cp -r build/* /var/www/html/
sudo systemctl restart nginx
```
- Access at http://your-vps-ip or your domain

---

## 4. Deploy the Telegram Bot

### A. Install Dependencies
```sh
cd ~/Project/fragment/bot
npm install
cp .env.example .env
# Edit .env with your BOT_TOKEN, OWNER_ID, CONTRACT_ADDRESS
nano .env
```

### B. Start the Bot
```sh
node index.js
```

### C. (Recommended) Use PM2
```sh
sudo npm install -g pm2
pm2 start index.js --name grament-bot
pm2 save
pm2 startup
```

---

## 5. Security & Final Steps
- Set up UFW firewall:
```sh
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
sudo ufw enable
```
- (Optional) Set up SSL with Let's Encrypt:
```sh
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx
```
- Test the full flow: Mini App → Wallet → Contract → Bot

---

## 6. Troubleshooting
- **Contract not deploying?** Check wallet balance and network.
- **Mini App not loading?** Check build, port, and firewall.
- **Bot not responding?** Check .env, logs, and Telegram bot status.

---

## 7. Useful Links
- [Tact Docs](https://docs.tact-lang.org/)
- [TON Explorer](https://tonscan.org/)
- [TON Connect](https://ton.org/docs/develop/dapps/ton-connect/overview)
- [Fragment.com Inspiration](https://fragment.com/)

---

Happy deploying! 🚀 