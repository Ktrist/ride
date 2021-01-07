var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect('mongodb+srv://dbTristan:dbTristanRideOn@cluster0.hk6de.mongodb.net/RIDEON?retryWrites=true&w=majority',
options,
function(err){
    if (err) {
        console.log(`error, failed to connect to the database because --> ${err}`);
      } else {
        console.info('*** Database RideON connection : Success ***');
      }
}
)

module.exports = mongoose