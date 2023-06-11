import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";

let DATABASE_NAME = "finalProjectScholarship";

let api = express.Router();
let Scholarships;


const initApi = async (app) => {
  app.set("json spaces", 2);
  app.use("/api", api);

  let conn = await MongoClient.connect("mongodb://127.0.0.1");
  let db = conn.db(DATABASE_NAME);
  Scholarships = db.collection("Scholarships");
};

api.use(bodyParser.json());
api.use(cors());

api.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

api.post("/scholarships", async (req, res) => {
  // Idea from web dev simplified video
  let highestIDScholarship = await Scholarships.findOne({}, { sort: { id: -1 } });
  let newID = highestIDScholarship.id + 1;
  await Scholarships.insertOne({
    id: newID,
    scholarshipName: req.body.scholarshipName,
    organizationName: req.body.organizationName,
    dei: req.body.dei,
    quantity: req.body.quantity,
    open: req.body.open,
    due: req.body.due,
    grade: req.body.grade,
    scholarshipLink: req.body.scholarshipLink
  });
  let newScholarship = req.body;
  newScholarship.id = newID;
  res.json(newScholarship);
});

//loads in the scholarship that has the next id value
api.get("/scholarships/:id", async (req, res) => {
  let id = Number(req.params.id);
  id += 1;
  let nextScholarship = await Scholarships.findOne({ id: id });
  if (!nextScholarship) {
    res.status(404).json({ error: "Error in accessing scholarship from DB" });
    return;
  }
  res.json(nextScholarship);
});

/* Catch-all route to return a JSON error if endpoint not defined.
   Be sure to put all of your endpoints above this one, or they will not be called. */
api.all("/*", (req, res) => {
  res.status(404).json({ error: `Endpoint not found: ${req.method} ${req.url}` });
});

export default initApi;
