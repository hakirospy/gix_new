function AddCompare(id)
{
  var chek = document.getElementById('compareid_'+id);
    if (chek.classList.contains("active"))
        {

 //Удалить
        var AddedGoodId = id;
            $.get("/local/ajax/list_compare.php",
            { action: "DELETE_FROM_COMPARE_LIST", id: AddedGoodId},
                function(data) {
chek.classList.remove('active');
					//$("#compare_list_count").html(data);
            }
            );
    }



    else
       {

  //Добавить
        var AddedGoodId = id;
            $.get("/local/ajax/list_compare.php",
            { 
                action: "ADD_TO_COMPARE_LIST", id: AddedGoodId},
                function(data) {
chek.classList.add('active');
					//$("#compare_list_count").html(data);
        	}
        );

}
	}

// menu

document.querySelector('.button_menu').addEventListener('click', function(){

    this.classList.toggle('open')
    document.querySelector('body').classList.toggle('overflow_html')
    
    })


    /*document.querySelector('.bx-searchtitle').addEventListener('click', function(){

        this.classList.toggle('open')
        console.log(window.innerWidth)
        
        })*/

// mobile search 

function searchFunc(){

    if(window.innerWidth<800){
        console.log(0)
    
    document.querySelector('.search_mobile').style.display = 'block'
    
    document.querySelector('.main_slider_block').style.display = 'none'
    
    
    return false
    }else{
    return true
    }

}
/*document.querySelector('#search .icon').addEventListener('submit', function(){


if(window.innerWidth<800){
    console.log(0)

document.querySelector('.search_mobile').style.display = 'block'

document.querySelector('.main_slider_block').style.display = 'none'



}

return false

}, false)*/

document.querySelector('.search_mobile .close').addEventListener('click', function(){

    document.querySelector('.search_mobile').style.display = 'none'

    document.querySelector('.main_slider_block').style.display = 'grid'


})

      