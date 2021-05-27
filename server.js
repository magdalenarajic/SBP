const express = require('express');
const bodyParser = require('body-parser')
const app = express();


const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'kino'

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)

  // Storing a reference to the database so you can use it later
  const db = client.db(dbName)
  const korisniciCollection = db.collection('korisnik')
  console.log(`Connected MongoDB: ${url}`)
  console.log(`Database: ${dbName}`)

 app.post('/korisnici', (req,res) => { 
      korisniciCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
 })

 app.set('view engine' , 'ejs')

 app.get('/', (req, res) => {
  db.collection('film').find().toArray()
    .then(results => { 
        res.render('index.ejs', {film: results})
     })
    .catch(/* ... */)
  
 })

 app.delete('/film', (req, res) => {
      db.collection('film').deleteOne(
        { name: req.body.naziv }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json('Deleted Darth Vadar\'s quote')
        })
        .catch(error => console.error(error))
    })

})

app.listen(3000, function(){
   console.log('listenin on 3000')
})

app.use(bodyParser.urlencoded({ extended: true }))


















