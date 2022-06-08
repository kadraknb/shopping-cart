// const fetch = require('node-fetch');

const fetchProducts = async (parA) => {
  try {
    if (!parA) { throw new Error('parametro nao definido '); }
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${parA}`;
    const data = await (await fetch(url)).json();
    return data;
  } catch (error) { throw error.message; }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// fetchProducts();
