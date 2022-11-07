const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "egressos"
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/api/login', (req, res) => {
    const password = req.body.password
    const email = req.body.email
    
    const sqlSelect = "SELECT (email, password) FROM Client WHERE email = 'cuzinho@gmail.com' and password = 123123 "
    db.query(sqlSelect, [password, email], (err, result) => {
        console.log(result)
    })
} )

app.post('/api/insert', (req, res) => {

    const password = req.body.password
    const email = req.body.email
    
    const sqlInsert = 'INSERT INTO Client (name, email) VALUES (?,?)'
    db.query(sqlInsert, [password, email], (err, result) => {
         console.log(result)
    })
})
app.listen(3001, () => {
    console.log('runnig on port 3001')
})