const NotesModel = require("../schema/note.model");

const createNote = async (req, res) => {
    try {
        const { title, description, tag, isPrivate } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required!",
            });
        }

        const note = await NotesModel.create({
            title,
            description,
            tag,
            isPrivate: isPrivate ?? false,
            createdBy: req.user,
        });

        return res.status(201).json({
            success: true,
            message: "Note added successfully!",
            note,
        });

    } catch (error) {
        console.log(error);

        let message = "Internal server error!";
        let statusCode = 500;

        if (error.name === "ValidationError") {
            message = Object.values(error.errors)[0].message;
            statusCode = 400;
        }

        return res.status(statusCode).json({
            success: false,
            message,
        });
    }
};


const getMyNote = async (req, res) => {
    try {
        const notes = await NotesModel.find({ createdBy: req.user })
            .sort({ updatedAt: -1 })
            .populate("createdBy", "name email")
            .lean();

        return res.status(200).json({
            success: true,
            message: "Notes fetched successfully!",
            notes,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error!",
        });
    }
};


const publicNote = async (req, res) => {
    try {
        const notes = await NotesModel.find({ isPrivate: false })
            .sort({ updatedAt: -1 })
            .populate("createdBy", "name email")
            .lean();

        return res.status(200).json({
            success: true,
            message: "Public notes fetched successfully!",
            notes,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error!",
        });
    }
};


const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const userId = req.user;

        const note = await NotesModel.findOne({
            _id: noteId,
            createdBy: userId,
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found or unauthorized!",
            });
        }

        const fields = ["title", "description", "tag", "isPrivate"];

        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                note[field] = req.body[field];
            }
        });

        await note.save();

        return res.status(200).json({
            success: true,
            message: "Note updated successfully!",
            note,
        });

    } catch (error) {
        console.log(error);

        let message = "Internal server error!";
        let statusCode = 500;

        if (error.name === "ValidationError") {
            message = Object.values(error.errors)[0].message;
            statusCode = 400;
        }

        return res.status(statusCode).json({
            success: false,
            message,
        });
    }
};



const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const userId = req.user;

        const note = await NotesModel.findOne({
            _id: noteId,
            createdBy: userId,
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found or unauthorized!",
            });
        }

        await NotesModel.findByIdAndDelete(noteId);

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully!",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error!",
        });
    }
};

module.exports = {
    createNote,
    getMyNote,
    publicNote,
    updateNote,
    deleteNote,
};
