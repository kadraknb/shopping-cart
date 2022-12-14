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
const createProductItemElement = (sku, name, image, salePrice) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${(salePrice).toFixed(2)}`))
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const createCartItemElement = (sku, name, salePrice, secure_thumbnail) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.appendChild(createCustomElement('button', 'item__remov', 'X'));
  li.appendChild(createProductImageElement(secure_thumbnail));
  li.appendChild(createCustomElement('span', 'item__title', name));
  li.appendChild(createCustomElement('span', 'item__title', `R$${salePrice}`));
  return li;
};
const listaItems = async () => {
  const get = await fetchProducts('computer');
  get.forEach((aa) => {
    const { id, title, thumbnail, price } = aa;
    item.appendChild(createProductItemElement(id, title, thumbnail, price));
  });
};
const awaitList = async () => {
  await listaItems();
  document.querySelector('.loading').remove();
};
const totalPrice = (price) => {
  total += parseFloat(price.toPrecision(6));
  console.log(document.querySelector('.total-price'));
  document.querySelector('.total-price').innerText = total;
};
const addCarinho = () => {
  item.addEventListener('click', async (event) => {
    if (event.target.className === 'item__add') {
      const idM = event.target.parentNode.querySelector('.item__sku').innerText;
      const { id, title, price, secure_thumbnail } = await fetchItem(idM);
      const s = await fetchItem(idM);
      console.log(s);
      cart.appendChild(createCartItemElement(id, title, price, secure_thumbnail));
      saveCartItems(id);
      totalPrice(price);
    }
  });
};
const cartSave = () => {
  Object.values(localStorage).filter((aa) => aa.startsWith('MLB')).forEach(async (idMLB) => {
    const { id, title, price, secure_thumbnail } = await fetchItem(idMLB);
    cart.appendChild(createCartItemElement(id, title, price, secure_thumbnail));
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
