const taxRate = 0.18;

// ürünlerin olduğu div i yakalıyoruz.
const productsDiv = document.querySelector(".products");
//Capturing
productsDiv.addEventListener("click", (event) => {
  if (event.target.className == "fa-solid fa-minus") {
    if (event.target.parentElement.querySelector(".Miktar").innerText > 0) {
      event.target.parentElement.querySelector(".Miktar").innerText--;
      calculateProductPrice(event.target);
      calculateCartPrice();
    } else {
      if (
        confirm(
          `${
            event.target.parentElement.parentElement.querySelector("h2")
              .innerText
          } will be deleted!!!`
        )
      ) {
        //remove
        event.target.parentElement.parentElement.parentElement.remove();
        calculateCartPrice();
      }
    }
  } else if (event.target.classList.contains("fa-plus")) {
    event.target.previousElementSibling.innerText++;
    calculateProductPrice(event.target);
    calculateCartPrice();
  } else if (event.target.className == "remove-product") {
    //console.log("remove btn is clicked!");
    event.target.parentElement.parentElement.parentElement.remove();
    calculateCartPrice();
  } else {
    //console.log("other element is clicked!");
  }
});

// herbir ürün kartının kendi içinde toplamı ve miktarı
const calculateProductPrice = (btn) => {
  const productInfoDiv = btn.parentElement.parentElement;
  //console.log(productInfoDiv);
  const price = productInfoDiv.querySelector(".Fiyat strong").innerText;
  const quantity = productInfoDiv.querySelector(".Miktar").innerText;

  const productTotalDiv = productInfoDiv.querySelector(".product-line-price");
  productTotalDiv.innerText = `   ${price * quantity} `;
};

const calculateCartPrice = () => {
  const produtsTotalPricesDivs = document.querySelectorAll(
    ".product-line-price"
  );
  let subtotal = 0;
  produtsTotalPricesDivs.forEach((div) => {
    
    subtotal += parseFloat(div.innerText);
  });

  // Ara toplamı yakaladık
  document.querySelector("#cart-subtotal").lastElementChild.innerText =
    subtotal;

  const taxPrice = subtotal * taxRate;
  document.querySelector("#cart-tax p:nth-child(2)").innerText = taxPrice;
  document.querySelector("#cart-total").lastElementChild.innerText =
    subtotal + taxPrice;
};


