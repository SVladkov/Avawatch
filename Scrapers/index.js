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
    body: JSON.stringify({ 
        date: '1000-01-01 00:00:00',
        forecast: 'Second degree',
        regionId: 1,
        dataSourceId: 2
    })
}).then(res => {
    res.json().then(id => {
        console.log(id);
    });
})