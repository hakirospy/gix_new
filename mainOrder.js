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

if(price_element == 0)  window.location.replace("/personal/cart/");

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

let button_next = document.querySelector('.perehod_delivery')
button_next.addEventListener('click', function (event) {

    activeRemoveTab()
 

document.querySelector('.navigate_order').children[1].appendChild(document.createElement('span'))
document.querySelector('.navigate_order').children[0].classList.add('grens')
document.querySelector('.delivery .tabcontent').classList.remove('close');
document.querySelector('.delivery .tabcontent').classList.add('active');

document.querySelector('.order_content_blue .title').innerHTML = "Шаг 2 из 3. Введите данные для доставки"



  timerOpenP(document.querySelector('.delivery ').parentNode.children[1])

})



function checkedRadio(elem){
    let result =false
    const radioButtons = document.querySelectorAll('input[name="'+elem+'"]');
    radioButtons.forEach(function($checkbox) {

        
            if ($checkbox.checked) {
        
                result = true
            }
        
    }
    )

    return result
}


function validate_delivery(){

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

if(document.querySelector('input[name="phone"]').value.length < 10  ){
document.querySelector('input[name="phone"]').reportValidity()
document.querySelector('input[name="phone"]').setCustomValidity('Введите номер телефона')


}else if(validateEmail(document.querySelector('input[name="email"]').value) == null ){


 
    document.querySelector('input[name="email"]').reportValidity()
    document.querySelector('input[name="email"]').setCustomValidity('Введите адресс вашей почты')

}else if(document.querySelector('input[name="otchestvo"]').value.length < 5 ){
    document.querySelector('input[name="otchestvo"]').reportValidity()
    document.querySelector('input[name="otchestvo"]').setCustomValidity('Введите свое Отчество')


}else if(document.querySelector('input[name="lastname"]').value.length < 2 ){

    document.querySelector('input[name="lastname"]').reportValidity()
    document.querySelector('input[name="lastname"]').setCustomValidity('Введите свою Фамилию')


}else if(document.querySelector('input[name="name"]').value.length < 2 ){

    document.querySelector('input[name="name"]').reportValidity()
    document.querySelector('input[name="name"]').setCustomValidity('Введите свое имя')

}else if(document.querySelector('input[name="address"]').value.length < 7 ){

document.querySelector('input[name="address"]').reportValidity()
document.querySelector('input[name="address"]').setCustomValidity('Введите адресс доставки')

}else if(checkedRadio('radio') == false ){
    document.querySelector('input[name="radio"]').reportValidity()
    document.querySelector('input[name="radio"]').setCustomValidity('Выберите один из вариантов доставки ')

}else{

return true

} 
}

document.querySelector('input[name="phone"]').addEventListener('keyup', function (e) {

this.setCustomValidity('');

})


document.querySelector('input[name="name"]').addEventListener('keyup', function (e) {

    this.setCustomValidity('');
    
    })



    document.querySelector('input[name="email"]').addEventListener('keyup', function (e) {

        this.setCustomValidity('');
        
        })




        document.querySelector('input[name="lastname"]').addEventListener('keyup', function (e) {

            this.setCustomValidity('');
            
            })
            document.querySelector('input[name="otchestvo"]').addEventListener('keyup', function (e) {

                this.setCustomValidity('');
                
                })
                document.querySelector('input[name="address"]').addEventListener('keyup', function (e) {

                    this.setCustomValidity('');
                    
                    })




/*document.querySelector('input[name="phone"]').addEventListener('input', function (y) {
    var a = y.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    y.target.value = !a[2] ? a[1] : '(' + a[1] + ') ' + a[2] + (a[3] ? '-' + a[3] : '')+(a[4] ? '-' + a[4] : '');
});*/

var phoneMask = IMask(
    document.querySelector('input[name="phone"]'), {
      mask: '+{7} (000) 000-00-00'
    });

let button_next_delivery = document.querySelector('.perehod_oplata')
button_next_delivery.addEventListener('click', function (event) {

    
if(validate_delivery() == true){

    activeRemoveTab()

   
document.querySelector('.navigate_order').children[2].appendChild(document.createElement('span'))
document.querySelector('.navigate_order').children[1].classList.add('grens')
document.querySelector('.oplata .tabcontent').classList.remove('close');
document.querySelector('.oplata .tabcontent').classList.add('active');

document.querySelector('.order_content_blue .title').innerHTML = "Шаг 3 из 3. Выберите удобный способ оплаты"

timerOpenP(document.querySelector('.oplata'))
BX.Sale.OrderAjaxComponent.sendRequest('refreshOrderAjax');
}


})


document.querySelector('.count_element .input_coll').addEventListener('keyup', function (event) {

    console.log(this.parentElement.parentElement)


/*var ty=$(this).attr('idtov');

    var post = {};
    post[ty] = $(this).val();
    post['z']=$(this).attr('id_znach');

    BX.ajax.post(
        "/local/ajax/edit_col.php",
        post,
        function (data) {
        	console.log(data);
            BX.Sale.OrderAjaxComponent.sendRequest('refreshOrderAjax');


        }
    );*/

});




let button_next_oplata= document.querySelector('.perehod_oformit')
button_next_oplata.addEventListener('click', function (event) {

    if(checkedRadio('radioPay') == false ){
        document.querySelector('input[name="radio"]').reportValidity()
        document.querySelector('input[name="radio"]').setCustomValidity('Выберите один из вариантов оплаты ')
    
    }else{

       

        document.querySelector("#ID_PAY_SYSTEM_ID_2").click() 
        activeRemoveTab()
        
       
        document.querySelector("#bx-soa-orderSave > a").click()


    }

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

function deleteTovar(id){

fetch(`/local/ajax/delete_tovar.php?&tovar=${id}`).then(data => data.json()).then(data => {
    document.querySelector("#delete"+id).remove()
  
count_all_summ()


console.log(data);
   

   
})
}





