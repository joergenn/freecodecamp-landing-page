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
      cartItems = document.querySelector('.cart-items'),
      sortOption = document.querySelector('#sort-select'),
      sortBtn = document.querySelector('.sort-btn'),
      graphicsContainer = document.querySelector('.graphics'),
      newsMobile = document.querySelector('.news-mobile-container'),
      maxPriceInput = document.querySelector('#maxPrice'),
      minPriceInput = document.querySelector('#minPrice'),
      showNewsBtn = document.querySelector('.show-news-btn'),
      closeAuthorize = document.querySelector('.close-authorize'),
      displayLog = document.querySelector('#log-btn'),
      logBtn = document.querySelector('.log-btn'),
      logForm = document.querySelector('.authorize-container');
      endDate = new Date('04/01/2022 10:00 AM'),
      emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+/,     
      _second = 1000,
      _minute = _second * 60,
      _hour = _minute * 60,
      _day = _hour * 24;

let benefitsBtn, benefitsList, data, newData, buyBtn, itemsLoaded = 0, cartArray = [], cartBack = [], graphBackup, newsArray = [];

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
    if(sessionStorage.getItem('loggedIn') == 'false'){
        return;
    }
    buyBtn = [...document.querySelectorAll('.buy-btn')];
    for(let i = itemsLoaded; i < buyBtn.length; i++){
        buyBtn[i].addEventListener('click', function addToCart(event){
            let elem = buyBtn[i].parentElement.parentElement;
            buyBtn[i].style.backgroundColor = '#00ff00';
            cartArray.push(
                {
                    name: elem.querySelector('h3').innerText,
                    basePrice: parseInt(elem.querySelector('.price').innerText.slice(0, -1)),
                    price: parseInt(elem.querySelector('.price').innerText.slice(0, -1)),
                    image: elem.querySelector('img').getAttribute('src'),
                    quantity: 1
                }
            );
            buyBtn[i].removeEventListener(event.type, addToCart);
        });
    }
    itemsLoaded = buyBtn.length;
};

function appendToCart(){
    let price = 0;
    cartItems.innerHTML = `
        ${cartArray.map(function(item){
            price += parseInt(item.basePrice);
            return `
                <div class="cart-item">
                    <div class="cart-photo">
                        <img src="${item.image}" alt="Trombone" class="cart-image">
                    </div>               
                    <div class="cart-description">
                        <h3>${item.name}</h3>
                        <div class="amount">
                            <input type="number" placeholder="${item.quantity}" class="quantity" min="0" max="9999" step="1">
                            <p class="item-price">${item.price}$</p>
                        </div>
                    </div>            
                </div>    
            `
        }).join('')}
    `
    calculateFinalPrice();
    calculateItemPrice();   
}

function addBuyBtnFunctionality(name){
    let items = [...document.querySelectorAll('.item')];
    for(let i = 0; i < items.length; i++){
        if(items[i].querySelector('h3').textContent == name){
            let btn = items[i].querySelector('.buy-btn');
            btn.style.backgroundColor = 'rgb(214, 174, 44)';

            btn.addEventListener('click', function addToCart(event){
                let elem = btn.parentElement.parentElement;
                btn.style.backgroundColor = '#00ff00';
                cartArray.push(
                    {
                        name: elem.querySelector('h3').innerText,
                        basePrice: parseInt(elem.querySelector('.price').innerText.slice(0, -1)),
                        price: parseInt(elem.querySelector('.price').innerText.slice(0, -1)),
                        image: elem.querySelector('img').getAttribute('src'),
                        quantity: 1
                    }
                );
                btn.removeEventListener(event.type, addToCart);
            });
        }
    }
}

function deleteFromCart(item){
    addBuyBtnFunctionality(item.querySelector('h3').textContent);
    item.remove();
    let name = item.querySelector('.cart-description').querySelector('h3').textContent;
    let result = cartArray.filter((el) => {
        return el.name != name;
    })
    cartArray = [...result];
}

function calculateFinalPrice(){
    let sum = 0;
    let itemPrices = [...document.querySelectorAll('.item-price')];
    itemPrices.forEach((item) =>{
        sum += parseInt(item.textContent.slice(0, -1));
    })
    console.log(sum);
    document.querySelector('.final-price').innerHTML = `Final price = ${sum}$`;
}

function calculateItemPrice(){
    let inputs = [...document.querySelector('.cart-container').querySelectorAll('.quantity')];
    for(let i = 0; i < inputs.length; i++){
        let elem = inputs[i].parentElement;
        let priceTag = elem.querySelector('.item-price');
        let price = priceTag.innerText,
            name = priceTag.parentElement.parentElement.parentElement.querySelector('h3').textContent;
        
        inputs[i].addEventListener('input', () =>{
            let value = inputs[i].value;
            if(value < 0){
                value = 1;
            }
            
            if(value == 0){
                let cartItem = inputs[i].parentElement.parentElement.parentElement;
                deleteFromCart(cartItem);
            }
            else{
                for(let j = 0; j < cartArray.length; j++){
                    if(cartArray[j].name == name){
                        cartArray[j].quantity = value;
                        cartArray[j].price = cartArray[j].basePrice * value;
                        priceTag.innerHTML = `${cartArray[j].price}$`;
                    }
                }
            }
            calculateFinalPrice();  
        }) 
    }   
}



