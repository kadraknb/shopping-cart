// const { fetchProducts } = require('./helpers/fetchProducts');

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
  // console.log(sku);
  // console.log(name);
  // console.log(image);

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
 console.log(getSkuFromProductItem(event)); 
};
// const createCartItemElement = ({ sku, name, salePrice }) => {

const createCartItemElement = (sku, name, salePrice) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  
  return li;
};
const listaItems = async () => {
  const seie = await fetchProducts('computer');
  seie.forEach((aa) => {
    const { id, title, thumbnail } = aa;
    document.querySelector('.items').appendChild(createProductItemElement(id, title, thumbnail));
  });
};
const addCarinho = () => {
  document.querySelector('.items').addEventListener('click', async (event) => {
    if (event.target.className === 'item__add') {
      const idM = event.target.parentNode.querySelector('.item__sku').innerText;
      const { id, title, price } = await fetchItem(idM);
      document.querySelector('.cart__items').appendChild(createCartItemElement(id, title, price));
    }
  });
};
// const removCart = () => { };
document.querySelector('.cart').addEventListener('click', (event) => {
  // console.log(event.target.parentNode);
  event.target.remove(event);
});
// listaItems();
// addCarinho();
// removCart();
window.onload = () => { listaItems(); addCarinho(); };
