// import moduleAlias from "module-alias";
import path from "node:path";
import { fileURLToPath } from "node:url";

// resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// moduleAlias.addAliases({
//   "@root": __dirname,
//   "@models": path.join(__dirname, "src/models"),
//   "@controllers": path.join(__dirname, "src/controllers"),
//   "@middlewares": path.join(__dirname, "src/middlewares"),
//   "@utils": path.join(__dirname, "src/utils"),
// });

const BASE_PATH = __dirname;

export { BASE_PATH };
