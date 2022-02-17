const { PrismaClient } = require("@prisma/client");
// Luis vanegas
const { user, post } = new PrismaClient();

const listPost = async (req,res) => {
    try {
    const { user_id } = req.params

    let posts = await post.findMany({
        where: {
            user_id: parseInt(user_id)
        }
        , select: {
            id: true,
            title: true,
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
                post: content,
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

module.exports = {listPost,createPost}