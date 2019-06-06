app.post("/api/bookings", (req, res) => {
    const newBooking = req.body;
    Booking.createBooking(newBooking, (err, result) => {
        console.log(err);
        console.log(result);
        return res.status(200).json({id: result});
    });
});

app.patch("/api/bookings", (req, res) => {
    const newBooking = req.body;
    Booking.createBooking(newBooking, (err, result) => {
        console.log(err);
        console.log(result);
        return res.status(200).json({id: result});
    });
});
exports.User_delete = function (req, res) {
    Booking.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};