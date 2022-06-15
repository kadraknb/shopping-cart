const cart = document.querySelector('.cart__items');
const item = document.querySelector('.items');
let total = 0;

const addLoad = () => {
  const span = item.appendChild(document.createElement('span'));
  span.className = 'loading';
  span.innerText = 'carregando...';
};
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

const createCartItemElement = (sku, name, salePrice) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
};
const listaItems = async () => {
  const seie = await fetchProducts('computer');
  seie.forEach((aa) => {
    const { id, title, thumbnail } = aa;
    item.appendChild(createProductItemElement(id, title, thumbnail));
  });
};
const awaitList = async () => {
  await listaItems();
  document.querySelector('.loading').remove();
};
const totalPrice = (price) => {
  total += parseFloat(price.toPrecision(6));
  document.querySelector('.total-price').innerText = total;
};
const addCarinho = () => {
  item.addEventListener('click', async (event) => {
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
addLoad();

window.onload = () => {
  awaitList();
  cartSave();
  addCarinho();
  removCart();
  limpaCart();
};
