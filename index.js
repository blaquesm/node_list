const express = require("express");
const chalk = require("chalk");
const path = require("path");
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require("./notes.controller");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  console.log("write post");
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await removeNote(id);
  console.log(`Received DELETE request for id=${id}`);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id", async (req, res) => {
  await updateNote({ id: req.params.id, title: req.body.title });
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});
// app.put("/:id", async (req, res) => {
//   const id = req.params.id;
//   await editNote(id, req.body.title);
//   console.log(`Received PUT request for id=${id}`);
//   res.json({ message: "Note updated successfully" });
// });

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
