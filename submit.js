function handleSubmit(event) {

    connection.onopen = function(){
        /*Send a small message to the console once the connection is established */
            console.log('Connection open!');
        }

        connection.onerror = function(error){
            console.log('Error detected: ' + error);
        }


    //alert("hi"); ---checked this to get data
    event.preventDefault();

    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());
    const jsonOb = {
        type: "INSERT",
        data: { 
            table: "DONOR",
            firstname: data.entries().firstname,
            lastname: data.entries().lastname,
            phone: data.entries().phone,
            iron_count: data.entries().iron_count,
            weight: data.entries().weight,
            age: data.entries().age
        },
        conditions: ""
       
}
console.log({
    jsonOb
});

    console.log({
        jsonOb
    });
}


                                





const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);