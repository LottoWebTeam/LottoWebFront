import { ACCESS_TOKEN, API_BASE_URL_BACK } from '../constants/index';

export default class LoginService{

    login = function(nombre, password, callSuccess, callError, init) {

        if(localStorage.getItem(ACCESS_TOKEN)) {
            var header = new Headers({
                Authorization : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
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

        fetch(API_BASE_URL_BACK+"/clients/login/"+nombre+"/"+password,init)
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
            Authorization : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        });
        var init = {
            method : "POST",
            headers : header
        };

        fetch(API_BASE_URL_BACK+"/clients/login/validate",init)
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

    registrar = function(nombre, password, cedula, correo, telefono, correcto, incorrecto){
        var init = {
            method: "POST"
        };

        fetch(API_BASE_URL_BACK+"/clients/register/"+nombre+"/"+password+"/"+cedula+"/"+correo+"/"+telefono, init)
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