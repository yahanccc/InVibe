//--------------------------- header ---------------------------

$(function () {
    $('header').css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        'z-index': 1000,
    })

    $(window).resize(function () {
        $('header').css('width', '100%')
    }).scroll(function () {

    })

    $('body').css('padding-top', $('header').outerHeight())
})

//--------------------------- hamburger ---------------------------

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.menu').addEventListener('click', function () {
        this.classList.toggle('active');
        document.querySelector('.dropdown').classList.toggle('active');
    });
})

// --------------------------- the_festival / countdown---------------------------

function updateCountdown() {
    const targetDate = new Date("2025-07-31T23:59:59").getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

document.addEventListener("DOMContentLoaded", function () {
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

//--------------------------- FAQ/accordion ---------------------------

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');

            document.querySelectorAll('.accordion-content').forEach(otherContent => {
                if (otherContent !== content) {
                    otherContent.classList.remove('active');
                    otherContent.previousElementSibling.querySelector('.accordion-icon').classList.remove('active');
                }
            });

            content.classList.toggle('active');
            icon.classList.toggle('active');
        });
    });
});

//--------------------------- artist_main/artist-cards ---------------------------


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.artists').forEach(container => {
        container.addEventListener('click', function () {
            this.querySelector('.artist-cards').classList.toggle('flip');
        });
    });
});


//--------------------------- GSAP for Index ---------------------------

document.addEventListener("DOMContentLoaded", function () {
    gsap.utils.toArray(".section").forEach(section => {
        gsap.fromTo(section,
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

})

//--------------------------- for navigation ---------------------------

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".nav-pages a").forEach(item => {

        if (item.href === window.location.href) {
            item.classList.add("active");
        }

        const currentURL = window.location.href;
        const itemURL = item.href;

        if (itemURL === currentURL || currentURL.includes("shop-")) {
            if (itemURL.includes("shop")) {
                item.classList.add("active");
            }
        }
    });
});

//--------------------------- shop-slider ---------------------------

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById('shop-slider');
    document.querySelector('.slide-left').onclick = () => slider.scrollTo({ left: 0, behavior: 'smooth' });
    document.querySelector('.slide-right').onclick = () => slider.scrollBy({ left: 300, behavior: 'smooth' });


    const leftBtn = document.querySelector('.slide-left');
    const rightBtn = document.querySelector('.slide-right');

    slider.addEventListener('scroll', () => {
        leftBtn.disabled = slider.scrollLeft === 0;
        rightBtn.disabled = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth;
    });

})
//--------------------------- recomm-slider ---------------------------

document.addEventListener("DOMContentLoaded", function () {
    const sliderPlus = document.getElementById('plus-slider');
    document.querySelector('.slidePlus-left').onclick = () => sliderPlus.scrollTo({ left: 0, behavior: 'smooth' });
    document.querySelector('.slidePlus-right').onclick = () => sliderPlus.scrollBy({ left: 200, behavior: 'smooth' });

    const leftBtnPlus = document.querySelector('.slidePlus-left');
    const rightBtnPlus = document.querySelector('.slidePlus-right');

    slider.addEventListener('scroll', () => {
        leftBtnPlus.disabled = sliderPlus.scrollLeft === 0;
        rightBtnPlus.disabled = sliderPlus.scrollLeft + sliderPlus.clientWidth >= sliderPlus.scrollWidth;
    });

})

//--------------------------- cart ---------------------------

