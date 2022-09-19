const express = require("express");
const cors = require("cors");
const conn = require("./database/db");
require("dotenv").config();
const app = express();

//routes
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/Payments");

//get request for home
app.get("/", (req, res) => {
	res.send("Hello world");
});
const corsOptions = {
	origin: process.env.FRONTEND_BASE_URL,
	credentials: true,
	methods: "GET, PUT",
};

//middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

//db connection
conn();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
