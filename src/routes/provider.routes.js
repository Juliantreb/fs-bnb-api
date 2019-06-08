const express = require("express");
const connection = require("../database/database");

const ProviderRoutes = express.Router();

// ProviderRoutes.post("/api/providers", (req, res) => {
//     const newProvider = req.body;
//     Provider.createProvider(newProvider, (err, result) => {
//         console.log(err);
//         console.log(result);
//         return res.status(200).json({id: result});
//     });
// });


ProviderRoutes.post("/api/providers", (req, res) => {
    const provider = req.body;


    connection.query("INSERT INTO provider SET ?", provider, (err, result) => {
        if (err) {
            console.log(err);  ///might need to delete <-///

            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: err.sqlMessage });
            } else {
                return res.status(500).json({ message: "Failed to insert" });
            }
        }

        console.log(result);

        var responseProvider = {
            id: result.insertId,
            name: provider.name,
            email: provider.email,
            password: provider.password,
            livesin: provider.livesin,
            phonenumber: provider.phonenumber,
            facebook: provider.facebook,
            today: provider.today,
            profilephoto: provider.profilephoto,
        }

        return res.status(200).json(responseProvider);
    });
});




ProviderRoutes.patch("/api/providers", (req, res) => {
    const newProvider = req.body;
    Provider.createProvider(newProvider, (err, result) => {
        console.log(err);
        console.log(result);
        return res.status(200).json({id: result});
    });
});
exports.Provider_delete = function (req, res) {
    Provider.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

ProviderRoutes.post("/api/providers/authentication", (req, res) => {
    const provider = req.body;
    const bodyEmail = provider.email;
    const bodyPassword = provider.password;
   
    
    connection.query("SELECT * FROM provider WHERE email = ? AND password = ?", [bodyEmail, bodyPassword], function (err, results) {
        console.log(err);
        console.log(results);
        if (results.length > 0) {
            return res.status(200).json(results[0])
        } else {
            return res.status(400).json({ message: "Incorrect Email or Password" })
        }
    });

});

ProviderRoutes.get("/api/providers/:id/", (req, res) => {
    const providerId = req.params.id;
    console.log(providerId);

    const numberProviderId = parseInt(providerId);
    if (isNaN(numberProviderId)) {
        return res.status(400).json({ message: "Integer Expected" });
    }

    if (!providerId) {
        return res.status(400).json({ message: "Please pass in a provider ID" })
    }

    connection.query("SELECT * FROM provider WHERE id = ?", [providerId], function (err, results) {
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(400).json({ message: "Id does not exist" });
        }
    });
});
 

module.exports = ProviderRoutes;