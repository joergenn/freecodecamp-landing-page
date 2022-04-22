const button = document.querySelector('.ham-menu'),
      menu = document.querySelector('.nav-bar'),
      goods = document.querySelector('.goods'),
      showMoreBtn = document.querySelector('.show-more'),
      goUpBtn = document.querySelector('.go-up'),
      modal = document.querySelector('.modal-container'),
      closeModalBtn = document.querySelector('.close-modal'),
      closeModalSpan = document.querySelector('.close-modal-span'),
      subContainer = document.querySelector('.sub-container'),
      subCloseBtn = document.querySelector('.close-sub'),
      notNowBtn = document.querySelector('.not-now'),
      subBtn = document.querySelector('.sub-btn'),
      emailInput = document.querySelector('#email'),
      cart = document.querySelector('#cart'),
      cartContainer = document.querySelector('.cart-container'),
      endDate = new Date('04/01/2022 10:00 AM'),
      emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+/,
      _second = 1000,
      _minute = _second * 60,
      _hour = _minute * 60,
      _day = _hour * 24;

let  benefitsBtn, benefitsList, data, buyBtn, cartArray = [];

function addExtraInfo(){
    benefitsBtn = [...document.querySelectorAll('.more-info')],
    benefitsList = [...document.querySelectorAll('.benefits')];

    for(let i = 0; i < benefitsBtn.length; i++){
        benefitsBtn[i].addEventListener('mouseenter', () => {
            benefitsList[i].style.display = 'flex';
        });
        benefitsBtn[i].addEventListener('mouseleave', () => {
            benefitsList[i].style.display = 'none';
        });
    }
};

function addExtraBuyBtn(){
    buyBtn = [...document.querySelectorAll('.buy-btn')];
    for(let i = 0; i < buyBtn.length; i++){
        buyBtn[i].addEventListener('click', function addToCart(event){
            let elem = buyBtn[i].parentElement.parentElement;
            // console.log(elem.querySelector('img').getAttribute('src'));
            // console.log(elem.querySelector('h3').innerText);
            // console.log(elem.querySelector('.price').innerText);
            buyBtn[i].style.backgroundColor = '#00ff00';
            cartArray.push(
                {
                    "name": elem.querySelector('h3').innerText,
                    "price": elem.querySelector('.price').innerText,
                    "image": elem.querySelector('img').getAttribute('src')
                }
            );
            buyBtn[i].removeEventListener(event.type, addToCart);
        });
    }
};

function appendToCart(){
    let price = 0
    cartContainer.innerHTML = `
        <button class="close-cart"><span class="material-icons-outlined">close</span></button>
        <h3 class="cart-head">Your cart is: </h3>
        ${cartArray.map(function(item){
            price += parseInt(item.price);
            return `
                <div class="cart-item">
                    <div class="cart-photo">
                        <img src="${item.image}" alt="Trombone" class="cart-image">
                    </div>               
                    <div class="cart-description">
                        <h3>${item.name}</h3>
                        <div class="amount">
                            <input type="number" placeholder="1" class="quantity" min="1" max="9999" step="1">
                            <p class="item-price">${item.price}</p>
                        </div>
                    </div>            
                </div>    
            `
        }).join('')}
        <h3 class="final-price">Final price = ${price}$</h3>
    `;
    closeCart();
    calculateItemPrice();
}

function calculateItemPrice(){
    let inputs = [...document.querySelector('.cart-container').querySelectorAll('input')];
    for(let i = 0; i < inputs.length; i++){
        let elem = inputs[i].parentElement;
        let priceTag = elem.querySelector('.item-price');
        let price = priceTag.innerText;
        
        inputs[i].addEventListener('input', () =>{
            let value = inputs[i].value,
                sum = 0;

            if(value <= 0){
                value = 1;
            }
            priceTag.innerHTML = `${parseInt(price) * value}$`;
            let itemPrices = [...document.querySelectorAll('.item-price')];
            itemPrices.forEach((item) =>{
                sum += parseInt(item.textContent.slice(0, -1));
            })
            // let qwerty = parseInt(document.querySelector('.final-price').innerHTML.split(' ')[3].slice(0, -1));
            // console.log(qwerty * 10);
            // console.log(typeof(qwerty));
            document.querySelector('.final-price').innerHTML = `Final price = ${sum}$`;
        })
    }
    // console.log(inputs);
}

function getDiscount(discountSize){
    if(discountSize == 0){
        return ``
    }
    else{
        return `
            <div class="discount">
                <span>${discountSize}% OFF!</span>
            </div>
        `
    }
}

