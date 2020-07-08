const path = require('path');
const ObjectWriteToFile = require('../src/index.js');

const data = {
    a: 'a',
    b: 'b',
    c: 'c',
    1: 1,
    'a.b.c': 'a.b.c',
    tips: {
        success: 'success',
        warning: 'warning',
        error: 'error',
        obj: {
            a: 'a',
            b: 'b',
            c: 'c',
            subObj1: {
                'sub-a': 'sub-a',
                'sub-b': 'sub-b',
                'sub-c': 'sub-c',
            },
            'subObj-2': {
                'sub-a': 'sub-a',
                'sub-b': 'sub-b',
                'sub-c': 'sub-c',
            },
        }
    },
    action: {
        confirm: 'confirm',
        cancel: 'cancel',
    }
};

new ObjectWriteToFile(data, path.join(__dirname, 'output/a/b/c1/index.json')).output().then(res => {
    console.log('写入 json 文件成功');
}).catch(error => {
    console.warn(error);
    console.log('写入 json 文件异常');
});

new ObjectWriteToFile(data, path.join(__dirname, 'output/a/b/c2/index.js')).output().then(res => {
    console.warn('写入 js 文件成功');
}).catch(error => {
    console.warn(error);
    console.log('写入 js 文件异常');
});

new ObjectWriteToFile(data, path.join(__dirname, 'output/a/b/c3/index.txt')).output().then(res => {
    console.warn('写入 txt 文件成功');
}).catch(error => {
    console.warn(error);
    console.log('写入 txt 文件异常');
});

new ObjectWriteToFile(data, path.join(__dirname, 'ccc')).output().then(res => {
    console.warn('写入 txt 文件成功');
}).catch(error => {
    console.warn(error);
    console.log('写入 txt 文件异常');
});
