const User = require('../models/userModel')

const createUser = async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email});
    if (!findUser) {
        // Buat User Baru
        const newUser = User.create(req.body);
        res.json(newUser);
    } else {
        res.json({
            message: 'User Sudah Ada',
            success: false,
        })
    }
}

module.exports = createUser;