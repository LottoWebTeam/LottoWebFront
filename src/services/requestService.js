import {TOKEN, URL_BACK} from '../constants/index';

export default class RequestService {

    request(correcto, incorrecto, metodo, path, body, signal) {
        let init = {};
        if (localStorage.getItem(TOKEN)) {
            let header = new Headers({
                Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            });

            if (metodo === 'POST' || metodo === 'PUT') {
                init = {
                    method: metodo,
                    headers: header,
                    body: JSON.stringify(body)
                };
            } else {
                init = {
                    method: metodo,
                    headers: header,
                    signal: signal
                };
            }
        } else {
            init = {
                method: metodo
            }
        }

        fetch(URL_BACK + path, init)
            .then(response => {
                if (metodo === 'PUT' || metodo === 'POST' || metodo === 'DELETE') {
                    if (response.ok) {
                        console.info("Solicitud aceptada");
                    } else {
                        console.info("Error en la solicitud");
                    }
                } else {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return null;
                    }
                }
            })
            .then(function (data) {
                if (data !== null) {
                    correcto(data);
                } else {
                    incorrecto("error en la solicitud");
                }

            }).catch(function (error) {
            if (error.name === 'AbortError') {
                console.info('Peticion Abortada');
            } else {
                console.log("error");
                incorrecto(error);
            }
        })
    }
}

