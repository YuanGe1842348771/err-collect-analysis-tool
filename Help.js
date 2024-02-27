const fs = require("fs");
exports.readFile = function (path_way) {
  return new Promise((resolve, reject) => {
    fs.readFile(path_way, function (err, data) {
      if (err) {
        reject('读取文件错误'+err);
      }else{
        resolve(data);
      }
    });
  })
};
/**判断文件是否存在 */
exports.isFileExisted = function (path_way) {
  return new Promise((resolve, reject) => {
    fs.access(path_way, (err) => {
      if (err) {
        reject('文件不存在',err);
      } else {
        resolve(true); //"存在"
      }
    });
  });
};
