const NN = require('../neural-network.js');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const synaptic = require("synaptic");

const convertWinetoNeuron = (wine) => {
  let type = wine.redORwhite === 'Red Wines' ? 1 : 0;
  let price = wine.priceMin / 100;
  let cab = wine.type === 'Cabernet Sauvignon' ? 1 : 0;
  let merlot = wine.type === 'Merlot' ? 1 : 0;
  let chard = wine.type === 'Chardonnay' ? 1 : 0;
  let sauv = wine.type === 'Sauvignon Blanc' ? 1 : 0;
  wine.neurons = [type, cab, merlot, chard, sauv, price];
  return wine;
}

module.exports.recommendations = (username) => {
  let profile = null;
  return Product.allWines()
    .then((wines) => {
      wines = wines.map((wine) => {
        return convertWinetoNeuron(wine);
      })
      return User.findUser(username)
        .then((user) => {
          if (user[0]) {
            profile = synaptic.Network.fromJSON(user[0].recommendation_profile);
          }
          wines = wines.map((wine) => {
            wine.rating = profile.activate(wine.neurons)[0];
            return wine;
          })
          return wines.sort((a, b) => {
            return b.rating - a.rating;
          });
        })
    })
}