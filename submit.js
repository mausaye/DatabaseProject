function handleSubmit(event) {
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
            age: data.entries().age
        },
        conditions: ""
       
}


    console.log({
        jsonOb
    });

     insertDonor(jsonOb);
}


                                





const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);