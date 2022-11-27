const $ = (element) => document.getElementById(element);
console.log('cargadoooo')
window.addEventListener('load', function(){

const msgError = (element, msg, target) => {
        $(element).innerText = msg;
        target.classList.add("input_error");
    };
const validField = (element, target) => {
        $(element).innerText = null;
        target.classList.remove("input_error");
    };

$("name").addEventListener("blur", function ({ target }) {
        
    switch (true) {
        case !this.value.trim():
            msgError("errorNombre", "El nombre es obligatorio", target);
            break;
        case this.value.trim().length < 5:
            msgError("errorNombre", "El nombre como mínimino debe tener cinco caracteres", target);
            break;
        default:
            validField("errorNombre", target);
            break;
        }
    });
    $("detalle").addEventListener("blur", function ({ target }) {
        
        switch (true) {
            case !this.value.trim():
                msgError("detalleError", "El detalle es obligatorio", target);
                break;
            case this.value.trim().length < 20:
                msgError("detalleError", "El detalle como mínimino debe tener 20 caracteres", target);
                break;
            default:
                validField("detalleError", target);
                break;
            }
        });

})