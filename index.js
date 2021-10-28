const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//models
const Tache = require('./models/Tache');

//link env file
dotenv.config();
//
app.use(express.urlencoded({
    extended: true
}));
//connect to db
mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('database connected successfully');
});
//link css
app.use('/static', express.static('public'));
//views engin config
app.set("view engin", "ejs");
//requests
app.get('/', (req, res) => {
    // res.send('hello, world !');
    Tache.find({}, (err, taches) => {
        res.render('todo.ejs', {
            list_taches: taches
        });

    });
})
app.post('/', async (req, res) => {
    // console.log(req.body);
    const tache = new Tache({
        message: req.body.message
        // message:'from code'
    });
    try {
        console.log(tache)
        await tache.save();
        // res.status(200).json("ok");
        // console.log('added');
        res.redirect('/');
    } catch (err) {
        console.log(err);

    }
});
app.route('/edit/:id').get((req, res) => {
    const id = req.params.id;
    // res.status(200).json(id);
    Tache.find({}, (err, taches) => {
        res.render('edit_tache.ejs', {
            list_tache: taches,
            idTache: id
        })
    });
}).post((req, res) => {
    const id = req.params.id;
    // return res.send(req.body);
    Tache.findByIdAndUpdate(id, {
        message: req.body.message
    }, err => {
        if (err)
            return res.send(500, err);

        res.redirect('/');

    });
});
//delete tache
app.route('/del/:id').get((req, res) => {
    const id = req.params.id;
    // return res.send(id);
    Tache.findByIdAndRemove(id, err => {
        if (err)
            return res.send(500, err);
        res.redirect("/");
    })
})
app.get('/hi', (req, res) => {
    res.send('Hi Youssef ^^');
})

//server listening
app.listen(1998, () => console.log('server on'));
