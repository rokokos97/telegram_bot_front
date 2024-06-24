import React, { useState } from 'react';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [betText, setBetText] = useState<string>('');
  const [betAmount, setBetAmount] = useState<number>(0);
  const [response, setResponse] = useState<string>('');

  const handleBetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/propose-bet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, betAmount }),
    });
    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div>
      <header>
        <h1>MAKE A BAT</h1>
        <form onSubmit={handleBetSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter opponent's username"
          />
          <input
            type="text"
            value={betText}
            onChange={(e) => setBetText(e.target.value)}
            placeholder="Enter your bet"
          />
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            placeholder="Enter bet amount"
          />
          <button type="submit">Propose Bet</button>
        </form>
        <p>{response}</p>
      </header>
    </div>
  );
};

export default App;
