const Wanderlust = require("../../schema/wanderlust.model");

const addPost = async (req, res) => {
    const { title, description, location, country, price } = req.body;

    try {
        const addlist = await Wanderlust.create({
            title,
            description,
            location,
            country,
            price,
            createdby: req.user
        })

        if (!addlist) {
            return res.status(400).json({
                success: false,
                message: "Failed to add post"
            });
        }
        return res.status(201).json({
            success: true,
            message: "Post added successfully",
            post: addlist
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }



}

module.exports = addPost;