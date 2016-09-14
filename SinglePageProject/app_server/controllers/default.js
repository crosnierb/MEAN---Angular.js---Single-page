var bodyParser = require('body-parser');

exports.index = function(req, res) {
    res.status(200).render('../views/index.html', {
      message: "respond with a resource"
    });
}
