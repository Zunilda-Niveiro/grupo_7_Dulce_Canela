const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../../database/models');
const { sendSequelizeError, createError, createErrorExpress } = require("../../helpers");
const { sing } = require("jsonwebtoken");
const path = require("path");
const fs = require('fs');




module.exports = {
    procesoLogin: async (req, res) => {
        try {
            const errors = await validationResult(req);
            console.log(errors)
            if (!errors.isEmpty()) {
                throw createErrorExpress(errors, req)
            }
            const { firstname, surname, email, password, avatar, address } = req.body;
            const { id } = await db.User.create({
                firstname: firstname && firstname.trim(),
                surname: surname && surname.trim(),
                email: email && email.trim(),
                password: bcryptjs.hashSync(password, 10),
                avatar: req.file && req.file.filename,
                address: address && address.trim(),
                rol_id: 1,
                createdAt: new Date()
            });
            const token = sing(
                {
                    id,
                    rol_id,
                },
                process.env.SECRET_KEY_JWT,
                {
                    expiresIn: "1h",
                }
            );

            return res.status(201).json({
                ok: true,
                status: 201,
                data: token,

            });
        } catch (error) {
            let errors = sendSequelizeError(error);
            return res.status(error.satus || 500).json({
                ok: false,
                errors,
            });
        }
    },
    procesoRegistro: async (req, res) => {
        try {
            const errors = await validationResult(req);
            console.log(errors)
            if (!errors.isEmpty()) {
                throw createErrorExpress(errors, req)
            }
            const { email, password } = req.body;
            if (!email || !password) {
                throw createError(404, 'se requiere email y contrasena');
            }
            let user = await db.User.findOne({
                where: {
                    email
                }
            });
            if (!user || !compareSync(password, user.password)) {
                throw createError(401, "Credenciales inválidas");
            }
            const token = sign(
                {
                    id: user.id,
                    is_admin: user.is_admin,
                },
                process.env.SECRET_KEY_JWT,
                {
                    expiresIn: "1h",
                }
            );
            return res.status(200).json({
                ok: true,
                status: 200,
                data: token,
            });

        } catch (error) {
            const errors = sendSequelizeError(error);
            return res.status(error.status || 500).json({
                ok: false,
                errors,
            });
        }
    },
    perfil: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
        }
    },
    remove: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
        }
    },


    verifyEmail: async (req, res) => {
        console.log('>>>>>>>>>>>>>>>>>>>>>', req.body)
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
}