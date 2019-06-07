

app.post("/api/providers", (req, res) => {
    const newProvider = req.body;
    Provider.createProvider(newProvider, (err, result) => {
        console.log(err);
        console.log(result);
        return res.status(200).json({id: result});
    });
});

app.patch("/api/providers", (req, res) => {
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

app.post("/api/providers/authentication", (req, res) => {
    const provider = req.body;
    const bodyEmail = provider.email;
    const bodyPassword = provider.password;
   
    
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
 