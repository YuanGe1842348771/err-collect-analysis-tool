
const path = require('path');
const { isFileExisted, readFile } = require("../Help");

// 获取当前工作目录
const projectRoot = process.cwd();
// config 文件相对于项目根目录的路径
const configFilePath = path.join(projectRoot, 'config.json');



const WebServer = require("./server/webServer");
