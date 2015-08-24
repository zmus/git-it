/*------------------------------------------------------------------------------
               Only GET requests are allowed to go through...
-------------------------------------------------------------------------------*/

module.exports = function (req, res, next) {
  if (req.method === 'GET') next();
  else res.send('Method is not allowed');
};
