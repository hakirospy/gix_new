var value,
quantity = document.getElementsByClassName('count_element');

function createBindings(quantityContainer) {
var quantityAmount = quantityContainer.getElementsByClassName('input_coll')[0];
var increase = quantityContainer.getElementsByClassName('plus')[0];
var decrease = quantityContainer.getElementsByClassName('minus')[0];
increase.addEventListener('click', function () { increaseValue(quantityAmount); });
decrease.addEventListener('click', function () { decreaseValue(quantityAmount); });
}



document.querySelector('input[name="name"]').addEventListener("keyup", (event) => { 
    
    

    document.querySelector('input[name="ORDER_PROP_1"]').value  = event.srcElement.value + ' ' + document.querySelector('input[name="lastname"]').value + ' ' + document.querySelector('input[name="otchestvo"]').value

})

document.querySelector('input[name="lastname"]').addEventListener("keyup", (event) => { 
    
   

    document.querySelector('input[name="ORDER_PROP_1"]').value  = document.querySelector('input[name="name"]').value + ' ' + event.srcElement.value + ' ' + document.querySelector('input[name="otchestvo"]').value

})

 

document.querySelector('input[name="otchestvo"]').addEventListener("keyup", (event) => { 
    
    

    document.querySelector('input[name="ORDER_PROP_1"]').value  = document.querySelector('input[name="name"]').value + ' ' + document.querySelector('input[name="lastname"]').value + ' ' + event.srcElement.value

})



document.querySelector('input[name="email"]').addEventListener("keyup", (event) => { 
    


    document.querySelector('input[name="ORDER_PROP_2"]').value = event.srcElement.value

})


document.querySelector('input[name="phone"]').addEventListener("keyup", (event) => { 
    
    document.querySelector('input[name="ORDER_PROP_3"]').value = event.srcElement.value

})

document.querySelector('input[name="address"]').addEventListener("keyup", (event) => { 
    
    document.querySelector('textarea[name="ORDER_PROP_7"]').value = event.srcElement.value

})


 


function init() {
for (var i = 0; i < quantity.length; i++) {
    createBindings(quantity[i]);
}

count_all_summ()
};

function increaseValue(quantityAmount) {
value = parseInt(quantityAmount.value, 10);

value = isNaN(value) ? 0 : value;
value++;
quantityAmount.value = value;

choose_price_tovar(quantityAmount, value)
//quantityAmount.parentNode.parentNode.children[4].innerText = parseInt(price) * parseInt(value) + " ₽"





}

function choose_price_tovar(quantityAmount, value){

var price = parseInt(quantityAmount.parentNode.parentNode.children[3].innerText.replace(/ /g, ''));
var summa = parseInt(price) * parseInt(value)
var inputWork = quantityAmount.parentNode.parentNode.children[4]

animateValue(inputWork, parseInt(inputWork.innerText.replace(/ /g, '')), summa, 500);

count_all_summ() 

}

function decreaseValue(quantityAmount) {
value = parseInt(quantityAmount.value, 10);

value = isNaN(value) ? 0 : value;
if (value > 0) value--;

quantityAmount.value = value;

choose_price_tovar(quantityAmount, value)
}

function count_all_summ() {

const elements = document.querySelectorAll('.elements_list');
var price_element = 0;
var countElem = 0
elements.forEach(function (trigger) {

price_element = price_element + parseInt(trigger.children[3].innerText.replace(/ /g, '')) * parseInt(trigger.children[2].children[1].value)
countElem++
})

console.log(price_element)

var mainPrice = document.querySelector('.all_price')
var countAllElemName = document.querySelector('.countAllElem')
var deliverPrice = parseInt(document.querySelector('input[name="delivery_price"]').value)
var old_price = parseInt(mainPrice.innerText.replace(/ /g, ''))
document.querySelector('input[name="all_price"]').value = price_element
countAllElemName.innerHTML = countElem + nameTovar(countElem)
animationData( old_price, price_element, deliverPrice)




}

