

var socket = io();

function scrollToBottom(){
   var messages = jQuery('#message');
   var newMessage = messages.children('li:last-child');
   var clientHeight = messages.prop('clientHeight');
   var scrollTop = messages.prop('scrollTop');
   var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
   //var lastMessageHeight = newMessage.prev().innerHeight();
   if(clientHeight+scrollTop+newMessageHeight>=scrollHeight)
   {
       messages.scrollTop(scrollHeight);
   }
}

socket.on('connect', function () {
    console.log('connect to new user');
});


socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function (message) {
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createAt).format('h:mm a');
    var html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createAt:formattedTime
    });
    jQuery('#message').append(html);
    scrollToBottom();
    console.log('something');
    // var li = jQuery('<li></li>');
    // li.text(message.from+': '+message.text+' '+formattedTime);
    // jQuery('#message').append(li);
})

socket.on('newLocationMessage',function(message){
   var formattedTime = moment(message.createAt).format('h:mm a');
   var template = jQuery('#location-message-template').html();
   var html = Mustache.render(template,{
       from:message.from,
       url:message.url,
       createAt:formattedTime
   });
//    var li = jQuery('<li></li>');
//    var a = jQuery('<a target = "_blank">My current location</a>');

//    li.text(message.from+':');
//    a.attr('href', message.url);
//    li.append(a);
//    li.append(' '+formattedTime);
   
   jQuery('#message').append(html);
   scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]')
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () { 
        messageTextbox.val('')
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
     if(!navigator.geolocation){
         return alert('geolocation not supported by your browser.');
     }

locationButton.attr('disabled','disabled').text('Sending Location...');

     navigator.geolocation.getCurrentPosition(function(position){
         locationButton.removeAttr('disabled').text('Send location');
         socket.emit('createLocationMessage',{
             latitude:position.coords.latitude,
             longitude:position.coords.longitude
         })
         console.log(position);
     },function(){
         locationButton.removeAttr('disabled').text('Send location');
         alert('Unable to fetch location');
     })
});
