import React, { useState } from 'react';
import { Card, Deck, Player } from './types';
import './output.css'
import { Dropdown } from './components/Dropdown';

interface CardObj {
  true: string;
  reverse: string;
}
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
    const hand = player.getHand();
    let constant = 20;

    if (hand.length === 2) {
      const higher = Math.max(rankValues[hand[0].rank], rankValues[hand[1].rank]);
      const lower = Math.min(rankValues[hand[0].rank], rankValues[hand[1].rank]);

      if (hand[0].rank === hand[1].rank) {
        constant = 44;
      }

      if (hand[0].suit == hand[1].suit) {
        return higher * 2 + lower + constant + 2;
      } else {
        return higher * 2 + lower + constant;
      }
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
      if (individualCards[1] === 's') {
        return higher * 2 + lower + constant + 2;
      } else {
        return higher * 2 + lower + constant;
      }
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
          row.push(`${ranks[j]}${ranks[i]}o`);
        }
      }
      grid.push(row);
    }
    return grid;
  };



  const grid = generateGrid();

  const compareHandEquity = (cards: string) => {
    if (gameStarted) {
      return calculatePreflopEquity(players[0]) > calculateAllPreflopEquity(cards);
    }
    return false;
  };

  const equateHandOrder = (cards: string) => {
    let cardObj: CardObj = {
      true: '',
      reverse: ''
    }
    if (cards) {
      // Check if the current cell matches the user's hand in both orders
      const reverseCards = cards.length === 3 ? cards[1] + cards[0] + cards[2] : cards;
      if (cards === cards || cards === reverseCards) {
        cardObj.true = cards;
        cardObj.reverse = reverseCards;
        return cardObj;
      }
    }
    return cardObj;
  }

  const isSuited = (cards: string) => {
    if (cards.includes('s')) {
      return true;
    }
  }

  const userHand = () => {
    if (gameStarted) {
      const currentHand = players[0].getHand();
      var simplifiedHand = currentHand[0].rank + currentHand[1].rank;
      if (currentHand[0].suit === currentHand[1].suit) {
        simplifiedHand += 's';
      }
      else if (currentHand[0].rank === currentHand[1].rank) {
        simplifiedHand += '';
      }
      else {
        simplifiedHand += 'o';
      }
      const finalHand: CardObj = equateHandOrder(simplifiedHand);
      return finalHand;
    }
    return null;
  }

  return (
    <div>
      <h1 className="lg:text-4xl text-center 2xs:w-screen 3xs:text-3xl">Texas Hold'em Preflop Equity</h1>
      <div className="lg:text-2xl text-center">
        {/* <div className='3xs:text-lg text-center flex justify-center'>
          {playerNames.map((name, index) => (
            <input className="text-center" key={index} type="text" value={name} onChange={(e) => handleInputChange(index, e)} />
          ))}
        </div> */}
        <div className="flex justify-around">
          {/* <button className="text-blue-700" onClick={addPlayer}>Add Player</button>
        <button className="text-red-700" onClick={removePlayer}>Remove Player</button> */}
          <button className="bg-blue-200 border-2 border-b-black" onClick={startGame}>Deal Hand</button>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row'>
        {gameStarted && players.length > 0 && (
          <div className="flex flex-col my-5 mx-20" key={players[0].name}>
            {/* <h2 className="text-2xl text-center ml-16 3xs:ml-0 pb-3">{players[0].name}:</h2> */}
            <div className='flex flex-row 3xs:ml-6 lg:mt-8'>
              {players[0].getHand().map((card: Card, index: number) => (
                <Dropdown key={index} card={card} />
              ))}
            </div>
            <p className="text-center lg:ml-3 w-full my-3 3xs:ml-0">Preflop Equity: {calculatePreflopEquity(players[0])}%  </p>
          </div>
        )}
        <div className="container pt-5 sm:pt-0 sm:ml-20">
          <h1 className="lg:text-4xl text-center 3xs:w-full 3xs:text-2xl 3xs:ml-12">All Card Combinations</h1>
          <table className="table-auto mx-auto mt-5 border-collapse border bg-gradient-to-br from-slate-500 to-white">
            <tbody>
            {grid.map((row, rowIndex) => (
  <tr key={rowIndex}>
    {row.map((cell, cellIndex) => {
      const equityValue = isSuited(cell) ? calculateAllPreflopEquity(`${cell[0]}${cell[1]}`) + 2 : calculateAllPreflopEquity(`${cell[0]}${cell[1]}`);
      const currentCard = userHand()?.reverse === cell || userHand()?.true === cell;
      const isBetter = compareHandEquity(cell);
      const isPaired = cell.length === 2 && cell[0] === cell[1];
      const suited = cell[2] === 's';
      return (
        <td
          key={cellIndex}
          className={`border border-black md:px-3 3xs:px-0.5 3xs:py-0.5 3xs:text-xs lg:text-sm text-center hover:bg-blue-200 ${!currentCard && isPaired ? 'bg-gradient-to-br from-blue-100 to-blue-500' : ''} ${isBetter && !currentCard ? 'bg-sky-300' : ''} ${currentCard ? 'bg-orange-500' : ''}`} 
        >
          {cell}
          <br />
          {equityValue}%
        </td>
      );
    })}
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
