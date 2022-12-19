const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../../database/models');
const { sendSequelizeError, createError, createErrorExpress } = require("../../helpers");
const { sign } = require("jsonwebtoken");
const path = require("path");
const fs = require('fs');




module.exports = {
    procesoLogin: async (req, res) => {
        const errors = validationResult(req);
        try {
            if (errors.isEmpty()) {
                const user = await db.User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                const token = sign(
                    {
                        id: user.id,
                        rol: user.rol
                    },
                    process.env.SECRET_TOKEN,
                    {
                        expiresIn: '1h'
                    }
                )
                return res.status(200).json({
                    Meta: {
                        Process_Login: "OK"
                    },
                    Status: 200,
                    Data: {
                        Token: token
                    }
                })
            }
            throw errors
        } catch (error) {
            let msgErrorsObjet1 = {};
            error.errors.forEach(err => {
                msgErrorsObjet1 = {
                    ...msgErrorsObjet1,
                    [err.param]: err.msg
                }
            })
            return res.status(400).json({
                msg: msgErrorsObjet1,
                erroress: error
            })
        }
    },
    procesoRegistro: async (req, res) => {
        try {
            let errors = validationResult(req)
            const { firstname, surname, email, password } = req.body
            errors = errors.mapped()
            if (Object.entries(errors).length === 0) {
                const user = await db.User.create({
                    firstname: firstname.trim(),
                    surname: surname.trim(),
                    email: email.trim(),
                    password: hashSync(password, 10),
                    avatar: req.file && req.file.filename,
                    rol_id: 1,
                    createdAt: new Date()
                })
                const token = sign(
                    {
                        id: user.id,
                        rol: user.rol
                    },
                    process.env.SECRET_TOKEN,
                    {
                        expiresIn: '1h'
                    }
                )
                res.status(201).json({
                    status: 201,
                    meta: {
                        User_Create: 'Ok',
                    },
                    data: {
                        data: user,
                    },
                    Security: { Token: token }
                })
            } else {
                throw errors
            }
        } catch (errors) {
            let msgErrorsObjet = {}
            for (const property in errors) {
                console.log(msgErrorsObjet)
                msgErrorsObjet = {
                    ...msgErrorsObjet,
                    [property]: errors[property].msg
                }
            }
            return res.json({
                meta: {
                    User_Create: "No process"
                },
                validatorErrors: msgErrorsObjet
            })
        }
    },
    remove: async (req, res) => {
        try {
            const {id, rolId} =req.userToken;
            const {userId} = req.query;
            let removeUser;
            if(rolId == 2) {
                if(!userId){
                    throw createError(404, 'Debes indicar el ID del usuario a eliminar');
                }
                if(userId == id){
                    throw createError(404, 'No puedes autoeliminarte');
                }
                removeUser = await db.User.destroy({
                    where : {
                        id : userId
                    }
                }); 
            }else {
                removeUser = await db.User.destroy({
                    where : {
                        id
                    }
                });        }
            if(!removeUser){
                throw createError(404, 'El usuario no existe para ser eliminado')
            }
            return res.status(200).json({
                ok : true,
                msg : 'Usuario eliminado con éxito',
            })
            
        } catch (error) {
            let errors = sendSequelizeError(error);
            return res.status(error.status || 500).json({
                ok: false,
                errors,
            });
        }
    },
    todosLosUsuarios: async (req, res) => {
        try {
            let { limit = 10,
                page = 1,
                order = "ASC",
                sortBy = "id",
            } = req.query;
            limit = limit > 10 ? 10 : +limit;
            page = +page;
            order = ["ASC", "DESC"].includes(order.toUpperCase()) ? order.toUpperCase() : "ASC"; 
            sortBy = ["firstname", "surname"].includes(sortBy.toLowerCase()) ? sortBy : "id";
            let offset = +limit * (+page - 1);
            let count = await db.User.count();                              
            const users = await db.User.findAll({                          
                limit,
                offset,
                attributes: {
                    exclude: ['password']
                }
            });
            users.forEach(user => {
                user.setDataValue('link', `${req.protocol}://${req.get('host')}${req.originalUrl}/${user.id}`)
            });
            const queryKeys = {                                      //configuración de Información para botones
                limit: +limit,
            }
            let queryUrl = "";
            for (const key in queryKeys) {
                queryUrl += `&${key}=${queryKeys[key]}`
            }
            const existPrev = page > 1;
            const existNext = offset + limit < count;
            const prev = existPrev ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page - 1}${queryUrl}` : null;//creacion de URL para botones 
            const next = existNext ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page + 1}${queryUrl}` : null;
            return res.status(200).json({
                meta: {
                    Search_User: "Ok",
                    status: 200,
                },
                data: {
                    Total_User: count,
                    Users: users,
                    Page: page,
                    Page_prev: prev,
                    Page_next: next
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                status: error.status || 500,
                msg: error.message
            })
        }
    },
    unUsuario: async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(id)) {
                throw createError(400, 'El ID debe ser un numero');
            }
            const user = await db.User.findByPk(id, {                          
                attributes: {
                    exclude: ['password']
                }
            });
            if (!user) {                                                        
                throw createError(404, 'No existe un Usuario con ese ID');
            }
            return res.status(200).json({                                    
                meta: {
                    Search_User: "Ok",
                    status: 200,
                },
                data: user
            })
        } catch (error) {                                                     
            return res.status(error.status || 500).json({
                search_User: "No Process",
                status: error.status || 500,
                msg: error.message,
            });
        }
    },
    getUserImage: (req, res) => {
        if (fs.existsSync(path.join(__dirname, "..", "..", "..", "public", "images", "usuarios", req.params.image))) {
            return res.sendFile(path.join(__dirname, "..", "..", "..", "public", "images", "usuarios", req.params.image));
        } else {
            return res.status(404).json({
                ok: false,
                errors: 'No existe el archivo'
            });
        }
    },
    verifyEmail: async (req, res) => {
        try {
            const { email } = req.body;
            let user = await db.User.findOne({
                where: {
                    email
                }
            })

            return res.status(200).json({
                ok: true,
                verified: user ? true : false
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                error: error.message
            })
        }
    },
    modifyUserTipe: async (req,res) =>{
        try {
            let {id} = req.params
            let user = await db.User.findByPk(id)
            if (user) {
                user.rol_id = user.rol_id === 1 ? 2 : 1
                await user.save()
            } else {
                return res.status(200).json({
                    ok: false,
                    ChangeType: 'Usuario no encontrado'
                })
            }
            return res.status(200).json({
                ok: true,
                ChangeType: 'Usuario actualizado:'
            })
        } catch (error) {
            console.log(error);
        }
    }
}