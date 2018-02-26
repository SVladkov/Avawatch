const { MongoClient } = require('mongodb');

const regions = [
    {
        id: 1,
        name: 'Vitosha',
        coordinates: [
            [42.64, 23.21],
            [42.64, 23.26],
            [42.6, 23.34],
            [42.51, 23.36],
            [42.46, 23.29],
            [42.47, 23.27],
            [42.43, 23.24],
            [42.45, 23.18],
            [42.48, 23.18],
            [42.51, 23.14],
            [42.59, 23.16]
        ]
    }
];

MongoClient.connect('mongodb://localhost/avawatch-regions').then(db => {
    const collection = db.collection('regions');

    collection.remove();

    for (var region of regions) {
        collection.insert(region);
    } 
});