const { PrismaClient } = require("@prisma/client");

const { user } = new PrismaClient();
const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const users = await user
      .findMany
      //Todo: Me permite traer solo los campos que quiero
      // {
      //     select: {
      //         name: true,
      //         post: true
      //     }
      // }
      ();
    res.status(200).json({
      status: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error,
    });
  }
};

const createUser = async (req, res) => {
    try {
        const { username } = req.body;

    const userExists = await user.findUnique({
        where: {
            username
        },
        select: {
            username: true
        }
      })

    if(userExists) {
        return res.status(400).json({
            msg: `El usuario ya existe`
        })
    }

    let newUser = await user.create({
        data: {
            username
        }
    })

    res.status(200).json({
        status: true,
        data: newUser
    })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error,
          });
    }
};

module.exports = {
  getUsers,
  createUser,
};
