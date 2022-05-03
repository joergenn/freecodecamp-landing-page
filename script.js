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
      endDate = new Date('04/01/2022 10:00 AM'),
      emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+/,     
      _second = 1000,
      _minute = _second * 60,
      _hour = _minute * 60,
      _day = _hour * 24;

let benefitsBtn, benefitsList, data, buyBtn, itemsLoaded = 0, cartArray = [], cartBack = [], graphBackup;
let newsArray = [
    {
        "name": "Google доповнила функціонал браузера Chrome на Android",
        "description": "Компанія Google рідко змінює інтерфейс та оформлення Chrome. Тим не менш, одна з таких змін стала частиною Chrome на Android – додавання ярлика панелі інструментів, що настроюється. На Android інтерфейс є панель з адресним рядком, перемикачем вкладок і переливним меню, в якому багато дій представлені у вигляді довгого списку. Тепер Google впроваджує “ярлик панелі інструментів” між омнібоксом та лічильником вкладок. Тут може з’явитися одна з трьох дій: Нова вкладка (як знак плюс), Поділитися або Голосовий пошук (як мікрофон).",
        "date": "2022-05-02",
        "important": true,
        "image": "src/news4.jpg"
    },
    {
        "name": "Що включатиме преміум-підписка на Telegram",
        "description": "Нещодавно пройшла чутка, що Telegram готується ввести платні функції.Повідомляється, що у бета-версії програми для iOS виявили інтерфейс Telegram Premium. Передбачається, що користувачам, які оплатили передплату, будуть доступні платні реакції. Це означає, що на додаток до наявних вони отримають нові. Крім того, підписники матимуть доступ до платних стікерів з повноекранною анімацією. Поки що це все, що вдалося виявити. Скільки буде коштувати підписка і коли з’явиться, поки що неясно. Ймовірно, переліченими вище функціями все вичерпуватися не буде.",
        "date": "2022-04-25",
        "important": false,
        "image": "src/news5.jpg"
    },
    {
        "name": "MICROSOFT зробить VPN у власному браузері EDGE",
        "description": "Американська корпорація Microsoft тестує новий VPN-сервіс та збирається впровадити його у браузер Edge. Сторінка з описом нових можливостей з'явилася на сайті Microsoft. Функція під назвою Microsoft Edge Secure Network працюватиме на основі розробок Cloudflare. Microsoft не позиціонує її як VPN, однак вказує, що вона шифруватиме підключення користувача до інтернету для захисту його даних. Сервіс використовуватиме IP-адресу з найближчого регіону, можливості вибору геолокації VPN-сервісу не буде.",
        "date": "2022-04-23",
        "important": false,
        "image": "src/news6.jpg"
    },
    {
        "name": "Xiaomi випустила чудові нові телевізори Smart TV 5A за ціною 6000 гривень",
        "description": "Ось нарешті й настав той самий довгоочікуваний день, якого багато людей напевно дуже давно чекали. Китайська корпорація Xiaomi представила на території Індії нову лінійку телевізорів під назвою Smart TV 5A, яка є п’ятим поколінням фірмових ТВ бренду. Новинки, які входять у модельний ряд, мають схожий привабливий зовнішній вигляд, дуже доступну вартість, просунуте технічне оснащення, а разом з тим інші особливості. Оскільки йдеться про міжнародні моделі, вже незабаром придбати собі такі зможуть усі охочі, зокрема жителі України та інших держав. Вартість новинок стартує з позначки $200 доларів. Покупцям на вибір пропонують три моделі, які відрізняються один від одного діагоналлю екрана. Новинки мають діагональ 32, 40 і 43 дюйми, причому у всіх випадках роздільна здатність матриці IPS становить 1920 на 1080 пікселів (Full HD або 1080p). Нові моделі, як запевняє компанія-виробник, мають підтримку запатентованої технології обробки зображень Vivid Picture Engine від компанії Xiaomi, яка забезпечує кращу якість перегляду за рахунок підвищення контрастності та кольорів на основі машинного навчання та ІІ. Базова модель телевізора може похвалитися 4-ядерним процесором А35, 1 ГБ оперативної та 8 ГБ вбудованої пам’яті, а також динаміками потужністю 20 Вт. Цього більш ніж достатньо будь-якому сучасному користувачеві.",
        "date": "2022-04-29",
        "important": true,
        "image": "src/news3.jpg"
    },
    {
        "name": "Фінляндія передасть ЗСУ конфісковані Bitcoin",
        "description": "Стало відомо, що в уряду Фінляндії є плани пожертвувати Україні для підсилення обороноздатності проти російського вторгнення криптовалюту Bitcoin (BTC). Згідно з даними фінського видання Helsingin Sanomat, зараз в уряду Фінляндії на рахунках 1981 Bitcoin, що приблизно еквівалентно 78 мільйонам доларів. Більшість цих коштів вилучили у ході розслідувань торгівлі та обігу наркотиків. Фінським судом було видане розпорядження передати ці BTC країні, що зможе провести їхній обмін на звичайну валюту, але процес не пішов далі. Зараз стало відомо, що ці Bitcoin можуть передати Україні (інсайдерські джерела вказують на те, що мова йде про більшу частину цієї суми. Зараз фінський уряд обговорює процес, що дозволить передати Україні ці BTC. Проблема в тому, що у країні відсутній юридичний механізм, що дозволяє передати BTC, не витрачаючи час на довгі бюрократичні процеси. Крім цього, у деяких фінських політиків є побоювання, що важко буде проконтролювати, на що були витрачені ці кошти (хоча такий самий ризик є і з традиційними валютами). Тим не менше, усі питання мають бути вирішені найближчим часом, внаслідок чого в Україну надійдуть додаткові кошти.",
        "date": "2022-04-24",
        "important": true,
        "image": "src/news2.jpg"
    },
    {
        "name": "NASA: повз Землю пролетів 780-метровий астероїд",
        "description": "У NASA повідомили, що повз Землю зі швидкістю понад 37 тис. км/год пролетів астероїд діаметром від 350 до 780 метрів. Астероїд наблизився до Землі на 3,2 млн км (більше 8 відстаней до Місяця), що змушує вважати його потенційно небезпечним для нашої планети об’єктом. Свій наступний прохід поруч із Землею цей астероїд зробить у травні 2029 року і так відбуватиметься приблизно кожні сім років. Астероїд 418135 (2008 AG33) уперше виявлений астрономами 12 січня 2008 року. Відкриття зробили вчені обсерваторії Mt. Lemmon SkyCenter в Аризоні і востаннє він пронісся повз Землю 1 березня 2015 року, згідно з даними Центру NASA з вивчення об’єктів поблизу Землі (CNEOS). Навколоземними об’єктами вважаються всі небесні тіла, які наближаються до нашої планети на 193 млн. км і ближче. Потенційно небезпечними стають ті з них, які зближуються із Землею на дистанцію менше ніж 7,5 млн км. Астероїд 2008 AG33, як бачимо, пролетів на вдвічі меншому віддаленні від Землі – фактично за один крок від нас.",
        "date": "2022-04-20",
        "important": true,
        "image": "src/news1.jpg"
    }
];

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

