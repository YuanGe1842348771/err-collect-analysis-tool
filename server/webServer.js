class WebServer {
    #server
    constructor() {
        this.startServer();
    }
    startServer() {
        const http = require("http");
        let RouterHandlers = require("../RouterHandlers");
        const { isFileExisted, readFile } = require("../Help");
        this.#server = http.createServer(async function (req, res) {
            try {
                let urlName = req.url;
                const routerInfo = RouterHandlers.routerVerification(urlName);
                if (routerInfo) {
                    urlName = routerInfo.path;
                }
                const root = RouterHandlers.getAbsolutePath(urlName);
                await isFileExisted(root)
                const ContentType = RouterHandlers.routerNameToType(urlName);
                const fileData = await readFile(root);
                res.writeHead(200, { "Content-Type": ContentType });
                res.write(fileData);
                res.end()
            } catch (error) {
                console.error(error, req.url);
                return RouterHandlers.to404(...arguments)
            }
        })
        this.#server.listen(9999, async () => {
            console.log('web服务启动成功:' + 'http://127.0.0.1:9999/index');
            const open = await import('open')
            await open.default('http://127.0.0.1:9999/index')
        });
    }
    stopServer(){
        this.#server.close(function () {
            console.log('web服务已关闭');
        });
    }
}
module.exports = new WebServer();
