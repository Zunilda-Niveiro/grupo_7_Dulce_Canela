const productos = require("../data/productos.json");
const { validationResult } = require('express-validator');
const db = require('../database/models')
module.exports = {

  productos: (req, res) => {
    if (req.session.userLogin && (req.session.userLogin.rol === 'user')) {
    }
    db.Product.findAll({
      include: ['imagenes', 'categoria'],
      where: {
        category_id: req.params.id
      }
    })
      .then((subproductos) => {
        return res.render("productos", {
          subprod: subproductos,
          categ: subproductos[0].categoria.name,
        });
      })
  },
  agregarProd: (req, res) => {
    return res.render("productAdd", {
    });
  },
  detalle: (req, res) => {

    db.Product.findByPk(req.params.id, { include: ['imagenes', 'categoria'] })
      .then(product => {
        db.Product.findAll({
          include: ['imagenes'],
          where: { category_id: product.category_id }
        })
          .then(products => {
            return res.render("detalle", {
              prod: product,
              productos: products,
            });
          })
      })
  },
  carrito: (req, res) => {
    db.Product.findAll()
    return res.render("carrito", {
    });
  },
  agregar: (req, res) => {
    res.redirect("/productos/detalle/" + req.params.id);
  },
  busqueda: (req, res) => {


    const subprod = productos.filter((producto) =>
      producto.nombre
        .toLocaleLowerCase()
        .includes(req.query.busqueda.toLocaleLowerCase())
    );
    let categ = "Resultados";
    if (subprod != "") {
      return res.render("productos", {
        subprod,
        categ,
      });
    } else {
      categ = "Sin resultados";
      return res.render("productos", {
        subprod,
        categ,
      });
    }
  },
  agregarProducto: (req, res) => {
    const errors = validationResult(req);
    const { nombre, marca, precio, cantidad, categoria, detalle, imagen } = req.body;
    if (errors.isEmpty()) {
      const marc = db.Brand.findOne({ where: { name: marca.trim().toLocaleLowerCase() } })
      const categ = db.Category.findOne({ where: { name: categoria } })
      Promise.all([marc, categ])
        .then(([marc, categ]) => {
          if (!marc) {
            db.Brand.create({
              name: marca.trim().toLocaleLowerCase(),
              createAt: new Date()
            })
              .then(mar => {
                db.Product.create({
                  name: nombre.trim(),
                  price: precio.trim(),
                  detail: detalle.trim(),
                  amount: cantidad.trim(),
                  discount: 0,
                  category_id: categ.id,
                  brand_id: mar.id,
                  createdAt: new Date()
                })
                  .then(pro => {
                    db.Image.create({
                      file: req.file ? req.file.filename : 'image_not_fund.jpg',
                      product_id: pro.id
                    })
                      .then(imag => {
                        return res.redirect('/productos/detalle/' + pro.id)
                      })
                  })
              })
          } else {
            db.Product.create({
              name: nombre.trim(),
              price: precio.trim(),
              detail: detalle.trim(),
              amount: cantidad.trim(),
              discount: 0,
              category_id: categ.id,
              brand_id: marc.id,
              createdAt: new Date()
            })
              .then(pro => {
                db.Image.create({
                  file: req.file ? req.file.filename : 'image_not_fund.jpg',
                  product_id: pro.id
                })
                  .then(imag => {
                    return res.redirect('/productos/detalle/' + pro.id)
                  })
              })
          }
        })
    } else {
      res.render('productAdd', {
        errors: errors.mapped(),
        old: req.body
      })
    }
  },
  editarProducto: (req, res) => {
    db.Product.findOne({
      include: ['imagenes', 'categoria', 'marca'],
      where: { id: +req.params.id }
    })
      .then(prod => {
        return res.render("edicionDeProductos", {
          prod,
        });
      })
  },
  update: (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      const { id } = req.params;
      const { nombre, marca, precio, cantidad, categoria, imagen, detalle } = req.body;

      const marc = db.Brand.findOne({ where: { name: marca.trim().toLocaleLowerCase() } })
      const categ = db.Category.findOne({ where: { name: categoria } })


      Promise.all([marc, categ])
        .then(([marc, categ]) => {

          if (!marc) {
            db.Brand.create({
              name: marca.trim().toLocaleLowerCase(),
              createAt: new Date()
            }).then(mar => {

              db.Product.update({
                name: nombre.trim(),
                price: +precio.trim(),
                detail: detalle.trim(),
                amount: +cantidad.trim(),
                discount: 0,
                category_id: categ.id,
                brand_id: mar.id,
                updatedAt: new Date()
              }, {
                where: { id: id }
              })
                .then(prod => {
                  if (imagen) {
                    db.Image.create({
                      file: imagen,
                      product_id: prod.id
                    })
                      .then(imag => {
                        return res.redirect("/productos/detalle/" + req.params.id);
                      })
                  } else {
                    return res.redirect("/productos/detalle/" + req.params.id);
                  }
                })
            })
          } else {
            db.Product.update({
              name: nombre.trim(),
              price: +precio.trim(),
              detail: detalle.trim(),
              amount: +cantidad.trim(),
              discount: 0,
              category_id: categ.id,
              brand_id: marc.id,
              updatedAt: new Date()
            }, {
              where: { id: id }
            })
              .then(prod => {
                if (imagen) {
                  db.Image.create({
                    file: imagen,
                    product_id: prod.id
                  })
                    .then(imag => {
                      return res.redirect("/productos/detalle/" + req.params.id);
                    })
                } else {
                  return res.redirect("/productos/detalle/" + req.params.id);
                }
              })
          }
        })
    } else {
      res.render('productEdit', {
        errors: errors.mapped(),
        prod: req.body
      })
    }
  },
  remove: (req, res) => {
    db.Image.destroy({
      where: { product_id: req.params.id }
    })
      .then(resul => {
        db.Product.destroy({
          where: { id: req.params.id }
        })
          .then(result => {
            return res.redirect("/");
          })
      })
  }
};