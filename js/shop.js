// iniatial vars
let cartList = [];
let cart = [];
let total = 0;
let cartbutton = document.getElementById("cartfixed");
let nav = document.getElementById("navbar-example2")
let heightheader = document.getElementById('carouselExampleSlidesOnly'). offsetHeight;
let title = "";

//onscroll function to nav and cart appears
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > heightheader || document.documentElement.scrollTop > heightheader) {
        cartbutton.style.display = "block";
        nav.style.display = "none";
    } else {
        cartbutton.style.display = "none";
        nav.style.display = "block";
    }
}


// Exercise 1
function buy(id) {
    cartList.push(products.find(ide => {
        return ide.id == id
    }));

    calculateTotal();
    generateCart();
    printCart();
    product_modal();
}

// Exercise 2
function cleanCart() {
    if (cartList.length !== 0) {
        cartList = [];
        cart = [];

        generateCart();
        all_products_removed();
        open_modal();
    }
    else{
        empty_cart();
    }
   
}

// Exercise 3
function calculateTotal() {
    let totalN = 0;
    for (let i = 0; i < cartList.length; i++) {
        totalN += cartList[i].price;
    }
    total = totalN.toFixed(2);

    let totalQuantity = 0;
    cart.map(q => {
        totalQuantity += q.quantity;
    });
    

}

// Exercise 4
function generateCart() {

    cart = []
    cartList.map(p => {
        cart[p.id] ? cart[p.id].quantity += 1 : cart[p.id] = {
            ...p,
            quantity: 1
        }
    });

    // total in cart
    let totalQuantity = 0;
    cart.map(q => {
        totalQuantity += q.quantity;
    });

    document.getElementById("countercard").innerHTML = totalQuantity;
    document.getElementById("count_product").innerHTML = totalQuantity;

}


// Exercise 5
function applyPromotionsCart() {
    cart.map(p => {
        if (p.offer && p.quantity >= p.offer.number) p.subtotalWithDiscount = (p.price * p.quantity * (100 - p.offer.percent) / 100);
    });
}


function printCart() {
    calculateTotal()
    generateCart()
    applyPromotionsCart()

    let rows = "";
    cart.map(p => {
        rows += `
                <tr>
                <th scope="row"> ${p.name} </th>
                <td>${p.price} </td>
                <td>${p.quantity}</td>
                <td>${p.subtotalWithDiscount ? p.subtotalWithDiscount : p.price * p.quantity}</td>
                <td class="px-3">
                <span class="btn btn-light me-2 px-2 border" onclick="addToCart(${p.id})">+</span>
                <span class="btn btn-light px-2 border" onclick="removeFromCart(${p.id})">-</span>
                </td>
                </tr>
                `
    });

    document.getElementById("cart_list").innerHTML = rows;
    document.getElementById("total_price").innerHTML = total;

}

// function calculateTotalWithDiscount(){
//     let TotalWithDiscount;

//     cart.map(p => {
//         TotalWithDiscount = 
//         `${p.subtotalWithDiscount ? p.subtotalWithDiscount : p.price * p.quantity}`
//     });

//     document.getElementById("total_price_with_discount").innerHTML = total;

// }

// ** Nivell II **

// Exercise 7
function addToCart(id) {
    cartList.push(products.find(ide => {
        return ide.id == id
    }));

    applyPromotionsCart();
    generateCart();
    printCart();
    calculateTotal();
    product_modal();

}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array

    let cartItem;
    const cartItemIndex = cartList.findIndex(element => element.id === id);

    if (cartItemIndex != -1) {
        cartItem = cartList[cartItemIndex];
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            cartList.splice(cartItemIndex, 1);
        }
    }

    calculateTotal();
    applyPromotionsCart();
    generateCart();
    printCart();
    product_modal_remove();
}

function open_modal() {
    printCart();
}


// sweetalert
function product_modal() {
    title = '<p>Product added to cart</p>';
    return swalMaster(title);
}

function product_modal_remove() {
    title = '<p>Product removed from cart</p>';
   return swalMaster(title);
}

function all_products_removed() {
    title = '<p>All products removed from cart</p>';
   return swalMaster(title);
}

function empty_cart() {
    title = '<p>Not possible - Cart is empty</p>';
   return swalMaster(title);
}

function swalMaster(title) {
    Swal.fire({
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 1000,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}