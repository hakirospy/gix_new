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



// menu next list prev list

var $mobileMenu = $(".button_menu.open");
  if ($mobileMenu.length) {
    $mobileMenu.isLeftSide = $mobileMenu.hasClass("leftside");
    $mobileMenu.isOpen = $mobileMenu.hasClass("show");
    $mobileMenu.isDowndrop = false;//$mobileMenu.find(">.scroller").hasClass("downdrop");
   
  }

  if (!$mobileMenu.isDowndrop) {
    var $wrap = $mobileMenu.find(".wrap").first();
    var params = $wrap.data("params");
    if (typeof params === "undefined") {
      params = {
        depth: 0,
        scroll: {},
        height: {},
      };
    }
    $wrap.data("params", params);
    console.log('add xero param');
  }



  $(document).on("click", ".button_menu .item a ", function (e) {
    var $this = $(this);

   

    if ($this.hasClass("parent")) {
      e.preventDefault();
  
      if (!$mobileMenu.isDowndrop) {
        $this.closest(".menu_mob").addClass("expanded");
        MoveMobileMenuWrapNext();
      } else {
        if (!$this.closest(".menu_mob").hasClass("expanded")) {
          $this.closest(".menu_mob").addClass("expanded");
        } else {
          $this.closest(".menu_mob").removeClass("expanded");
        }
      }
    } else {
      if ($this.closest("li").hasClass("counters")) {
        var href = $this.attr("href");
        if (typeof href !== "undefined") {
          if (href !== "javascript:void(0)") {
            window.location.href = href;
            window.location.reload();
          } else {
            return
          }
        }
      }

   
    }
  });

  $(document).on("click", ".button_menu .dropdown .menu_back", function (e) {
    e.preventDefault();
    var $this = $(this);
    MoveMobileMenuWrapPrev();
    setTimeout(function () {
      $this.closest(".expanded").removeClass("expanded");
    }, 400);
  });


function MoveMobileMenuWrapNext() {
    if (!$mobileMenu.isDowndrop) {
      var $scroller = $mobileMenu.find(".scroller").first();
      var $wrap = $mobileMenu.find(".wrap").first();
      
      if ($wrap.length) {
       
        var params = $wrap.data("params");
        console.log('params'+ params)
        var $dropdownNext = $mobileMenu.find(".expanded>.dropdown").eq(params.depth);
        if ($dropdownNext.length) {
            console.log('scroller ')
          // save scroll position
          params.scroll[params.depth] = parseInt($mobileMenu.scrollTop());

          // height while move animating
          params.height[params.depth + 1] = Math.max(
            $dropdownNext.height(),
            !params.depth
              ? $wrap.height()
              : $mobileMenu
                  .find(".expanded>.dropdown")
                  .eq(params.depth - 1)
                  .height()
          );
          $scroller.css("height", params.height[params.depth + 1] + "px");

          // inc depth
          ++params.depth;

          // translateX for move
          $wrap.css("transform", "translateX(" + -100 * params.depth + "%)");

          // scroll to top
          setTimeout(function () {
            $mobileMenu.animate({ scrollTop: 0 }, 200);
          }, 100);

          // height on enimating end
          var h = $dropdownNext.height();
          setTimeout(function () {
            if (h) {
              $scroller.css("height", h + "px");
            } else {
              $scroller.css("height", "");
            }
          }, 200);
        }

        $wrap.data("params", params);
      }
    }
  }

  function MoveMobileMenuWrapPrev() {
    if (!$mobileMenu.isDowndrop) {
      var $scroller = $mobileMenu.find(".scroller").first();
      var $wrap = $mobileMenu.find(".wrap").first();
      if ($wrap.length) {
        var params = $wrap.data("params");
        if (params.depth > 0) {
          var $dropdown = $mobileMenu.find(".expanded>.dropdown").eq(params.depth - 1);
          if ($dropdown.length) {
            // height while move animating
            $scroller.css("height", params.height[params.depth] + "px");

            // dec depth
            --params.depth;

            // translateX for move
            $wrap.css("transform", "translateX(" + -100 * params.depth + "%)");

            // restore scroll position
            setTimeout(function () {
              $mobileMenu.animate({ scrollTop: params.scroll[params.depth] }, 200);
            }, 100);

            // height on enimating end
            var h = !params.depth
              ? false
              : $mobileMenu
                  .find(".expanded>.dropdown")
                  .eq(params.depth - 1)
                  .height();
            setTimeout(function () {
              if (h) {
                $scroller.css("height", h + "px");
              } else {
                $scroller.css("height", "");
              }
            }, 200);
          }
        }

        $wrap.data("params", params);
      }
    }
  }




// menu

document.querySelector('.button_menu').addEventListener('click', function(){
if(document.querySelector('.button_menu').classList.contains('open') == false){







    this.classList.toggle('open')
    document.querySelector('body').classList.toggle('overflow_html') 
}
    })

   
var mobilemenu = document.querySelector('#mobilemenu-overlay')
if(mobilemenu){


    mobilemenu.addEventListener('click', function(){

        //document.querySelector('.button_menu').classList.remove('open')


    })
}


document.querySelector('.add_call').addEventListener('click', function(){

    document.querySelector('.invite').click();
    document.querySelector('.js-fa-phone i').click();


})


document.querySelector('#main_liked').addEventListener('click', function(){

    window.location.replace('/izbrannoe/');

})


document.querySelector('#main_compare').addEventListener('click', function(){

    window.location.replace('/catalog/compare/');

})


 

// mobile search 

function searchFunc(event){

    if(window.innerWidth<800){
      
    
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




var clear = document.querySelector('.buttom-favorite .clear')
if(clear){
clear.addEventListener('click',function(){


    fetch(`/local/ajax/delete_favourite.php?add_backet=9`).then(data => data.json()).then(data => {
console.log('delete');
location.reload();

    })
})
}

var buyAll = document.querySelector('.buttom-favorite .buy-all')
if(buyAll){
    buyAll.addEventListener('click',function(){


    fetch(`/local/ajax/delete_favourite.php?add_backet=7`).then(data => data.json()).then(data => {
console.log('to backet');
location.reload();

    })
})
}

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

      