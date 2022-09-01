import { getAuth,onAuthStateChanged} 
from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js"
import {login,logout,isSignIn} from "./auth.js"
import {PASSWORD_REQUIRED,EMAIL_REQUIRED,EMAIL_INVALID, EMPTY_FIELD} from "./utilities.js"

const auth = getAuth();

function hasValue(input, message) {
	if (input.trim() === "") {
		showError(input, message);
        return false
	}else{
        return true
    }
}

function showError(input, message) {
    showMessage(input, message, false);
}

function showMessage(input, message, type) {
    document.getElementById('error-message').innerHTML = message
}
function clearMessage() {
    document.getElementById('error-message').innerHTML = ''
}

function validateEmail(input, requiredMsg, invalidMsg) {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate email format
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.trim();
	if (!emailRegex.test(email)) {
		showError(input, invalidMsg);
	}
	return true;
}

function exitLogin(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(currentUser != null){
        location.href = 'registroTurno.html';
    }
}



window.addEventListener('load',function(){  
    //exitLogin()

    // Valida e inicia la sesión del usuario
    const form = document.getElementById('formLogin');
    form.addEventListener('submit',async function(e){
        e.preventDefault();
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        //validar datos
        let emailValid = validateEmail(email, EMAIL_REQUIRED, EMAIL_INVALID)
        let passValid = hasValue(password,PASSWORD_REQUIRED)

        if(!emailValid && !passValid) showMessage('',EMPTY_FIELD, '')
        else if(emailValid && passValid){
            clearMessage()
            login(email,password).then((response)=>{
                console.log('iniciar sesión')
            })
            .catch((error)=>{
                showError('',`Ocurrio un error: ${error.message}`)
            })

        }
    })

})

// verificar sesión de usuario
onAuthStateChanged(auth, (user) => {
    if (user) {   
        location.href = 'registroTurno.html';
    } else {
        console.log('sesión cerrada')
    }
  });


