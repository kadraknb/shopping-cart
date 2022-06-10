const fetchItem = async (ItemID) => {
  try {
    if (!ItemID) { throw new Error('You must provide an url'); }
    const ENDPOINTS = `https://api.mercadolibre.com/items/${ItemID}`;
    const data = await (await fetch(ENDPOINTS)).json();
    return data;
  } catch (error) { throw error.message; }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
