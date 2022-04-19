var http = require('http');
var mysql= require('mysql')
var ws = require('ws')
const server = http.createServer();
const wss = new ws.WebSocketServer({ port: 8080 });

wss.on('connection', () => {
  console.log("YAY!");
});

wss.li


// SQL Connection
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "BloodManagement"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("SQL Connected!");

});

// WebSocket Server connection
wss.on('connection', function connection(ws) {
  console.log("Web socket server connected");

  ws.on('message', function message(data) {
	  let obj = JSON.parse(data)
	  console.log(obj);
     
    var type = data["type"];

    switch(type){
      case "SELECT":
        if(data[data][table] == "BLOOD"){
          requestBlood(data);
        }
        break;
         
      case "INSERT":
        if(data[data][table] == "DONOR"){
          insertDonor(data);
        }
        break;

      case "DELETE":
        break;
    }


      console.log('received:', data);
  });

});


  function insertDonor(jsonOb){
    var insertRequest = "INSERT INTO " + jsonOb[data][table] + 
    "(DONOR_ID, PHONE_NUMBER, IRON_COUNT, FIRST_NAME, LAST_NAME, WEIGHT, AGE) VALUES " +
  + "(NULL, " + jsonOb[data][phone] + ", " + jsonOb[data][iron_count] + ", " + jsonOb[data][firstname] + ", " + jsonOb[data][lastname]
  + ", " + jsonOb[data][weight] + ", " + jsonOb[data][age];
  
  console.log(insertRequest);
  
    con.query(insertRequest, function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
      var query = JSON.parse(JSON.stringify(result));
    });
  
  }

  // Submit query request to find blood of the same type
function requestBlood(jsonOb){
  //  if (jsonOb.type != "SELECT") console.error(jsonOb.type + " instead of SELECT.");

    //var selectRequest = jsonOb[type] + "  BLOOD_ID, BLOOD_TYPE, DATE_COLLECTED FROM " + jsonOb.data.table
      //                      + "WHERE BLOOD_TYPE = " + jsonOb[data][blood] + " AND RH_FACTOR = " + jsonOb[data][rh];
      var selectRequest =  "SELECT* FROM BLOOD;";

    con.query(selectRequest, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        var query = JSON.parse(JSON.stringify(result));

  });

}

  

