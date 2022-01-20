const args = process.argv;
let newArgs = args.splice(2);
const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeFile = (path, body) => {
  console.log('writing file', path);
  fs.writeFile(path, body, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
    process.exit();
  });
};

const fetcher = (url, path) => {

  request(url, (error, response, body) => {
    if (error) {
      console.log(error.message);
      return process.exit();
    }

    if (fs.existsSync(path)) {
      rl.question('File exits, overwrite? Y/N', (key) => {
        if (key !== 'Y') {
          return process.exit();
        }
        console.log('YES');
        writeFile(path, body);
      });
      return;
    }

    writeFile(path, body);
  });
};


fetcher(newArgs[0], newArgs[1]);