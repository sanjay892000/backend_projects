const wanderlustModel = require("../../schema/wanderlust.model");

const getPost = async (req, res) => {

    try {
        const allList = await wanderlustModel.find({}).sort({ createdAt: -1 })
            .populate("like", "name email")
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
            .populate("createdby","name email avatar")
            .lean({ virtuals: true }); // include likesCount virtual

        if (!allList || allList.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No posts found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            total_results: allList.length,
            results:allList
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });

    }


}

module.exports = getPost;