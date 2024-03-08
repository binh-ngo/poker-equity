export class Card {
  constructor(public readonly suit: string, public readonly rank: string) {}
}

export class Deck {
  private cards: Card[] = [];

  constructor() {
      const suits = ['H', 'D', 'C', 'S'];
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

      for (const suit of suits) {
          for (const rank of ranks) {
              this.cards.push(new Card(suit, rank));
          }
      }
  }

  shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
  }

  deal(): Card {
      return this.cards.pop()!;
  }

  static generateHands(): string[][] {
    const suits = ['H', 'D', 'C', 'S'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

    const hands: string[][] = [];
    for (let i = 0; i < ranks.length; i++) {
      for (let j = i; j < ranks.length; j++) {
        const pair = (i === j) ? `${ranks[i]}${ranks[j]}` : `${ranks[i]}${suits[0]}${ranks[j]}${suits[1]}`;
        const offSuit = (i !== j) ? `${ranks[i]}${suits[0]}${ranks[j]}${suits[1]}` : '';
        const suited = `${ranks[i]}${suits[0]}${ranks[j]}${suits[0]}`;
        hands.push([pair, offSuit, suited]);
      }
    }
    return hands;
  }
}

export class Player {
  private hand: Card[] = [];

  constructor(public readonly name: string) {}

  receiveCard(card: Card) {
      this.hand.push(card);
  }

  getHand() {
      return this.hand;
  }
}