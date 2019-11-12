/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callBack) {
  fs.readFile(filePath, (err, content)=>{
    if (err) {
      callBack({code: 'ENOENT'}, null);
    } else {
      callBack(null, String(content).split('\n')[0]);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, (err, res)=>{
    if (err) {
      callback({message: 'Invalid URI'}, null);
    } else {
      callback(null, res.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
