import { verify } from "jsonwebtoken";
import { secretKey } from "../../jwt.config";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.get('Authorization').split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedData = verify(token, secretKey);

        req.user = decodedData;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized"});
    }
};

export default authMiddleware;