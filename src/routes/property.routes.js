const express = require("express");
const connection = require("../database/database");

const PropertyRoutes = express.Router();

PropertyRoutes.post("/api/properties", (req, res) => {
    const property = req.body;


    connection.query("INSERT INTO property SET ?", property, (err, result) => {
        if (err) {
            console.log(err);  ///might need to delete <-///

            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: err.sqlMessage });
            } else {
                return res.status(500).json({ message: "Failed to insert" });
            }
        }

        console.log(result);

        var responseProperty = {
            id: result.insertId,
            name: property.name,
            address: property.address,
            description: property.description,
            imageURL: property.imageURL,
            location: property.location,
            pricePerNight: property.pricePerNight,
        
            
        }

        return res.status(200).json(responseProperty);
    });
});

    PropertyRoutes.get("/api/properties", (req, res) => {
    
    
        connection.query("SELECT * FROM property", (err, result) => {
            if (err) {
                console.log(err);  ///might need to delete <-///
    
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: err.sqlMessage });
                } else {
                    return res.status(500).json({ message: "Failed to insert" });
                }
            }
    
            // console.log(result);
    
           
            // res.setHeader('Access-Control-Allow-Origin', '*');
            return res.status(200).json(result);
        });

    });


// });
    // var newProperty = {
    //     id: properties.length + 1,
    //     name: bodyName,
    //     location: bodyLocation,
    //     imageurl: bodyImageUrl,
    //     pricePerNight: bodyPricePerNight,
    //     description = bodyDescription,
    //     address = bodyAddress,
    // };

    // properties.push(newProperty);
    // res.json(newProperty);

    // ProviderRoutes.post("/api/providers", (req, res) => {
    //     const provider = req.body;
    
    
    //     connection.query("INSERT INTO provider SET ?", provider, (err, result) => {
    //         if (err) {
    //             console.log(err);  ///might need to delete <-///
    
    //             if (err.code === 'ER_DUP_ENTRY') {
    //                 return res.status(400).json({ message: err.sqlMessage });
    //             } else {
    //                 return res.status(500).json({ message: "Failed to insert" });
    //             }
    //         }
    
    //         console.log(result);
    
    //         var responseProvider = {
    //             id: result.insertId,
    //             name: provider.name,
    //             email: provider.email,
    //             password: provider.password,
    //             livesin: provider.livesin,
    //             phonenumber: provider.phonenumber,
    //             facebook: provider.facebook,
    //             today: provider.today,
    //             profilephoto: provider.profilephoto,
    //         }
    
    //         return res.status(200).json(responseProvider);
    //     });
    // });
    


// });
PropertyRoutes.post("/api/properties/:id", (req, res) => {
    const propertyId = req.params.id;

    const numberPropertyId = parseInt(propertyId);
    if (isNaN(numberPropertyId)) {
        return res.status(400).json({ message: "Integer Expected" });
    }
    if (!propertyId) {
        return res.status(400).json({ message: "Please pass in a property ID" })
    }

})
PropertyRoutes.get("/api/properties/:id", (req, res) => {
    const propertyId = req.params.id;

    const numberPropertyId = parseInt(propertyId);
    if (isNaN(numberPropertyId)) {
        return res.status(400).json({ message: "Integer Expected" });
    }
    if (!propertyId) {
        return res.status(400).json({ message: "Please pass in a property ID" })
    }
    connection.query("SELECT * FROM property WHERE id = ?", [propertyId], function (err, results) {
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(400).json({ message: "Id does not exist" });
        }
    });

})

// // Delete property with :id from array.

// // Send message back to user that property was deleted.

// PropertyRoutes.delete("/properties/:id", (req, res) => {
//     var id = req.params.id;
//     const index = properties
//         .filter(property => property.id == id)
//         .map(property => properties => properties.indexOf(property));
//     properties.splice(index, 1);
//     res.send("DELETE request to properties/:id");
// });

// PropertyRoutes.post("/properties/:id/bookings", (req, res) => {
//     const propertyId = req.params.id;
//     const numberPropertyId = parseInt(propertyId);
//     const bookingRequest = req.body;
//     if (isNaN(numberPropertyId)) {
//         return res.status(400).json({ message: "Integer Expected" });
//     }
//     if (!propertyId) {
//         return res.status(400).json({ message: "Please pass in a property ID" })
//     }
//     const newBookingRequest = {
//         id: bookings.length + 1,
//         dateFrom: bookingRequest.dateFrom,
//         dateTo: bookingRequest.dateTo,
//         userId: bookingRequest.userId,
//         propertyId: propertyId,
//         status: "NEW",
//     };
//     bookings.push(newBookingRequest);
//     res.json(newBookingRequest);
// });


// PropertyRoutes.get("/properties/:id/bookings", (req, res) => {
//     const propertyId = req.params.id;

//     const numberPropertyId = parseInt(propertyId);
//     if (isNaN(numberPropertyId)) {
//         return res.stats(400).json({ message: "Integer Exxpected" });
//     }
//     if (!propertyId) {
//         return res.status(400).json({ message: "Please pass in a property ID" })
//     }
//     var validBookings = new Array();

//     for (var k = 0; k < bookings.length; k++) {
//         const aBooking = bookings[k];
//         if (aBooking.propertyId == propertyId) {
//             validBookings.push(aBooking);
//         }
//     }
//     if (validBookings.length < 1) {
//         return res.status(200).json({ message: "No Bookings found for this property ID" })
//     }
//     res.json(validBookings);
// });



//////////PROPERTIES///////





// PropertyRoutes.patch("/api/properties", (req, res) => {
//     const newProperty = req.body;
//     Property.createProperty(newProperty, (err, result) => {
//         console.log(err);
//         console.log(result);
//         return res.status(200).json({ id: result });
//     });
// });
// exports.Property_delete = function (req, res) {
//     Property.findByIdAndRemove(req.params.id, function (err) {
//         if (err) return next(err);
//         res.send('Deleted successfully!');
//     })
// };





module.exports = PropertyRoutes;