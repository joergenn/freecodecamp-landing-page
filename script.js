const button = document.querySelector('.ham-menu'),
      menu = document.querySelector('.nav-bar'),
      goods = document.querySelector('.goods'),
      showMoreBtn = document.querySelector('.show-more'),
      goUpBtn = document.querySelector('.go-up');

let  benefitsBtn, benefitsList;

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

let data;
fetch("./data.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(jsonData){
        data = jsonData;
    });


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

function append(){
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

    if(data.length == 0){
        showMoreBtn.style.display = 'none';
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

goUpBtn.addEventListener('mouseenter', () => {
    goUpBtn.innerHTML = `<h3><a href="#">GO UP!</a></h3>`;
})
goUpBtn.addEventListener('mouseleave', () => {
    goUpBtn.innerHTML = `<h3><a href="#">GO UP</a></h3>`;
})

addExtraInfo();