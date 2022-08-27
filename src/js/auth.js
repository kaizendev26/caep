
import { getAuth, GoogleAuthProvider,signInWithEmailAndPassword ,onAuthStateChanged} 
from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js"

const auth = getAuth();
const provider = new GoogleAuthProvider()

auth.languageCode = "es"

export async function login(email,password){
    try {
        let response = await signInWithEmailAndPassword(auth, email, password)
        let userData = {
            email: response.user.email,
            uid: response.user.uid
        }
        localStorage.setItem('currentUser',JSON.stringify(userData));
        return userData
    } catch (error) {
        throw new Error(error)
    }

}

export async function logout(){
    localStorage.clear()
    auth.signOut();
}

export let checkSession = onAuthStateChanged

// crear metodo para buscar los demas datos de usuario(DB)
export function isSignIn(){
    try {
        onAuthStateChanged(auth, (user) => {
            if (user) {   

              let userData = {
                email: user.email,
                uid: user.uid
              }
              //sessionStorage.setItem('currentUser',JSON.stringify(userData));
              console.log('sesión abierta')
            } else {
                sessionStorage.clear()
                console.log('sesión cerrada')
            }
          });
    } catch (error) {
        throw new Error(error)
    }
}
