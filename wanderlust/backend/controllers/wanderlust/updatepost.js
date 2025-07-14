const wanderlustModel = require("../../schema/wanderlust.model");
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, description, image, price, location, country } = req.body;
    const userId = req.user;
    try {
        // Check if the post exists
        const post = await wanderlustModel.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // Check if the user is the creator of the post
        if (post.createdby.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this post"
            });
        }

        // Update the post details
        post.title = title || post.title;
        post.description = description || post.description;
        post.image = image || post.image;
        post.price = price || post.price;
        post.location = location || post.location;
        post.country = country || post.country;

        // Save the updated post
        const updatedPost = await post.save();

        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post: updatedPost
        });
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

module.exports = updatePost;