function animationData( old_price, price_element, deliverPrice){
    var mainPrice = document.querySelector('.all_price')
    var mainPriceSpan = document.querySelector('.all_summ_span')
    var smallAll = document.querySelector('.summ_tovar_count span')

    var allPriceElem = document.querySelector('.all_price_elem')
    var allPriceElemF = document.querySelector('.all_price_elem_f')
    var allPriceCalc = document.querySelector('.allPriceCalc')
    let allPriceOplata = document.querySelector('.allPriceOplata')
    

    animateValue(mainPrice, old_price, price_element + deliverPrice, 500)
    animateValue(mainPriceSpan, old_price, price_element, 500)
    animateValue(smallAll, old_price, price_element, 500)
    animateValue(allPriceElem, old_price, price_element, 500)
    animateValue(allPriceElemF, old_price, price_element, 500)
    animateValue(allPriceCalc, old_price, price_element + deliverPrice, 500)
    animateValue(allPriceOplata, old_price, price_element + deliverPrice, 500)
    


}

function addDeliveryToSumm(){
    var deliverPrice = document.querySelector('input[name="delivery_price"]').value
    var allPriceCalc = document.querySelector('.allPriceCalc')
    let  allPriceOplata = document.querySelector('.allPriceOplata')
    var mainPriceElem = document.querySelector('.all_price')
    var mainPrice = parseInt(document.querySelector('input[name="all_price"]').value)
    var newMainPrice = mainPrice + parseInt(deliverPrice)

    animateValue(mainPriceElem, mainPrice, newMainPrice, 500)
    animateValue(allPriceCalc, mainPrice, newMainPrice, 500)
    animateValue(allPriceOplata, mainPrice, newMainPrice, 500)


}

function nameTovar(countElem){

if(countElem==1){
return " товар"

}else if(countElem>1 && countElem<5){

    return " товара"
}else{
    return " товаров"

}

}

/*delete element*/


let allTovarsList = document.querySelectorAll('.elements_list .delete_element')
allTovarsList.forEach((deletes) => { 
    deletes.addEventListener('click', (event) => {
         
  event.target.parentNode.parentNode.remove()
  count_all_summ()

         
     
    
    })
    })

/*checked*/ 

let allCheckBox = document.querySelectorAll('.radio_button.deliv')
let delivePrice = document.querySelector('input[name="delivery_price"]')
let deliveCalc = document.querySelector('.deliveCalc')
let deliverLast = document.querySelector('.deliverLast')
let deliverMainBlock = document.querySelector('.deliverMainBlock')
allCheckBox.forEach((checkbox) => { 
checkbox.addEventListener('change', (event) => {
if (event.target.checked) {


    delivePrice.value = event.target.value
    deliveCalc.innerHTML = event.target.value
    deliverLast.innerHTML = event.target.value + " ₽"
    deliverMainBlock.innerHTML = event.target.value + " ₽"
    addDeliveryToSumm()
     

}
})
})




function animateValue(obj, start, end, duration) {
let startTimestamp = null;
const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = number_format(Math.floor(progress * (end - start) + start),0, ',', ' ') + " ₽";
    if (progress < 1) {
        window.requestAnimationFrame(step);
    }
    //obj.innerHTML = end + " ₽"
};
window.requestAnimationFrame(step);

}






init();


function number_format (number, decimals, dec_point, thousands_sep) {
var n = number, prec = decimals;

var toFixedFix = function (n,prec) {
var k = Math.pow(10,prec);
return (Math.round(n*k)/k).toString();
};

n = !isFinite(+n) ? 0 : +n;
prec = !isFinite(+prec) ? 0 : Math.abs(prec);
var sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
var dec = (typeof dec_point === 'undefined') ? '.' : dec_point;

var s = (prec > 0) ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec); 
//fix for IE parseFloat(0.55).toFixed(0) = 0;

var abs = toFixedFix(Math.abs(n), prec);
var _, i;

if (abs >= 1000) {
_ = abs.split(/\D/);
i = _[0].length % 3 || 3;

_[0] = s.slice(0,i + (n < 0)) +
   _[0].slice(i).replace(/(\d{3})/g, sep+'$1');
s = _.join(dec);
} else {
s = s.replace('.', dec);
}

