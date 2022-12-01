console.log("conexion exitosa")
const exRegAlfa = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/
const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
const exRegPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,8}/

const msgError = (element, msg, {target}) => {
    $(element).innerText = msg;
    target.classList.add('error_msg');
};

const cleanField = (element, target) => {
    $(element).innerText = null;
    target.classList.remove('error_msg', 'is-valid')
};

const validField = (element,{target}) => {
    cleanField(element, target)
    target.classList.add('error_msg');
    
};

$('name').addEventListener('blur', function({ target}){
    switch (true) {
        case !this.value.trim():
            msgError('nombreError',"El nombre es obligatorio", target);
            break;
        case this.value.trim().length < 2 :
            msgError('nombreError',"El nombre debe tener como mínimo dos caracteres", target);
            break
        case !exRegAlfa.test(this.value):
            msgError('nombreError',"Solo se permiten caracteres alfabéticos", target);
            break
        default:
            validField('nombreError',target)
            break;
    }
}); 
$('name').addEventListener('focus', function({target}){
    cleanField('nombreError', target)
});

$("last_name").addEventListener("blur", function ({ target }) {
    switch (true) {
            case !this.value.trim():
        msgError('apellidoError', "El apellido es obligatorio", target);
        break;
        case this.value.trim().length < 2:
        msgError(
            'apellidoError',
            "El apellido como mínimino debe tener dos caracteres",
            target
        );
        break;
            case !exRegAlfa.test(this.value):
        msgError('apellidoError', "El apellido debe tener solo letras", target);
        break;
            default:
        validField('apellidoError', target);
        break;
    }
    });

$('last_name').addEventListener('focus', function({target}){
    cleanField('apellidoError', target)
});


$("imagen").addEventListener('change', function(e){

    let exten = this.value.split('\\').pop()
    const extValid = /(.jpg|.jpeg|.png|.gif)$/i;

    if(!extValid.exec(exten)){
        msgError("imagenError", "Imagen Invalida - Extensiones permitidas .jpg|.jpeg|.png|.gif ", e.target);
        this.value ='';
    }else{
        validField("imagenError",e.target); 
    }
})


$('email').addEventListener('blur', async function(target){
    switch (true) {
        case !this.value.trim():
            msgError('emailError',"El email es obligatorio", target);
            break;
        case !exRegEmail.test(this.value):
            msgError('emailError',"El email tiene un formato inválido", target);
            break
        case await verifyEmail(this.value):
            msgError('emailError',"El email ya se encuentra registrado", target);
            break
        default:
            validField('emailError',target)
            break;
    }
});

$('email').addEventListener('focus', function({target}){
    cleanField('emailError', target)
});

$("password").addEventListener("focus", () => {
    $("contrasenaError").hidden = false;
});

    $("password").addEventListener("blur", function ({ target }) {
    $("contrasenaError").hidden = true;
    switch (true) {
        case !this.value.trim():
            msgError("contrasenaError", "La contraseña es obligatoria", target);
            break;
        case !exRegPass.test(this.value):
            msgError(
            "contrasenaError",
            "La contraseña debe tener un símbolo, una número, una mayúscula, una minúscula y entre 6 y 8 caracteres",
            target
        );
        break;
            default:
        validField("contrasenaError", target);
        break;
    }
    });


    