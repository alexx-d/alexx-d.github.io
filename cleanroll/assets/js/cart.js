const scrollCart = ScrollReveal({
    origin: 'top',
    distance: '40px',
    duration: 1500,
    delay: 200,
    // reset: true
})
scrollCart.reveal(`.cart`)
scrollCart.reveal(`.footer__content`,{interval: 100})

/*=============== CART ===============*/
let d = document,
    itemBox = d.querySelector('.item_box'), // блок каждого товара
    cartCont = d.querySelector('.item_cart'); // блок вывода данных корзины

// Функция кроссбраузерной установка обработчика событий
function addEvent(elem, type, handler){
    if(elem.addEventListener){
        elem.addEventListener(type, handler, false);
    } else {
        elem.attachEvent('on'+type, function(){ handler.call( elem ); });
    }
    return false;
}

// Получаем данные из LocalStorage
function getCartData(id) {
    return JSON.parse(localStorage.getItem(id)) ? JSON.parse(localStorage.getItem(id)): '';
}

function getLocalStorageItem(item) {
    return localStorage.getItem(item) ? localStorage.getItem(item) : '';
}

// Записываем данные в LocalStorage
function setCartData(id,data) {
    localStorage.setItem(id, JSON.stringify(data));
    return false;
}

// Добавляем товар в корзину
addItem = d.querySelector('.add_item');
quantity__input = d.querySelector('.quantity__input');
if (addItem) {
    addItem.addEventListener('click', (event) => {
        event.preventDefault();
        // Получаем данные корзины или создаём новый объект, если данных еще нет
        let itemID = addItem.getAttribute('data-id'), // ID товара
            cartData = getCartData(itemID) ? getCartData(itemID): {},
            itemTitle = d.querySelector('.item_title').innerHTML.trim(), // Название товара
            itemQTY = parseInt(quantity__input.closest('.quantity').querySelector('input').value), // Кол-во товара
            itemPrice = d.querySelector('.item_price').innerHTML, // Стоимость товара
            totalItemPrice = (itemQTY * itemPrice).toFixed(2);
        if(getLocalStorageItem(itemID)){ // если такой товар уже в корзине, то добавляем +QTY к его количеству
            cartData[itemID][1] += itemQTY;
            cartData[itemID][3] = parseFloat(cartData[itemID][3]) + parseFloat(totalItemPrice);
        } else {
            cartData[itemID] = [itemTitle, itemQTY, itemPrice, totalItemPrice];
        }
        setCartData(itemID, cartData);
        d.location = 'cart.html';
    })
}

// Заполняем корзину
cartContent = document.querySelector('.cart__content');
if (cartContent) {
    let cartData = 0;
    for(let i = 1; i < 7; i++){
        cartData = getCartData(i);
        if (cartData){
            product = document.createDocumentFragment();

            cartItem = document.createElement('div');
            cartItem.setAttribute('class',`cart__item item-cart item-cart${i}`);

            itemImg = document.createElement('div');
            itemImg.setAttribute('class','item-img');
            img = document.createElement('img');
            img.setAttribute('src', `/assets/img/paper/${i}.png`);

            itemName = document.createElement('div');
            itemName.setAttribute('class','item-name');
            itemName.innerHTML = cartData[i][0];

            quantity = document.createElement('div');
            quantity.setAttribute('class','quantity');

            quantityButtonMinus = document.createElement('div');
            quantityButtonMinus.setAttribute('class','quantity__button-new quantity__button_minus');

            quantityInput = document.createElement('div');
            quantityInput.setAttribute('class','quantity__input');

            input = document.createElement('input');
            input.setAttribute('id',`quantity-input-id${i}`);
            input.setAttribute('autocomplete','off');
            input.setAttribute('type','text');
            input.setAttribute('name','form[]');
            input.setAttribute('value',cartData[i][1]);
            input.setAttribute('readonly', 'readonly');

            quantityButtonPlus = document.createElement('div');
            quantityButtonPlus.setAttribute('class','quantity__button-new quantity__button_plus');

            itemPrice = document.createElement('div');
            itemPrice.setAttribute('class',`item-price${i}`);
            itemPrice.innerHTML = '$';
            value = document.createElement('span');
            value.setAttribute('id', `price-id${i}`)
            value.innerHTML = cartData[i][3];

            delButton = document.createElement('button');
            delButton.setAttribute('class',`item-del item-del${i}`);
            delImg = document.createElement('i');
            delImg.setAttribute('class','bx bx-x item-del');

            cartItem.appendChild(itemImg);
            cartItem.appendChild(itemName);
            cartItem.appendChild(quantity);
            cartItem.appendChild(itemPrice);
            cartItem.appendChild(delButton);

            itemImg.appendChild(img);

            quantity.appendChild(quantityButtonMinus);
            quantity.appendChild(quantityInput);
            quantityInput.appendChild(input);
            quantity.appendChild(quantityButtonPlus);

            itemPrice.appendChild(value);

            delButton.appendChild(delImg);

            product.appendChild(cartItem)
            document.querySelector('.cart_items').appendChild(product)
        }
    }
}

