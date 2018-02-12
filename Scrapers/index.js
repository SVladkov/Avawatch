const fetch = require('node-fetch');

// fetch('http://localhost:3000/forecast', {
//     method: 'GET'
// }).then(response => {
//     console.log(response);
// })

fetch('http://localhost:3000/forecast', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: 'Pesho' })
})