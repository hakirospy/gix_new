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


    document.querySelector('.bx-searchtitle').addEventListener('click', function(){

        this.classList.toggle('open')
        console.log(window.innerWidth)
        
        })