function closeNewsBtnHandler(){
    if(screen.width > 600){
        document.querySelector('.close-news').addEventListener('click', ()=>{
            graphicsContainer.innerHTML = graphBackup;
            destroy();
            graph();
        })
    }
    else{
        document.querySelector('.close-news-mobile').addEventListener('click', ()=>{
            let el = document.querySelector('.news-mobile-container');
            el.remove();
        })     
    }  
}

function showNews(newsName, text, imgSource){
        graphicsContainer.innerHTML = `
            <div class="news-content-item">
                <h3 class="news-content-name">${newsName}</h3>
                <img src="${imgSource}" alt="News Logo" class="news-image">
                <p class="news-content">
                    ${text}
                </p>
                <button class="close-news"><span class="material-icons-outlined">close</span></button>
            </div>  
        `;
    closeNewsBtnHandler();
}

function openNewsHandler(){
    let text,
        imgSource,
        newsName,
        newsButton = [...document.querySelectorAll('.open-news')];
    for(let i = 0; i < newsButton.length; i++){
        newsButton[i].addEventListener('click', ()=>{
            text = newsButton[i].parentElement.querySelector('.news-desc').innerText;
            newsName = newsButton[i].parentElement.querySelector('.news-name').innerText;
            imgSource = newsButton[i].parentElement.querySelector('img').getAttribute('src');
            if(screen.width > 600){
                showNews(newsName, text, imgSource);
            }
            else{
                newsButton[i].parentElement.insertAdjacentHTML('afterend', 
                `
                <div class="news-mobile-container"> 
                    <h3 class="news-content-name">${newsName}</h3>
                    <img src="${imgSource}" alt="News Logo" class="news-image">
                    <p class="news-content">
                        ${text}
                    </p>
                    <button class="close-news-mobile"><span class="material-icons-outlined">close</span></button>  
                </div>   
                `);
                closeNewsBtnHandler();
            }           
        })
    }
}