// function isInCart(name){
//     let flag = false;
//     cartArray.forEach((el) =>{
//         if(el.name == name){
//             return true;
//         }
//     })
//     return flag;
// }

function addExtraBuyBtn(){
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
    // closeCart();
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
    document.querySelector('.close-news').addEventListener('click', ()=>{
        graphicsContainer.innerHTML = graphBackup;
        destroy();
        graph();
    })
}

function closeNewsMobile(ob){
    ob.querySelector('.close-news-mobile').addEventListener('click', ()=>{
        ob.querySelector('.news-desc').style.display = 'none';
        ob.querySelector('.close-news-mobile').style.display = 'none';
        ob.querySelector('.open-news').style.display = 'flex';
    })  
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
                newsButton[i].parentElement.querySelector('.news-desc').style.display = 'flex';
                newsButton[i].parentElement.querySelector('.close-news-mobile').style.display = 'flex';
                newsButton[i].parentElement.querySelector('.open-news').style.display = 'none';
                closeNewsMobile(newsButton[i].parentElement);
            }           
        })
    }
}

function addNews(){
    let arr;
    arr = alasql('SELECT * FROM ? ORDER BY date DESC',[newsArray]);
    showNewsBtn.insertAdjacentHTML('beforebegin', `
        ${arr.map(function(item){
            return `
            <div class="news-item">
                <h3 class="news-name ${item.important ? 'important' : ''}">${item.name}</h3>
                <img src="${item.image}" alt="News Logo" class="news-image">
                <span class="news-date">${item.date}</span>
                <p class="news-desc">
                    ${item.description}
                </p> 
                <button class="open-news">Open News</button>
                <button class="close-news-mobile"><span class="material-icons-outlined">close</span></button>
            </div>    
            `
        })} 
    `);
    openNewsHandler();
    showNewsBtn.removeEventListener('click', addNews);
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
    itemsLoaded += 3;
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

showNewsBtn.addEventListener('click', addNews);


graphBackup = graphicsContainer.innerHTML;


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
openNewsHandler();
closeNewsBtnHandler();


