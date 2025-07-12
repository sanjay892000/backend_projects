const wanderlustModel = require("../../schema/wanderlust.model");

const likepost = async (req, res) => {
    try {
        const { postid } = req.params;

        const userid = req.user;

        // Check if the post exists
        const post = await wanderlustModel.findById(postid);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        let isLiked = false;
        console.log(post.like.includes(userid))
        // Check if the user has already liked the post
        if (post.like.includes(userid)) {
            post.like.pop(userid);
            await post.save();
            isLiked = false; // User has unliked the post
        }
        else {
            post.like.push(userid);
            await post.save();
            isLiked = true; // User has liked the post
        }
        // If not liked, add the user to the likes array

        // Add the user's ID to the likes array


        // Populate the updated post data
        const updatedPost = await wanderlustModel.findById(postid)
            .populate("like", "name email")
            .populate("createdby", "name email avatar")
            .populate({
                path: "rating",
                populate: {
                    path: "user",
                    select: "name email avatar"
                }
            })
            .lean({ virtuals: true }); // include likesCount virtual
        return res.status(200).json({
            success: true,
            message: isLiked ? "Post liked successfully" : "Post unliked successfully",
            data: updatedPost
        });
    } catch (error) {
        console.error('Error liking post:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = likepost;