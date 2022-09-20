const express = require("express");
const cors = require("cors");
const conn = require("./database/db");
//routes
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/Payments");
require("dotenv").config();
const app = express();

const corsOptions = {
	origin: process.env.FRONTEND_BASE_URL,
	credentials: true,
	methods: "GET, PUT",
};

//middlewares

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

//db connection
conn();
//get request for home
app.get("/", (req, res) => {
	res.send("Hello world");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
