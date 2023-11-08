const express = require("express");
const routes = require("./routes/Routes.js");

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

// // Import the userRouter from UserRoute.js
// const userRouter = require("./routes/UserRoute.js");

// // Register the userRouter with the /users path
// app.use(userRouter);

// Import the rest of your routers
app.use(routes);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
