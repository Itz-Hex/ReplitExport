const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();


function loadPage(pageName) {
  app.get('views/' + pageName + '', (req, res) => {
    res.render(pageName);
   });
}