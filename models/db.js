const mongoose = require('mongoose');
// console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
  },function (err) {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');