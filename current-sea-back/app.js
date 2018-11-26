const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('tiny'));
//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'BTC' }));

require('./authentication/passport.js')(app);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(path.join(__dirname, '/static/'))); // Serve static files from static folder

app.use(['/event'], (req, res, next) => {
    console.log('Inside event middleware');
    if (!req.user) {
        res.status(401).json({message: 'User not logged in'});
    } else {
        next();
    }
});

const userAccountRouter = require('./routes/userAccountRoutes.js')();
const bkAccountRouter = require('./routes/bkAccountRoutes.js')();
const transactionsRouter = require('./routes/transactionsRoutes.js')();
const eventRouter = require('./routes/eventRoutes.js')();
const statementRouter = require('./routes/statementRoutes.js')();
const favCurRouter = require('./routes/favCurRoutes.js')();
const currencyAPIUpdate = require('./routes/currencyAPI.js')();

app.use('/profile', userAccountRouter);
app.use('/accounts', bkAccountRouter);
app.use('/transactions', transactionsRouter);
app.use('/event', eventRouter);
app.use('/statement', statementRouter);
app.use('/currencies', favCurRouter);
app.use('/currencyUpdate', currencyAPIUpdate);

app.get('/', (req, res) => {
  res.send('Test message');
});


app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
