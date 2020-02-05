import { getShoppingCart } from "./modules/getShoppingCart.js";
import { removeProducts } from "./modules/removeProducts.js";

const shoppingCart = document.querySelector(".shoppingcart");
const cartTitle = document.querySelector(".cart__title");
const shopBtn = document.querySelector(".btn_cart");

let createShoppingCartCards = async () => {
  let cartItems = await getShoppingCart();
  if (cartItems == undefined) {
    cartTitle.innerHTML =
      "You have no products in the shoppingcart so get back and start shopping!";
  } else {
    shopBtn.innerHTML = "Shop some more";
    for (let cartItem of cartItems) {
      let cartCard = document.createElement("div");
      let cartItemImage = document.createElement("img");
      let cartItemTitle = document.createElement("p");
      let cartItemSize = document.createElement("p");
      let removeCartItem = document.createElement("button");
      let cartItemPrize = document.createElement("p");

      cartCard.classList.add("shoppingcart__item");
      removeCartItem.classList.add("product__btn");
      cartItemTitle.classList.add("item__title");
      cartItemImage.classList.add("item__image");
      cartItemImage.src = cartItem.image;
      cartItemTitle.innerHTML = cartItem.name;
      cartItemSize.classList.add(
        cartItem.id + "_" + cartItem.size,
        "product__size"
      );
      cartItemSize.innerHTML = cartItem.size + "cm";
      cartItemPrize.classList.add("item__price");
      cartItemPrize.innerHTML = cartItem.price + "$";
      removeCartItem.innerHTML = "Remove";

      removeCartItem.addEventListener("click", async () => {
        let result = await removeProducts(cartItem.id, cartItem.size);
        console.log(result);
        if (result.status === "success") {
          cartCard.remove();
        }
      });

      shoppingCart.append(cartCard);
      cartCard.append(
        cartItemImage,
        cartItemTitle,
        cartItemSize,
        cartItemPrize,
        removeCartItem
      );
    }
  }
};

createShoppingCartCards();
