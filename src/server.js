require("express-async-errors");

const express = require("express");
const cors = require("cors");

const routes = require("./routes/index");

const AppError = require("./utils/AppError");

const uploadConfig = require("./configs/upload");

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());
app.use(routes);

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
