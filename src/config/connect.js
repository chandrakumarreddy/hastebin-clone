const mongoose = require("mongoose");

try {
  mongoose.connect("mongodb://localhost/usebin");
} catch (error) {
  console.log(error);
}
