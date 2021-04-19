const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");


const app = express();

app.use(express.json());
app.use(cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

const pool = mysql.createConnection({
    host: process.env.MYSQL_HOST_IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});


app.listen(process.env.REACT_APP_SERVER_PORT, () => {
    console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});

app.get('/', (req, res) => {
    const {table} = req.query;

    pool.query(`select *
                from ${table}`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    pool.query(`INSERT INTO employees (login, password)
                VALUES (?, ?)`,
        [username, password],
        (err, result) => {
            console.log(err);
        })
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    pool.query(`SELECT *
                FROM employees
                WHERE login = ?
                  AND password = ?`,
        [username, password],
        (err, result) => {
            if (err) {
                res.send({err: err})
            }

            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: "Niepoprawne hasło lub login!"});
            }
        }
    );
});