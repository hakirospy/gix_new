 // trade in 

 document.querySelector('.tradein  .open_traide').addEventListener('click', function(){

 document.querySelector('.tradeincalc').style.display = 'block';
 document.querySelector('.tradein').style.display = 'none';

})


document.querySelector('.edit_traid').addEventListener('click', function(){

    document.querySelector('.tradeincalc').style.display = 'block';
    document.querySelector('.tradein').style.display = 'none';
    document.querySelector('.sales_trade').style.display = 'none';
   
   })

// close trade

document.querySelectorAll('.block_backet  .close_trade').forEach(close => {close.addEventListener('click', function(){


    document.querySelector('.tradein').style.display = 'none';
    document.querySelector('.tradeincalc').style.display = 'none';

     document.querySelector('.sales_trade').style.display = 'block';
     document.querySelector('.buy_block').style.position = 'sticky';
   
   
   }) 
})

//select model
document.querySelector('select[name="modelPhone"]').addEventListener('change', function(){
if(document.querySelector('select[name="obemPhone"]').options.selectedIndex == 0)getBugs();
    
    document.querySelector('.choose_haracteristic').style.display = 'block';
    calculate();
    document.querySelector('.buy_block').style.position = 'relative';
    if(window.innerWidth>800){
        window.scrollBy({
            top: 300,
            behavior: 'smooth'
        });


    }else{

        window.scrollTo(0,window.pageYOffset+20)
    }

})
// add to basket

function addToMainBasket(){


let price = document.querySelector('.main_price').getAttribute('new-price');
let sale = document.querySelector('.main_price').getAttribute('sale-price');
let idTov = document.querySelector('.main_price').getAttribute('idTov');
console.log(idTov);
let allData = dataToOrder()+sale;
fetch('https://gix.ru/calculator/addToBasket.php?'+idTov+'='+allData+'&price='+price).then((resp) => resp.text())
    .then((data) => {

console.log(data)

 
    })

}
// select RAM
document.querySelector('select[name="obemPhone"]').addEventListener('change', function(){

    if(document.querySelector('select[name="stayPhone"]').options.selectedIndex == 0)getBugs2();
   
    document.querySelector('.choose_trash').style.display = 'block';
    calculate();
    if(window.innerWidth>800){
    //window.scrollTo(0,600)


    window.scrollBy({
        top: 600,
        behavior: 'smooth'
    });


    }else{

        window.scrollTo(0,window.pageYOffset+20)

    }
})

// select stay
document.querySelector('select[name="stayPhone"]').addEventListener('change', function(){
    document.querySelector('.have_bags').style.display = 'block';
    calculate();
    if(window.innerWidth>800){
   

    window.scrollBy({
        top: 700,
        behavior: 'smooth'
    });

    }else{

        window.scrollTo(0,window.pageYOffset+120)

    }
})

// select bugs
document.querySelectorAll('.have_bags  span').forEach(buton=>
    { buton.addEventListener('click', function(){
console.log(buton.innerHTML)
    document.querySelectorAll('.have_bags  span')[0].classList.remove('active');
    document.querySelectorAll('.have_bags  span')[1].classList.remove('active');
    buton.classList.add('active')
    if(buton.innerHTML == "Да")  {document.querySelector('.choose_serial_number').style.display = 'block';




    if(window.innerWidth>800){
        window.scrollBy({
            top: 1000,
            behavior: 'smooth'
        });


}else{

        window.scrollTo(0,window.pageYOffset+200)

    }
    }
})
})

// randoom number 

function randomNum(){

   return Math.floor(Math.random() * 100)


}

// data to order

function dataToOrder(){

   let grande =  document.querySelector('select[name="obemPhone"]').options[document.querySelector('select[name="obemPhone"]').options.selectedIndex].text;
   let sostoyaniy = document.querySelector('select[name="stayPhone"]').options[document.querySelector('select[name="stayPhone"]').options.selectedIndex].text;
   let telephone = document.querySelector('select[name="modelPhone"]').options[document.querySelector('select[name="modelPhone"]').options.selectedIndex].text;

   return 'Model: '+telephone+';  Износ: '+grande+';  Состояние: '+sostoyaniy+";  Imei: "+document.querySelector('.changeSerial').value.trim()+";  Скидка: "

} 

