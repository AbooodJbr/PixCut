import express from 'express';
import mongoose from 'mongoose';
import Url from './models/url.js';

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/shortUrls', async (req, res) => {
    try {
        const found = await Url.findOne({full : req.body.fullUrl})
        if(found) return res.send(found);
        const url = new Url({ full: req.body.fullUrl })
        await url.save()
        res.send({ full: url.full, short: url.short });
    } catch (error) {
        res.status(400).send({ error: 'error creating the url' });
    }
});

app.get('/:short', async (req, res) => {
    const url = await Url.findOne({ short: req.params.short });
    if (!url) return res.status(404).send();
    res.redirect(url.full);
});

app.listen(port, () => {
    console.log('server is up on ' + port);
});
