var express = require("express");
var path = require("path");

var app = express();
// var db = require("../../../db/db");

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
console.log("log here is working");
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../../notes.html"));
});

app.get("/api/notes", function(req, res) {
  //should read db.json and return all saved notes as JSON
  console.log("api notes  get request is working");
  res.json({ ok: true });
});

app.post("/api/notes", function(req, res) {
  //Should receive a new note to save on the request body, 
  //generate Unique ID and add it to the received object 
  //add that to the db.json file, 
  //and then return the new note to the client.
  console.log("api notes post request is working");
  res.json({ ok: true });
});

app.delete("/api/notes/:id", function(req, res) {
  //Should receive a query parameter containing the id of a note to delete. 
  //This means you'll need to find a way to give each note a unique id when it's saved. 
  //In order to delete a note, you'll need to read all notes from the db.json file, 
  //remove the note with the given id property, 
  //and then rewrite the notes to the db.json file.
  console.log("api notes post request is working");
  res.json({ ok: true });
});




// If no matching route is found default to home
app.get("*", function (req, res) {
  console.log("STAR get request is working");
  res.sendFile(path.join(__dirname, "../../index.html"));
});

// app.post("/api/tables", function(req, res) {

//   if (tableData.length < 5) {
//     tableData.push(req.body);
//     res.json(true);
//   }
//   else {
//     waitListData.push(req.body);
//     res.json(false);
//   }
// });

//api delete here----------

// app.post("/api/clear", function(req, res) {
//   // Empty out the arrays of data
//   tableData.length = 0;
//   waitListData.length = 0;

//   res.json({ ok: true });
// });