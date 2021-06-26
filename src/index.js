const materialArr = [
    {
        typeOfFacture: 'Матовые',
        manufactor: ['Classic', 'Pongs', 'Evolution', 'Teqtum', 'Premium', 'Lumfer', 'Cold Stretch']
    },
    {
        typeOfFacture: 'Глянцевые',
        manufactor: ['Classic', 'Pongs', 'Evolution', 'Premium', 'Lumfer']
    },
    {
        typeOfFacture: 'Сатиновые',
        manufactor: ['Classic', 'Pongs', 'Evolution', 'Premium', 'Lumfer']
    },
    {
        typeOfFacture: 'Тканевые',
        manufactor: ['D-Premium', 'Clipso', 'Cerutti']
    }
];

const priceList = [
    {
        manufactor: 'Classic',
        price: 140
    },
    {
        manufactor: 'Premium',
        price: 190
    },
    {
        manufactor: 'Evolution',
        price: 290
    },
    {
        manufactor: 'Cold Stretch',
        price: 390
    },
    {
        manufactor: 'Pongs',
        price: 390
    },
    {
        manufactor: 'Teqtum KM2',
        price: 440
    },
    {
        manufactor: 'Lumfer',
        price: 660
    },
    {
        manufactor: 'D-Premium',
        price: 580
    },
    {
        manufactor: 'Clipso',
        price: 2390
    },
    {
        manufactor: 'Cerutti',
        price: 2550
    }
];

const lightPrice = 290;
const chandPrice = 450;
const freeCorner = 4;
const cornerPrice = 180;

primaryRender();
calc();

//классы активности для табов
let selectorTabs = document.getElementsByClassName('selector__tab');
let selectorItems = document.getElementsByClassName('selector__items');
for(let i = 0; i < selectorTabs.length; i++){
    selectorTabs[i].addEventListener('click', ()=>{
        document.getElementsByClassName('selector__tab active')[0].classList.remove('active');
        selectorTabs[i].classList.add('active');

        document.getElementsByClassName('selector__items active')[0].classList.remove('active');
        selectorItems[i].classList.add('active');

        calc();
    });
}


//классы активности для контента табов
let allItems = document.getElementsByClassName('selector__item');
for (let i = 0; i < allItems.length; i++){
    allItems[i].addEventListener('click', ()=>{
        let itemsNode = allItems[i].parentElement;
        itemsNode.getElementsByClassName('selector__item active')[0].classList.remove('active');
        allItems[i].classList.add('active');

        calc();
    });
}

//увеличение счетчика
let counterBtns = document.getElementsByClassName('counter__buttons');
for(let i = 0; i < counterBtns.length; i++){
    counterBtns[i].getElementsByClassName('counter__plus')[0].addEventListener('click', ()=>{
        let amountText = counterBtns[i].getElementsByClassName('counter__amount')[0];
        amountText.textContent = parseInt(amountText.textContent) + 1;

        calc();
    });
}

//уменьшение счетчика
for(let i = 0; i < counterBtns.length; i++){
    counterBtns[i].getElementsByClassName('counter__minus')[0].addEventListener('click', ()=>{
        let amountText = counterBtns[i].getElementsByClassName('counter__amount')[0];
        if(amountText.textContent > 0){
            amountText.textContent = parseInt(amountText.textContent) - 1;
        }

        calc();
    });
}

function primaryRender() {
    let typeOfFacture = document.getElementById('typeOfFacture');
    let manufact = document.getElementById('manufact');

    //внешний цикл - отрисовка типов фактур
    for(let i = 0; i < materialArr.length; i++){
        if (i == 0){
            typeOfFacture.getElementsByClassName('selector__tabs')[0].innerHTML += `
                <button class="selector__tab active">${materialArr[i].typeOfFacture}</button>
            `

            //контейнер для производителей
            manufact.getElementsByClassName('selector__content')[0].innerHTML += `
                <ul class="selector__items active">

                </ul>
            `
        }else{
            typeOfFacture.getElementsByClassName('selector__tabs')[0].innerHTML += `
                <button class="selector__tab">${materialArr[i].typeOfFacture}</button>
            `
            
            //контейнер для производителей
            manufact.getElementsByClassName('selector__content')[0].innerHTML += `
                <ul class="selector__items">

                </ul>
            `
        }

        //внутренний цикл - отрисовка производителей в контейнеры
        for(let j = 0; j < materialArr[i].manufactor.length; j++){
            if (j == 0){
                document.getElementsByClassName('selector__items')[i].innerHTML += `
                    <button class="selector__item active">${materialArr[i].manufactor[j]}</button>
                `
            }else{
                document.getElementsByClassName('selector__items')[i].innerHTML += `
                    <button class="selector__item">${materialArr[i].manufactor[j]}</button>
                 `
            }
        } 
    }
}

function calc(){
    let manufactor = document.getElementsByClassName('selector__items active')[0].getElementsByClassName('selector__item active')[0].textContent;
    let price = 0;

    for(let i = 0; i < priceList.length; i++){
        if (priceList[i].manufactor === manufactor) price = priceList[i].price;
    }

    let square = parseInt(document.getElementById('square').getElementsByClassName('counter__amount')[0].textContent);

    let cornersTemp = parseInt(document.getElementById('corners').getElementsByClassName('counter__amount')[0].textContent);
    let corners = cornersTemp > freeCorner ? (cornersTemp - freeCorner) * cornerPrice : 0;


    let light = lightPrice * parseInt(document.getElementById('light').getElementsByClassName('counter__amount')[0].textContent);

    let chand = chandPrice * parseInt(document.getElementById('chand').getElementsByClassName('counter__amount')[0].textContent);

    let totalPrice = (price * square) + corners + light + chand;

    console.log('Total price: ', totalPrice);
    document.getElementById('totalPrice').textContent = totalPrice;
}