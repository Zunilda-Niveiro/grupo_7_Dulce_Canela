const { validationResult } = require("express-validator");
const db = require("../../database/models");
const { literal, Op } = require("sequelize");
const path = require("path");
const fs = require('fs');

const options = (req) => {
    return {
        include: [{
            association: "imagenes",
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt", "product_id"],
                include: [[literal(`CONCAT('${req.protocol}://${req.get("host")}/api/productos/images/',file)`), "url"]],
            },
        },
        {
            association: "categoria",
            attributes: ["name"],
        },
        {
            association: "marca",
            attributes: ["name"],
        },
        ],
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt",
                "deletedAt",
                "category_id",
                "brand_id",
            ],
            include: [[literal(`CONCAT('${req.protocol}://${req.get("host")}/api/productos/detalle/',Product.id)`), "url"]],
        },
    };
};

module.exports = {
    productos: async (req, res) => {
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

            order = ["ASC", "DESC"].includes(order.toUpperCase()) ? order.toUpperCase() : "ASC";
            sortBy = ["name", "price", "category", "newest"].includes(sortBy.toLowerCase()) ? sortBy : "id";

            const { count, rows: products } = await db.Product.findAndCountAll({
                ...options(req),
                subQuery: false,
                limit,
                offset,
                order: [[sortBy, order]],
                where: {
                    [Op.or]: [{
                        name: {
                            [Op.substring]: search,
                        },
                    },
                    {
                        detail: {
                            [Op.substring]: search,
                        },
                    },
                    {
                        "$categoria.name$": {
                            [Op.substring]: search,
                        },
                    },
                    ],
                },
            });
            return res.status(200).json({
                ok: true,
                meta: {
                    total: count,
                    limit: limit,
                    offset: offset,
                },
                data: products,
            });
        } catch (error) {
            console.log(error);
        }
    },
    detalle: async (req, res) => {
        try {
            const producto = await db.Product.findByPk(req.params.id, options(req));

            return res.status(200).json({
                ok: true,
                data: producto,
            });
        } catch (error) {
            console.log(error);
        }
    },
    agregarProducto: async (req, res) => {
        /* desglose de errores */
        let errors = validationResult(req);
        const {
            nombre,
            marca,
            precio,
            cantidad,
            categoria,
            detalle,
            imagen
        } =
            req.body;
        let errorsDetail = {};
        console.log(errors.isEmpty());

        if (errors.isEmpty()) {
            const categ = await db.Category.findOne({
                where: {
                    name: categoria,
                },
            });
            let brand = await db.Brand.findOne({
                where: {
                    name: marca,
                },
            });
            if (!brand) {
                brand = await db.Brand.create({
                    name: marca,
                });
            }
            const newProduct = await db.Product.create({
                name: nombre.trim(),
                price: precio,
                detail: detalle ? detalle.trim() : "",
                amount: cantidad,
                discount: 0,
                category_id: categ.id,
                brand_id: brand.id,
            });
            return res.status(200).json({
                ok: true,
                data: newProduct,
            });
        } else {
            errors = errors.mapped();
            for (const key in errors) {
                errorsDetail = {
                    ...errorsDetail,
                    [key]: errors[key].msg,
                };
            }
            return res.status(200).json({
                ok: false,
                errors: errorsDetail,
            });
        }
    },
    getImage: (req, res) => {
        return res.sendFile(
            path.join(
                __dirname,
                "..",
                "..",
                "..",
                "public",
                "images",
                "productos",
                req.params.image
            )
        );
    },
    remove: async (req, res) => {
        try {
            producto = await db.Product.findByPk(req.params.id, options(req))

            if (producto && producto.imagenes.length) {
                producto.imagenes.forEach(async image => {
                    fs.existsSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', image.file)) && fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', image.file))
                });
            }
            await producto.destroy()
            return res.status(200).json({
                ok: true,
                data: producto
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                ok: false,
                errors: error
            })
        }
    }
};