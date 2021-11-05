require("dotenv").config();
require("./database/index");
const connectDB = require("./database/index");
const initializeServer = require("./server/index");

const port = process.env.PORT ?? process.env.SERVER_BACK_END ?? 5000;

(async () => {
  try {
    await connectDB();
    initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
