var mysqlConn = require("../database/database");

var Booking = function(booking) {
  this.name = booking.name;
  this.imageurl = booking.imageURL;
  this.datefrom = booking.dateFrom;
  this.dateTo = booking.dateTo;
  this.propertyId = booking.propertyId
  this.userId = booking.userId;
  this.status = booking.status;
  this.Id = booking.Id;
};



Booking.createUser = function(newBooking, result) {
    mysqlConn.query("INSERT INTO property set ?", newBooking, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };

  Booking.getAllBookings = function(result) {
    mysqlConn.query("Select * from booking", function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Users : ", res);
        result(null, res);
      }
    });
  };

  Booking.getBookingById = function(bookingId, result) {
    mysqlConn.query("Select * from booking where id = ? ", bookingId, function(
      err,
      res
    ) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };

  Booking.updateBookingById = function(bookingId, booking, result) {
    mysqlConn.query(
      "UPDATE booking SET booking = ? WHERE id = ?",
      [booking, bookingId],
      function(err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  };
  



module.exports = Booking;
