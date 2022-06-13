const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('se o localStorage.setItem esta foi chamado', () => {
  expect.assertions(1);
  getSavedCartItems('getItem');
  expect(localStorage.getItem).toBeCalled();
});
it('se o localStorage.setItem esta foi chamado', () => {
  expect.assertions(1);
  getSavedCartItems();
  expect(localStorage.getItem).toBeCalled();
});
});
