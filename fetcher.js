const args = process.argv;
let newArgs = args.splice(2);
const request = require('request');
const fs = require('fs');


const fetcher = (url, path) => {
  let content = '';
  
  request(url, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    content = body;
    const size = content.length;
    fs.writeFile(path, content, { flag: 'a+' }, err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Downloaded and saved ${size} bytes to ${path}`);
    });
  });
};

fetcher(newArgs[0], newArgs[1]);


