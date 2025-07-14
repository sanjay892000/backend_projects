const Wanderlust = require("../../schema/wanderlust.model");
const uploadOnCloudinary = require("../../utils/uploadOnCloudinary");

const addPost = async (req, res) => {
    const { title, description, location, country, price } = req.body;
    const localPath = req.file ? req.file.path : null;
    try {

        const image = await uploadOnCloudinary(localPath)
        if (!image) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }
        const addlist = await Wanderlust.create({
            title,
            description,
            image, 
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