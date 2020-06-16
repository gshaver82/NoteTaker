var express = require("express");
var path = require("path");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require("util");
const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
  console.log("notes html get request is working");
});



app.get("/api/notes", async (req, res) => {
  console.log("api notes get request is working");
  try {
    //reads database, parses it and returns it
    return res.json(JSON.parse(await readAsync(path.join(__dirname, "/db/db.json"), 'utf-8')));
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/notes", async (req, res) => {
  //Should receive a new note to save on the request body, 
  //generate Unique ID and add it to the received object 
  //add that to the db.json file, 
  //and then return the new note to the client.
  console.log("inside api notes post request");
  try {
    //gets the user inputted note, stringifys and parses it to object, then adds UUID
    let newNoteObject = JSON.parse(JSON.stringify(req.body));
    newNoteObject.id = uuidv4();
    console.log(newNoteObject);

    //reads database file, then parses it and puts it in DBarray
    let DBArray = JSON.parse(await readAsync(path.join(__dirname, "/db/db.json"), 'utf-8'));

    //appends newNoteObject to the array and then overwrites it to the database 
    DBArray.push(newNoteObject);
    await writeAsync(path.join(__dirname, "/db/db.json"), JSON.stringify(DBArray));

    //instructions said to return this?
    return res.json(newNoteObject);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/notes/:id", function (req, res) {
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




app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});