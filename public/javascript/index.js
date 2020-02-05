import { getProducts } from "./modules/getProducts.js";
import { addToCart } from "./modules/addProducts.js";
import { getShoppingCart } from "./modules/getShoppingCart.js";

const productSection = document.querySelector(".products");
const popupModal = document.querySelector(".popup__modal");

let createProductCards = async () => {
  let cartItems = await getShoppingCart();
  let products = await getProducts();
  for (let product of products) {
    let productCard = document.createElement("article");
    let productImage = document.createElement("img");
    let productInfo = document.createElement("div");
    let imageLogo = document.createElement("div");
    let logo = document.createElement("img");
    let productTitle = document.createElement("h2");
    let description = document.createElement("p");
    let size = document.createElement("p");
    let price = document.createElement("p");
    let addProductBtn = document.createElement("button");
    let sizeArray = product.size;
    let selectedSize = "";
    let skiSizeElem = "";

    productCard.classList.add("product");
    productImage.classList.add("product__image");
    productInfo.classList.add("product__info");
    logo.classList.add("product__logo");
    productTitle.classList.add("product__title");
    description.classList.add("product__description");
    size.classList.add("product__size");
    addProductBtn.classList.add("product__btn");
    price.classList.add("product__price");
    imageLogo.classList.add("logo__image");

    productImage.src = product.image;
    logo.src = product.brand;

    productSection.append(productCard);
    productCard.append(imageLogo, productInfo);
    imageLogo.append(logo, productImage);
    productInfo.append(productTitle, description, size, price, addProductBtn);

    productTitle.innerHTML = product.name;
    price.innerHTML = "Price : " + product.price + "$";
    description.innerHTML = product.description;
    addProductBtn.innerHTML = "Add to basket";
    size.innerHTML = "Size:";

    addProductBtn.type = "button";

    for (let i = 0; i < sizeArray.length; i++) {
      let inputContainer = document.createElement("div");
      inputContainer.classList.add("input__container");
      size.append(inputContainer);
      skiSizeElem = document.createElement("input");
      skiSizeElem.type = "radio";
      skiSizeElem.id = "id" + product.id + "_" + sizeArray[i];
      skiSizeElem.name = "product_size" + product.id;
      skiSizeElem.value = sizeArray[i];

      let skiSizeElemLabel = document.createElement("label");
      skiSizeElemLabel.setAttribute(
        "for",
        "id" + product.id + "_" + sizeArray[i]
      );
      skiSizeElemLabel.innerHTML = sizeArray[i] + "cm";

      if (cartItems) {
        let checkSize = cartItems.find(cartItem => {
          return cartItem.id == product.id && cartItem.size == sizeArray[i];
        });

        if (checkSize) {
          skiSizeElem.disabled = true;
          skiSizeElemLabel.style.color = "red";
        }
      }

      inputContainer.append(skiSizeElem);
      inputContainer.append(skiSizeElemLabel);
    }

    addProductBtn.addEventListener("click", async () => {
      let selectedSize = document.querySelector(
        'input[name="product_size' + product.id + '"]:checked'
      );
      if (selectedSize == null) {
        popupModal.style.display = "block";
        popupModal.innerHTML = "Hey, It is okay! but pls choose a size.";
        productSection.style.filter = "blur(10px)";
        setTimeout(() => {
          productSection.style.filter = "";
          popupModal.style.display = "none";
        }, 2000);

        return;
      }
      let result = await addToCart(product.id, selectedSize.value);
      popupModal.innerHTML = "";
      if (result.status === "success") {
        popupModal.style.display = "block";
        productSection.style.filter = "blur(10px)";
        setTimeout(() => {
          productSection.style.filter = "";
          popupModal.style.display = "none";
        }, 3000);

        let modalTitle = document.createElement("h4");
        let nameElem = document.createElement("p");
        let priceElem = document.createElement("p");
        let SizeElem = document.createElement("p");
        let imgElem = document.createElement("img");

        modalTitle.classList.add("modal__title");
        nameElem.classList.add("modal__name");
        priceElem.classList.add("modal__price");
        SizeElem.classList.add("modal__size");

        imgElem.classList.add("modal__image");

        modalTitle.innerHTML = "Product added to the cart";
        nameElem.innerHTML = "name: " + result.data.name;
        priceElem.innerHTML = "price: " + result.data.price + "$";
        SizeElem.innerHTML = "size: " + result.data.size + "cm";
        imgElem.src = result.data.image;

        popupModal.append(modalTitle, nameElem, priceElem, SizeElem, imgElem);

        let selectedLabel = document.querySelector(
          'label[for="' + selectedSize.id + '"]'
        );

        selectedLabel.style.color = "red";
        selectedSize.disabled = true;
        selectedSize.checked = false;
      }
    });
  }
};

createProductCards();
