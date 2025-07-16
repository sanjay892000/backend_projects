const wanderlustModel = require("../../schema/wanderlust.model");

const yourPost = async (req,res) => {
    try {
        const post = await wanderlustModel.find({ createdby: req.user }).sort({ createdAt: -1 })
            .populate("like", "name email avatar")
            .populate({
                path: "rating",
                populate: {
                    path: "user",
                    select: "name email"
                }
            })
            .populate({
                path: "comment",
                populate: {
                    path: "user",
                    select: "name email avatar"
                }
            })
            .lean({ virtuals: true });


        return res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            total_results: post.length,
            results: post
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }

}

module.exports = yourPost;