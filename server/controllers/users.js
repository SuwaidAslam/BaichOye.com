import User from '../mongodb/models/user.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({success: true, data: users});
    } catch (error) {
        res.status(500).json({success: false, data: error});
    }
}

export const createUser = async (req, res) => {
    try {
        const {name, phone, password }  = req.body;
        // const newAd = await PostSchema.create(ad);
        const newUser = await User.create({   
            name: name,
            phone: phone,
            password: password,
        });
        // const newUser = new User(user);
        // await newUser.save();
        res.status(201).json({success: true, data: newUser});
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
}