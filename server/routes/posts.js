import express from "express";
import { createPost, getPosts, updatePost, deletePost, likePost } from "../controllers/posts.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
