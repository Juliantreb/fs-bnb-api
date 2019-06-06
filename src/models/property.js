var mysqlConn = require("../database/database");

var Property = function(property) {
  this.name = property.name;
  this.imageurl = property.imageurl;
  this.location = property.location;
  this.pricepernight = property.pricePernight;
  this.providerId = property.providerId;
  this.Id = property.Id;
  this.description = property.description;

};



Property.createUser = function(newProperty, result) {
    mysqlConn.query("INSERT INTO property set ?", newProperty, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };

  Property.getAllProperties = function(result) {
    mysqlConn.query("Select * from property", function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Users : ", res);
        result(null, res);
      }
    });
  };

  Property.getPropertyById = function(propertyId, result) {
    mysqlConn.query("Select * from property where id = ? ", propertyId, function(
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

  Property.updatePropertyById = function(propertyId, property, result) {
    mysqlConn.query(
      "UPDATE property SET property = ? WHERE id = ?",
      [property, propertyId],
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
  



module.exports = Property;