import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(express.json());

/*app.use(cors({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));*/

app.use(cors());

app.use(routes);

app.listen(3333, () => {
    console.log("🚀 Server is running on http://localhost:3333");
});