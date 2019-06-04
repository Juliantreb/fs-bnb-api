const express = require("express");

const fs = require("fs");

const app = express();

//Playing around
// const constants = require("./constants");
// console.log(constants);

// const ValidationService =require("./validation-service");
// const valServ= new ValidationService();
// const valServ2= new ValidationService
// console.log(valServ);
// console.log(ValidationService);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var users = new Array();
var properties = new Array();
var bookings = new Array();

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

    for (var k = 0; k < properties.length; k++) {
        const aProperty = properties[k];
        if (aProperty.id == propertyId) {
            return res.status(200).json(aProperty)
        }
    }


    return res.status(404).json({ message: "Property not found" });
})

// Delete property with :id from array.

// Send message back to user that property was deleted.

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
    const id = req.params.id;
    var BookingRequests = new Array();
    if (!propertyId) {
        return res.status(400).json({ message: "Please pass in a property ID" })

    }
    for (var k = 0; k < bookings.length; k++) {
        if (bookings[k] == id) {
            BookingRequests.push(bookings[k]);
        }
    }
    res.json(BookingRequests);
})

app.post("/users/authentication", (req, res) => {
    const user = req.body;
    const bodyEmail = user.email;
    const bodyPassword = user.password;

    let foundUser = null;
    users.forEach(
        (aUser) => {
            if (aUser.email === bodyEmail && aUser.password === bodyPassword) {
                foundUser = aUser;
            }
        }
    );

    if (foundUser) {
        return res.status(200).json(foundUser)
    } else {
        return res.status(400).json({ message: "Incorrect Email or Password" })
    }

});

app.get("/api/users/:id/", (req, res) => {
    const userId = req.params.id;

    const numberUserId = parseInt(userId);
    if (isNaN(numberUserId)) {
        return res.status(400).json({ message: "Integer Expected" });
    }

    if (!userId) {
        return res.status(400).json({ message: "Please pass in a user ID" })
    }

    for (var k = 0; k < users.length; k++) {
        const aUser = users[k];
        if (aUser.id == userId) {
            return res.status(200).json(aUser)
        }
    }


    return res.status(404).json({ message: "User not found" });
});

app.post("/api/users", (req, res) => {
    const user = req.body;
    const bodyFirstname = user.firstname;
    const bodyLastname = user.lastname;
    const bodyEmail = user.email;
    const bodyPassword = user.password;

    let foundUser = null;
    users.forEach(
        (aUser) => {
            if (aUser.email === bodyEmail) {
                foundUser = aUser;
            }
        }
    );

    var errors = [];
    if (!bodyFirstname) {
        errors.push({ message: "Invalid firstname" });
    }
    if (foundUser != null) {
        return res.status(400).json({ message: "User already exists with that email" });
    }
    if (errors.length > 0) {
        return res.status(400).json({ message: "errors" })
    }

    if (!bodyEmail) {
        errors.push({ message: "Invalid firstname" });
        return res.status(400).json({ message: "Invalid request" });
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

// const PropertyRouter = express.Router();
// PropertyRouter.post("/api/properties", (req, res) => {
//     res.send("POST Properties api");
// });
// app.use("/parent", PropertyRouter);


app.listen(5000, () => {
    console.log("Server is running");
});