document.addEventListener("DOMContentLoaded", function () {

    let iconCart = document.querySelector('.icon-cart');  // 1
    let body = document.querySelector('body');            // 2

    let closeCart = document.querySelector('.close');     // 4

    let listProductHTML = document.querySelector('.listProduct');  // 6 找到網頁上的票券們
    
    let listCartHTML = document.querySelector('.listCart');
    let iconCartSpan = document.querySelector('.icon-cart span');

    let listProducts = [];
    let carts = [];

    iconCart.addEventListener('click', () => {            // 3
        body.classList.toggle('showCart');
    })

    closeCart.addEventListener('click', () => {           // 5
        body.classList.remove('showCart');
    })

    // ----------- ADD PRODUCT TO CART --------------

    const addDataToHTML = () => {                                   // 8
        listProductHTML.innerHTML = '';
        if (listProducts.length > 0) {
            listProducts.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.classList.add('ticket');
                newProduct.dataset.id = product.id;
                newProduct.innerHTML = `
                <h3 class="product-name">${product.name}</h3>
                <p class="ticket-price price ">${product.price}€</p>
                <button class="add-to-cart ticket-btn" id="day1-btn" data-id="1"
                        data-name="Single-Day Pass - August 1, Friday" data-price="120" data-image="img/PageIcon.svg">
                        Add to Cart
                </button>
                `;
                listProductHTML.appendChild(newProduct);
            })
        }
    }

    listProductHTML.addEventListener('click', (event) => {             // 9
        let positionClick = event.target;
        if (positionClick.classList.contains('add-to-cart')) {
            let productID = positionClick.parentElement.dataset.id;

            // let productID = positionClick.dataset.id;
            // let productName = positionClick.dataset.name;
            // let productPrice = positionClick.dataset.price;
            // let productImage = positionClick.dataset.image;
            // let product = {
            //     id: productID,
            //     name: productName,
            //     price: productPrice,
            //     image: productImage
            // }
            // listProducts.push(product);
            // addDataToHTML();

            addToCart(productID)
        }

    })


    const addToCart = (productID) => {
        let positionThisProductInCart = carts.findIndex((value) => value.productID === productID);
        if (carts.length <= 0) {
            carts = [{
                productID: productID,
                quantity: 1
            }]
        } else if (positionThisProductInCart < 0) {
            carts.push({
                productID: productID,
                quantity: 1
            });
        } else {
            carts[positionThisProductInCart].quantity++;

        }
        addCartToHTML();
        addCartToMemory();
    }

    const addCartToMemory = () => {
        localStorage.setItem('carts', JSON.stringify(carts));
    }

    const addCartToHTML = () => {
        listCartHTML.innerHTML = '';

        let totalQuantity = 0;

        if (carts.length > 0) {
            carts.forEach(cart => {
                totalQuantity += cart.quantity

                let newCart = document.createElement('div');
                newCart.classList.add('item');

                newCart.dataset.id = cart.productID

                let positionProduct = listProducts.findIndex((value) => value.id === cart.productID);
                let info = listProducts[positionProduct];

                newCart.innerHTML = `
                 <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    <p>${info.name}</p>
                </div>
                <div class="totalPrice">
                    <p>${cart.quantity * info.price}€</p>
                </div>
                <div class="quantity">
                    <span class="minus">－</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">＋</span>
                </div>
                `;
                listCartHTML.appendChild(newCart);
            })
        }
        iconCartSpan.innerText = totalQuantity

    }

    listCartHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains('minus') || (positionClick.classList.contains('plus'))) {
            let productID = positionClick.parentElement.parentElement.dataset.id;
            let type = 'minus';
            if (positionClick.classList.contains('plus')) {
                type = 'plus';
            }
            changeQuantity(productID, type);
        }
    })

    const changeQuantity = (productID, type) => {
        let positionItemInCart = carts.findIndex((value) => value.productID === productID);
        if (positionItemInCart >= 0) {
            switch (type) {
                case 'plus':
                    carts[positionItemInCart].quantity++;
                    break;

                default:
                    let valueChange = carts[positionItemInCart].quantity - 1;
                    if (valueChange > 0) {
                        carts[positionItemInCart].quantity = valueChange
                    } else {
                        carts.splice(positionItemInCart, 1);
                    }
                    break;
            }
        }
        addCartToHTML();
        addCartToMemory();

    }


    const initApp = () => {                               // 7
        // get data from json
        fetch('tickets.json')
            .then(response => response.json())
            .then(data => {
                listProducts = data;
                addDataToHTML();
                // renderProducts(data);

                // get cart from memory
                if (localStorage.getItem('carts')) {
                    carts = JSON.parse(localStorage.getItem('carts'));
                    addCartToHTML();
                }

            })
    }

    initApp();


})
