const socket = io();
socket.emit('message', "Hola me estoy comunicando dsde un webSocket");