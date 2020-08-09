let express = require("express");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let path = require("path");
require("dotenv").config();
const rootRouter = require("./controllers/RootController");
const iExceptionsMiddleware = require("./common/middleware/IExceptionMiddleware");
const iRequestContextMiddleware = require("./common/middleware/IRequestContextMiddleware");
const { configureCORS } = require("./common/middleware/CorsMiddleware");

// express app
let app = express();

// middleware
app.use(configureCORS);
app.use(express.json({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser());
app.use(iRequestContextMiddleware);

//will be removed
app.use("/static", express.static(path.join(__dirname, "/uploads")));

app.use("/api", rootRouter);
app.use(iExceptionsMiddleware);

//listen
let port = 8080;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

// mongoose
mongoose.connect("mongodb://127.0.0.1:27017/socialdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("mongo connected");
});
