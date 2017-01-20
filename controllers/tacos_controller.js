var express = require('express')
var Taco = require('../models/taco')
var router = express.Router()

router.get('/', function (req, res) {
  Taco.find(function (err, tacos) {
    if (err) res.status(500).render('error')
    else res.render('tacos/index', {tacos: tacos})
  })
})

router.get('/new', function (req, res) {
  res.render('tacos/new')
})

router.get('/:id/edit', function (req, res) {
  Taco.findById(req.params.id, function (err, taco) {
    if (err) res.status(500).render('error')
    else if (taco) {
      res.render('tacos/edit', {taco: taco})
    } else {
      res.status(404).render('error')
    }
  })
})

router.get('/:id', function (req, res) {
  Taco.findById(req.params.id, function (err, taco) {
    if (err) res.status(500).render('error')
    else if (taco) {
      res.render('tacos/show', {taco: taco})
    } else {
      res.status(404).render('error')
    }
  })
})

router.put('/:id', function (req, res) {
  Taco.findById(req.params.id, function (err, taco) {
    if (err) res.status(500).render('error')
    else if (taco) {
      if (req.body.name !== undefined) taco.name = req.body.name
      if (req.body.amount !== undefined) taco.amount = req.body.amount
      taco.save(function (err, taco) {
        if (err) res.status(500).send({msg: 'error'})
        else res.redirect(303, '/tacos')
      })
    } else {
      res.status(404).render('error')
    }
  })
})

router.delete('/:id', function (req, res) {
  Taco.findById(req.params.id, function (err, taco) {
    if (err) res.status(500).render('error')
    else if (taco) {
      if (req.body.name !== undefined) taco.name = req.body.name
      if (req.body.amount !== undefined) taco.amount = req.body.amount
      taco.remove(function (err, product) {
        if (err) res.status(500).send({msg: 'error'})
        else res.redirect(303, '/tacos')
      })
    } else {
      res.status(404).render('error')
    }
  })
})

router.post('/', function (req, res) {
  Taco.create({
    name: req.body.name,
    amount: req.body.amount
  }, function (err, taco) {
    if (err) res.status(500).send({msg: 'error'})
    else res.redirect('/tacos')
  })
})

module.exports = router
