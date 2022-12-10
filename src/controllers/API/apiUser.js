const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../../database/models');
const { literal, Op } = require("sequelize");
const path = require("path");
const fs = require('fs');



module.exports = {

    procesoLogin: async (req, res) => {
        try {



        } catch (error) {
            let errors = sendSequelizeError(error);
            return res.status(error.status || 500).json({
                ok: false,
                errors,
            });

        }
    },
    procesoRegistro: async (req, res) => {
        try {
            const { firstname, surname, email, password, avatar, rol_id, address } = req.body
            


        } catch (error) {
            let errors = sendSequelizeError(error);
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