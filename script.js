var cartValue = document.getElementById("cartValue");
var cart = document.getElementById("cartItems");
var placeOrder = document.getElementById("placeOrder");
var addItemButtons = document.getElementsByClassName("button");
var crossButton = document.getElementById("crossButton");
var totalPrice = document.getElementById("totalPrice");
var cartList = document.getElementById("cart");
var items = [
  {
    name: "This was our pact",
    subTitle: "Ryan Andrews",
    imgSrc: "book1.png",
    quantity: 0,
    dollars: 7,
    cents: 49,
  },
  {
    name: "The famous five",
    subTitle: "Guid Blyton",
    imgSrc: "book2.png",
    quantity: 0,
    dollars: 4,
    cents: 59,
  },
  {
    name: "Matilda",
    subTitle: "Roald Dahl",
    imgSrc: "book3.png",
    quantity: 0,
    dollars: 6,
    cents: 80,
  },
  {
    name: "Harry Potter",
    subTitle: "Roald Dahl",
    imgSrc: "book4.png",
    quantity: 0,
    dollars: 10,
    cents: 0,
  },
  {
    name: "For Young Readers",
    subTitle: "Ruskin Bound",
    imgSrc: "book5.png",
    quantity: 0,
    dollars: 7,
    cents: 29,
  },
  {
    name: "Wimpy Kid - DIY",
    subTitle: "Jeff Kinney",
    imgSrc: "book6.png",
    quantity: 0,
    dollars: 4,
    cents: 99,
  },
  {
    name: "Dart Board",
    subTitle: "Wooden board, 16 inches",
    imgSrc: "dart-board.png",
    quantity: 0,
    dollars: 17,
    cents: 49,
  },
  {
    name: "Connect Four",
    subTitle: "Board game, multiplayer",
    imgSrc: "connect-four.png",
    quantity: 0,
    dollars: 19,
    cents: 99,
  },
  {
    name: "Jenga",
    subTitle: "Wooden blocks, 54 pieces",
    imgSrc: "jenga.png",
    quantity: 0,
    dollars: 20,
    cents: 99,
  },
  {
    name: "Monopoly",
    subTitle: "1.61 x 15.75 x 10.51 inches",
    imgSrc: "monopoly.png",
    quantity: 0,
    dollars: 19,
    cents: 49,
  },
  {
    name: "Bookmarks",
    subTitle: "Handmade with love",
    imgSrc: "bookmarks.png",
    quantity: 0,
    dollars: 12,
    cents: 49,
  },
  {
    name: "Birthday Card",
    subTitle: "Handmade with love",
    imgSrc: "birthday-card.png",
    quantity: 0,
    dollars: 19,
    cents: 99,
  },
  {
    name: "Stuffed toys",
    subTitle: "Handmade with love",
    imgSrc: "stuffed-toy.png",
    quantity: 0,
    dollars: 15,
    cents: 99,
  },
  {
    name: "Dream catcher drawing",
    subTitle: "Handmade with love",
    imgSrc: "dream-catcher.png",
    quantity: 0,
    dollars: 18,
    cents: 49,
  },
];

function updateCart(itemIndex) {
  let cart = 0;
  for (let i = 0; i < items.length; i++) {
    cart += items[i].quantity;
  }
  cartValue.innerHTML = cart;
}

function addCartList(itemIndex) {
  if(items[itemIndex].quantity == 1){
    cartList.innerHTML += `
      <div class="cartOuterContainer">
        <div class="cartContainer">
          <img src="./assets/${items[itemIndex].imgSrc}" alt="" class="cartImg" />
          <h3><span class="itemName">${items[itemIndex].name}</span></h3>
          <h4><span class="author">${items[itemIndex].subTitle}</span></h4>
          <h3>Quantity: <span class="quantity" id="quantity${itemIndex}">1</span></h3>
        </div>
      </div>
    `;
  }
  else{
    document.getElementById(`quantity${itemIndex}`).innerHTML = items[itemIndex].quantity;
  }
}
var total$ = 0;
var totalCents = 0;

function updatePrice() {
  let priceInCents = 0;

  for (let i = 0; i < items.length; i++) {
    priceInCents += items[i].quantity * (items[i].dollars * 100 + items[i].cents);
  }
  total$ = Math.floor(priceInCents / 100);
  totalCents = priceInCents % 100;
  totalPrice.innerText = total$+"."+totalCents;
}

for (let i = 0; i < addItemButtons.length; i++) {
  addItemButtons[i].addEventListener('click', (e) => {
    items[i].quantity++;
    addCartList(i);
    updateCart();
  });
}

cart.addEventListener('click', () => {
  updatePrice();
  document.getElementById("cartDiv").style.display = "block";
});

crossButton.addEventListener('click', () => {
  document.getElementById("cartDiv").style.display = "none";
});

let link='https://api.whatsapp.com/send?phone=9317524556&text=Order%20Details%20:';

// %0A
// %20

function updateWhatsAppLink(){
  for(let index = 0; index < items.length; index++){
    if(items[index].quantity != 0){
      link += "%0A" + items[index].name + "%20: " + items[index].quantity;
    }
  }
  link += "%0A" + "Total%20price:%20$" + total$ + ".%20" + totalCents;
}

placeOrder.addEventListener('click', () => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].quantity != 0) {
      console.log("Item name: " + items[i].name + "\nQuantity: " + items[i].quantity);
    }
  }
  console.log("The total amount is " + total$ + "$ and " + totalCents + " cents");
  updateWhatsAppLink();
  console.log(link);
  window.open(link,"_blank");
});//