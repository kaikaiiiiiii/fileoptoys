const fs = require('fs')

var targetPath = 'F:\\Anime Episodes'


function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


// var list = fs.readdirSync(targetPath);
var list = fs.readFileSync('ls.txt', 'utf8').split('\n');

function lcs(a, b) {
    console.log(a, b)
    if (typeof a != 'string' || typeof b != 'string') { return 0 };
    const m = a.length, n = b.length;
    const memo = new Array(m + 1).fill().map(() => new Array(n + 1).fill(""));
    for (let i = 1; i <= m; i++) {
        var c1 = a[i - 1];
        for (let j = 1; j <= m; j++) {
            var c2 = b[j - 1];
            if (c1 === c2) {
                memo[i][j] = memo[i - 1][j - 1].concat(c2);
                console.log(memo);
            } else {
                var t1 = memo[i - 1][j];
                var t2 = memo[i][j - 1];
                memo[i][j] = t1.length > t2.length ? t1 : t2;
            }
        }
    }
    return memo[m][n];
}

console.log(lcs(list[1], list[2]));