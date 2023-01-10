const fs = require('fs')

var targetPath = 'F:\\Anime Episodes'


function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


// var list = fs.readdirSync(targetPath);
var list = fs.readFileSync('ls.txt', 'utf8').split('\n');

// 根据两个文件名的最小公共子序列与文件名间的相似度，判断两个文件是否可以归并到同一个目录中。
// 两种情况：
// 两个文件分别名为 episode 01 和 episode 02 属于同一目录。判断为相似度 > 95%
// 两个文件分别名为 movie 和 movie extra 属于同一目录。判断为 lsc 串等于某个文件。

function lcs(a, b) {
    if (typeof a != 'string' || typeof b != 'string') { return 0 };
    const m = a.length, n = b.length;
    const memo = new Array(m + 1).fill().map(() => new Array(n + 1).fill(""));
    for (let i = 1; i <= m; i++) {
        var c1 = a[i - 1];
        for (let j = 1; j <= n; j++) {
            var c2 = b[j - 1];
            if (c1 === c2) {
                memo[i][j] = memo[i - 1][j - 1].concat(c2);
            } else {
                var t1 = memo[i - 1][j];
                var t2 = memo[i][j - 1];
                memo[i][j] = t1.length > t2.length ? t1 : t2;
            }
        }
    }
    return memo[m][n];
}

