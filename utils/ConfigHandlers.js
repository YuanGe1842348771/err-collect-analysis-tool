const path = require("path");
const {isFileExisted} = require("../Help.js");
class ConfigHandlers {
    #config
    constructor(){
        this.#config = null;
    }
    /**获取配置文件 */
    async getConfigFileAsync(){
         // 获取当前工作目录
        const projectRoot = process.cwd();
        // config 文件相对于项目根目录的路径
        const configFilePath = path.join(projectRoot, 'errCollectTool.config.js');
        try {
            await isFileExisted(configFilePath)
            const configData = require(configFilePath);
            this.#config = configData;
            return configData
        } catch (error) {
            throw '读取配置文件失败，请检查是否存在';
        }
    }
    /**初始化配置信息 */
    async initConfigInfoAsync(){
        try {
            await this.getConfigFileAsync()
            
        } catch (error) {
            throw error
        }
    }
    /**获取配置信息 */
    getConfigData(){
        return this.#config
    }
}
module.exports = new ConfigHandlers();