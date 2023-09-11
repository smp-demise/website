console.clear();

const { mongoURL } = require('./config.json');
const mongoose = require('mongoose');
const express = require('express');
const path = require('node:path');
const app = express();

const Players = require('./schema/players');
const Lives = require('./schema/lives');

app.use(express.json())
  .use(express.urlencoded({ extended: true }))
  .engine('html', require('ejs').renderFile)
  .use(express.static(path.join(__dirname, '/public')))
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, '/views'))
  .get('/', (req, res) => {
    res.render('index');
  })
  .get('/createSeason', async (req, res) => {
    if(!req.query.season) return res.redirect('/');

    await Players.create({
      season: req.query.season
    }).then(async (res) => {
      await res.save();
    });

    res.redirect('/');
  })
  .get('/players', async (req, res) => {
    const temp = (await Players.find({})).flat();
    var seasons = []

    for (let i = 0; i < temp.length; i++) {
      seasons[i].season = temp[i].season;
      seasons[i].players = {}
      Object.keys(temp[i].players).sort((a, b) => a.localeCompare(b)).forEach((name) => seasons[i].players[name] = temp[i].players[name]);
    }
    
    res.render('players', {
      seasons
    });
  })

app.listen(80, () => console.log('website up and running'));
mongoose.connect(mongoURL).then(() => console.log(`mongoose connected to the database`));

process.on('beforeExit', async () => {
  await mongoose.connection.close();
});