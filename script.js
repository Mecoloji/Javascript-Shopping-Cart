// ! ===== Open & Close Cart =====

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// * Start when the document is ready

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// ! ===== Start =====

function start() {
  addEvents();
}

// ! ===== Update & Rerender =====

function update() {
  addEvents();
  updateTotal();
}

// ! ===== Add Events =====

function addEvents() {
  // * Remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  // console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // * Change item quantity
  let cartQuantity_input = document.querySelectorAll(".cart-quantity");
  cartQuantity_input.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // * Add item to cart
  let addCart_btn = document.querySelectorAll(".add-cart");
  addCart_btn.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // * Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

// ! ===== Handle Event Function =====

let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  // console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // * handle item is already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // * Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);

  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There is No Order to Place Yet! \nPlease Make an Order first.");
    return;
  }
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Your Order is Placed Successfully");
  itemsAdded = [];

  update();
}

// ! ===== Update & Rerender Functions =====

function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });
  total = total.toFixed(2);

  totalElement.innerHTML = "$" + total;
}

// ! ===== Html Components =====
function CartBoxComponent(title, price, imgSrc) {
  return `
  <div class="cart-box">
  <img src=${imgSrc} alt="" class="cart-img" />
  <div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1" class="cart-quantity" />
  </div>
  <!-- ===== Remove Cart ===== -->
  <i class="bx bxs-trash-alt cart-remove"></i>
  </div>`;
}

// ! ===== Shop Search Filter Start =====

const search = () => {
  const searchBox = document.getElementById("search-item").value.toUpperCase();
  const storeItems = document.getElementById("product-list");
  const product = document.querySelectorAll(".product-box");
  const productName = storeItems.getElementsByTagName("h2");

  for (let i = 0; i < productName.length; i++) {
    let match = product[i].getElementsByTagName("h2")[0];

    if (match) {
      let textValue = match.textContent || match.innerHTML;

      if (textValue.toUpperCase().indexOf(searchBox) > -1) {
        product[i].style.display = "";
      } else {
        product[i].style.display = "none";
      }
    }
  }
};

// ! ===== Shop Search Filter End =====

// ! ===== Copyright Date Start =====
document.getElementById("copyright-date").innerHTML = new Date().getFullYear();
// ! ===== Copyright Date End =====


