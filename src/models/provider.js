var mysqlConn = require("../database/database");

var Provider= function(provider) {
  this.name = provider.name;
  this.profilephoto = provider.profilephoto;
  this.email = provider.email;
  this.facebook = provider.facebook;
  this.password = provider.password;
  this.Id = provider.Id;
  this.phonenumber = provider.phonenumber;
  this.livesin = provider.livesin;
  this.today = provider.today;

};



Provider.createProvider = function(newProvider, result) {
    mysqlConn.query("INSERT INTO provider set ?", newProvider, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };

  Provider.getAllProvider = function(result) {
    mysqlConn.query("Select * from provider", function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Providers : ", res);
        result(null, res);
      }
    });
  };

  Provider.getProviderById = function(providerId, result) {
    mysqlConn.query("Select * from property where id = ? ", providerId, function(
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

  Provider.updateProviderById = function(providerId, provider, result) {
    mysqlConn.query(
      "UPDATE provider SET provider = ? WHERE id = ?",
      [provider, providerId],
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
  



module.exports = Provider;