// Удаление товара
let allItems = d.querySelectorAll('.cart__item');
allItems.forEach((item) => {
    quantity = item.querySelector('.quantity');
    quantityMinus = quantity.querySelector('.quantity__button_minus');
    quantityPlus = quantity.querySelector('.quantity__button_plus');
    removeButton = item.querySelector('.item-del');
    // кнопка удаления
    removeButton.addEventListener('click', () => {
        itemNum = item.querySelector('img').getAttribute('src');
        itemNum = itemNum.split('/').pop().replace('.png', '');
        cartData = getCartData(itemNum);
        d.getElementById('price-total-id').innerHTML = (parseFloat(d.getElementById('price-total-id').innerHTML) - parseFloat(cartData[itemNum][3])).toFixed(2);
        localStorage.removeItem(itemNum);
        item.remove();
    })
    // уменьшаем цену
    quantityMinus.addEventListener('click', () => {
        itemNum = item.querySelector('img').getAttribute('src');
        itemNum = itemNum.split('/').pop().replace('.png', '');
        cartData = getCartData(itemNum);
        qty = parseInt(d.getElementById(`quantity-input-id${itemNum}`).value);
        if(qty !== 1){
            new_value = d.getElementById(`price-id${itemNum}`).innerHTML=((qty-1)*parseFloat(cartData[itemNum][2])).toFixed(2);
            cartData[itemNum][3] = new_value;
            cartData[itemNum][1] = qty - 1;
            setCartData(itemNum,cartData);
            d.getElementById('price-total-id').innerHTML = (parseFloat(d.getElementById('price-total-id').innerHTML) - parseFloat(cartData[itemNum][2])).toFixed(2);
        }
    })
    // увеличиваем цену
    quantityPlus.addEventListener('click', () => {
        itemNum = item.querySelector('img').getAttribute('src');
        itemNum = itemNum.split('/').pop().replace('.png', '');
        cartData = getCartData(itemNum);
        qty = parseInt(d.getElementById(`quantity-input-id${itemNum}`).value);
        new_value = d.getElementById(`price-id${itemNum}`).innerHTML=((qty+1)*parseFloat(cartData[itemNum][2])).toFixed(2);
        cartData[itemNum][3] = new_value;
        cartData[itemNum][1] = qty + 1;
        setCartData(itemNum,cartData);
        d.getElementById('price-total-id').innerHTML = (parseFloat(d.getElementById('price-total-id').innerHTML) + parseFloat(cartData[itemNum][2])).toFixed(2);
    })
})

/*=============== QUANTITY ===============*/
let quantityButtonsNew = document.querySelectorAll('.quantity__button-new');
if (quantityButtonsNew.length > 0){
    for (let index = 0; index < quantityButtonsNew.length; index++) {
        const quantityButton = quantityButtonsNew[index];
        quantityButton.addEventListener("click", function (e) {
            let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
            if (quantityButton.classList.contains('quantity__button_plus')) {
                value++;
            } else {
                value = value - 1;
                if (value < 1) {
                    value = 1
                }
            }
            quantityButton.closest('.quantity').querySelector('input').value = value;
        });
    }
}

// Сумма корзины
cartContent = document.querySelector('.cart__content');
if (cartContent) {
    let totalPrice = 0;
    for(let i = 1; i < 7; i++){
        cartData = getCartData(i);
        if(cartData){
            totalPrice += parseFloat(cartData[i][3])
        }
    }
    d.getElementById('price-total-id').innerHTML = totalPrice.toFixed(2);
}

// buy
buyButton = document.querySelector('.summary-cart__buy');
if (buyButton) {
    buyButton.addEventListener("click", function (e) {
        alert("Thank you for buying!");
        localStorage.clear();
        location.reload();
    });
}
