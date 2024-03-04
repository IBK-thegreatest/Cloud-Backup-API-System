"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const auth_routes_1 = tslib_1.__importDefault(require("./routes/auth.routes"));
const user_routes_1 = tslib_1.__importDefault(require("./routes/user.routes"));
const folder_routes_1 = tslib_1.__importDefault(require("./routes/folder.routes"));
const file_routes_1 = tslib_1.__importDefault(require("./routes/file.routes"));
const fileHistory_routes_1 = tslib_1.__importDefault(require("./routes/fileHistory.routes"));
const review_routes_1 = tslib_1.__importDefault(require("./routes/review.routes"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGODB_DATABASE_URL).then(() => {
    console.log("Database Connection Successful");
}).catch(err => {
    console.log(err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/folders", folder_routes_1.default);
app.use("/api/v1/files", file_routes_1.default);
app.use("/api/v1/history", fileHistory_routes_1.default);
app.use("/api/v1/reviews", review_routes_1.default);
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});
const port = 5000;
app.listen(port, () => {
    console.log(`Backend Server is currently running on port ${port}`);
});
//# sourceMappingURL=index.js.map