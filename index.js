const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let numberOfMessages = 0;
app.post('/messages', (req, res) => {
  numberOfMessages++
  if(numberOfMessages > 5){
    res.status(500).json({ message: "Internal Server Error" })
    return
  }
  
  if (req.body.text) {
    console.log(req.body.text)
    res.end()
  } else {
    res.status(400).json({ message: "Bad Request" })
  }

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))