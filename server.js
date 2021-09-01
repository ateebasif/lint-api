const express = require("express");
const app = express();
const port = process.env.PORT || 3001 ;
const Linter = require("eslint").Linter;
const linter = new Linter();

var cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello")
})

app.post("/linter", (req, res) => {
  if (req.method === "POST") {
    const { code, EsLintRules } = req.body;
    const verifyAndFix = linter.verifyAndFix(code, {
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "script",
        ecmaFeatures: {},
      },
      rules: JSON.parse(EsLintRules)[0],
      env: {
        node: true,
        browser: true,
        mocha: true,
      },
    });
    res.send({ verifyAndFix });
  } else {
    res.send({});
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
