const api = require("./api");

const main = async () => {
  // Create a deck
  const deckResp = await api.createDeck();
  console.log(deckResp);

  // ...
};

main();
