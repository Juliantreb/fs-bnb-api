const express = require("express");
const connection = require("../database/database");

const BookingRoutes = express.Router();

BookingRoutes.post("/api/bookings", (req, res) => {
    const booking = req.body;


    connection.query("INSERT INTO booking SET ?", booking, (err, result) => {
        if (err) {
            console.log(err);  ///might need to delete <-///

            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: err.sqlMessage });
            } else {
                return res.status(500).json({ message: "Failed to insert" });
            }
        }

        console.log(result);

        var responseBooking = {
            id: result.insertId,
            name: booking.name,
            dateFrom: booking.dateFrom,
            dateTo: booking.dateTo,
            status: booking.status,
        
            
        }

        return res.status(200).json(responseBooking);
    });
});

    // BookingRoutes.get("/api/booking", (req, res) => {
    
    
    //     connection.query("SELECT * FROM booking", (err, result) => {
    //         if (err) {
    //             console.log(err);  ///might need to delete <-///
    
    //             if (err.code === 'ER_DUP_ENTRY') {
    //                 return res.status(400).json({ message: err.sqlMessage });
    //             } else {
    //                 return res.status(500).json({ message: "Failed to insert" });
    //             }
    //         }
    
    //         // console.log(result);
    
           
    //         // res.setHeader('Access-Control-Allow-Origin', '*');
    //         return res.status(200).json(result);
    //     });

    // });

// BookingRoutes.patch("/api/bookings", (req, res) => {
//     const newBooking = req.body;
//     Booking.createBooking(newBooking, (err, result) => {
//         console.log(err);
//         console.log(result);
//         return res.status(200).json({id: result});
//     });
// });
// exports.User_delete = function (req, res) {
//     Booking.findByIdAndRemove(req.params.id, function (err) {
//         if (err) return next(err);
//         res.send('Deleted successfully!');
//     })
// };

module.exports = BookingRoutes;