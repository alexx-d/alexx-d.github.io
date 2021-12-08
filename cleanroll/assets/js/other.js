// Кол-во корзины
// Получаем данные из LocalStorage
function getCartData(id) {
    return JSON.parse(localStorage.getItem(id)) ? JSON.parse(localStorage.getItem(id)): '';
}

buttonCart = document.querySelector('.button-cart');
if (buttonCart) {
    let totalQTY = 0;
    for(let i = 1; i < 7; i++){
        cartData = getCartData(i);
        if(cartData){
            totalQTY += parseInt(cartData[i][1])
        }
    }
    document.getElementById('totalQTY-id').innerHTML = totalQTY;
}


/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Если константа существует */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Если константа существует */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // Когда нажимаем на nav__link, удаляется класс show-menu
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // Когда пролистываем больше чем на 50px, добавляем в класс header класс scroll-header
    this.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader)


/*=============== SHOW SCROLL UP ===============*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // Когда листаем больше чем на 460px, добавляем класс show-scroll в класс scroll-up
    if(this.scrollY >= 460) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const scroll = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

scroll.reveal(`.new-arrivals__container, .calltoaction__container, .about__container, .newsletter__container`)
scroll.reveal(`.footer__content`,{interval: 100})