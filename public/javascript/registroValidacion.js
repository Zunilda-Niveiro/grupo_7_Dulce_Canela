console.log("conexion exitosa")
const exRegs ={
    exRegAlfa : /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegEmail : /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
    exRegPass : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!¡%*?&<>¿])[A-Za-z\d$@$!¡%*?&><¿]{6,8}/
};




const msgError = (element, msg, target) => {
    $(element).innerText = msg;
    target.classList.add('input_error');
}

const validField = (element, target) => {
    $(element).innerText = null;
    target.classList.remove('msgError','input_error');
    
};

//varifica el email, una vez que salgo del campo email

const verifyEmail = async (email) => {
    
try {
    let response = await fetch('/api/users/verified', {
        method : 'POST',
        body : JSON.stringify({
            email : email
            }),
        headers : {
            'content-Type' : 'application/json'
        }
    });

    let result = await response.json();
    console.log(result)
    return result.verified

} catch (error) {
    console.error
}
}

$('name').addEventListener('blur', function({ target}){
    switch (true) {
        case !this.value.trim():
            msgError('nombreError',"El nombre es obligatorio", target);
            break;
        case this.value.trim().length < 2 :
            msgError('nombreError',"El nombre debe tener como mínimo dos caracteres", target);
            break
        case !exRegs.exRegAlfa.test(this.value):
            msgError('nombreError',"Solo se permiten caracteres alfabéticos", target);
            break
        default:
            validField('nombreError',target)
            break;
    }
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
            case !exRegs.exRegAlfa.test(this.value):
        msgError('apellidoError', "El apellido debe tener solo letras", target);
        break;
            default:
        validField('apellidoError', target)
        break;
    }
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

$('email').addEventListener('blur', async function({target}) {
    switch (true) {
        case !this.value.trim():
            msgError('emailError',"El email es obligatorio", target)
            break;
        case !exRegs.exRegEmail.test(this.value):
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
    $("password").addEventListener("blur", function ({target}) {
    switch (true) {
        case !this.value.trim():
            msgError("contrasenaError", "La contraseña es obligatoria", target)
            break;
            case this.value.trim().length < 6 || this.value.trim().length > 8:
                msgError("contrasenaError", "entre 6 y 8 caracteres", target)
            break;
        case !exRegs.exRegPass.test(this.value):
            console.log(this.value)
            msgError(
            "contrasenaError",
            "La contraseña debe tener un símbolo, un número, una mayúscula, una minúscula",
            target
        );
        break;
            default:
        validField("contrasenaError", target);
        break;
    }
    });

    $("password2").addEventListener("blur", function ({target}) {
        switch (true) {
            case !this.value.trim():
                msgError("contrasenaError2", "Debes verificar la contraseña", target);
                break;
            case this.value.trim() !== $('password').value.trim():
                msgError(
                "contrasenaError2",
                "La contraseña no coincide",
                target
            );
            break;
                default:
            validField("contrasenaError2", target);
            break;
        }
        });
    