const fs = require('fs');
const path = require('path');

const osmosis = require('osmosis');

osmosis
    .get('https://worldofwarcraft.com/ru-ru/game/races/maghar-orc')
    .set({
        'data': 
            {
                'name': ['.Modal .Talent-name'],
                'dscr': ['.Modal .Talent-desc']
            }
        
    })
    .data(function (e) {
        let data = e.data;
        let name = data.name;
        let desc = data.dscr;
        console.log(e.data.name.length)
        name.forEach((el,idx) => {
            fs.appendFile('./wow.txt', `\n${JSON.stringify(name[idx])} - ${JSON.stringify(desc[idx])}\n`, (err) => {
                if (err) throw err;
            })
        });
    }) 