import { ACCESS_TOKEN, API_BASE_URL_BACK } from '../constants/index';

export default class LoginService{

    

    login = function(correo, password, callSuccess, callError, init) {

        if(localStorage.getItem(ACCESS_TOKEN)) {
            var header = new Headers({
                Authorization : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            });
            console.log("token encontrado");
            init = {
                method : "POST",
                headers : header
            };
            // init.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
        }else{
            init = {
                method : "POST",
            };
        }

        fetch(API_BASE_URL_BACK+"/clients/login/"+correo+"/"+password,init)
        .then(function(response){
            if(response.ok) return response.text();
            callError();
        })
        .then((data) => {
            console.log(data);
            callSuccess(data);
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
            console.log("ERROR: "+error);
            incorrecto();
        });
    }
}