const axios = require("axios");

const api = axios.create({
  baseURL: "https://deckofcardsapi.com/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: "fake-cookie-token",
  },
});

// Create a Deck
const createDeck = async (jokers_enabled = true) => {
  const response = await api.get(`/deck/new?jokers_enabled=${jokers_enabled}`);
  return response.data;
};

// Draw a Card
const drawCard = async (deck_id, count = 1) => {
  const response = await api.get(`/deck/${deck_id}/draw/?count=${count}`);
  return response.data;
};

// Shuffle the Deck
const shuffleDeck = async (deck_id, remaining = false) => {
  const response = await api.get(
    `/deck/${deck_id}/shuffle/?remaining=${remaining}`
  );
  return response.data;
};

// Return cards to the deck
const returnCards = async (deck_id, cards) => {
  const cardsParam = Array.isArray(cards) ? cards.join(",") : cards;
  const response = await api.get(
    `/deck/${deck_id}/return/?cards=${cardsParam}`
  );
  return response.data;
};

// Create a partial deck of cards
const createPartialDeck = async (cardCodes) => {
  const cards = cardCodes.join(",");
  const response = await api.get(`/deck/new/shuffle/?cards=${cards}`);
  return response.data;
};

// Pile Functions
const addCardsToPile = async (deck_id, pileName, cards) => {
  const cardsParam = Array.isArray(cards) ? cards.join(",") : cards;
  const response = await api.get(
    `/deck/${deck_id}/pile/${pileName}/add/?cards=${cardsParam}`
  );
  return response.data;
};

const shufflePile = async (deck_id, pileName) => {
  const response = await api.get(`/deck/${deck_id}/pile/${pileName}/shuffle/`);
  return response.data;
};

const listPile = async (deck_id, pileName) => {
  const response = await api.get(`/deck/${deck_id}/pile/${pileName}/list/`);
  return response.data;
};

const drawCardsFromPile = async (deck_id, pileName, count = 1) => {
  const response = await api.get(
    `/deck/${deck_id}/pile/${pileName}/draw/?count=${count}`
  );
  return response.data;
};

const drawCountFromPile = async (deck_id, pileName, count = 1) => {
  const response = await api.get(
    `/deck/${deck_id}/pile/${pileName}/draw/count/?count=${count}`
  );
  return response.data;
};

const drawBottomFromPile = async (deck_id, pileName, count = 1) => {
  const response = await api.get(
    `/deck/${deck_id}/pile/${pileName}/draw/bottom/?count=${count}`
  );
  return response.data;
};

const drawRandomFromPile = async (deck_id, pileName, count = 1) => {
  const response = await api.get(
    `/deck/${deck_id}/pile/${pileName}/draw/random/?count=${count}`
  );
  return response.data;
};

const returnCardsToPile = async (deck_id, pileName, cards) => {
  const cardsParam = Array.isArray(cards) ? cards.join(",") : cards;
  const response = await api.get(
    `/deck/${deck_id}/pile/${pileName}/add/?cards=${cardsParam}`
  );
  return response.data;
};

// Export the functions (NOTE: this is a little different than ESM (ES Modules), this is CommonJS)
module.exports = {
  createDeck,
  drawCard,
  shuffleDeck,
  returnCards,
  createPartialDeck,
  addCardsToPile,
  shufflePile,
  listPile,
  drawCardsFromPile,
  drawCountFromPile,
  drawBottomFromPile,
  drawRandomFromPile,
  returnCardsToPile,
};
