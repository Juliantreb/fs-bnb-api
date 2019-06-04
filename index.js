const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

var users = new Array();

app.post("/api/users", (req,res) => {
    const user = req.body;
    const bodyFirstname = user.firstname;
    const bodyLastname = user.lastname;
    const bodyEmail = user.email;
    const bodyPassword = user.password;

    let foundUser= null;
    users.forEach (
        (aUser) => {
            if (aUser.email === bodyEmail) {
               foundUser = aUser;
            }
        }
    );

    var errors = [];
    if (!bodyFirstname) {
        errors.push({message: "Invalid firstname"});
    }
    if (foundUser !=null) {
        return res.status(400).json({message: "User already exists with that email"});
    }
    if (errors.length >0) {
        return res.status(400).json({message: "errors"})
    }
    
    if (!bodyEmail) {
        errors.push({message: "Invalid firstname"});
        return res.status(400).json({message: "Invalid request"});
    }

var newUser = {
    id: users.length + 1,
    firstname: bodyFirstname,
    lastname: bodyLastname,
    email: bodyEmail,
    password: bodyPassword
};

users.push(newUser);
res.json(newUser);
});

app.post("/api/users", (req, res) => {
    res.send("POST Auth api");
});

const PropertyRouter = express.Router();
PropertyRouter.post("/api/properties", (req,res) => {
    res.send("POST Properties api");
});
app.use("/parent", PropertyRouter);
// POST /parent/api/properties

app.listen(5000, () => {
    console.log("Server is running");
});

// const app2 = express();
// app2.listen(3001, () => {
//     console.log("Server is running");

// });