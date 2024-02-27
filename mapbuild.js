const fs = require('fs');
const version = require('../config/version.js');
const folderPath = `./mapping/${version}`; // 文件夹路径
const mapPath = `./dist/bundle.js.map`; // map文件夹路径

if (!fs.existsSync(mapPath)) {
    console.log('\x1b[31m%s\x1b[0m', '源码映射map文件未找到，请设置devtool并重新编译');
    return
}

fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
        console.log('\x1b[31m%s\x1b[0m', '文件夹创建失败，请手动构建');
    } else {
        console.log('文件夹创建成功！');
        fs.rename(mapPath, `./mapping/${version}/bundle.js.map`, (err) => {
            if (err) {
                console.log('\x1b[31m%s\x1b[0m', 'map文件移动失败，请手动将map文件移至对应的版本');
                return
            } else {
                console.log('\x1b[32m%s\x1b[0m', `构建成功，请执行‘npm run getMapping’ 或 ‘yarn getMapping’来获取报错信息`);
                return
            }
        });
    }
});