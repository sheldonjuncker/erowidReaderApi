import mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

let cachedConnection = null;

function initConnection() {
  if (cachedConnection === null) {
    return mongoose
      .connect(process.env.REACT_APP_MONGO_URI, {
        bufferCommands: false,
        bufferMaxEntries: 0,
      })
      .then(async (connection) => {
        cachedConnection = connection;
        console.log('connected to mongo');
        return cachedConnection;
      });
  } else {
    console.log('using cached connection');
    return Promise.resolve(cachedConnection);
  }
}

export default initConnection;
