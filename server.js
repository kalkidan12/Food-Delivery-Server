const express = require("express");
const cors = require("cors");
const conn = require("./database/db");
//routes
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/Payments");
require("dotenv").config();
const app = express();

const corsOptions = {
	// origin: process.env.FRONTEND_BASE_URL,
	origin: async (req, res) => {
		res.setHeader("Access-Control-Allow-Credentials", true);
		res.setHeader("Access-Control-Allow-Origin", "*");
		// another common pattern
		// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET,OPTIONS,PATCH,DELETE,POST,PUT",
		);
		res.setHeader(
			"Access-Control-Allow-Headers",
			"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
		);
		if (req.method === "OPTIONS") {
			res.status(200).end();
			return;
		}
		return await fn(req, res);
	},

	credentials: true,

	AccessControlAllowOrigin: "*",
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
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	res.send("Hello world");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
