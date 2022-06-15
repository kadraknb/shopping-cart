const saveCartItems = (ml) => {
  localStorage.setItem(ml, ml);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
