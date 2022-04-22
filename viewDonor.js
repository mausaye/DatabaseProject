function createTable(){
console.log(sessionStorage.getItem('tablejson'));
var queries =JSON.parse(sessionStorage.getItem('tablejson'));

	console.log(queries);
//console.log(queries);
  /*   var queries = [
 {
     color: "red",
     color2: "red",
     value2: "#f00",
     value: "#f00"
 },
 {
     color: "green",
     color2: "red",
     value2: "#f00",
     value: "#0f0"
 },
 {
     color: "blue",
     color2: "red",
     value2: "#f00",
     value: "#00f"
 },
 {
     color: "cyan",
     color: "red",
     value2: "#f00",
     value: "#0ff"
 },
 {
     color: "magenta",
     color2: "red",
     value2: "#f00",
     value: "#f0f"
 },
 {
     color: "yellow",
     color2: "red",
     value2: "#f00",
     value: "#ff0"
 },
 {
     color: "black",
     color2: "red",
     value2: "#f00",
     value: "#000"
 }
]
    */ 
     // attributes
 var attributes = [];
 for (var i = 0; i < queries.length; i++){
     for(var key in queries[i]){
         if(attributes.indexOf(key) === -1){
             attributes.push(key);
         }
     }
 }

 var table = document.createElement("table");

 var tablerow = table.insertRow(-1);

 
 for(var x = 0; x < attributes.length; x++){
         var cell = tablerow.insertCell(-1);
         cell.innerHTML = [attributes[x]];
         
 }
 

 for(var k = 0; k < queries.length; k++){
     tablerow = table.insertRow(-1);

     for(var x = 0; x < attributes.length; x++){
         var cell = tablerow.insertCell(-1);
         cell.innerHTML = queries[k][attributes[x]];
     }

 }

 var container = document.getElementById("Queries");
 container.innerHTML ="";
 container.appendChild(table);
 }
