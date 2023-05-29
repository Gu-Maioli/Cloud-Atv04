const express = require("express");
const mysql = require("mysql2");
const os = require("os");
const app = express();
const cors = require("cors");

//docker run -d -p 3306:3306 --name teste01 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_USER=root -e MYSQL_PASSWORD=passwd -e MYSQL_DATABASE=db_aula mysql/mysql-server:latest

const db = mysql.createPool({
    host: "172.17.0.2",
    port: 3306,
    user: "root",
    password: "root",
    database: "db_aula"
});


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    
    return res.status(200).json({
            message: "Olá"
        })
});

app.get("/consulta-dados", (req, res) => {

    db.query("SELECT * FROM db_aula.aluno", (err, result) => {
        if (err)
            return res.status(500).json(err);
        else
            return res.status(200).json({ message: result });
    });
    
});

app.get("/liveness", (req, res) => {
    return res.status(200).json({
            message: "Meu app esta vivo",
            path: process.cwd(),
            gid: process.getegid(),
            uid: process.geteuid()
        })
});

app.get("/readiness", (req, res) => {

    return res.status(200).json({
            message: "Meu app esta pronto",
            plataform: os.plataform,
            freemem: os.freemem(),
            homedir: os.homedir(),
            date: new Date().getTime()
        })
});

module.exports = app;