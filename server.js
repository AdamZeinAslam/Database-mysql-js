const express = require("express")
const mysql = require("mysql")
const BodyParser = require("body-parser")

const app = express()

app.use(BodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
    host: "localhost",
    database: "siswa_sekolah",
    user:"root",
    password: "",
})

db.connect((err) => {
    if(err) throw err
    console.log("database connected...")

    const sql = "SELECT * FROM user"
    db.query(sql, (err, result) => {
        const users = JSON.parse(JSON.stringify(result))
        console.log("hasil databese ", users)
        app.get("/", (req, res) => {
            res.render("index", {users: users, title: "DARTAR MURID"})
        })

        app.post("/tambah", (req, res) => {
            const insertSql = `INSERT INTO user (nama) VALUE ('${req.body.nama});`
            db.query(insertSql, (err, result) => {})
            if (err) throw err
            res.redirect("/");

        })
    })
   
})



app.listen(8000, () => {
    console.log("server ready...")
})