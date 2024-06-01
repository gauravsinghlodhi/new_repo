let createError = require('http-errors');
let express = require('express');
require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let appRouter = require('./routes/v1');
const responseMiddleWare = require('./middlewares/response.middleware');
// const passportMiddleWare = require('./middlewares/passport.middleware');
const cors = require('cors');

let app = express();
app.use(cors());
app.use(responseMiddleWare);
app.use(express.static('public'));
app.use('/public', express.static('public'));

//Helper function
// @ts-ignore
asyncForEach = async function (array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

if (process.env.NODE_ENV === 'development') {
    const morganBody = require('morgan-body');
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    morganBody(app, {theme: 'darkened'});
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


// Endpoints Base Route
app.use('/v1/auth', appRouter.authRouter);
app.use('/v1/user',appRouter.userRouter);
app.use('/v1/category',appRouter.categoryRouter);
app.use('/v1/servies', appRouter.serviesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
