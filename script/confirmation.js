document.addEventListener("DOMContentLoaded", function() {
    
    
    let cart = JSON.parse(localStorage.getItem("cart"))
    let cartAmount = JSON.parse(localStorage.getItem("cartAmount"))
    const userInfo = JSON.parse(localStorage.getItem("orderInfo"));
    const cartSumTotal = sessionStorage.getItem("totalCost");
    
    
    const orderNumber = Math.floor(100000 + Math.random() * 900000) + "SE";
    const orderDate = new Date().toLocaleDateString('sv-SE');
    const inCart = document.getElementById("product-display");
    
    
    if (userInfo) {
        document.getElementById('customer-name').textContent = userInfo.firstname + " " + userInfo.lastname;
        document.getElementById('customer-email').textContent = userInfo.email;
        document.getElementById('customer-phone').textContent = userInfo.phone;
        document.getElementById('customer-address').innerHTML = `
            ${userInfo.firstname} ${userInfo.lastname}<br>
            ${userInfo.street}<br>
            ${userInfo.zipcode} ${userInfo.city}
        `;
    }
    
    
    if (cart) {
        if (cart.length > 0) {
            cart.forEach(element => {
                let productSum = (element.price * cartAmount[element.id]).toFixed(2)
                
                inCart.innerHTML += `<div class="product-card-form">
                                    <img src="${element.image}" alt="${element.title}">
                                    <h3>${element.title}</h3>
                                    <p class="product-price-form">$${element.price}</p>
                                    <h3>Antal: ${cartAmount[element.id]}</h3>
                                    <h3>Summa: $${productSum}</h3>
                                    </div>`;
                });
                
                
            }
        
    }
    
    
    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('order-date').textContent = orderDate;
    document.getElementById('order-total').textContent = `$${cartSumTotal}`;
    
    
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    document.getElementById('delivery-date').textContent = deliveryDate.toLocaleDateString('sv-SE');


    localStorage.removeItem("cart");
    localStorage.removeItem("cartAmount");
    sessionStorage.removeItem("totalCost");
});