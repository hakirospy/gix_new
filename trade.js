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
   
   
   }) 
})

//select model
document.querySelector('select[name="modelPhone"]').addEventListener('change', function(){
if(document.querySelector('select[name="obemPhone"]').options.selectedIndex == 0)getBugs();
    
    document.querySelector('.choose_haracteristic').style.display = 'block';
    calculate();
    window.scrollTo(0,900)
    

})
// select RAM
document.querySelector('select[name="obemPhone"]').addEventListener('change', function(){


    if(document.querySelector('select[name="stayPhone"]').options.selectedIndex == 0)getBugs2();
   
    document.querySelector('.choose_trash').style.display = 'block';
    calculate();
    window.scrollTo(0,1000)

})

// select stay
document.querySelector('select[name="stayPhone"]').addEventListener('change', function(){

    
    document.querySelector('.have_bags').style.display = 'block';
    calculate();
    window.scrollTo(0,1100)

})


// select bugs
document.querySelectorAll('.have_bags  span').forEach(buton=>
    { buton.addEventListener('click', function(){

    document.querySelectorAll('.have_bags  span')[0].classList.remove('active');
    document.querySelectorAll('.have_bags  span')[1].classList.remove('active');
    document.querySelector('.choose_serial_number').style.display = 'block';
    buton.classList.add('active')
    window.scrollTo(0,1200)


})
})

// randoom number 

function randomNum(){

   return Math.floor(Math.random() * 100)


}

//calculate price

function calculate(){


let model =  document.querySelector('select[name="modelPhone"]').options[document.querySelector('select[name="modelPhone"]').options.selectedIndex].value
let bug =  document.querySelector('select[name="obemPhone"]').options[document.querySelector('select[name="obemPhone"]').options.selectedIndex].value
let bug2 =  document.querySelector('select[name="stayPhone"]').options[document.querySelector('select[name="stayPhone"]').options.selectedIndex].value


fetch('https://gix.ru/calculator/items.json?rt='+randomNum()).then((resp) => resp.json())
    .then((data) => {
  let summa = parseInt(data.find(item => item.model == model).level5.replace('.', ""))
   if(bug > 0) { summa = parseInt(data.find(item => item.model == model)['level'+bug].replace('.', ""))}
   console.log(summa)
   if(bug2 < 0) {summa = summa + parseInt(bug2.replace('.', ""))}
   

    mainPrice( summa)

    
})


}


function mainPrice( salePrice){


    let oldPrice = parseInt(document.querySelector('.main_price').getAttribute('data'))
    let newPrice = oldPrice - salePrice
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
 


