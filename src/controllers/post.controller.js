const { PrismaClient } = require("@prisma/client");

const { user, post } = new PrismaClient();

const listPost = async (req, res) => {

    try {
        const result = await post.findMany({
            select: {
                id: true,
                title:true,
                updated_at:true,
                created_at:true,
                post:true,
                user: true
            }
        });

        res.status(200).json({
            status: true,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        })
    }
}

const listPostById = async (req,res) => {
    try {
    const { post_id } = req.params

    let posts = await post.findMany({
        where: {
            id: parseInt(post_id)
        }
        , select: {
            id: true,
            title: true,
            updated_at: true,
            created_at: true,
            post: true,
            user: true,
        }
    });

    res.status(200).json({
        status: true,
        data: posts
    })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        })
    }
}

const createPost = async (req,res) => {
    try {
        const {title, content, user_id} = req.body;

        const userExists = await user.findUnique({
            where: {
                id: user_id
            }
        });

        if(!userExists){
            return res.status(400).json({
                status: false,
                msg: 'Usuario no encontrado'
            })
        }

        const newPost = await post.create({
            data:{
                title,
                post: content ,
                user_id
            }
        });

        res.status(200).json({
            status: true,
            data: newPost
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const {title, content, user_id} = req.body;
        const { post_id} = req.params;

        const updatePost = await post.update({
            where: {id: Number(post_id)},
            data: {
                title,
                post: content,
                user_id
            }
        })
        res.status(200).json({
            status: true,
            data: updatePost
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        })
    }
}

const deletePost = async (req,res) => {
    try {
        const { post_id } = req.params
        const userDelete = await post.delete({
            where: {id: Number(post_id)}
        });
        res.status(200).json({
            status: true,
            data: userDelete,
            message: 'Usuario Eliminado'
        })
    } catch (error) {
        
        res.status(500).json({
            status: false,
            error: error
        })
    }
}

module.exports = {listPost, listPostById,createPost, updatePost, deletePost}