import { TOKEN, URL_BACK } from '../constants/index';

export default class LoginServiceConductor{

    login = function(correo, password, callSuccess, callError, init) {

        if(localStorage.getItem(TOKEN)) {
            var header = new Headers({
                Authorization : 'Bearer ' + localStorage.getItem(TOKEN)
            });
            console.log("token encontrado");
            init = {
                method : "POST",
                headers : header
            };
        }else{
            init = {
                method : "POST",
            };
        }

        fetch(URL_BACK+"/conductores/login/"+correo+"/"+password,init)
        .then(function(response){
            if(response.ok){
                return response.text();
            }else{
                callError();
            }

        })
        .then((data) => {
            console.log(data);
            callSuccess(data);
        }).catch((error) => {
            callError(error);
        });
    }

    validate = function(correcto, incorrecto){
        var header = new Headers({
            Authorization : 'Bearer ' + localStorage.getItem(TOKEN)
        });
        var init = {
            method : "POST",
            headers : header
        };

        fetch(URL_BACK+"/conductores/login/validate",init)
        .then(function(response){
            if(response.ok){
                correcto()
            }else{
                incorrecto()
            }
        })
        .catch((error) => {
            console.log("EROR: "+error);
            incorrecto();
        });
    }

    registrar = function(correo, password, nombre, cedula, telefono, correcto, incorrecto){
        var init = {
            method: "POST"
        };

        fetch(URL_BACK+"/conductores/register/"+correo+"/"+password+"/"+nombre+"/"+cedula+"/"+telefono, init)
        .then(function(response){
            if(response.ok)  return response.text();
            incorrecto(response);
        })
        .then(function(token){
            correcto(token);
        })
        .catch(function(error){
            incorrecto(error);
        })
    }
}