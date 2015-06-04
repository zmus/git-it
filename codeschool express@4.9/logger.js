/*------------------------------------------------------------------------------
                 Tracking the start time for the requests
-------------------------------------------------------------------------------*/

module.exports = function (req, res, next) {

  var startTime = +new Date();  // + converts date Object to miliseconds
  var stream = process.stdout;  // standard out is a writeable stream
  var url    = req.url;         // requested URL
  var method = req.method;      // HTTP method used

  // event handler function runs asynchronously
  res.on('finish', function () {

    var duration = +new Date() - startTime;  // duration of the request
    var message  = method + ' to ' + url + '\ntook' + duration + ' ms \n\n';

    stream.write(message);
  });

  // moves request to the next middleware in the stack
  next();

};




/*

  console.log() is just process.stdout.write() with a line-break at the end:

    console.log = function (d) {
      process.stdout.write(d + '\n');
    };

*/
