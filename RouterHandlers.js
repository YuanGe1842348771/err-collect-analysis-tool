const path = require("path");
class RouterHandlers {
    #router
    #contentTypeMap;
    constructor(){
        this.contentTypeMap = null;
        this.router = null;
    }
    /**获取类型映射json数据 */
    #getContTypeMap(){
        if(this.#contentTypeMap == null){
            this.#contentTypeMap = require("./contentType.json");
        }
        return this.#contentTypeMap;
    }
    /**获取路由数据 */
    #getRouter(){
        if(this.#router == null){
            this.#router = require("./router.js");
        }
        return this.#router;
    }
    /**解析路由到对应的Content-Type */
    routerNameToType(urlName){
        var extname = path.extname(urlName);
        return this.#getContTypeMap()[extname];
    }
    /**路由验证 */
    routerVerification(urlPath){
        let routerInfo = this.#getRouter()[urlPath];
        return routerInfo || false;
    }
    /**获取绝对路径 */
    getAbsolutePath(urlPath){
        return path.join(__dirname, urlPath);
    }
    /**
     * 跳转到404
     * @param {*} Request 请求数据
     * @param {*} Response 响应数据
     */
    to404(Request,Response){
        Response.writeHead(404, { "Content-Type": "text/html" });
        Response.write("<h1>404 Not Found</h1>");
        return Response.end();
    }

}
module.exports = new RouterHandlers();