function addNews(){
    let arr;
    console.log(newsArray);
    arr = alasql('SELECT * FROM ? ORDER BY date DESC',[newsArray]);
    console.log(arr);

    showNewsBtn.insertAdjacentHTML('beforebegin', `
        ${arr.map(function(item){
            return `
            <div class="news-item">
                <h3 class="news-name ${item.important ? 'important' : ''}">${item.name}</h3>
                <img src="${item.image}" alt="News Logo" class="news-image">
                <p class="news-desc">
                    ${item.description}
                </p>
                <span class="news-date">${item.date}</span>
                <button class="open-news">Open News</button>
            </div>    
            `
        })} 
    `);
    openNewsHandler();
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

    i = 5;
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
    newData = data.slice(-3);
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

function storageInit(){
    if(localStorage.getItem('isRegistered') == 'true'){
        document.querySelector('#log-btn').innerHTML = 'Log In';
    }
    else if(localStorage.getItem('isRegistered') == null){
        localStorage.setItem('isRegistered', 'false');
    }

    if(sessionStorage.getItem('loggedIn') == null){
        sessionStorage.setItem('loggedIn', 'false');
    }
    else if(sessionStorage.getItem('loggedIn') == 'true'){
        console.log('Already logged in');
        document.querySelector('#log-btn').innerHTML = `<img src="src/user.png" height="35px" alt="User" id="user-icon">`;
    }

    if(localStorage.getItem('email') == null){
        localStorage.setItem('email', '_');
    }
    if(localStorage.getItem('pass') == null){
        localStorage.setItem('pass', '_');
    }
    if(localStorage.getItem('remember_me') == null){
        localStorage.setItem('remember_me', 'false');
    }


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

sortBtn.addEventListener('click', () =>{
    let option = sortOption.value,
        res,
        min = parseInt(minPriceInput.value),
        max = parseInt(maxPriceInput.value);


        
    if(min > max || min < 0 || max < 0){
        document.querySelector('.cart-head').innerHTML = `Your cart is: \n Cant sort with these options!`;
        return;
    }
    document.querySelector('.cart-head').innerHTML = `Your cart is: `;

    if(!isNaN(min) || !isNaN(max)){
        min = isNaN(min) ? 0 : min;
        max = isNaN(max) ? 99999 : max;

        if(option == 'asc'){
            res = alasql('SELECT * FROM ? WHERE price >= ? AND price <= ? ORDER BY price',[cartArray, min, max]);
        }
        else if(option == 'desc'){
            res = alasql('SELECT * FROM ? WHERE price >= ? AND price <= ? ORDER BY price DESC',[cartArray, min, max]);
        }
        else{
            res = alasql('SELECT * FROM ? WHERE price >= ? AND price <= ? ORDER BY name',[cartArray, min, max]);
        }
    }
    else{
        if(option == 'asc'){
            res = alasql('SELECT * FROM ? ORDER BY price',[cartArray]);
        }
        else if(option == 'desc'){
            res = alasql('SELECT * FROM ? ORDER BY price DESC',[cartArray]);
        }
        else{
            res = alasql('SELECT * FROM ? ORDER BY name',[cartArray]);
        }
    }
    cartBack = [...cartArray];  
    cartArray = [...res];
    appendToCart();
    cartArray = [...cartBack];
})

closeAuthorize.addEventListener('click', () =>{
    document.querySelector('.authorize-parent').style.display = 'none';
})

displayLog.addEventListener('click', () =>{
    document.querySelector('.authorize-parent').style.display = 'flex';
    if(localStorage.getItem('isRegistered') == 'true'){
        document.querySelector('.log-btn').value = 'Log In';
        document.querySelector('.form-name').innerHTML = `Log In Form`;
        document.querySelector('#pass-authorize2').parentElement.remove();
    }

    if(localStorage.getItem('remember_me') == 'true'){
        if(localStorage.getItem('email').length > 1){
            document.querySelector('#email-authorize').value = localStorage.getItem('email');
        }
        if(localStorage.getItem('pass').length > 8){
            document.querySelector('#pass-authorize1').value = localStorage.getItem('pass');
            if(localStorage.getItem('isRegistered') == 'false'){
                document.querySelector('#pass-authorize2').value = localStorage.getItem('pass');
            }
        }   
    }
})

logForm.addEventListener('submit', (e) =>{   
    let messages = [];
    const email = document.querySelector('#email-authorize'), 
          pass1 = document.querySelector('#pass-authorize1'),
          pass2 = document.querySelector('#pass-authorize2'),
          checkbox = document.querySelector('#remember-me');

    e.preventDefault();
    if(localStorage.getItem('isRegistered') == 'false'){
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
            messages.push('Invalid email');
        }
        if(pass1.value.length < 8){
            messages.push("Minimum pass length = 8");
        }
        if(pass1.value != pass2.value){
            messages.push("Passwords don't match");
        }
    }
    if(localStorage.getItem('isRegistered') == 'true'){
        if(email.value != localStorage.getItem('email') || pass1.value != localStorage.getItem('pass')){
            messages.push('Invalid email or password');
        }
    }
    
    if(checkbox.value === 'on'){
        localStorage.setItem('remember_me', 'true'); 
    }

    if(messages.length > 0){
        document.querySelector('.warnings').innerHTML = `
            ${messages.map(function(el){
                return `<p>${el}</p>`
            }).join('')}
        `;
        document.querySelector('.warnings').style.display = 'flex';
    }
    else{
        if(localStorage.getItem('isRegistered') == 'false'){
            localStorage.setItem('email', email.value);  
            localStorage.setItem('pass', pass1.value);  
            localStorage.setItem('isRegistered', 'true');
            document.querySelector('.form-info').innerHTML = `Thanks for signing up!`;
            document.querySelector('.fields').style.display = 'none';
            document.querySelector('.warnings').style.display = 'none';
            const payload = {
                'email': email.value,
                'password': pass1.value
            };
            const options ={
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            };
            fetch('/register', options).then(res =>{
                console.log('Registration - ', res['status']);
            });
            
        }
        else if(localStorage.getItem('isRegistered') == 'true'){
            sessionStorage.setItem('loggedIn', 'true'); 
            document.querySelector('#log-btn').innerHTML = `<img src="src/user.png" height="35px" alt="User" id="user-icon">`;
            document.querySelector('.form-info').innerHTML = `Thanks for logging up!`;
            document.querySelector('.fields').style.display = 'none';
            document.querySelector('.warnings').style.display = 'none';
            const payload = {
                'email': email.value,
                'password': pass1.value
            };
            const options ={
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            };
            fetch('/log_in', options).then(res =>{
                console.log('Authorization - ', res['status']);
            });
            addExtraBuyBtn();
        }
    }  
})

showNewsBtn.addEventListener('click', addNews);
graphBackup = graphicsContainer.innerHTML;

fetch("https://raw.githubusercontent.com/joergenn/freecodecamp-landing-page/main/public/data.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(jsonData){
        data = jsonData;
    });

fetch("https://raw.githubusercontent.com/joergenn/freecodecamp-landing-page/main/public/news.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(jsonData){
        newsArray = jsonData;
    });

storageInit();
closeCart();
openNewsHandler();


