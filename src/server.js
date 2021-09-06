const path = require("path");
const express = require("express");

require("./config/connect");

const app = express();

const Document = require("./models/Document");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (_, res) => {
  res.render("index");
});
app.post("/save", async (req, res) => {
  const value = req.body.value;
  try {
    const doc = new Document({ value });
    await doc.save();
    return res.redirect(`/${doc.id}`);
  } catch (error) {
    return res.redirect(301, "/");
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Document.findById(id);
    res.render("code-display", { value: doc.value, id });
  } catch (error) {
    res.redirect("/");
  }
});

app.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Document.findById(id);
    res.render("index", { value: doc.value });
  } catch (error) {
    res.redirect(`/${id}`);
  }
});

app.get("/:id/text", async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Document.findById(id);
    res.send(doc.value);
  } catch (error) {
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log(`server is listening at port 3000`);
});
