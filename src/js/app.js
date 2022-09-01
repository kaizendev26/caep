import { getAuth,onAuthStateChanged} 
from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js"
import {TESTIMONIOS} from "./utilities.js"
import {login,logout,isSignIn} from "./auth.js"


const auth = getAuth();

function listaDeTestimonios(items){

    let testimonios = ''
    items.forEach(item => {
        testimonios = testimonios + testimonio(item)
    });

    document.getElementById('slider-testimonios').innerHTML = testimonios
    swiffyslider.initSlider(document.getElementById('mySlider'));
}

function testimonio(item){

    let testimonioFormat = item.testimonio.length >= 200 ? item.testimonio.substring(0,200) + '...' : 
    item.testimonio

    let tieneImagen = item.imgPerfil != (null || undefined || '') ? true : false  //'img/user2.SVG'

    let image = tieneImagen ? `<img src="${item.imgPerfil}" alt="twbs" class="circular--portrait flex-shrink-0">` :
    `<img src="src/img/user2.SVG" alt="twbs" class="circular--none flex-shrink-0">`

    let testimonioHTML = 
        `<li><div class="testimonio card" style="max-width:300px;" id='${item.usuarioId}'>
                 <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="rounded-circle testimonio-circle">
                                ${image}
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="nombre-cargo">
                                <strong>${item.nombre}</strong>
                                <span >${item.cargo}</span>
                            </div>
                            <small class="opacity-50 text-nowrap">${item.fecha}</small>
                        </div>
                    </div>
                    <div class="row pt-2">
                        <div class="col-md-12">
                            <p><small>
                            ${testimonioFormat}
                            </small></p>
                        </div>
                    </div>
                </div>
            </div></li>`

    return testimonioHTML
}


window.addEventListener('load', function(){

  listaDeTestimonios(TESTIMONIOS)

  document.getElementById('btnAdorar').addEventListener('click',(e)=>{
    e.preventDefault()
    location.href = 'registroTurno.html';
  })
  document.getElementById('btnRegistroAdorar').addEventListener('click',(e)=>{
    e.preventDefault()
    location.href = 'registroTurno.html';
  })

  document.getElementById('login').addEventListener('click',(e)=>{
    e.preventDefault()
    location.href = 'login.html';
   // login()
  })
  document.getElementById('logout').addEventListener('click',(e)=>{
    e.preventDefault()
   logout()
  })

})

// verificar sesión de usuario
onAuthStateChanged(auth, (user) => {
    if (user) {   
      console.log(user)
    } else {
        console.log('sesión cerrada')
    }
  });


// scroll a --> quienes somos
document.querySelectorAll('[href="#quienes-somos"]').forEach((item) => {
    item.addEventListener('click',(e)=>{
        e.preventDefault()
        window.scroll({
            top: 550 ,
            behavior: 'smooth'
          });
    })
})

