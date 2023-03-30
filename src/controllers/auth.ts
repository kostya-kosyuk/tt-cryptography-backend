export const registration = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.sendStatus(400);
        }

    } catch (error) {

    }
};

export const login = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.sendStatus(400);
        }

        res.json(`login: ${email}, ${password}`);
    } catch (error) {

    }
};