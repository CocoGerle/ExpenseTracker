const express = require("express");
const cors = require("cors");

const { recordRouter } = require("./routes/addRecord.route");
const { accountRouter } = require("./routes/account.route");

const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;

app.use("/accounts", accountRouter);
app.use("/records", recordRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
