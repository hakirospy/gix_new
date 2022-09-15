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

function searchFunc(event){

    if(window.innerWidth<800){
        console.log(0)
    
    document.querySelector('.search_mobile').style.display = 'block'
    
    document.querySelector('.main_slider_block').style.display = 'none'
    
    
    event.preventDefault();
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


document.querySelector('.buttom-favorite .clear').addEventListener('click',function(){


    fetch(`/local/ajax/delete_favourite.php?&add_backet=9`).then(data => data.json()).then(data => {
console.log('delete');
location.reload();

    })
})




document.querySelector('.buttom-favorite .buy-all').addEventListener('click',function(){


    fetch(`/local/ajax/delete_favourite.php?&add_backet=7`).then(data => data.json()).then(data => {
console.log('to backet');
location.reload();

    })
})


$(document).ready(function() {
    /* Favorites */
    $('.favor').on('click', function(e) {
        var favorID = $(this).attr('data-item');
        if($(this).hasClass('active'))
            var doAction = 'delete';
        else
            var doAction = 'add';

        addFavorite(favorID, doAction);
    });
    /* Favorites */
});
/* Избранное */
    function addFavorite(id, action)
    {
        var param = 'id='+id+"&action="+action;
        $.ajax({
            url:     '/local/ajax/favorites.php', // URL отправки запроса
            type:     "GET",
            dataType: "html",
            data: param,
            success: function(response) { // Если Данные отправлены успешно
                var result = $.parseJSON(response);
                if(result == 1){ // Если всё чётко, то выполняем действия, которые показывают, что данные отправлены :)
                     $('.favor[data-item="'+id+'"]').addClass('active');
                     var wishCount = parseInt($('#want .col').html()) + 1;
                     $('#want .col').html(wishCount); // Визуально меняем количество у иконки
                }
                if(result == 2){
                     $('.favor[data-item="'+id+'"]').removeClass('active');
                     var wishCount = parseInt($('#want .col').html()) - 1;
                     $('#want .col').html(wishCount); // Визуально меняем количество у иконки
                }
            },
            error: function(jqXHR, textStatus, errorThrown){ // Если ошибка, то выкладываем печаль в консоль
                console.log('Error: '+ errorThrown);
            }
         });
    }
/* Избранное */

      