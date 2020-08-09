let uuidv1 = require("uuid/v1");
var fs = require("fs");

const writeToMemory = (images = []) => {
  return new Promise((resolve, reject) => {
    let links =
      images.map((image) => {
        let id = uuidv1();
        fs.createWriteStream(`./src/uploads/images/${id}.jpeg`).write(
          new Buffer(image.split(",")[1], "base64")
        );
        return `http://localhost:8080/api/static/images/${id}.jpeg`;
      }) || [];
    resolve(links);
  });
};

const uploadProfileImage = (image, id) => {
  return new Promise((resolve, reject) => {
    let writer = fs.createWriteStream(`./src/uploads/images/${id}.jpeg`);
    writer.write(new Buffer(image.split(",")[1], "base64"));
    writer.on("error", (err) => reject(err));
    resolve(`http://localhost:8080/api/static/images/${id}.jpeg`);
  });
};

module.exports = {
  writeToMemory,
  uploadProfileImage,
};
