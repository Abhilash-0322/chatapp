import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedinuserid = req.user._id;

        const allfilteredusers = await User.find({ _id: { $ne: loggedinuserid } }).select("-password");

        res.status(200).json(allfilteredusers);
    } catch (error) {
        console.error("Error in getUsersForSidebar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}