const wanderlustModel = require("../../schema/wanderlust.model");
const deletePost = async (req, res) => {
    const { postid } = req.params;
    const userid = req.user;
    try {
        let result = await wanderlustModel.findByIdAndDelete(postid, { createdby: userid })
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully"
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

module.exports = deletePost;