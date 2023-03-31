import Message from "../models/massage";
import User from "../models/user";

export const createMessage = async (req, res) => {
    const userId = req.user;

    const user = await User.findOne(userId);

    res.status(200).json(user);
};

export const getMessage = async (req, res) => {

};

export const patchMessage = async (req, res) => {
    const { id } = req.params;
};

export const deleteMessage = async (req, res) => {
    const { id } = req.params;
};