require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  /* it( '',() => {
    const actual = ;
    const expected = ;

    expect(actual).(expected);

  }); */
   it( 'fetchProducts é uma função',() => {
    const actual = fetchProducts;
    const expected = 'function';
    expect(typeof actual).toMatch(expected);
  });
  it( 'teste se fetch foi chamada', async () => {
    expect.assertions(1)
    await fetchProducts('computador')
    expect(fetch).toBeCalled();
  });
  it( 'teste se fetch foi chamada utilisando endpoint',async () => {
   const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
     expect.assertions(1)
     await fetchProducts('computador');
     expect(fetch).toHaveBeenCalledWith(endpoint);
   });
  it( 'fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch',async () => {
    expect.assertions(1)
    const data = await fetchProducts('computador')
    expect(typeof data).toEqual(typeof computadorSearch);
  }); 
  it( 'se da erro se nao estiver parametro ',async () => {
    try { await fetchProducts();
      } catch (error) { expect(error).toEqual('parametro nao definido '); }
  });
});
