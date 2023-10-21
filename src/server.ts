import express from "express";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import commentRouter from "./routes/commentRoutes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

app.use("/api/post", postRouter);

app.use("/api/comment", commentRouter);

app.listen(process.env, () => {
  console.log("Listening on port 5000");
});
