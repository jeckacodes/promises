/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var {getStatusCodeAsync, pluckFirstLineFromFileAsync} = require('./promiseConstructor.js');
var {getGitHubProfileAsync} = require('./promisification.js');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(getGitHubProfileAsync) //send request
    .then( (profile) => {
      return new Promise( (resolve, reject) => {
        fs.writeFile(writeFilePath, JSON.stringify(profile), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve('done'); // even though we're not returning a value, resolve still needs to be called in order to fulfill the promise
          }
        });
      });
    })
    // .then( (message) => {
    //   return message;
    // }) // writes JSON response
    .catch( (error) => {
      console.log('Error: ', error);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
