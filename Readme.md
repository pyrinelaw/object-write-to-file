## object-write-to-file

将对象写入文件中

### 使用示例


```javascript
const path = require('path');
const ObjectWriteToFile = require('object-write-to-file');

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

new ObjectWriteToFile(data, path.join(__dirname, 'output/a/b/c1/index.js')).output().then(res => {
    console.log('写入 js 文件成功');
}).catch(error => {
    console.warn(error);
    console.log('写入 js 文件异常');
});

```

### 参数说明
ObjectWriteToFile(data, file);

参数     | 类型 | 是否必传 | 默认值 | 说明
-------- | --- | --- | --- | ---
data | Object | 是 | undefined | 写入对象
file | String | 是 | undefined | 被写入文件路径，写入 js 文件中可以直接被引用