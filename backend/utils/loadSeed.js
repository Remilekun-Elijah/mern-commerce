const UserModel = require("../server/model/user");
const bcrypt = require("bcryptjs");
module.exports = () => {
  const seeds = [
    {
      name: "Chikki",
      username: "MissB",
      email: "chikki@gmail.com",
      password: "chikki",
      role: "admin",
      addressOne: "14 Yaba-Left, Surulere, Lagos."
    },
  ];

  seeds.map(uploadSeedsToDatabase);

  function uploadSeedsToDatabase(data) {
    UserModel.findOne({ email: data.email }).then(async (user) => {
      if (!user) {
        UserModel.create({ ...data, password: bcrypt.hashSync(data.password) })
          .then((data) => {
            console.log(data.name.toUpperCase(), "created successfully");
          })
          .catch((err) => {
            console.log("An error occurred", err);
          });
      } else console.log(data.name.toUpperCase(), "already created");
    });
  }
};
