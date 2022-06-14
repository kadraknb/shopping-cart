// const { fetchProducts } = require('./helpers/fetchProducts');
const cart = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;

  return e;
};

const createProductItemElement = (sku, name, image) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// const cartItemClickListener = (event) => {
// };
const createCartItemElement = (sku, name, salePrice) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.addEventListener('click', cartItemClickListener);
  
  return li;
};
const listaItems = async () => {
  const seie = await fetchProducts('computer');
  seie.forEach((aa) => {
    const { id, title, thumbnail } = aa;
    document.querySelector('.items').appendChild(createProductItemElement(id, title, thumbnail));
  });
};
let total = 0; 
const totalPrice = (price) => {
  total += parseFloat(price.toPrecision(6));
  document.querySelector('.total-price').innerText = total;
};
const addCarinho = () => {
  document.querySelector('.items').addEventListener('click', async (event) => {
    if (event.target.className === 'item__add') {
      const idM = event.target.parentNode.querySelector('.item__sku').innerText;
      const { id, title, price } = await fetchItem(idM);
      cart.appendChild(createCartItemElement(id, title, price));
      saveCartItems(id);
      totalPrice(price);
    }
  });
};
const cartSave = () => {
  Object.values(localStorage).filter((aa) => aa.startsWith('MLB')).forEach(async (idMLB) => {
    const { id, title, price } = await fetchItem(idMLB);
    cart.appendChild(createCartItemElement(id, title, price));
    totalPrice(price);
  });
};
const removCart = () => {
cart.addEventListener('click', async (event) => {
  if (event.target.localName === 'li') {
    event.target.remove(event);
    localStorage.removeItem(event.target.id);
    const { price } = await fetchItem(event.target.id);
    totalPrice(-price);
  }
});
};
const limpaCart = () => {
  document.querySelector('.empty-cart').addEventListener('click', () => {
    while (cart.hasChildNodes()) { cart.removeChild(cart.firstChild); }
    localStorage.clear();
    total = 0;
    totalPrice(0);
  });
};
window.onload = () => {
  cartSave();
  listaItems();
  addCarinho();
  removCart();
  limpaCart();
};
