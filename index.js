const express = require("express");
const cors = require('cors');
const mysql = require('mysql');
const fs = require("fs");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "qwerty1234",
    database: "fs_bnb"

};
const connection = mysql.createConnection(config);
connection.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));






//////////////////////////////////////////////////////
// app.post("/read/file", (req, res) => {
//     fs.readFile("./data/file.json", function (err, data) {
//         if (err) {
//             return res.status(500).json({ message: "Unable to open the file" });
//         }

//         var jsonFromString = JSON.parse(data);

//         jsonFromString.users.push({ id: 1 });
//         fs.writeFile("./data/file.json", JSON.stringify(jsonFromString), function (err) {
//             if (err) {
//                 return res.status(500).json({ message: "Unable to write the file" });
//             }


//             return res.status(200).json(jsonFromString);
//         });
//     });
// });












////////////////////////////////////////


// ////////PROVIDER/////////



// //////////BOOKING//////////


