import Configuration from "./Configuration";
import * as fs from "fs-extra";

export default new Configuration(JSON.parse(fs.readFileSync(__dirname + "/../config.json", "utf8")));