//cut dot function

function cutDot(price){

price = String(price)

return price.replace('.', '');

}

//calculate price

function calculate(){

let model =  document.querySelector('select[name="modelPhone"]').options[document.querySelector('select[name="modelPhone"]').options.selectedIndex].value
let bug =  document.querySelector('select[name="obemPhone"]').options[document.querySelector('select[name="obemPhone"]').options.selectedIndex].value
let bug2 =  document.querySelector('select[name="stayPhone"]').options[document.querySelector('select[name="stayPhone"]').options.selectedIndex].value

fetch('https://gix.ru/calculator/items.json?rt='+randomNum()).then((resp) => resp.json())
    .then((data) => {
  let summa = parseInt(cutDot(data.find(item => item.model == model).level5))
   if(bug > 0) { summa = parseInt(cutDot(data.find(item => item.model == model)['level'+bug]))}
 
   if(bug2 < 0) {summa = summa + parseInt(cutDot(bug2))}
   

    mainPrice( summa)

    
})

}

function mainPrice( salePrice){

    document.querySelector('.main_price').setAttribute('sale-price',salePrice);
    let oldPrice = parseInt(document.querySelector('.main_price').getAttribute('data'))
    let newPrice = oldPrice - salePrice
    document.querySelector('.main_price').setAttribute('new-price',newPrice);
    document.querySelector('.main_price').innerHTML = newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' ₽ <span class="old_price_cart">'+oldPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' ₽</span>'
    document.querySelector('.old_price_cart').style.display = 'block';

    
    document.querySelector('.sales_trade .titlet').innerHTML = salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' <span>₽</span>'
}

// show old price 

document.querySelector('.have_bags .buttons_choose').addEventListener('click', function(){
document.querySelector('.old_price_cart').style.display = 'block';
      
})




// chose_serial
document.querySelector('.choseSerial').addEventListener('click', function(){

  
  
  document.querySelector('.choseSerial').classList.add('spinnerBtn')
    getImei(document.querySelector('.changeSerial').value.trim());

})



//YWT739YPRY 

async function getImei(imei) {
    try {
     
      const response = await fetch('https://gix.ru/f.php?imei='+imei, {mode: 'no-cors'});
      const dataFirst = await response.text(); 
      //fetch('https://gix.ru/imei/'+imei+'.json', {mode: 'no-cors'}).then((resp) => resp.json())
      fetch('https://gix.ru/imei/'+imei+'.json', {mode: 'no-cors'}).then((resp) => resp.json())
    .then((data) => {
        document.querySelector('.choseSerial').classList.remove('spinnerBtn')
        document.querySelector('.answer_text').innerHTML = data.result;
        document.querySelector('.answer_text').style.display = 'block';
      
    })
     
    } catch (error) {
      console.error(error);
    }
  }


// get model

function getModel(){
   let  models = '<option selected disabled>Model</option>'
    fetch('https://gix.ru/calculator/items.json?rt='+randomNum(),{mode: 'no-cors'}).then((resp) => resp.json())
    .then((data) => {
        data.forEach((item) => {

models += `<option value='${item.model}'>${item.model}</option>`


        })
       
        document.querySelector('select[name="modelPhone"]').innerHTML = models
    })

}

getModel();

// get bugs
function getBugs(){
    let  models = '<option selected value=0 >---</option>'
     fetch('https://gix.ru/calculator/bugs.json?rt='+randomNum(),{mode: 'no-cors'}).then((resp) => resp.json())
     .then((data) => {
         data.forEach((item) => {
 
 models += `<option value='${item.grade}'>${item.descr}</option>`
 
 
         })
        
         document.querySelector('select[name="obemPhone"]').innerHTML = models
     })
 
 }
 // get bugs2
function getBugs2(){
     let  models = '<option value="0" selected value=0>---</option>'
     fetch('https://gix.ru/calculator/bugs2.json?rt='+randomNum(),{mode: 'no-cors'}).then((resp) => resp.json())
     .then((data) => {
        data.forEach((item) => {
 
            models += `<option value='${item.price}'>${item.addition}</option>`
 
                                })
        
        document.querySelector('select[name="stayPhone"]').innerHTML = models
     })
 
 }
 


