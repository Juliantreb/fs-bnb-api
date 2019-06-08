var mysqlConn = require("../database/database");

var User= function(user) {
  this.name = user.name;
  this.profilephoto = user.profilephoto;
  this.email = user.email;
  this.facebook = user.facebook;
  this.password = user.password;
  this.Id = user.Id;
  this.phonenumber = user.phonenumber;
  this.livesin = user.livesin;
  this.today = user.today;

};



User.createUser = function(newUser, result) {
    mysqlConn.query("INSERT INTO property set ?", newUser, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };

  User.getAllUser = function(result) {
    mysqlConn.query("Select * from user", function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Users : ", res);
        result(null, res);
      }
    });
  };

  User.getUserById = function(userId, result) {
    mysqlConn.query("Select * from property where id = ? ", userId, function(
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

  User.updateUserById = function(userId, user, result) {
    mysqlConn.query(
      "UPDATE user SET user = ? WHERE id = ?",
      [user, userId],
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
  



module.exports = User;