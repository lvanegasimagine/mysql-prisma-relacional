const { PrismaClient } = require("@prisma/client");

const { user } = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const users = await user.findMany({
      // take: 5
    });
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

const getUserById = async (req,res) => {
      
  try {
    const { id_user } = req.params;

    const result = await user.findUnique(
      {
        where: { id: Number(id_user)},
      }
    )

    if(!result){
      return res.status(404).json({
        status: true,
        message: 'No Existe este usuario'
      }); 
    }

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

const updateUser = async (req, res) => {
    try {
      const { username } = req.body;
      const { id_user } = req.params;

      const updateUser = await user.update({
        where:{
          id:  Number(id_user)
        },
        data: {
          username
        }
      });

      res.status(200).json({
        status: true,
        data: updateUser
      })
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error
      })
    }
}

const deleteUser = async (req, res) => {
    try {
      const { id_user } = req.params;

      const data = await user.delete({
        where: {id: Number(id_user)}
      });

      res.status(200).json({
        status: true,
        data,
        message: 'Usuario Eliminado'
      })
    } catch (error) {
      const {meta} = error;
      res.status(500).json({
        status: false,
        error: meta.cause
      })
    }
}



module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
