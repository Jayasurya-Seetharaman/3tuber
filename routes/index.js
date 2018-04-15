var express = require('express');
var router = express.Router();
var ytdl = require('youtube-dl');

/* GET home page. */
router.get('/3tuber', function(req, res, next) {
  res.render('index', { title: 'Video Downloader' });
});

router.post('/video', function (req, res, next) {
  // var url = 'https://www.youtube.com/watch?v=5Sc03xHSOng';
  var url = req.body.url;

  ytdl.getInfo(url, function(err, info) {

      // 'use strict';
      if (err) { 
        // throw err; 
        var msg = {
          'title': 'invalid'
        }
        res.send(JSON.stringify(msg));
      } else {
        console.log('id:', info.id);
        console.log('title:', info.title);
        console.log('url:', info.url);
        console.log('thumbnail:', info.thumbnail);
        console.log('description:', info.description);
        console.log('filename:', info._filename);
        console.log('duration:', info.duration);
        console.log('raw duration:', info._duration_raw);
        console.log('duration hms:', info._duration_hms);
        console.log('format_id:', info.format_id);
        console.log('Formats: ', info.formats);
        // res.status(200).send('Format : ', info.formats);
        // res.render('video', { Info: info.formats });
        res.send(JSON.stringify(info));
      }
  });
});

router.get('/video', function (req, res, next) {
  var url = 'https://www.youtube.com/watch?v=5Sc03xHSOng';
  // var url = req.body.url;

  ytdl.getInfo(url, function(err, info) {

      // 'use strict';
      if (err) { throw err; }

      console.log('id:', info.id);
      console.log('title:', info.title);
      console.log('url:', info.url);
      console.log('thumbnail:', info.thumbnail);
      console.log('description:', info.description);
      console.log('filename:', info._filename);
      console.log('duration:', info.duration);
      console.log('raw duration:', info._duration_raw);
      console.log('duration hms:', info._duration_hms);
      console.log('format_id:', info.format_id);
      console.log('Formats: ', info.formats);
      // res.status(200).send('Format : ', info.formats);
      // res.render('video', { Info: info.formats });
      res.send(JSON.stringify(info));
  });
});

router.get('/test', function (req, res, next) {
  res.send('Some Message');
});

module.exports = router;
