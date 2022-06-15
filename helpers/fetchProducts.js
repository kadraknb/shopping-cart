const fetchProducts = async (QUERY) => {
  try {
    if (!QUERY) { throw new Error('parametro nao definido '); }
    const ENDPOINTS = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
    const data = await (await fetch(ENDPOINTS)).json();
    return data.results;
  } catch (error) { throw error.message; }
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
