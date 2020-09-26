const fs = require('fs');
const path = require('path');

const osmosis = require('osmosis');

function checkDir(directory, callback) {
    fs.stat(directory, (err, stats) => {
        if (err) {
            fs.mkdirSync(directory, { recursive: true }, (err) => {
                callback(err)
            });
        } else {
            callback(err)
        }
    });
}

osmosis
    .get('http://cbu.uz/uzc/')
    .set({ 
        'data': ['.rates-list li']
    }) 
    .data(function (e) {
        let data = e.data;
        let obj = {}
        let arr = data.map(function (data) {
            let pattern = /[^1](\b\w{3}\b)\s+\=\s+(\d+\.\d{2})/;
            let result = data.match(pattern);
            return { 
                currency: result[1], 
                value: result[2] 
            }
        })
        obj.data = arr;
        
        checkDir('./data/', function(err) {
            fs.writeFileSync('./data/cbu.json', JSON.stringify(obj), (err) => {
                if (err) throw err;
            })
        })
    }) 

// fs.mkdir('./asd/', {}, (err) => {
//     if(err) throw err;
// })

// setTimeout(() => {
//     fs.rmdir('./asd/', () => console.log('Deleted'))
// }, 5000);