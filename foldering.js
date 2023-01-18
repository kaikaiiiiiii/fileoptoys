const fs = require('fs');
const path = require('path');

var targetPath = 'F:\\Anime Episodes'


function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


// 根据两个文件名的最小公共子序列与文件名间的相似度，判断两个文件是否可以归并到同一个目录中。
// 两种情况：
// 两个文件分别名为 episode 01 和 episode 02 属于同一目录。判断为相似度 > 95%
// 两个文件分别名为 movie 和 movie extra 属于同一目录。判断为 lsc 串等于某个文件。
// 需要去掉 CRC8 校验位。

function lcs(a, b) {
    if (typeof a != 'string' || typeof b != 'string') { return new Error('arguments are not strings') };
    if (a == undefined && b) { return b };
    if (b == undefined && a) { return a };
    if (b == undefined && a == undefined) { return '' };

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

// 定义同目录文件组对象
class Folder {
    constructor(x) {
        this.baseDir = targetPath;
        this.files = x ? [x] : [];
        this.status = 0; // 0 = pending, 1 = executed,
    }
    add(x) {
        this.files.push(x);
    }
    buildSubDir() {
        let flcs = this.files[0];
        if (this.files.length > 1) {
            for (let i = 1; i < this.files.length; i++) {
                flcs = lcs(flcs, this.files[i]);
            }
        }
        let numreg = /\d{1,3}/ig;
        let nums = this.files.map(e => e.match(numreg));


    }
    print() {
        // if (!this.subDir) { this.buildSubDir() };
        this.buildSubDir();
        console.log("===> " + path.join(this.baseDir, this.subDir || ''));
        for (let item of this.files) {
            console.log('  -> ' + item);
        }
    }
    exec() {
        if (!this.subDir) { this.buildSubDir() };
        console.log('TODO')
    }
}

// 

// var list = fs.readdirSync(targetPath);
var list = fs.readFileSync('ls.txt', 'utf8').split('\n');

var CRC8reg = /[0-9A-F]{8}/i;

function grouping(list) {
    var result = [];
    var o = new Folder(list[0]);
    for (let i = 1; i < list.length; i++) {
        let a = list[i - 1].replace(CRC8reg, ''), b = list[i].replace(CRC8reg, '');
        let thisLCS = lcs(a, b);
        if (thisLCS.length >= a.length * 0.95 || thisLCS.length >= b.length * 0.95) {
            o.add(list[i]);
            continue;
        } else {
            result.push(o);
            o = new Folder(list[i]);
        }
    }
    result.push(o);
    return result
}

var g = grouping(list);

g.forEach(e => e.print())

