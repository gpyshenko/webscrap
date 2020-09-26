const fs = require('fs');
const osmosis = require('osmosis');

const json2xls = require('json2xls');

let name = '2v2';
let i = 10;
osmosis
    .get(`https://worldofwarcraft.com/ru-ru/game/pvp/leaderboards/${name}?page=${i}`)
    .set({
        'data': {
            'rows': {
                'Rang': ['.SortTable-row > .SortTable-col:first-child@data-value'],
                'Player': ['.SortTable-row > .SortTable-col:nth-child(3) .Character-name'],
                'Class': ['.SortTable-row > .SortTable-col:nth-child(4)@data-value'],
                'Fraction': ['.SortTable-row > .SortTable-col:nth-child(5)@data-value'],
                'Wins': ['.SortTable-row > .SortTable-col:nth-child(7)@data-value'],
                'Loose': ['.SortTable-row > .SortTable-col:nth-child(8)@data-value']
            }
        }

    })
    .data(function (e) {
        let data = e.data;
        let rows = data.rows;
        let arr = rows.Rang.map(function (el, idx) {
            return {
                'Ранг': rows.Rang[idx],
                'Игрок': rows.Player[idx],
                'Класс': rows.Class[idx],
                'Фракция': rows.Fraction[idx],
                'Победы': rows.Wins[idx],
                'Поражения': rows.Loose[idx]
            }
        });
        console.log(arr)
        var xls = json2xls(arr);
        fs.writeFileSync(`./data/${name}-page${i}.xlsx`, xls, 'binary');
    }) 


