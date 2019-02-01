const Meeting = require('../models/meeting');

module.exports = function (app) {

  app.get('/api/meeting', function (req, res) {
    Meeting.find({})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.post('/api/meeting', function (req, res) {
    console.log("in meeting  post *************")
    console.log(req.body< " new meeting ")
    Meeting.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // app.put('/api/contacts/:id', function (req, res) {
  //   Note.findOneAndUpdate({ _id: req.body._id }, { completed: req.body.completed })
  //     .then(function (data) {
  //       res.json(data);
  //     })
  //     .catch(function (err) {
  //       res.json(err);
  //     });
  // });

  // app.delete('/api/contacts/:id', function (req, res) {
  //   Note.findOneAndDelete(req.params.id)
  //     .then(data => res.json({ success: true }))
  //     .catch(err => res.json(err))
  // })
}