const express = require("express");
const connection = require("../database/database");

const UserRoutes = express.Router();

// var users = new Array();


// app.post("/api/users", (req, res) => {
//     const user = req.body;
    

//     connection.query("INSERT INTO user SET ?", user, (err, result) => {
//         if (err) {
//             console.log(err);  ///might need to delete <-///
            
//             if (err.code === 'ER_DUP_ENTRY') {
//                 return res.status(400).json({ message: err.sqlMessage });
//             } else {
//                 return res.status(500).json({ message: "Failed to insert" });
//             }
//         }

//         console.log(result);

//         var responseUser = {
//             id: result.insertId,
//             name: user.name,
//             email: user.email,
//             password: user.password
//         }

//         return res.status(200).json(responseUser);
//     });
// });


UserRoutes.post("/api/users/authentication", (req, res) => {
    const user = req.body;
    const bodyEmail = user.email;
    const bodyPassword = user.password;
   
    
    connection.query("SELECT * FROM user WHERE email = ? AND password = ?", [bodyEmail, bodyPassword], function (err, results) {
        console.log(err);
        console.log(results);
        if (results.length > 0) {
            return res.status(200).json(results[0])
        } else {
            return res.status(400).json({ message: "Incorrect Email or Password" })
        }
    });

});
    // let foundUser = null;
    // users.forEach(
    //     (aUser) => {
    //         if (aUser.email === bodyEmail && aUser.password === bodyPassword) {
    //             foundUser = aUser;
    //         }
    //     }
    // );

    // if (foundUser) {
    //     return res.status(200).json(foundUser)
    // } else {
    //     return res.status(400).json({ message: "Incorrect Email or Password" })
    // }

// app.get("/api/users/:id/", (req, res) => {
//     const userId = req.params.id;

//     const numberUserId = parseInt(userId);
//     if (isNaN(numberUserId)) {
//         return res.status(400).json({ message: "Integer Expected" });
//     }

//     if (!userId) {
//         return res.status(400).json({ message: "Please pass in a user ID" })
//     }

//     // for (var k = 0; k < users.length; k++) {
//     //     const aUser = users[k];
//     //     if (aUser.id == userId) {
//     //         return res.status(200).json(aUser)
//     //     }
//     // }


//     return res.status(404).json({ message: "User not found" });
// });



// const PropertyRouter = express.Router();
// PropertyRouter.post("/api/properties", (req, res) => {
//     res.send("POST Properties api");
// });
// app.use("/parent", PropertyRouter);


// app.listen(3000, () => {
//     console.log("Server is running");
// });













////////////////////////////STUFF FROM DAY EIGHT/////////////






// const User = require("./src/models/user");





///////// USERS//////



// app.patch("/api/users", (req, res) => {
//     const newUser = req.body;
//     User.createUser(newUser, (err, result) => {
//         console.log(err);
//         console.log(result);
//         return res.status(200).json({ id: result });
//     });
// });
// exports.User_delete = function (req, res) {
//     User.findByIdAndRemove(req.params.id, function (err) {
//         if (err) return next(err);
//         res.send('Deleted successfully!');
//     })
// };

module.exports = UserRoutes;