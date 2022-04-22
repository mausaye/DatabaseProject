var http = require('http');
var mysql= require('mysql')
var ws = require('ws')
const server = http.createServer();
const wss = new ws.WebSocketServer({ port: 8080 });

wss.on('connection', () => {
  console.log("WebSocketServer connected!");
});



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
     
    var type = obj["type"];

    switch(type){
      case "SELECT":
        if(obj["data"]["table"] == "BLOOD"){
          requestBlood(obj, ws);
        } else if (obj["data"]["table"] == "DONATES"){
          queryDonorsBlood(obj, ws);
		console.log("DONOR QUERY FUNCTION CALLED");
        }
        break;
         
      case "INSERT":
        if(obj["data"]["table"] == "DONOR"){
          insertDonor(obj);
        }
        break;

      case "DELETE":
        break;
    }
      console.log('received:', obj);
  });

});


  function insertDonor(jsonOb){
    var insertRequest = "INSERT INTO " + jsonOb["data"]["table"] + 
    " (DONOR_ID, PHONE_NUMBER, IRON_COUNT, FIRST_NAME, LAST_NAME, WEIGHT, AGE) VALUES (0, \"" + jsonOb["data"]["phone"] + "\", " + jsonOb["data"]["iron_count"] + ", \"" + jsonOb["data"]["firstname"] + "\", \"" + jsonOb["data"]["lastname"]
  + "\" , " + jsonOb["data"]["weight"] + ", " + jsonOb["data"]["age"] + ");";
  
  console.log(insertRequest);
  
    con.query(insertRequest, function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
      var query = JSON.parse(JSON.stringify(result));
   });

    con.query("SELECT* FROM DONOR;", function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
      var query = JSON.parse(JSON.stringify(result));

    });
  
  }
  function queryDonorsBlood(jsonOb, ws){
    var request = jsonOb['type'] + " DONOR. DONOR_ID, BLOOD. BLOOD_TYPE,  BLOOD.RH_FACTOR FROM BLOOD, DONATES, DONOR WHERE BLOOD_TYPE = \""
                      +  jsonOb['data']['blood_type'] + "\" AND RH_FACTOR = \"" + jsonOb['data']['rh'] 
                      + "\" AND DONATES.BLOOD_ID = BLOOD.BLOOD_ID AND DONOR.DONOR_ID = DONATES.DONOR_ID;";
console.log(request);
                      con.query(request, function (err, result) {
                        if (err) throw err;
                        console.log("QUERY DONOR BLOOD TYPES: " + JSON.stringify(result));
                        var query = JSON.parse(JSON.stringify(result));
                
                        console.log(query);
                        ws.send(JSON.stringify(query));
                    });
  }

  // Submit query request to find blood of the same type
function requestBlood(jsonOb, ws){

    var selectRequest = jsonOb['type'] + " BLOOD_ID, BLOOD_TYPE, RH_FACTOR, DATE_COLLECTED FROM " + jsonOb.data.table
                           + " WHERE BLOOD_TYPE = \"" + jsonOb['data']['blood_type'] + "\" AND RH_FACTOR = \"" + jsonOb['data']['rh'] + "\";";
    
    con.query(selectRequest, function (err, result) {
        if (err) throw err;
        console.log("QUERY BLOOD: " + JSON.stringify(result));
        var query = JSON.parse(JSON.stringify(result));

        console.log(query);
	      ws.send(JSON.stringify(query));
    });
}

  


