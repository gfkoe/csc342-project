const express = require("express");
const routes = express.Router();
const app = express();
const PORT = process.env.PORT;

// Designate the static folder as serving static resources
app.use(express.static(__dirname + "/static"));

const frontendRouter = require("./frontendRoutes");

app.use(frontendRouter);

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
