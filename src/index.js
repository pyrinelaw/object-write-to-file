const fs = require('fs');
const path = require('path');
const get = require('lodash/get');
const assert = require('assert');
const mkdirp = require('mkdirp');

const getFileType = (file) => {
    const index = file.lastIndexOf(".");
    const fileType = file.substr(index + 1);

    return index == -1 ? 'unKnow' : fileType;
}

const ObjectWriteToFile = class {
    constructor(data, file) {
        assert(typeof(data) == 'object', 'the data type must is Object');
        assert(data, 'data must be set!');
        assert(file, 'file must be set!');

        this.data = data;
        this.file = file;
        this.lines = [];
        this.fileType = getFileType(file);

        this.transformLines();
    }

    transformLines(curKey = '', prefix = '', hasNext = false) {
        const { lines, fileType } = this;
        const data = curKey ? get(this.data, curKey) : this.data;
        const symbol = this.fileType == 'js' ? '\'' : '"';
        const dataKeys = Object.keys(data);

        if (dataKeys.length == 0) {
            return;
        }

        if (!curKey) {
            lines.push(fileType == 'js' ? 'export default {' : '{');
        }

        dataKeys.forEach((key, index) => {
            const value = data[key];
            const nextValue = data[dataKeys[index + 1]];
            const nextKey = dataKeys[index + 1];

            if (value instanceof Array) {
                assert(false, `The key: ${key}, Type is array, not support！`);
            }
            
            if (typeof(value) == 'string') {
                const inputValue = value.replace(new RegExp(symbol, 'g'), `\\${symbol}`);
                lines.push(`\t${prefix}${symbol}${key}${symbol}: ${symbol}${inputValue}${symbol}${nextKey ? ',' : ''}`);
            }

            if (typeof(value) == 'object') {
                lines.push(`\t${prefix}${symbol}${key}${symbol}: {`);
                const childCurKey = curKey ?  `${curKey}.${key}` : key;
                this.transformLines(`${childCurKey}`, `${prefix + '\t'}`, !!nextValue);
            }
        });

        if (curKey) {
            lines.push(`${prefix}}${hasNext ? ',' : ''}`);
        } else {
            lines.push('}');
        }
    }

    output() {
        const fileDir = path.dirname(this.file);

        if (!fs.existsSync(fileDir)) {
            mkdirp.sync(fileDir);
        }

        return new Promise((resolve, reject) => {
            try {
                fs.writeFileSync(this.file, this.lines.join('\n'));
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = ObjectWriteToFile;