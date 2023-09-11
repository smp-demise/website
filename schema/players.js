const mongoose = require('mongoose');

module.exports = mongoose.model('players', new mongoose.Schema({
  season: { type: mongoose.Types.Decimal128, required: true },
  players: { type: Object, default: {
    'Yellowy': {
      bio: 'Hello!! I am Yellowy I go by any pronouns but due to my voice everyone just uses he / him which is fine. I mostly stream Minecraft and Valorant, but sometimes stream other things like destiny and sometimes coding :)',
      dead: false
    },
    'RoseJade': {
      bio: 'Welcome and Hello! I\'m Rose, your favorite vampire! Stay awhile and enjoy the fun!',
      dead: false
    },
    'Julia': {
      bio: 'Hello! Sometimes I do things....is it entertaining probably not.',
      dead: false
    }
  } }
}));