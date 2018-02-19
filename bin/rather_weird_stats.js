#!/usr/bin/env bash

const path = require('path');

const nconf = require('nconf');

nconf.file({
  file: path.join(__dirname, '..', 'sample_config.json'),
});



const controller = require('./../libs/controller');

return controller.initialize()
  .then(() => {
    //return controller.test('ra3', 'cWc.zokker13');
    return controller.getActivePlayers('ra3');
  });
