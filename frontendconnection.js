
// Front end connection to: the backend
var ws = new WebSocket("ws:54.152.163.233:8080");

ws.onopen = function (event) {
    ws.send("fuck this place");
  };




    

