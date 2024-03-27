import mongoose from "mongoose"

const FileSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        filePath: {
            type: String,
            required: true
        },
        fileSize: {
            type: Number,
            required: true
        },
        isSafe: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const FileModel = mongoose.model("File", FileSchema)

export default FileModel