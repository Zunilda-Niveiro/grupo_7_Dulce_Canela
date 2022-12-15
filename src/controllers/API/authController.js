const { hashSync, compareSync } = require("bcryptjs");
const { validationResult } = require('express-validator');
const db = require("../../database/models");
const { sendSequelizeError, createError, createErrorExpress } = require("../../helpers");
const { sing } = require("jsonwebtoken");


module.exports = {
    signUp: async (req, res) => {
        try {
            let errors = await validationResult(req);
            console.log(errors)
            if (!errors.isEmpty()) {
                throw createErrorExpress(errors, req)
            }
            const { surname, firstname, address, email, password } = req.body;

            const { id } = await db.User.create({
                surname: surname && surname.trim(),
                firstname: firstname && firstname.trim(),
                address: address && address.trim(),
                avatar: req.file && req.file.filename,
                email: email && email.trim(),
                password: bcryptjs.hashSync(password, 10),
                rol_id: 1,
                createdAt: new Date()
            });
            const token = sign(
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



    //registrarse
    signIn: async (req, res) => {
        try {

            let errors = await validationResult(req);
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
            const token = sing(
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
            let errors = sendSequelizeError(error);
            return res.status(error.status || 500).json({
                ok: false,
                errors,
            });
        }
    }
}







