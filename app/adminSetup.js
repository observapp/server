const Admin = require("./models/admin").Admin;
const bcryptjs = require("bcryptjs");

createAdmin = (email, password) => {
  let hashedPassword = bcryptjs.hashSync(password);
  Admin.create({
    password: hashedPassword,
    email: email,
  })
    .then((data) => {
      console.log(`Created Admin ${data.email}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`Create Admin error ${error}`);
      process.exit(0);
    });
};

createAdmin("admin@gmail.com", "password");
