const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../../database/models');
const { literal, Op } = require("sequelize");
const path = require("path");
const fs = require('fs');



module.exports = {

    usuariosRegistrados: async (req, res) => {
        try {
            let {
                limit = 4,
                page = 1,
                order = "ASC",
                sortBy = "id",
                search = "",
            } = req.query;
            limit = limit > 16 ? 16 : +limit;
            page = +page;
            let offset = +limit * (+page - 1);


        } catch (error) {

            console.log(error)

        }

    },
    registro: async (req, res) => {
        try {


        } catch (error) {
            console.log(error);
        }

    },
    login: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
        }
    },
    procesoLogin: async (req, res) => {
        try {



        } catch (error) {
            console.log(error);
        }
    },
    procesoRegistro: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
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
    logout: async (req, res) => {
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