var decPos = s.indexOf(dec);
if (prec >= 1 && decPos !== -1 && (s.length-decPos-1) < prec) {
s += new Array(prec-(s.length-decPos-1)).join(0)+'0';
}
else if (prec >= 1 && decPos === -1) {
s += dec+new Array(prec).join(0)+'0';
}
return s; 
}

/* click on button edetor*/
function activeRemoveTab(){

    document.querySelector('.animation_tab').classList.add('close');
    document.querySelector('.animation_tab').classList.remove('active');
    
    document.querySelector('.topTab').style.display ='flex';
    var elementList = document.querySelectorAll('.tabcontent');
    Array.prototype.forEach.call(elementList, function (e) {
    
        e.classList.add('close');
        e.classList.remove('active');
    
    });
    
    var elementList = document.querySelectorAll('.edit_tab');
    Array.prototype.forEach.call(elementList, function (e) {
    
        e.classList.remove('close');
        e.classList.remove('active');
    });

}


document.querySelectorAll('.edit_tab').forEach(function (editor) {editor.addEventListener('click', function (e) {

activeRemoveTab()

editor.classList.add('close');
editor.parentNode.parentNode.children[1].classList.remove('close');
editor.parentNode.parentNode.children[1].classList.add('active');
console.log(editor.parentNode)


timerOpenP(editor.parentNode.parentNode)

})

})

function timerOpenP(elem){

    setTimeout(function() {
        elem.scrollIntoView(true);
        window.scrollBy(0, -80);
      }, 300);
}

let button_next = document.querySelector('.button_next')
button_next.addEventListener('click', function (event) {

    activeRemoveTab()
 

document.querySelector('.navigate_order').children[1].appendChild(document.createElement('span'))
document.querySelector('.navigate_order').children[0].classList.add('grens')
document.querySelector('.delivery .tabcontent').classList.remove('close');
document.querySelector('.delivery .tabcontent').classList.add('active');

document.querySelector('.order_content_blue .title').innerHTML = "Шаг 2 из 3. Введите данные для доставки"



  timerOpenP(document.querySelector('.delivery ').parentNode.children[1])

})


let button_next_delivery = document.querySelector('.button_next_delivery')
button_next_delivery.addEventListener('click', function (event) {

    activeRemoveTab()

   
document.querySelector('.navigate_order').children[2].appendChild(document.createElement('span'))
document.querySelector('.navigate_order').children[1].classList.add('grens')
document.querySelector('.oplata .tabcontent').classList.remove('close');
document.querySelector('.oplata .tabcontent').classList.add('active');

document.querySelector('.order_content_blue .title').innerHTML = "Шаг 3 из 3. Выберите удобный способ оплаты"

timerOpenP(document.querySelector('.oplata'))



})


let button_next_oplata= document.querySelector('.button_next_oplata')
button_next_oplata.addEventListener('click', function (event) {

activeRemoveTab()

})


function initAcc(elem, option){

document.addEventListener('click', function (e) {
if (!e.target.matches(elem+' .edit_tab')) return;
else{
if(!e.target.parentElement.classList.contains('active')){
    if(option==true){
        var elementList = document.querySelectorAll(elem+' .a-container');
        Array.prototype.forEach.call(elementList, function (e) {
            e.classList.remove('active');
        });
    }            
    e.target.parentElement.classList.add('active');
}else{
    e.target.parentElement.classList.remove('active');
}
}
});
}

initAcc('.tabs', true);


/*popap*/

const modals = document.querySelectorAll('[data-modal]');

modals.forEach(function (trigger) {
trigger.addEventListener('click', function (event) {
event.preventDefault();
const modal = document.getElementById(trigger.dataset.modal);
modal.classList.add('open');
const exits = modal.querySelectorAll('.modal-exit');
exits.forEach(function (exit) {
exit.addEventListener('click', function (event) {
event.preventDefault();
modal.classList.remove('open');
});
});
});
});




