const PostModel = require('../models/PostModel')

exports.getAllPost = async (req, res) => {
    const posts = await PostModel.find().populate("user")


try {
    if (posts.length === 0) {
        return res.status(400).json({ message: "Didn't find any post" })
    }
    return res.status(200).json(posts);
} catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Couldn't get the post" })
}

}
exports.getPostById = async (req, res) => {
    const { _id } = req.params;
    const post = await PostModel.findById(_id);
    try {
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: "Please try again later" })
    }
}

exports.createPost = async (req, res) => {
    const postToCreate = await PostModel.create(req.body);
    try {
        return res.status(201).json(postToCreate)
    } catch (error) {
        return res.status(500).json({ message: "Couldn't create the post" });
    }
}

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const postToUpdate = await PostModel.findByIdAndUpdate(id, req.body, { new: true });
    try {
        return res.status(202).json(postToUpdate);
    } catch (error) {
        return res.status(500).json({ message: "Couldn't update the post" });
    }
}

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    const postToDelete = await PostModel.findByIdAndDelete(id);
    try {
        return res.status(203).json({ message: "Succesfully Deleted" })
    } catch (error) {
        return res.status(500).json({ message: "Couldn't delete post" })
    }
}