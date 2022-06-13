const getSavedCartItems = (ml) => localStorage.getItem(ml);

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
