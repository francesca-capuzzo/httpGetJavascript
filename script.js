/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//METODO AJAX ----> VECCHIO E PIù DIFFICILE:

const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = gestisciRispostaDelServer;
httpRequest.open("GET", "./assets/data.json");
httpRequest.send();

function gestisciRispostaDelServer(){
    console.log("ready state",httpRequest.readyState);
    console.log("status", httpRequest.status);
    console.log("response", httpRequest.responseText);
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {     //-->oppure (httpRequest.readyState === XMLHttpRequest.DONE)
        const arrayOfUsers = JSON.parse(httpRequest.responseText); //--> TRASFORMO IL FILE JSON (DATA) IN OGGETTI
        console.log(arrayOfUsers);
    }
}

/*STATI DEL GET HTTP:
0 (uninitialized) or (request not initialized)
1 (loading) or (server connection established)
2 (loaded) or (request received)
3 (interactive) or (processing request)
4 (complete) or (request finished and response is ready)*/

//LOG DI TUTTO QUESTO DIVENTA:
/*
ready state 1
status 0 
response <empty string>

ready state 2 
status 200 
response <empty string>

ready state 3
status 200 
response [
    { username: "pippo", score: 200 }
    { username: "pluto", score: 300 }
    { username: "paperino", score: 100 }
] 

ready state 4 
status 200 
response [
    { username: "pippo", score: 200 }
    { username: "pluto", score: 300 }
    { username: "paperino", score: 100 }
]*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//METODO FETCH!!! -----> NUOVO E MOLTO PIù SEMPLICE:

fetch("./assets/data.json").then((response) => console.log(response.json()));

/*LOG DI QUESTO:

Promise { <state>: "pending" }
<state>: "fulfilled"
<value>: Array(3) [ {…}, {…}, {…} ]
0: Object { username: "pippo", score: 200 }
1: Object { username: "pluto", score: 300 }
2: Object { username: "paperino", score: 100 }
length: 3*/


fetch("./assets/data.json").then((response) => response.json()).then((data) => console.log(data));;

/*LOG DI QUESTO:

<value>: Array(3) [ {…}, {…}, {…} ]
0: Object { username: "pippo", score: 200 }
1: Object { username: "pluto", score: 300 }
2: Object { username: "paperino", score: 100 }
length: 3*/

fetch("./assets/data.json").then((response) => response.json()).then((data) => console.log(data)).catch((error) => console.log(error));

/*LOG DI QUESTO:

<value>: Array(3) [ {…}, {…}, {…} ]
0: Object { username: "pippo", score: 200 }
1: Object { username: "pluto", score: 300 }
2: Object { username: "paperino", score: 100 }
length: 3
MA SE CI FOSSE UN ERRORE, L'ULTIMO CATCH MI LOGGA ANCHE L'ERRORE!!*/


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//METODO FETCH SENZA LAMBDA:

fetch("./assets/data.json").then(manageResponse).then(onDataReady).catch(onError);

function manageResponse(response) {
    return response.json();
}

function onDataReady(data) {
    for (const user of data) {
        console.log("nome:", user.username);
    }
}

function onError(error) {
    console.log(error);
}

//NB NELLA FETCH LE COSE IMPORTANTI SONO IL SECONDO THEN E NEL CASO LA CATCH DELL'ERRORE!!!!