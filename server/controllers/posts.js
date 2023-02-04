// import PostSchema from '../mongodb/models/post.js';

export const getPosts = async (req, res) => {
    res.send("this works");
    // try {
    //     const posts = await PostSchema.find({});
    //     res.status(200).json({success: true, data: posts});
    // } catch (error) {
    //     res.status(500).json({success: false, data: error});
    // }
}

export const createPosts = async (req, res) => {
    res.send("this works");
    // try {
    //     const {name, prompt, photo } = req.body;

    //     const photoUrl = await cloudinary.uploader.upload(photo);
    //     const newPost = await PostSchema.create({   
    //         name,
    //         prompt,
    //         photo: photoUrl.url,
    //     });
    //     res.status(201).json({success: true, data: newPost});
    // } catch (error) {
    //     res.status(500).json({success: false, message: error});
    // }
}