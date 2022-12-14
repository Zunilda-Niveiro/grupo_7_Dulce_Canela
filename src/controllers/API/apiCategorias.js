const {validationResult} = require("express-validator");
const db = require("../../database/models");
const {Op,literal} = require("sequelize");
const path = require("path");
const fs = require('fs');

module.exports = {
    categorias: async (req, res) => {
        try {       
           
            let {search = ""} = req.query;
            let {count,rows: categories} = await db.Category.findAndCountAll({
                subQuery: false,
                attributes:{
                    exclude:["createdAt","updatedAt","deletedAt"],
                    include: [[literal(`CONCAT('${req.protocol}://${req.get("host")}/api/categorias/images/',image)`),"url"]],
                },
                where: {
                    [Op.or]: [{
                            name: {
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
                },
                data:categories,
            });
        } catch (error) {
            console.log(error);
        }
    },
    agregarCategorias: async (req, res) => {
       
        let errors = validationResult(req);
        let errorsDetail=[]
        const {name} = req.body;
        let categExist;
        if (errors.isEmpty()) {const categ = await db.Category.findOne({where: {name: name}});

            if (!categ && req.file) {
                categExist = await db.Category.create({
                    name:name,
                    image:req.file.filename
                });
            }

            return res.status(200).json({
                ok: true,
                data: categExist
            });
        } else {
            if(req.file){
                    fs.existsSync(path.resolve(__dirname,'..','..','..','public','images','categorias',req.file.filename)) &&  fs.unlinkSync(path.resolve(__dirname,'..','..','..','public','images','categorias',req.file.filename))
            }
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
                errors:errorsDetail
        });
    },
    getImage:(req, res) => {

       if (fs.existsSync(path.join(__dirname,"..","..","..","public","images","categorias",req.params.image))) {
            return res.sendFile(path.join(__dirname,"..","..","..","public","images","categorias",req.params.image));
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

            const categ = await db.Category.findOne({
                where: {
                    id: req.params.id,
                },
            });
            if (categ){
                if(errors.isEmpty()){
                    const {name} = req.body;
                    if(req.file){
                        fs.existsSync(path.join(__dirname,'..','..','..','public','images','categorias',categ.image)) && fs.unlinkSync(path.join(__dirname,'..','..','..','public','images','categorias',categ.image))
                    }
                    categ.name = name.trim() || categ.name;
                    categ.image = req.file.filename || categ.image;
                    await categ.save();  
                    
                    return res.status(201).json({
                         ok : true,
                        data : categ,
                    });        
                }else{
                    if(req.file){
                        fs.existsSync(path.join(__dirname,'..','..','..','public','images','categorias',categ.image)) && fs.unlinkSync(path.join(__dirname,'..','..','..','public','images','categorias',categ.image))
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
           
            }else{
                return res.status(400).json({
                    ok: false,
                    errors: 'No existe la categoria',
                });
            }
			            
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
          let  categoria = await db.Category.findByPk(req.params.id)
            
            if (categoria && categoria.image) {

				fs.existsSync(path.join(__dirname,'..','..','..','public','images','categorias',categoria.image)) && fs.unlinkSync(path.join(__dirname,'..','..','..','public','images','categorias',categoria.image))
				
            }
            if(categoria){
                await categoria.destroy()
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