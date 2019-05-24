const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', { define: { timestamps: false } })
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

sequelize.sync({ force: true })

const Movie = sequelize.define('movies',
  {
    title: {
      type: Sequelize.STRING,
      field: "title",
      allowNull: false
    },
    yearOfRelease: {
      type: Sequelize.INTEGER,
      field: "yearOfRelease",
      allowNull: false
    },
    synopsis: {
      type: Sequelize.STRING,
      field: "synopsis",
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'movies',

  })
//create_ a new movie
app.post('/movies', (req, res, next) => {

  Movie.create(req.body)
    .then(movie => {
      res.status(201).json(movie)
    })
    .catch(error => next(error))

})

// read_ a single movie
app.get('/movies/:id', (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (!movie)
        res.status(404).json({ message: `Movie is not exist` })
      else
        res.json(movie)
    })
    .catch(error => next(error))
})

//update_ a single movie
app.put('/movies/:id',(req,res,next)=>{
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (!movie)
        res.status(404).json({ message: `Movie is not exist` })
      else
       movie.update(req.body).then(updatedMovie => res.json(updatedMovie) )
    })
    .catch(error => next(error))
})

//delete_ a single movie
app.delete('/movies/:id',(req,res,next)=>{
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (!movie)
        res.status(404).json({ message: `Movie is not exist` })
      else
       movie.destroy(req.body).then(deletedMovie => res.json({message:`movie successfuly deleted`}) )
    })
    .catch(error => next(error))
})

//read_ all movies

app.get('/movies', (req, res, next) => {

  const limit = req.query.limit || 25
  const offset = req.query.offset || 0

  Movie.findAll({
    limit, offset
  })
    .then(movies => res.json(movies) )
    .catch(error => next(error))
})
const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))