function countdown(){
    let now = new Date();
    let delta = endDate - now;
    if (delta < 0) {
        document.querySelector('.countdown').innerHTML = 'EXPIRED!';
        return;
    }
    let days = Math.floor(delta / _day),
        hours = Math.floor((delta % _day) / _hour),
        minutes = Math.floor((delta % _hour) / _minute),
        seconds = Math.floor((delta % _minute) / _second);

    document.querySelector('.countdown').innerHTML = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds remaining`;
}

function closeModal(){
    let i, timer;
    closeModalBtn.style.display = 'flex';

    i = 9;
    timer = setInterval(() =>{
        closeModalSpan.innerHTML = `${i}`;
        i--;
        if(i == 0){
            clearInterval(timer); 
            closeModalSpan.innerHTML = "close";
            closeModalSpan.classList.add("material-icons-outlined");
            closeModalBtn.style.pointerEvents = 'all';
        }
    }, 1000);
}

function showModal(){
    if(sessionStorage.getItem('modalWasShown') != 'true'){   
        setInterval(countdown, 1000); 
        closeModal();     
        modal.style.display = 'flex';
        document.querySelector('header').style.pointerEvents = 'none';   
        sessionStorage.setItem('modalWasShown', 'true');
    }
}

function showSubscription(){
    if(localStorage.getItem('isSubscribed') != 'true'){

        subContainer.style.zIndex = '5';
        document.querySelector('.sub').style.display = 'flex';
    } 
}

function append(){
    showModal();

    let newData = data.slice(-3);
    for(let i = 0; i < 3; i++){
       data.pop();
    }

    goods.insertAdjacentHTML('beforeEnd', `${newData.map(function(item){
        let benefits = item.benefits;

        return `
                <div class="item">
                    <img src="${item.image}" alt="Trombone" class="image">
                    <div class="description">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                    <div class="buy-section">
                        <span class="price">${item.price}$</span>
                        <button class="more-info">More Info</button>
                        <button class="buy-btn">BUY IT</button>
                    </div>
                    <div class="benefits">
                        <ul>
                            ${benefits.map(function(el){
                                return `<li>${el}</li>`
                            }).join('')}
                        </ul>
                    </div>
                    ${getDiscount(item.discount)}
                </div>
        `
    }).join('')}`)   

    addExtraInfo();
    addExtraBuyBtn();

    if(data.length == 0){
        showMoreBtn.style.display = 'none';
        showSubscription();
    }
}

function closeCart(){
    let closeCartBtn = document.querySelector('.close-cart');
    closeCartBtn.addEventListener('click', () => {
        cartContainer.style.display = 'none';
    })
}


showMoreBtn.addEventListener('click', append);

button.addEventListener('click', () => {
    if(menu.style.display == 'flex'){
        menu.style.display = 'none';
    }
    else{
        menu.style.display = 'flex';
    }   
});

window.addEventListener("scroll", () => {
    let scroll = this.scrollY;
    if(scroll > window.innerHeight * 2 / 3){
        goUpBtn.style.display = 'flex';
    }
    else{
        goUpBtn.style.display = 'none';
    }
});

goUpBtn.addEventListener('click', () => {
    window.scrollTo(0,0); 
})

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none'; 
    document.querySelector('header').style.pointerEvents = 'all';
})

subCloseBtn.addEventListener('click', () =>{
    subContainer.style.display = 'none';
})

notNowBtn.addEventListener('click', () =>{
    subContainer.style.display = 'none';
})

subBtn.addEventListener('click', () =>{
    if(emailRegEx.test(emailInput.value)){
        document.querySelector('.sub-header').innerHTML = `
            <h2>Don't miss our updates</h2>
            <h1 class="thank-u">Thank you for subscription</h1
            <p></p>
        `;
        setTimeout(() =>{subCloseBtn.style.display = 'flex';}, 1000);    
        localStorage.setItem('isSubscribed', 'true');   
    }
    else{
        document.querySelector('.sub-header').innerHTML = `
            <h2>Don't miss our updates</h2>
            <h1 class="thank-u">Subscribe for our email distribution</h1>
            <p class="red">Enter valid email!</p>
        `;
    }   
})

cart.addEventListener('click', () => {
    if(cartArray.length != 0){
        cartContainer.style.alignItems = 'space-between';
        appendToCart();
    }
    cartContainer.style.display = 'flex';
})



fetch("./data.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(jsonData){
        data = jsonData;
    });

addExtraInfo();
addExtraBuyBtn();
closeCart();
