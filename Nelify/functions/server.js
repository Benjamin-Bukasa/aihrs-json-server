const { exec } = require('child_process');

exports.handler = function(event, context, callback) {
  exec('json-server --watch db.json --port 5000', (error, stdout, stderr) => {
    if (error) {
      callback(error, {
        statusCode: 500,
        body: 'Error starting JSON Server'
      });
      return;
    }
    callback(null, {
      statusCode: 200,
      body: stdout
    });
  });
};
