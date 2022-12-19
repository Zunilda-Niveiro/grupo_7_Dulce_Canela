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
    const errors = validationResult(req)
    if (errors.isEmpty()) {

    if(errors.isEmpty()){
      
      const marc = db.Brand.findOne({where:{name:marca.trim().toLocaleLowerCase()}})
      const categ = db.Category.findOne({where:{name:categoria}}) 

      };
      const newProductlist = [...productos, newProduct];
      storeProduct(newProductlist);
      return res.redirect("/");

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
      const products = loadProduct();
      const { id } = req.params;
      const { nombre, marca, precio, cantidad, categoria, imagen, detalle } = req.body;
      const productosModificados = products.map((prod) => {
        if (prod.id === +id) {
          return {
            ...prod,
            nombre: nombre,
            marca: marca,
            precio: +precio,
            cantidad: +cantidad,
            categoria: categoria,
            imagen: req.file ? req.file.filename : prod.imagen,
            detalle: detalle,
          };
        }
        return prod;

      });
      storeProduct(productosModificados);
      return res.redirect("/productos/detalle/" + req.params.id);
    } else {
      const { id } = req.params;
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
