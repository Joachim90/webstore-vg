document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("order-form");

    const submitBtn = document.getElementById("submit-btn");
    const clearBtn = document.getElementById("clear-cart-btn");

    
    clearBtn.addEventListener("click", function(){
        console.log("hej");
        cart = [];
        renderCart();
        localStorage.clear();
    })

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartAmount = JSON.parse(localStorage.getItem("cartAmount")) || {};

    const inCart = document.getElementById("in-cart");

    renderCart();
    function renderCart(){
    if (cart.length > 0) {
        cart.forEach(element => {
            inCart.innerHTML += `<div class="product-card-form">
                                <img src="${element.image}" alt="${element.title}">
                                <h3>${element.title}</h3>
                                <p class="product-price-form">$${element.price}</p>
                                <h3>Antal: <button class="btn btn-outline-secondary quantity-btn" onclick="changeQuantity(element.id, -1)"><</button>${cartAmount[element.id]}<button class="btn btn-outline-secondary quantity-btn" onclick="changeQuantity(element.id, 1)">></button> </h3>
                                <h3>$${element.price * cartAmount[element.id]}</h3>
                                </div>`;
            });
        
        }else{
            inCart.innerHTML = "<p>Varukorgen är tom</p>"
        }
    }


    function changeQuantity(productId, change){
        

    }



    if (form) {
        document.getElementById('form-zipcode').addEventListener("change", function () {
            this.value = this.value.replace(" ", "");
        });
    }
 
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const userInfo = {
                firstname: document.getElementById("form-firstname")?.value,
                lastname: document.getElementById("form-lastname")?.value,
                email: document.getElementById("form-email")?.value,
                phone: document.getElementById("form-phone")?.value,
                street: document.getElementById("form-street")?.value,
                zipcode: document.getElementById("form-zipcode")?.value,
                city: document.getElementById("form-city")?.value
            };

            let isValid = true;

            if (userInfo.firstname.length < 2 || userInfo.firstname.length > 50) {
                alert("Förnamn måste vara mellan 2 och 50 tecken.");
                isValid = false;
            }

            if (userInfo.lastname.length < 2 || userInfo.lastname.length > 50) {
                alert("Efternamn måste vara mellan 2 och 50 tecken.");
                isValid = false;
            }

            if (userInfo.email.length < 2 || userInfo.email.length > 50 || !userInfo.email.includes("@")) {
                alert("E-post måste vara mellan 2 och 50 tecken och innehålla '@'.");
                isValid = false;
            }

            const phonePattern = /^[0-9]{10}$/;
            if (!phonePattern.test(userInfo.phone)) {
                alert("Telefonnummer måste vara 10 siffror (exempel: 0701234567).");
                isValid = false;
            }

            if (userInfo.street.length < 2 || userInfo.street.length > 50) {
                alert("Gatuadress måste vara mellan 2 och 50 tecken.");
                isValid = false;
            }

            const zipPattern = /^[0-9]{5}$/;
            if (!zipPattern.test(userInfo.zipcode)) {
                alert("Postnummer måste vara exakt 5 siffror.");
                isValid = false;
            }

            if (userInfo.city.length < 2 || userInfo.city.length > 50) {
                alert("Ort måste vara mellan 2 och 50 tecken.");
                isValid = false;
            }


            if (isValid) {
                localStorage.setItem("orderInfo", JSON.stringify(userInfo));

                const product = JSON.parse(localStorage.getItem("selectedProduct"));
                localStorage.setItem("orderProduct", JSON.stringify(product));

                window.location.href = "confirmation.html";
            } else {
                alert("Vänligen fyll i alla fält korrekt!");
            }
        });
    }
});