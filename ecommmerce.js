//   const cartIcon = document.querySelector('.carticon');
//   const cartDropdown = document.getElementById('cartDropdown');
//   const cartItemsContainer = document.querySelector('.cart-items');
//   const totalAmountDisplay = document.getElementById('totalAmount');
//   const quantityButtons = document.querySelectorAll('.quantity');
//   const cartCounter = document.createElement('span');

//   let cart = [];
//   let globalCartCount = 0;

//   // Add a badge to the cart icon
//   cartCounter.style.background = 'red';
//   cartCounter.style.color = 'white';
//   cartCounter.style.padding = '2px 6px';
//   cartCounter.style.borderRadius = '50%';
//   cartCounter.style.fontSize = '0.75rem';
//   cartCounter.style.position = 'absolute';
//   cartCounter.style.top = '0';
//   cartCounter.style.right = '0';
//   cartCounter.innerText = '0';
//   cartIcon.style.position = 'relative';
//   cartIcon.appendChild(cartCounter);

//   // Toggle dropdown
//   cartIcon.addEventListener('click', () => {
//     cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
//   });

//   // Setup quantity buttons
//   document.querySelectorAll('.product').forEach(product => {
//     const quantityDisplay = product.querySelector('.quantity span');
//     const minusBtn = product.querySelector('.quantity button:first-child');
//     const plusBtn = product.querySelector('.quantity button:last-child');
//     const addToCartBtn = product.querySelector('.add-to-cart');
//     let quantity = 0;

//     plusBtn.addEventListener('click', () => {
//       quantity++;
//       quantityDisplay.textContent = quantity;
//     });

//     minusBtn.addEventListener('click', () => {
//       if (quantity > 0) {
//         quantity--;
//         quantityDisplay.textContent = quantity;
//       }
//     });

//     addToCartBtn.addEventListener('click', () => {
//       if (quantity === 0) return;

//       const title = product.querySelector('.product-details h1').textContent;
//       const priceText = product.querySelector('.new-price').textContent.replace('$', '');
//       const price = parseFloat(priceText);

//       const existingItem = cart.find(item => item.title === title);

//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         cart.push({ title, price, quantity });
//       }

//       globalCartCount += quantity;
//       cartCounter.innerText = globalCartCount;

//       renderCartItems();
//       quantity = 0;
//       quantityDisplay.textContent = '0';
//     });
//   });

//   function renderCartItems() {
//     cartItemsContainer.innerHTML = '';
//     let total = 0;

//     cart.forEach(item => {
//       const itemEl = document.createElement('div');
//       itemEl.style.marginBottom = '10px';
//       itemEl.innerHTML = `
//         <div><strong>${item.title}</strong></div>
//         <div>${item.quantity} × $${item.price.toFixed(2)}</div>
//       `;
//       cartItemsContainer.appendChild(itemEl);
//       total += item.quantity * item.price;
//     });

//     totalAmountDisplay.textContent = total.toFixed(2);
//   }

document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".carticon");
    const cartDropdown = document.getElementById("cartDropdown");
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    let cart = [];

    // Toggle dropdown
    cartIcon.addEventListener("click", () => {
        cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
        updateCartUI();
    });

    // Handle quantity controls
    document.querySelectorAll(".product").forEach((product, index) => {
        const minusBtn = product.querySelector(".quantity button:first-child");
        const plusBtn = product.querySelector(".quantity button:last-child");
        const qtySpan = product.querySelector(".quantity span");
        const addToCartBtn = product.querySelector(".add-to-cart");

        let quantity = 0;

        minusBtn.addEventListener("click", () => {
            if (quantity > 0) {
                quantity--;
                qtySpan.textContent = quantity;
            }
        });

        plusBtn.addEventListener("click", () => {
            quantity++;
            qtySpan.textContent = quantity;
        });

        addToCartBtn.addEventListener("click", () => {
            if (quantity > 0) {
                const title = product.querySelector("h1").textContent;
                const price = parseFloat(product.querySelector(".new-price").textContent.replace('$', ''));

                const existing = cart.find(item => item.title === title);
                if (existing) {
                    existing.quantity += quantity;
                } else {
                    cart.push({ title, quantity, price });
                }

                quantity = 0;
                qtySpan.textContent = "0";
                updateCartUI();
            }
        });
    });

    function updateCartUI() {
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update dropdown
        cartItemsContainer.innerHTML = "";
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartTotal.textContent = "";
            return;
        }

        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <span>${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">Delete</button>
            `;
            cartItemsContainer.appendChild(div);
        });

        const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
        cartTotal.textContent = `Estimated Total: $${total.toFixed(2)}`;
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    }
});
document.addEventListener 
