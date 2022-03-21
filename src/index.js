import express, { json, urlencoded } from "express";
import cors from "cors";
import "./database";
import linksRoutes from "./routes/links.routes";
import UsersRoutes from "./routes/users.routes";

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/api/links", linksRoutes);
app.use("/users", UsersRoutes);

// starting server
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
