const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('se o localStorage.setItem esta foi chamado', () => {
    expect.assertions(1);
    saveCartItems('MLB1615760527');
    expect(localStorage.setItem).toBeCalled();
  });
});
