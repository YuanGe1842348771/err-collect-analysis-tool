async function startServer(params) {
    try {
        const config = require('./utils/ConfigHandlers.js')
        const configData =  await config.initConfigInfoAsync();
        console.log("configData:", configData)
        return
        const WebServer = require("./server/webServer");
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m',error);
    }
}
startServer()