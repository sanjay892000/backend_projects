const ratingModel = require('../../schema/rating.model')
const wanderlustModel = require('../../schema/wanderlust.model');
const addrating = async (req, res) => {
    const { stars, comment } = req.body;
    const { postid } = req.params
    const userid = req.user;

    try {

        const post = await wanderlustModel.findById(postid)
        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        const isRating = await ratingModel.findOne({ user: userid });
       

        if (isRating) {
            return res.json({
                message: 'You have already rated this post',
            });
        }
             const newRating = await ratingModel.create({
                    user: req.user,
                    post: postid,
                    stars,
                    comment
                });
        
                post.rating.push(newRating._id)
                await post.save()
        
                const updatedListing = await wanderlustModel.findById(postid)
                    .populate("like", "username email")
                    .populate("createdby", "username")
                    .populate({
                        path: "rating",
                        populate: {
                            path: "user",
                            select: "name email"
                        }
                    })
                    .lean({ virtuals: true }); // include likesCount virtual

        res.json({
            message: 'Rating added successfully',
            data: updatedListing
        });
    } catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = addrating;