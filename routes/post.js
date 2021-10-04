const express = require('express');
const router = express.Router();

const {
    getAllPost,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/postController");

router.get("/", getAllPost);

router.get("/post/:id", getPostById);

router.post("/post", createPost);

router.put("/post/:id", updatePost);

router.delete("/post/:id", deletePost);

module.exports = router;