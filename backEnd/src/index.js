const express = require("express");
const cors = require("cors");

const { recordRouter } = require("./routes/addRecord.route");
const { accountRouter } = require("./routes/account.route");
const { categoryRouter } = require("./routes/category.route");
const { authRouter } = require("./routes/auth.route");

const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;

app.use("/accounts", accountRouter);
app.use("/records", recordRouter);
app.use("/category", categoryRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
