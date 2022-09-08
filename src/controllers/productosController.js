const categorias = require("../data/categorias.json");
const productos = require("../data/productos.json");
const {validationResult} = require('express-validator');

const {
  loadCarrito,
  storeCarrito,
  loadProduct,
  storeProduct,
} = require("../data/db_Module");

module.exports = {
  productos: (req, res) => {
    const categ = categorias.find((categoria) => categoria.idcat == +req.params.id);
    const subprod = productos.filter((producto) => producto.categoria == categ.nombre);
    const carrito = loadCarrito();
    return res.render("productos", {
      subprod,
      categ: categ.nombre,
      carrito,
      productos,
    });
  },
  agregarProd: (req, res) => {
    const carrito = loadCarrito();
    return res.render("productAdd", {
      carrito,
    });
  },
  detalle: (req, res) => {
    const products = loadProduct();
    const prod = products.find((producto) => producto.id === +req.params.id);
    const carrito = loadCarrito();
    return res.render("detalle", {
      prod,
      productos,
      carrito,
    });
  },
  carrito: (req, res) => {
    const carrito = loadCarrito();
    const productos = loadProduct();
    return res.render("carrito", {
      carrito,
      productos,
    });
  },
  agregar: (req, res) => {
    const carrito = loadCarrito();
    if (carrito == undefined || carrito == "") {
      const nuevoProd = {
        id: 1,
        id_producto: +req.params.id,
        cantidad_p: 1,
      };
      const prodNuevo = [...carrito, nuevoProd];
      storeCarrito(prodNuevo);
    } else {
      let bandera = false;
      let aux = carrito.map((produ) => {
        if (produ.id_producto == +req.params.id) {
          bandera = true;
          return {
            ...produ,
            cantidad_p: produ.cantidad_p + 1,
          };
        }
        return produ;
      });
      if (!bandera) {
        let idconst = aux.lenght;
        const nuevoProd = {
          id: idconst,
          id_producto: +req.params.id,
          cantidad_p: 1,
        };
        const prodNuevo = [...carrito, nuevoProd];
        storeCarrito(prodNuevo);
      } else {
        storeCarrito(aux);
      }
    }
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
    if(errors.isEmpty()){

      const productos = loadProduct();
      const { nombre, marca, precio, cantidad, categoria, detalle, imagen } = req.body;
      const newProduct = {
        id: productos[productos.length - 1].id + 1,
        categoria: categoria,
        nombre: nombre.trim(),
        cantidad: cantidad,
        marca: marca,
        precio: +precio,
        imagen: imagen ? imagen : null,
        detalle: detalle,
        
      };
      const newProductlist = [...productos, newProduct];
      storeProduct(newProductlist);
      return res.redirect("/");

    }else{
      res.render('productAdd',{
        errors : errors.mapped(),
        old : req.body
      })
    }
  },
  edit: (req, res) => {
    const products = loadProduct();
    const prod = products.find((prod) => prod.id === +req.params.id);
    return res.render("productEdit", {
      prod,
    });
  },
  update: (req, res) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){ 
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
            imagen: req.file ? req.file.filename : prod.imagen ,
            detalle: detalle,
          };
        }
        return prod;

      });
      storeProduct(productosModificados);
      return res.redirect("/productos/detalle/" + req.params.id);
    }else{
      const { id } = req.params;
      res.render('productEdit' ,{
        errors : errors.mapped(),
        prod : req.body
      })
    }
  },
  remove: (req, res) => {
    const products = loadProduct();
    const productsModify = products.filter(
      (product) => product.id !== +req.params.id
    );
    storeProduct(productsModify);
    return res.redirect("/");
  },
  removeCarrito: (req, res) => {
    const carrito = loadCarrito();

    const carritoModificado = carrito.filter(
      (car) => car.id_producto != +req.params.id
    );
    storeCarrito(carritoModificado);
    return res.redirect("/");
  },
};
