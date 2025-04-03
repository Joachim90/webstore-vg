document.addEventListener("DOMContentLoaded", function () {
    const categories = {
        "men's clothing": "man-produkter",
        "women's clothing": "kvinnor-produkter",
        "jewelery": "smycken-produkter",
        "electronics": "elektronik-produkter"
    };

    

    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const category = product.category;
                const containerId = categories[category];

                if (containerId) {
                    const container = document.getElementById(containerId);
                    if (container) {
                        const productCard = document.createElement("div");
                        productCard.classList.add("product-card");
                        
                        const img = document.createElement("img");
                        img.src = product.image;
                        img.alt = product.title;
                        productCard.appendChild(img);

                        const title = document.createElement("h3");
                        title.textContent = product.title;
                        productCard.appendChild(title)

                        const price = document.createElement("p");
                        price.textContent = `$${product.price}`;
                        price.classList.add("product-price");
                        productCard.appendChild(price);

                        const buyButton = document.createElement("button");
                        buyButton.textContent = "Lägg till";
                        buyButton.classList.add("buy-button");
                        buyButton.onclick = (e) => {
                            e.stopPropagation();
                            addToCart(product);

                            let cartIcon = document.getElementById("cart-icon"); 
                            
                            cartIcon.style.transform = "scale(1.7)";
                            cartIcon.style.backgroundColor = "rgb(117, 148, 196)";
                            cartIcon.style.transition = "transform 0.3s ease-in-out, background-color 0.3s ease-in-out";

                            setTimeout(() => {
                                cartIcon.style.transform = "scale(1)";
                                cartIcon.style.backgroundColor = "";
                            }, 200);
                        };

                        productCard.appendChild(buyButton);
                        container.appendChild(productCard);
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});

let cartAmount = JSON.parse(localStorage.getItem("cartAmount")) || {};
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
    
    if (cartAmount[product.id]) {
        cartAmount[product.id] += 1;
    } else {
        cartAmount[product.id] = 1;
        cart.push(product);

    }
    localStorage.setItem("cartAmount", JSON.stringify(cartAmount));
    localStorage.setItem("cart", JSON.stringify(cart));
}