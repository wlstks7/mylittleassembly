/**
 * Created by Artem M.
 * Date: 28.02.16
 * Email: frost.artem@gmail.com
 */
var socket;

$(document).ready(function(){
    socket = io.connect('http://localhost:8080');
});