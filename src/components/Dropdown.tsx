import React, { useState } from 'react';

interface Card {
  rank: string;
  suit: string;
  // Add any other properties here if needed
}

interface DropdownProps {
  card: Card;
}

export const Dropdown: React.FC<DropdownProps> = ({ card }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const cardTypes: Card[] = [
    { rank: 'A', suit: 'S' },
    { rank: '2', suit: 'S' },
    // Add more card types as needed
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center md:w-[8rem] h-auto 3xs:w-[5rem] mx-1 rounded-md shadow-sm border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={toggleDropdown}
      >
        <img
          src={`/assets/SVG-cards-1.3/${card.rank}${card.suit}.svg`}
          alt={`${card.rank}${card.suit}`}
        />
      </button>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {cardTypes.map((cardType, index) => (
            <button key={index} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
              {/* Render card type */}
              {`${cardType.rank}${cardType.suit}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
