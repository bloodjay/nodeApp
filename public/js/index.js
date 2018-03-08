

var socket = io();

socket.on('connect', function () {
    console.log('connect to new user');
});


socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function (message) {
    console.log('newMessage', message)
    var li = jQuery('<li></li>');
    li.text(message.from+': '+message.text);

    jQuery('#message').append(li);
})

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, function (data) {
    console.log('Got it', data);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () { })
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
     if(navigator.geolocation){
         return alert('geolocation not supported by your browser.');
     }

     navigator.geolocation.getCurrentPosition(function(position){
         console.log(position);
     },function(){
         alert('Unable to fetch location');
     })
});
