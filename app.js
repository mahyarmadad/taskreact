require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./databse/Db");
connectDB();

// app.use(express.json({ extended: false }));
app.use(express.json());
app.use("/api/users", require("./routes/users"));
app.use("/api/todo", require("./routes/todo"));
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))