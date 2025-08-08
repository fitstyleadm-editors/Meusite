// Lista de produtos (você pode mudar/adicionar mais)
const products = [
  {
    id: 1,
    name: "Camiseta Azul",
    price: 59.90,
    image: "https://via.placeholder.com/200x150?text=Camiseta+Azul"
  },
  {
    id: 2,
    name: "Tênis Esportivo",
    price: 120.00,
    image: "https://via.placeholder.com/200x150?text=Tênis+Esportivo"
  },
  {
    id: 3,
    name: "Boné Preto",
    price: 39.90,
    image: "https://via.placeholder.com/200x150?text=Boné+Preto"
  }
];

const productsContainer = document.getElementById('products');
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const cartTotalSpan = document.getElementById('cart-total');

let cart = [];

// Função para mostrar produtos na tela
function displayProducts() {
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';

    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Adicionar ao carrinho</button>
    `;

    productsContainer.appendChild(productDiv);
  });
}

// Adicionar item ao carrinho
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  alert(`${product.name} adicionado ao carrinho!`);
}

// Atualiza contagem e total do carrinho
function updateCart() {
  // Atualiza contagem
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCountSpan.textContent = totalItems;

  // Atualiza lista no modal
  cartItemsList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`;
    cartItemsList.appendChild(li);
  });

  // Atualiza total
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartTotalSpan.textContent = totalPrice.toFixed(2);
}

// Mostrar/ocultar modal do carrinho
cartButton.addEventListener('click', () => {
  cartModal.classList.toggle('hidden');
});

closeCartButton.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

// Inicializa a loja
displayProducts();
updateCart();