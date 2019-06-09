const express = require("express");
const cors = require('cors');
const mysql = require('mysql');
// const fs = require("fs");

const UserRoutes = require("./src/routes/user.routes");
const ProviderRoutes = require("./src/routes/provider.routes");
const PropertyRoutes = require("./src/routes/property.routes");
const BookingRoutes = require("./src/routes/booking.routes")

const config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "qwerty1234",
    database: "fs_bnb"

};

const connection = mysql.createConnection(config);
connection.connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(UserRoutes);
app.use(ProviderRoutes);
app.use(PropertyRoutes);
app.use(BookingRoutes);


app.listen(3000, () => console.log("Running server on 3000"));



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













