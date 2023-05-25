const express = require("express");
const os = require("os");
const app = express();

app.get("/", (req, res) => {
    
    return res.status(200).json({
            message: "Olá"
        })
});

app.get("/consulta-dados", (req, res) => {

    return res.status(200).json({
            message: "teste"
        })
});

app.get("/liveness", (req, res) => {
    return res.status(200).json({
            message: "Meu app esta vivo",
            path: process.cwd(),
            gid: process.getegid(),
            uid: process.geteuid()
        })
});

app.get("/liveness", (req, res) => {
    return res.status(200).json({
            message: "Meu app esta pronto",
            plataform: os.plataform(),
            freemem: os.freemem(),
            homedir: os.homedir(),
            date: new Date().getTime()
        })
});

module.exports = app;