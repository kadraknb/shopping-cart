// const fetch = require('node-fetch');

let res;
const fetchProducts = async (QUERY) => {
  const pc = 'computador';
  try {
    if (!QUERY) { throw new Error('parametro nao definido '); }
    // const url = `https://api.mercadolibre.com/sites/MLB/search?q=${parA}`;
    const ENDPOINTS = `https://api.mercadolibre.com/sites/MLB/search?q=${pc}`;
    // const results = await (await fetch(ENDPOINTS)).json();
    const base = await fetch(ENDPOINTS);
    const dado = await base.json();

    // console.log(results.results[0]);
    // return results.results;
    res = dado.results;
    // const { id, title, thumbnail } = dado.results[0];
    // console.log(id);
    return res;
  } catch (error) { throw error.message; }
};

// console.log(fetchProducts('computador'));


// fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
