import React, { useState, useEffect } from 'react';
import { TonConnectButton, useTonConnectUI } from 'ton-connect-ui-react';
import './fragment.css';

const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS'; // TODO: Set your contract address

function useUsernamePrice() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch(
          `https://tonapi.io/v2/contracts/${CONTRACT_ADDRESS}/run/get_usernamePrice`
        );
        const data = await res.json();
        setPrice(Number(data.stack[0].value));
      } catch (e) {
        setPrice(null);
      }
    }
    fetchPrice();
  }, []);

  return price;
}

function App() {
  const [username, setUsername] = useState('');
  const price = useUsernamePrice();
  const [status, setStatus] = useState('');
  const [tonConnectUI] = useTonConnectUI();
  const [confirming, setConfirming] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch TON/USD price
  const [tonUsd, setTonUsd] = useState(null);
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=toncoin&vs_currencies=usd')
      .then(res => res.json())
      .then(data => setTonUsd(data.toncoin.usd));
  }, []);

  const handleReserve = () => {
    if (!username) {
      setStatus('Please enter a username.');
      return;
    }
    setConfirming(true);
  };

  const handleConfirm = async () => {
    setStatus('Waiting for wallet confirmation...');
    setConfirming(false);
    try {
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: CONTRACT_ADDRESS,
            amount: price.toString(),
            payload: encodeBuyUsernamePayload(username),
          }
        ]
      });
      setSuccess(true);
      setStatus('');
    } catch (e) {
      setStatus('Transaction cancelled or failed.');
    }
  };

  if (success) {
    return (
      <div className="fragment-success">
        <h2>Success!</h2>
        <div>
          <span className="fragment-username">@{username}</span> reserved.
        </div>
        <div>
          Paid: <b>{price / 1e9} TON</b>
          {tonUsd && (
            <span> (~${((price / 1e9) * tonUsd).toFixed(2)} USD)</span>
          )}
        </div>
        <div style={{ marginTop: 32 }}>
          <a href="/" onClick={() => window.location.reload()}>Reserve another username</a>
        </div>
      </div>
    );
  }

  return (
    <div className="fragment-container">
      <TonConnectButton />
      <h1>Reserve a Telegram Username</h1>
      <div className="fragment-input-group">
        <span className="fragment-at">@</span>
        <input
          className="fragment-input"
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="fragment-price">
        {price === null ? (
          <span>Loading price...</span>
        ) : (
          <>
            <b>{price / 1e9} TON</b>
            {tonUsd && (
              <span> (~${((price / 1e9) * tonUsd).toFixed(2)} USD)</span>
            )}
          </>
        )}
      </div>
      <button
        className="fragment-reserve-btn"
        onClick={handleReserve}
        disabled={!username || price === null}
      >
        Reserve Username
      </button>
      {confirming && (
        <div className="fragment-confirm-modal">
          <div>
            You are about to reserve <b>@{username}</b> for <b>{price / 1e9} TON</b>.
            {tonUsd && (
              <span> (~${((price / 1e9) * tonUsd).toFixed(2)} USD)</span>
            )}
            <br />Please confirm to proceed.
          </div>
          <button className="fragment-confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      )}
      <div className="fragment-status">{status}</div>
    </div>
  );
}

// You need to implement this function to encode the payload for buyUsername
function encodeBuyUsernamePayload(username) {
  // This is a placeholder. You need to use Tact/TON JS SDK to encode the function call.
  return '';
}

export default App; 