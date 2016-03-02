/**
 * Created by Artem M.
 * Date: 28.02.16
 * Email: frost.artem@gmail.com
 */

$(document).ready(function(){

    $('.nameHolderGroup').delegate('button', 'click', function(){
        var input = $(this).parents('div').eq(0).find('input');
        if(input.val())
            socket.emit('setName', {'name': input.val()});
        input.val('');
    });

    socket.on('message', function(data){
        console.log(data);

        floating(data.data);
    });

    $('.messageSender').delegate('button', 'click', function(){
        var input = $(this).parents('div').eq(0).find('input');
        if(input.val())
            socket.emit('newMessage', {'message': input.val()});
        input.val('');
    });
    
    $(".messageSender input").keydown(function (key) {
        if (key.keyCode == 13) {
            $('.btn-default').trigger('click');
        }
    });

    $('body').prepend('<div class="container"><iframe width="100%" height="auto" class="video" src="https://www.youtube.com/embed/NAf3G5UQSYQ" frameborder="0" allowfullscreen></iframe></div>');
});


function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function floating(d){
    var maxLeft = parseInt($(window).width() - 100,10);
    var maxTop = parseInt($(window).height() - 100,10);
    var ino = getRandomInt(1,27);
    var html = '';
        html += '<div class="box i'+ino+'" style="top:'+getRandomInt(0,maxTop)+'px;left:'+getRandomInt(0,maxLeft)+'px" class="div"><img src="/assets/icon/i_'+ino+'.png" />'+d+'</div>';
    $('body').append(html);
    $('.i'+ino).fadeOut(5000);
}
