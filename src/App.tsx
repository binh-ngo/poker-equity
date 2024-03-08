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

  const calculatePreflopEquity = (player: Player): number => {
    const rankValues: { [key: string]: number } = {
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      'T': 10,
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 15
    };
    console.log(player)
    const hand = player.getHand();
    let constant = 20;
  
    if (hand.length === 2) {
      const higher = Math.max(rankValues[hand[0].rank], rankValues[hand[1].rank]);
      const lower = Math.min(rankValues[hand[0].rank], rankValues[hand[1].rank]);
  
      if (hand[0].rank === hand[1].rank) {
        constant = 44;
      }
  
      return higher * 2 + lower + constant;
    }
  
    // Return a default value if the hand doesn't contain exactly 2 cards
    return 0;
  };
  
  const calculateAllPreflopEquity = (cards: string) => {
    const hand = cards.substring(0, 2);
    const individualCards = hand.split("");

    const rankValues: { [key: string]: number } = {
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      'T': 10,
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 15
    };

    let constant = 20;
  
    if (individualCards.length === 2) {
      const higher = Math.max(rankValues[individualCards[0]], rankValues[individualCards[1]]);
      const lower = Math.min(rankValues[individualCards[0]], rankValues[individualCards[1]]);
  
      if (individualCards[0] === individualCards[1]) {
        constant = 44;
      }
  
      return higher * 2 + lower + constant;
    }
  
    // Return a default value if the hand doesn't contain exactly 2 cards
    return 0;
  };
  

const generateGrid = (): string[][] => {
  const grid: string[][] = [];
  const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

  for (let i = 0; i < ranks.length; i++) {
    const row: string[] = [];
    for (let j = 0; j < ranks.length; j++) {
      if (i === j) {
        row.push(`${ranks[i]}${ranks[j]}`);
      } else if (i < j) {
        row.push(`${ranks[i]}${ranks[j]}s`);
      } else {
        row.push(`${ranks[i]}${ranks[j]}o`);
      }
    }
    grid.push(row);
  }
  return grid;
};

  const grid = generateGrid();

  const compareHandEquity = (cards: string) => {
    if(calculatePreflopEquity(players[0]) > calculateAllPreflopEquity(cards)) {
      return true;
    }
  }

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
        {/* <button className="text-blue-700" onClick={addPlayer}>Add Player</button>
        <button className="text-red-700" onClick={removePlayer}>Remove Player</button> */}
        <button className="text-green-700" onClick={startGame}>Start Game</button>
      </div>
    </div>

    <div className='flex'>
      {gameStarted && players.length > 0 && (
        <div className="flex flex-col my-10 mx-20" key={players[0].name}>
          <h2 className="text-2xl text-center ml-16 pb-3">{players[0].name}:</h2>
          <div className='flex flex-row'>
            {players[0].getHand().map((card: Card, index:number) => (
              <img
                key={index}
                className='w-[8rem] h-auto mx-1'
                src={`/assets/SVG-cards-1.3/${card.rank}${card.suit}.svg`}
                alt={`${card.rank}${card.suit}`}
                />
                ))}
                </div>
                <p className="text-center ml-9 w-full my-3">Preflop Equity: {calculatePreflopEquity(players[0])}%  </p>
              </div>
      )}
      <div className="container pt-5">
          <h1 className="text-4xl text-center">All Card Combinations</h1>
          <table className="table-auto mt-5 border-collapse border border-black mx-auto">
            <tbody>
              {grid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className={`border border-black px-3 text-center hover:bg-blue-200 ${cell.length === 2 && cell[0] === cell[1] ? 'bg-yellow-200' : ''} 
                    ${compareHandEquity(cell) ? 'bg-green-200' : ''}`}>
                          {cell}
                      <br />
                      {calculateAllPreflopEquity(`${cell[0]}${cell[1]}`)}%
                    </td>                    
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
