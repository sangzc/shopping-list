// Contains shopping list functionality
const express = require('express');
const ExpressError = require('./expressError');
const items = require('./fakeDb');
const itemRoutes = require('./routes/items')
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


//  apply a prefix to every route in userRoutes
app.use('/items', itemRoutes);

// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});

// generic error handler
app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;

    // set the status and alert the user
    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    });
});

module.exports = app