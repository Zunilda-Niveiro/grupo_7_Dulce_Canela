const {validationResult} = require("express-validator");
const db = require("../../database/models");
const {literal,Op} = require("sequelize");
const path = require("path");
const fs = require('fs');

const options = (req) => {
    return {
        include: [{
                association: "imagenes",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt", "product_id"],
                    include: [[literal(`CONCAT('${req.protocol}://${req.get("host")}/api/productos/images/',file)`),"url"]],
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
            include: [[literal(`CONCAT('${req.protocol}://${req.get("host")}/api/productos/detalle/',Product.id)`),"url"]],
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

            const {count,rows: products} = await db.Product.findAndCountAll({
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
                data:products,
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
                data:{
                    'id':producto.id,
                    'name':producto.name,
                    'price':producto.price,
                    'detail':producto.detail,
                    'amount':producto.amount,
                    'discount':producto.discount,
                    'url':producto.url,
                    'imagenes':producto.imagenes,
                    'marca':producto.marca.name,
                    'categoria':producto.categoria.name
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                ok: false,
                errors:'Producto no encontrado'
            });
        }
    },
    agregarProducto: async (req, res) => {
       
        let errors = validationResult(req);
        const {
            name,
            brand,
            price,
            amount,
            category,
            discount,
            detail,
        } = req.body;

        let errorsDetail = {};

        if (errors.isEmpty()) {

            const categ = await db.Category.findOne({
                where: {
                    name: category,
                },
            });

            let brandExist = await db.Brand.findOne({
                where: {
                    name: brand,
                },
            });

            if (!brandExist) {
                brandExist = await db.Brand.create({
                    name: brand,
                });
            }

            const newProduct = await db.Product.create({
                name: name.trim(),
                price: price,
                detail: detail ? detail.trim() : "",
                amount: amount,
                discount: discount ? discount : 0,
                category_id: categ.id,
                brand_id: brandExist.id,
            });

            if(req.files){
                let images = req.files.map(file => {
                    return {
                        file:file.filename,
                        product_id:newProduct.id
                    }
                })
                await db.Image.bulkCreate(images)               
            };
          
            await newProduct.reload(options(req))

            return res.status(200).json({
                ok: true,
                data: newProduct,
            });
        } else {
            if(req.files.length > 0){
                req.files.forEach(({filename}) => {
                    fs.existsSync(path.resolve(__dirname,'..','..','..','public','images','productos',filename)) &&  fs.unlinkSync(path.resolve(__dirname,'..','..','..','public','images','productos',filename))
                })
            }
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
    getImage:(req, res) => {

       if (fs.existsSync(path.join(__dirname,"..","..","..","public","images","productos",req.params.image))) {
            return res.sendFile(path.join(__dirname,"..","..","..","public","images","productos",req.params.image));
       } else {
        return res.status(404).json({
            ok: false,
            errors:'No existe el archivo'
        }); 
       }
    },
    update: async (req,res) =>{
        try {
            let errors = validationResult(req);
            let errorsDetail = {};
			if(errors.isEmpty()){
				const {name, price, discount, detail, amount, category, imagenes, brand} = req.body;

                const categ = await db.Category.findOne({
                    where: {
                        name: category,
                    },
                });

                let brandFound = await db.Brand.findOne({
                    where: {
                        name: brand,
                    },
                });
    
            
                let product = await db.Product.findByPk(req.params.id, options(req));

                if (!brandFound) {
                    brandFound = await db.Brand.create({
                        name: brand,
                    });
                }
                if (product){
                    product.name = name.trim() || product.name;
                    product.price = price || product.price;
                    product.detail = detail.trim() || product.detail;
                    product.amount = amount || product.amount;
                    product.discount = discount || product.discount;
                    product.category_id = categ.id || product.category_id;
                    product.brand_id = brandFound.id || product.brand_id;
                    await product.save();

                    if(req.files && req.files.length){
                    
                        req.files.forEach(async (file, index) => {
                        
                            if(product.imagenes[index]){
                                fs.existsSync(path.join(__dirname,'..','..','..','public','images','productos',product.imagenes[index].file)) && fs.unlinkSync(path.join(__dirname,'..','..','..','public','images','productos',product.imagenes[index].file))
                                product.imagenes[index].file = file.filename;
                                product.imagenes[index].dataValues.url = `${req.protocol}://${req.get('host')}/productos/images/${file.filename}`
                                await product.imagenes[index].save();
                                await product.reload(options(req))
                            }else{
                                console.log(file.filename,path.join(__dirname,'..','..','..','public','images','productos',file.filename));
                                await db.Image.create({
                                    product_id:product.id,
                                    file:file.filename,
                                    url:path.join(__dirname,'..','..','..','public','images','productos',file.filename)
                                })
                                await product.reload(options(req))
                            }
                        });
                    }
                    return res.status(201).json({
                         ok : true,
                        data : product,
                    });
                }else{
                    errorsDetail={
                        ...errorsDetail,
                        producto:'No existe el producto',
                    }
                    return res.status(200).json({
                        ok: false,
                        errors: errorsDetail,
                    });
                }             
			}else{
                if(req.files.length > 0){
                    req.files.forEach(({filename}) => {
                        fs.existsSync(path.resolve(__dirname,'..','..','..','public','images','productos',filename)) &&  fs.unlinkSync(path.resolve(__dirname,'..','..','..','public','images','productos',filename))
                    })
                }
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
            };
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                errors : error.message,
            }); 
        }
    },
    remove: async (req, res) =>{
        try {
            producto = await db.Product.findByPk(req.params.id,options(req))
            
            if (producto && producto.imagenes.length) {
                producto.imagenes.forEach(async image => {
					fs.existsSync(path.join(__dirname,'..','..','..','public','images','productos',image.file)) && fs.unlinkSync(path.join(__dirname,'..','..','..','public','images','productos',image.file))
				});
            }
            if(producto){
                await producto.destroy()
                return res.status(200).json({
                    ok:true,
                    msg:'Producto eliminado con éxito!'
                })
            }else{
                return res.status(400).json({
                    ok:false,
                    error:'Producto no encontrado'
                })
            }
           
        } catch (error) {
            console.log(error) 
            return res.status(400).json({
                ok:false,
                errors:error
            })
        }
    }
};