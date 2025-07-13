const wanderlustModel = require("../../schema/wanderlust.model");

const commentPost = async (req, res) => {
    const { postid } = req.params;
    console.log(req.body)
    const { text } = req.body;

    try {
        // Find the post by ID
        const post = await wanderlustModel.findById(postid);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }


        // Add the new comment to the post's comments array
        post.comment.push({
            user: req.user, // Assuming req.user contains the authenticated user's info
            text: text
        });
        await post.save();

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: post.comment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

module.exports = commentPost;