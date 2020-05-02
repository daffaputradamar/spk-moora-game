const express = require("express");
const path = require("path");
const cors = require("cors");

const configMoora = require("./config/moora");
const preferenceConversion = require("./lib/preferenceConversion");
const normalize = require("./lib/normalize");
const moora = require("./lib/moora");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/tes", (req, res) => {
  res.send("Hello");
});

app.post("/moora", (req, res) => {
  const decisionMatrix = preferenceConversion(req.body, configMoora.preference);
  const normalizedDecisionmatrix = normalize(decisionMatrix, {
    min: 0,
    max: 1,
  });

  const mooraResult = moora(
    normalizedDecisionmatrix,
    configMoora.weight,
    configMoora.isBenefit
  );
  return res.json(mooraResult);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

app.listen(process.env.PORT || 8000, () => console.log("Server Running"));
