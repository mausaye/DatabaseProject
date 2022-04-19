function handleSubmit(event) {

    var connection = new WebSocket('ws://54.152.163.233:8080');

    connection.onopen = function () {
      // connection is opened and ready to use
      console.log("Connection open on front end --> server");
    };
  
    connection.onerror = function (error) {
      // an error occurred when sending/receiving data
    };
    
    event.preventDefault();

    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());
    const jsonOb = {
        type: "INSERT",
        data: { 
            table: "DONOR",
            firstname: value['firstname'],
            lastname: value['lastname '],
            phone: value['phone '],
            iron_count: value['iron_count '],
            weight: value['weight '],
	    age: value['age '] 
        },
        conditions: ""
}

connection.addEventListener('open', function (event) {
    connection.send(JSON.stringify(jsonOb))
});

console.log({value});

console.log({jsonOb});

}


const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
