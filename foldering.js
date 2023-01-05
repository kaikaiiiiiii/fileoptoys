const fs = require('fs')

var targetPath = 'F:\\Anime Episodes'
var black = [
    `[Lilith-Raws]`,
    `[WEB-DL]`,
    `[1080p]`,
    `[AVC AAC]`,
    `[CHT]`,
    `[MP4]`,
    `[Baha]`,
    `.mp4`
]


function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


// var list = fs.readdirSync(targetPath);
var list = fs.readFileSync('ls.txt', 'utf8').split('\n');
var filteredList = list.map(e => {
    var s = e;
    black.forEach(b => {
        var reg = new RegExp(escapeRegExp(b), 'ig');
        s = s.replace(reg, '');
    });
    return s.trim();
});


console.log(filteredList);