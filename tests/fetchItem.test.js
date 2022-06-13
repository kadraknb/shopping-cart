require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('se e uma funcao', () => {
    const actual = fetchItem;
    const expected = 'function';
    expect(typeof actual).toBe(expected);
  });
  it('se o fetch esta foi chamado', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  it('teste se fetch foi chamada utilisando endpoint', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('se o retorno do fetchTtem e === a item', async () => {
    expect.assertions(1);
    const data = await fetchItem('MLB1615760527');
    expect(data).toEqual(item);
  });
  it('se da erro se nao estiver parametro ', async () => {
    try { await fetchItem();
    } catch (error) { expect(error).toEqual('You must provide an url'); }
  });
});
