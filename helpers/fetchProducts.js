// const fetch = require('node-fetch');

let res;
const fetchProducts = async (QUERY) => {
  const pc = 'computador';
  try {
    if (!QUERY) { throw new Error('parametro nao definido '); }
    const ENDPOINTS = `https://api.mercadolibre.com/sites/MLB/search?q=${pc}`;
    const data = await (await fetch(ENDPOINTS)).json();
    return data.results;
  } catch (error) { throw error.message; }
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
