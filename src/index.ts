import * as bodyParser from "body-parser";
import * as express from "express";
import * as session from "express-session";
import * as fs from "fs-extra";
import * as path from "path";
import config from "./lib/config";
import bookshelf from "./model/bookshelf";
import albums from "./routes/albums";
import images from "./routes/images";
import navigations from "./routes/navigations";
import options from "./routes/options";
import persons from "./routes/persons";
import search from "./routes/search";
import sessionroute from "./routes/session";
import tags from "./routes/tags";
import trash from "./routes/trash";
import users from "./routes/users";
import CacheController from "./controllers/CacheController";

const app = express();

app.use(session(config.getSessionConfig(session)));

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

app.use("/api/albums", albums);
app.use("/api/session", sessionroute);
app.use("/api/images", images);
app.use("/api/users", users);
app.use("/api/tags", tags);
app.use("/api/persons", persons);
app.use("/api/options", options);
app.use("/api/navigations", navigations);
app.use("/api/trash", trash);
app.use("/api/search", search);

app.use(express.static(path.resolve(__dirname, "./public")));

app.use("/thumbs", express.static(config.getThumbnailPath()));
app.use("/show", express.static(config.getPreviewPath()));

app.get("*", (req, res) => {
  if (req.path.startsWith("/thumbs")) {
    return new CacheController(req).getThumbnail(res);
  }

  if (req.path.startsWith("/show")) {
    return new CacheController(req).getPreview(res);
  }

  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

fs.ensureDir(config.getPath(), (err) => {
  if (err) {
    return "ERROR";
  }
  bookshelf.knex.migrate.latest({
    directory: __dirname + "/migrations"
  }).then((err2) => {
    app.listen(3000, () => {
      // console.log("Example app listening on port 3000!");
    });
  });
});
