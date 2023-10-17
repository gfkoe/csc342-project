const express = require("express");
const routes = require("./routes/Routes.js");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ your_api: "it works" });
// });

app.use(routes);

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
