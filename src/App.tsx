import React, { useState } from 'react';
import { Card, Deck, Player } from './types';
import './output.css'

function App() {
  const [playerNames, setPlayerNames] = useState<string[]>(['Player 1', 'Player 2']);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
      setGameStarted(true);
      const deck = new Deck();
      deck.shuffle();
      const newPlayers = playerNames.map(name => {
          const player = new Player(name);
          player.receiveCard(deck.deal());
          player.receiveCard(deck.deal());
          return player;
      });
      setPlayers(newPlayers);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      const newPlayerNames = [...playerNames];
      newPlayerNames[index] = event.target.value;
      setPlayerNames(newPlayerNames);
  };

  const addPlayer = () => {
      setPlayerNames([...playerNames, `Player ${playerNames.length + 1}`]);
  };

  const removePlayer = () => {
    setPlayerNames(playerNames.slice(0, -1));  
  };

  return (
      <div>
          <h1 className="text-4xl text-center">Texas Hold'em</h1>
          <div className="text-2xl text-center border-2 border-black">
            <div className='text-center flex justify-center'>
          {playerNames.map((name, index) => (
            <input className="text-center" key={index} type="text" value={name} onChange={(e) => handleInputChange(index, e)} />
            ))}
            </div>
          <div className="flex justify-around">
          <button className="text-blue-700" onClick={addPlayer}>Add Player</button>
          <button className="text-red-700" onClick={removePlayer}>Remove Player</button>
          <button className="text-green-700" onClick={startGame}>Start Game</button>
          </div>
          </div>
          <div className='flex flex-wrap'>
          {gameStarted && players.map(player => (
            <div className="flex flex-col my-10 mx-20" key={player.name}>
                  <h2 className="text-2xl text-center">{player.name}'s hand:</h2>
                  <div className='flex flex-row'>
                      {player.getHand().map((card: Card, index:number) => (
                        <img
                        key={index}
                        className='w-[12rem] h-auto mx-1'
                        src={`/assets/SVG-cards-1.3/${card.rank}${card.suit}.svg`}
                        alt={`${card.rank}${card.suit}`}
                        />
                        ))}
                  </div>
              </div>
          ))}
          </div>
      </div>
  );
}

export default App;
