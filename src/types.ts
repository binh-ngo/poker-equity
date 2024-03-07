export class Card {
  constructor(public readonly suit: string, public readonly rank: string) {}
}

export class Deck {
  private cards: Card[] = [];

  constructor() {
      const suits = ['H', 'D', 'C', 'S'];
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

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