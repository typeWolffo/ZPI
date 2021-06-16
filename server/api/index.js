const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

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

app.use(session({
    key: "userID",
    secret: "aezakmi",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*24,
    },
}))

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

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) console.log(err);

        pool.query(`INSERT INTO Users (Username, Password)
                    VALUES (?, ?)`,
            [username, hash],
            (err, result) => {
                console.log(err);
            }
        )
    })
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    pool.query(`SELECT *
                FROM Users
                WHERE Username = ?;`,
        username,
        (err, result) => {
            if (err) {
                res.send({err: err})
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].Password, (error, response) => {
                    if (response) {
                        res.send(result)
                        console.log(' \n logged in \n')
                    } else {
                        res.send({message: "Niepoprawne hasło lub login!"});
                    }
                });
            } else {
                res.send({message: "Konto nie istnieje"});
                console.log("\n user doesn't exist \n")
            }
        }
    );
});