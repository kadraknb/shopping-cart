const saveCartItems = (mll) => {
  localStorage.setItem(mll, mll);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
