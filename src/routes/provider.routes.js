

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

 