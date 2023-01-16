// Importing require packages/modules
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
// Defining needed variables
const app = express();
const PORT = 3000;
// Express midleware to enable body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// Express static handler
app.use(express.static("public"));
// POST API To create message/file
app.post("/api/message/submit", (req, res) => {
  const file = req.body.messageText;
  const fileID = req.body.messageID;
  fs.writeFile("/messageFiles/" + fileID + ".txt", file, (err) => {
    if (err) res.send("ERROR! <br>" + err);
    else res.send("Saved");
  });
});
// GET API To read message/file
app.get("/message/:id", (req, res) => {
  const msg = req.params.id;
  if (fs.existsSync("/messageFile/" + msg + ".txt")) {
    res.sendFile(__dirname + "/messageFiles/" + msg + ".txt");
  } else {
    res.send("Message does not exist");
  }
});
// Running the server
app.listen(PORT, () => {
  console.log("Running on port: " + PORT);
});