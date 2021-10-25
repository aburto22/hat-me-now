const sharp = require("sharp");
const fs = require("fs");

const directory = "./items";

fs.readdirSync(`${directory}/original`).forEach((file) => {
  const outputName = `${file.replace(".jpg", "")}.jpg`;
  // const outputName = "kid-with-hat-small.jpg";
  sharp(`${directory}/original/${file}`)
    .resize({ width: 400 }) // width, height
    .toFile(`${directory}/${outputName}`);
});
