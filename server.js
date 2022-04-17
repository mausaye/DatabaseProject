import { get } from 'http';
import { createServer } from 'http';
import { createConnection } from 'mysql';
import { WebSocketServer } from 'ws';

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

// SQL Connection
var con = createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "test"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});

// Submit query request to find blood of the same type
function sendSubmitRequest(){
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
sendSubmitRequest();
// WebSocket Server connection
wss.on('connection', function connection(ws) {
    console.log("this is not a variable");

  ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
  
    ws.send('something');
  });
  
server.listen(8080);





function returnBloodQuery(){


}

//WebSocket.onmessage = function(event) {
  //  var jsonObject = JSON.parse(event.data);

   // switch(jsonObject.type) {
     //   case "SELECT":
       //     selectTask(jsonObject);
         //   break;
        //case "DELETE":
          //  deleteTask(jsonObject);
            //break;
       // case "INSERT":
         //   insertTask(jsonObject);
           // break;
        //default:
          //  console.log("ERROR: Invalid JSON parse");
   // }
    
 //}

//function selectTask(jsonObject){
  // switch(jsonObject.data['blood']){
       //case :

   //}

//}

function selectBlood(bloodType){
    return "SELECT* FROM BLOOD WHERE blood_type = " + bloodtype + rh_factor;
}

function insertTask(){
    jsonObject.type + " " + jsonObject.data + "VALUES"
}

// JSON (Type: (Insert, Retrieve), JSON(attributes,))
function determineTask(message){

}

/**
 * SELECT blood.id, blood.type FROM BLOOD
 * 
 * SELECT count(blood.id) FROM BLOOD WHERE blood.type = "A"
 * 
 * DELETE FROM BLOOD WHERE date > 2010;
 * 
 * INSERT INTO DONOR VALUES (phone_number, iron_count, firstn, lastn, weight, age, active med)
 *  
 * SELECT name FROM HOSPITAL WHERE city = "Cleveland"
 */

/*

JSON: 
{
    type: (SELECT, DELETE, INSERT)
    data: (BLOOD { type: __, rh_factor: __, date_collected: __}
           DONOR {firstname:, lastname: weight:, age:, iron:, phonenumber:}
           HOSPITAL {name:, address:, admin:})

    condition: {{attribute: , boolean}, {attribute:, boolean}}

    }
*/


/*
Query all the blood available
Query by blood type
Query by date collected
Insert a donor
Insert blood donated
Delete blood
Delete donor
Query the hospitals at a location

*/

