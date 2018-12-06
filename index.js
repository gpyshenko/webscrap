const fs = require('fs');
const path = require('path');

const osmosis = require('osmosis');
osmosis
    .get('https://mover.uz/')
    .set({ 
        'MainTitle': '#logo',
        "Navigation": ['#menu-main a']
    })
    .data(function(e) {
        console.log(e);
        fs.writeFile('mover.json', `${JSON.stringify(e)}` ,(err) => {
            if (err) throw err;
            console.log('Created file with data')
        })
    }) 

osmosis
    .get('https://learn.javascript.ru/')
    .set({
        "Navigation": ['.frontpage-content__title']
    })
    .data(function (e) {
        console.log(e);
        fs.writeFile('lj.json', `${JSON.stringify(e)}`, (err) => {
            if (err) throw err;
            console.log('Created file with data')
        })
    }) 