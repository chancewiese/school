const {
  createDeck,
  drawCard,
  returnCards,
  shuffleDeck,
  createPartialDeck,
  addCardsToPile,
  shufflePile,
  listPile,
  drawCardsFromPile,
  drawCountFromPile,
  drawBottomFromPile,
  drawRandomFromPile,
  returnCardsToPile,
} = require("./api");

describe("Deck of Cards API", () => {
  describe("createDeck", () => {
    it("should create a deck of cards with jokers", async () => {
      const { success, deck_id, remaining } = await createDeck();
      expect(success).toBe(true);
      expect(deck_id).toBeDefined();
      expect(remaining).toBe(54);
    });

    it("should create a deck of cards without jokers", async () => {
      const { success, deck_id, remaining } = await createDeck(false);
      expect(success).toBe(true);
      expect(deck_id).toBeDefined();
      expect(remaining).toBe(52);
    });
  });

  describe("drawCard", () => {
    it("should draw a card from the deck", async () => {
      const { deck_id } = await createDeck();
      const { success, cards, remaining } = await drawCard(deck_id);
      expect(success).toBe(true);
      expect(cards).toHaveLength(1);
      expect(remaining).toBe(53);
    });

    it("should draw 5 cards from the deck", async () => {
      const { deck_id } = await createDeck();
      const { success, cards, remaining } = await drawCard(deck_id, 5);
      expect(success).toBe(true);
      expect(cards).toHaveLength(5);
      expect(remaining).toBe(49);
    });

    it("should not draw a card from an empty deck", async () => {
      const { deck_id } = await createDeck();
      await drawCard(deck_id, 54); // Draw all cards
      const result = await drawCard(deck_id, 1);
      expect(result.success).toBe(false);
      expect(result.error).toBe(
        "Not enough cards remaining to draw 1 additional"
      );
      expect(result.remaining).toBe(0);
    });
  });

  describe("shuffleDeck", () => {
    it("should shuffle the deck of cards", async () => {
      const { deck_id } = await createDeck();
      const { success, shuffled } = await shuffleDeck(deck_id);
      expect(success).toBe(true);
      expect(shuffled).toBe(true);
    });

    it("should shuffle the deck of cards with remaining cards", async () => {
      const { deck_id } = await createDeck();
      await drawCard(deck_id, 10);
      const { success, shuffled, remaining } = await shuffleDeck(deck_id, true);
      expect(success).toBe(true);
      expect(shuffled).toBe(true);
      expect(remaining).toBe(44);
    });
  });

  describe("returnCards", () => {
    it("should return drawn cards to the deck", async () => {
      const { deck_id } = await createDeck();
      const { cards } = await drawCard(deck_id, 5);
      const cardCodes = cards.map((card) => card.code);
      const { success, remaining } = await returnCards(deck_id, cardCodes);
      expect(success).toBe(true);
      expect(remaining).toBe(54);
    });
  });

  describe("createPartialDeck", () => {
    it.each([
      [["AS", "2S", "3S", "4S"]],
      [["AS", "2S", "3S", "4S", "5S"]],
      [["AS", "2S", "3S", "4S", "5S", "6S"]],
    ])("should create a partial deck of cards for %s cards", async (cards) => {
      const { success, deck_id, remaining } = await createPartialDeck(cards);
      expect(success).toBe(true);
      expect(deck_id).toBeDefined();
      expect(remaining).toBe(cards.length);
    });
  });

  describe("Pile Operations", () => {
    let deck_id;
    const pileName = "testPile";

    beforeEach(async () => {
      const deck = await createDeck();
      deck_id = deck.deck_id;
    });

    describe("addCardsToPile", () => {
      it("should add cards to a pile", async () => {
        const { cards } = await drawCard(deck_id, 3);
        const cardCodes = cards.map((card) => card.code);
        const result = await addCardsToPile(deck_id, pileName, cardCodes);
        expect(result.success).toBe(true);
        expect(result.piles[pileName].remaining).toBe(3);
      });
    });

    describe("shufflePile", () => {
      it("should shuffle a pile", async () => {
        const { cards } = await drawCard(deck_id, 5);
        await addCardsToPile(
          deck_id,
          pileName,
          cards.map((card) => card.code)
        );
        const result = await shufflePile(deck_id, pileName);
        expect(result.success).toBe(true);
      });
    });

    describe("listPile", () => {
      it("should list cards in a pile", async () => {
        const { cards } = await drawCard(deck_id, 3);
        await addCardsToPile(
          deck_id,
          pileName,
          cards.map((card) => card.code)
        );
        const result = await listPile(deck_id, pileName);
        expect(result.success).toBe(true);
        expect(result.piles[pileName].cards).toHaveLength(3);
      });
    });

    describe("drawCardsFromPile", () => {
      it("should draw cards from a pile", async () => {
        const { cards } = await drawCard(deck_id, 5);
        await addCardsToPile(
          deck_id,
          pileName,
          cards.map((card) => card.code)
        );
        const result = await drawCardsFromPile(deck_id, pileName, 2);
        expect(result.success).toBe(true);
        expect(result.cards).toHaveLength(2);
        expect(result.piles[pileName].remaining).toBe(3);
      });
    });

    describe("drawCountFromPile", () => {
      it("should draw specified count of cards from a pile", async () => {
        const { cards } = await drawCard(deck_id, 5);
        await addCardsToPile(
          deck_id,
          pileName,
          cards.map((card) => card.code)
        );
        const result = await drawCountFromPile(deck_id, pileName, 2);
        expect(result.success).toBe(true);
        expect(result.cards).toHaveLength(2);
        expect(result.piles[pileName].remaining).toBe(3);
      });
    });

    describe("drawBottomFromPile", () => {
      it("should draw cards from the bottom of a pile", async () => {
        const { cards } = await drawCard(deck_id, 5);
        await addCardsToPile(
          deck_id,
          pileName,
          cards.map((card) => card.code)
        );
        const result = await drawBottomFromPile(deck_id, pileName, 2);
        expect(result.success).toBe(true);
        expect(result.cards).toHaveLength(2);
      });
    });

    describe("drawRandomFromPile", () => {
      it("should draw random cards from a pile", async () => {
        const { cards } = await drawCard(deck_id, 5);
        await addCardsToPile(
          deck_id,
          pileName,
          cards.map((card) => card.code)
        );
        const result = await drawRandomFromPile(deck_id, pileName, 2);
        expect(result.success).toBe(true);
        expect(result.cards).toHaveLength(2);
      });
    });

    describe("returnCardsToPile", () => {
      it("should return cards to a pile", async () => {
        const { cards } = await drawCard(deck_id, 3);
        const cardCodes = cards.map((card) => card.code);
        await addCardsToPile(deck_id, pileName, cardCodes);

        const drawResult = await drawCardsFromPile(deck_id, pileName, 2);
        await returnCardsToPile(
          deck_id,
          pileName,
          drawResult.cards.map((card) => card.code)
        );

        const finalState = await listPile(deck_id, pileName);
        expect(finalState.piles[pileName].remaining).toBe(3);
      });
    });
  });
});
