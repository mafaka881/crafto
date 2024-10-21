/*Відкриваєм форму*/

let modals = document.getElementById('modal_box');

function openModal(){
    modals.style.display = "flex";
}

function closeModal(){
    modals.style.display = "none";
}

modals.onclick = function(event){
    if(event.target == modals){
        closeModal();
    }
}


/*****Друга форма *******/

let models = document.querySelector(".model");

function openModel(){
    models.style.display = "flex";
}

function closeModel(){
    models.style.display = "none";
}

window.onclick = function(event){
    if(event.target == models){
        closeModel();
    }
}

/* Форма для відправки данних клієнта*/

$('.telegram-form').on('submit', function (event) {

    event.stopPropagation();
    event.preventDefault();

    let form = this,
        submit = $('.submit', form),
        data = new FormData(),
        files = $('input[type=file]')


    $('.submit', form).val('Отправка...');
    $('input, textarea', form).attr('disabled','');

    data.append( 'name ', 		$('[name="name"]', form).val() );
    data.append( 'phone ', 		$('[name="phone"]', form).val() );
    data.append( 'text ', 		$('[name="text"]', form).val() );
       


    files.each(function (key, file) {
        let cont = file.files;
        if ( cont ) {
            $.each( cont, function( key, value ) {
                data.append( key, value );
            });
        }
    });

    $.ajax({
        url: 'ajax.php',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        xhr: function() {
            let myXhr = $.ajaxSettings.xhr();

            if ( myXhr.upload ) {
                myXhr.upload.addEventListener( 'progress', function(e) {
                    if ( e.lengthComputable ) {
                        let percentage = ( e.loaded / e.total ) * 100;
                            percentage = percentage.toFixed(0);
                        $('.submit', form)
                            .html( percentage + '%' );
                    }
                }, false );
            }

            return myXhr;
        },
        error: function( jqXHR, textStatus ) {
            $('.errorMess').text("Щось пішло не так");
            // Тут выводим ошибку
        },
        complete: function() {
            // Тут можем что-то делать ПОСЛЕ успешной отправки формы
            $('.errorMess').text("Успішно! Ми вам передзвонимо");
            console.log('Complete')
            form.reset() 
        }
    });

    return false;
});



