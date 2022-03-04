const button = document.querySelector('.ham-menu');
const menu = document.querySelector('.nav-bar');

button.addEventListener('click', () => {
    if(menu.style.display == 'flex'){
        menu.style.display = 'none';
    }
    else{
        menu.style.display = 'flex';
    }   
})