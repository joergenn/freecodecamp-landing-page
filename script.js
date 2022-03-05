const button = document.querySelector('.ham-menu'),
      menu = document.querySelector('.nav-bar'),
      goods = document.querySelector('.goods'),
      showMoreBtn = document.querySelector('.show-more');

let data;
fetch("./data.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(jsonData){
        data = jsonData;
    });

function append(){
    let newData = data.slice(-4);
    for(let i = 0; i < 4; i++){
       data.pop();
    }

    goods.insertAdjacentHTML('beforeEnd', `${newData.map(function(item){
        return `
                <div class="item">
                    <img src="${item.image}" alt="Trombone" class="image">
                    <div class="description">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                    <div class="buy-section">
                        <span class="price">${item.price}$</span>
                        <button class="buy-btn"><a href="#">BUY IT</a></button>
                    </div>
                </div>
        `
    }).join('')}`)   

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
})

