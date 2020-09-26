const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const roomsApi = require('./routes/Rooms.js');
const userRoomsApi = require('./routes/userRooms');

const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandlers');

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());


authApi(app);
roomsApi(app);
userRoomsApi(app);

app.use(notFoundHandler);

//Errores middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});