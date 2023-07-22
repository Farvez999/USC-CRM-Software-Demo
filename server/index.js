const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/user.routes');

// var corsOptions = {
//     origin: 'http://localhost:3000' || 'https://poetic-tartufo-744f7d.netlify.app',
//     optionsSuccessStatus: 200
//   }

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://demo-usc-crm.netlify.app', 'https://demo-usc-crm-soft.netlify.app']
}
));

// db connection
mongoose.connect(process.env.DATABASE).then(() => {
    console.log(`Database connection is successful`);
})

// routes
app.use('/', require('./routes/user.routes'))
app.use('/', require('./routes/lead.routes'))
app.use('/', require('./routes/head.routes'))
app.use('/', require('./routes/course.routes'))
app.use('/', require('./routes/batch.routes'))
app.use('/', require('./routes/pay.getway.routes'))
app.use('/', require('./routes/expense.head.routes'))
app.use('/', require('./routes/expense.routes'))
app.use('/', require('./routes/collection.routes'))
app.use('/', require('./routes/collection.head.routes'))
app.use('/', require('./routes/loan.routes'))
app.use('/', require('./routes/loan.head.routes'))
app.use('/', require('./routes/loan.r.history.routes'))
app.use('/', require('./routes/loan.p.history.routes'))


app.get("/", (req, res) => {
    res.send("Server running...")
});

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`);
});