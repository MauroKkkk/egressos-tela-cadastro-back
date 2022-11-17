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

app.post('/login', (req, res) => {

    const email = req.body.email
    const password = req.body.password
    
    const sqlSelect = "SELECT email, password FROM Client WHERE email = ? and password = ?"
    db.query(sqlSelect, [email, password], (err, result) => {
        if(err){
            console.log(err)
        }else{
            if(result){
                console.log(result)
            }else{
                console.log("Senha ou email errados")
            }
        }
    })
} )

app.post('/cadastro', (req, res) => {
    
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email
    const date = req.body.date
    const wcep = req.body.wcep
    const institution = req.body.institution
    const courseName = req.body.courseName
    const dateIn = req.body.dateIn
    const dateOut = req.body.dateOut
    const cep = req.body.cep
    const acting = req.body.acting
    const workcnpj = req.body.workCNPJ
    
    const sqlInsertClient = 'INSERT INTO Client (name, password, email, yearBirthday, home_cep, work, work_cnpj, work_cep) VALUES (?,?,?,?,?,?,?,?)'
    const sqlInsertInstitution = 'INSERT INTO Institution (institutionCode, courseName, endYear, startYear) VALUES (?,?,?,?)'
    db.query(sqlInsertInstitution, [institution, courseName, dateOut, dateIn], (err, result) => {
        if(err){
            console.log(err)
            console.log(1)
        }else{
            if(result){
                console.log(result)
                console.log(2)
            }else{
                console.log(3)
            }
        }
    })
    db.query(sqlInsertClient, [name, password, email, date, cep, acting, workcnpj, wcep], (err, result) => {
        if(err){
            console.log(err)
            console.log(1)
        }else{
            if(result){
                console.log(result)
                console.log(2)
            }else{
                console.log("Senha ou email errados")
                console.log(3)
            }
        }
    })
})
app.listen(3001, () => {
    console.log('runnig on port 3001')
})