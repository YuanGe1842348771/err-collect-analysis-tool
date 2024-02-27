const fs = require('fs');
const { SourceMapConsumer } = require('source-map');


// 获取后面跟随的参数
const arg = process.argv;

let lineno = arg[2] || null
let solno = arg[3] || null
let Version = arg[4] || null
if (lineno && solno && Version) {

    if (!fs.existsSync(`./mapping/${Version}`)) {
        console.log('\x1b[31m%s\x1b[0m', '该版本不存在');
        return
    }
    // 加载.map文件
    const mapFile = fs.readFileSync(`./mapping/${Version}/bundle.js.map`, 'utf-8');
    // 创建SourceMapConsumer对象
    SourceMapConsumer.with(mapFile, null, consumer => {
        // 解析源代码映射
        const originalPosition = consumer.originalPositionFor({
            line: parseInt(lineno),
            column: parseInt(solno)
        });
        // 获取源代码位置信息
        const { source, line, column } = originalPosition;
        console.log(originalPosition);
        console.log('\x1b[32m%s\x1b[0m', `报错文件 ${source} 在 行 ${line}, 列 ${column}`);
    });
} else {
    console.log('\x1b[31m%s\x1b[0m', '参数不全，例： npm run getMapping 行 列 版本号');
}