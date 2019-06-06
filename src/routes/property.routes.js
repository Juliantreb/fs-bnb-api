

app.post("/properties", (req, res) => {
    const property = req.body;
    const bodyName = property.name;
    const bodyLocation = property.location;
    const bodyImageUrl = property.imageurl;
    const bodyPrice = property.price;

    var newProperty = {
        id: properties.length + 1,
        name: bodyName,
        location: bodyLocation,
        imageurl: bodyImageUrl,
        price: bodyPrice
    };

    properties.push(newProperty);
    res.json(newProperty);



});

app.get("/properties/:id", (req, res) => {
    const propertyId = req.params.id;

    const numberPropertyId = parseInt(propertyId);
    if (isNaN(numberPropertyId)) {
        return res.status(400).json({ message: "Integer Expected" });
    }
    if (!propertyId) {
        return res.status(400).json({ message: "Please pass in a property ID" })
    }

})

// // Delete property with :id from array.

// // Send message back to user that property was deleted.

app.delete("/properties/:id", (req, res) => {
    var id = req.params.id;
    const index = properties
        .filter(property => property.id == id)
        .map(property => properties => properties.indexOf(property));
    properties.splice(index, 1);
    res.send("DELETE request to properties/:id");
});

app.post("/properties/:id/bookings", (req, res) => {
    const propertyId = req.params.id;
    const numberPropertyId = parseInt(propertyId);
    const bookingRequest = req.body;
    if (isNaN(numberPropertyId)) {
        return res.status(400).json({ message: "Integer Expected" });
    }
    if (!propertyId) {
        return res.status(400).json({ message: "Please pass in a property ID" })
    }
    const newBookingRequest = {
        id: bookings.length + 1,
        dateFrom: bookingRequest.dateFrom,
        dateTo: bookingRequest.dateTo,
        userId: bookingRequest.userId,
        propertyId: propertyId,
        status: "NEW",
    };
    bookings.push(newBookingRequest);
    res.json(newBookingRequest);
});


app.get("/properties/:id/bookings", (req, res) => {
    const propertyId = req.params.id;

    const numberPropertyId = parseInt(propertyId);
    if (isNaN(numberPropertyId)) {
        return res.stats(400).json({ message: "Integer Exxpected" });
    }
    if (!propertyId) {
        return res.status(400).json({ message: "Please pass in a property ID" })
    }
    var validBookings = new Array();

    for (var k = 0; k < bookings.length; k++) {
        const aBooking = bookings[k];
        if (aBooking.propertyId == propertyId) {
            validBookings.push(aBooking);
        }
    }
    if (validBookings.length < 1) {
        return res.status(200).json({ message: "No Bookings found for this property ID" })
    }
    res.json(validBookings);
});



//////////PROPERTIES///////

app.post("/api/properties", (req, res) => {
    const newProperty = req.body;
    Property.createProperty(newProperty, (err, result) => {
        console.log(err);
        console.log(result);
        return res.status(200).json({ id: result });
    });
});

app.patch("/api/properties", (req, res) => {
    const newProperty = req.body;
    Property.createProperty(newProperty, (err, result) => {
        console.log(err);
        console.log(result);
        return res.status(200).json({ id: result });
    });
});
exports.Property_delete = function (req, res) {
    Property.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

