import { getAuth,onAuthStateChanged} 
from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js"

import {logout} from "./auth.js"

const auth = getAuth()

// verificar sesión de usuario
onAuthStateChanged(auth, (user) => {
    if (user) {   
      console.log(user)
    } else {
        console.log('sesión cerrada')
    }
  });

  window.addEventListener('load',()=>{

    // document.getElementById('logout').addEventListener('click',(e)=>{
    //   e.preventDefault()
    //   logout()
    // })

  })

  // crear matriz 

  const CALENDARIO = {
    turno : 'MADRUGADA',
    dias: ['DOM','LUN','MAR','MIER','JUE','VIE','SAB'],
    horas: [
      '0 - 1 AM', 
      '1 - 2 AM', 
      '2 - 3 AM', 
      '3 - 4 AM', 
      '4 - 5 AM', 
      '5 - 6 AM']
  }

  function numCellHours (totalCells){
    let diference = totalCells / 7 // direfencia entre cada termino 
    let totalSequence = 7 // secuencias totaltes
    let firstSequence = 1 // inicio de la secuencia

    let secuencia = []
    for (let i = 0; i < totalSequence; i++) {
      let currentSequence = 0 + (((i + 1) - 1) * diference)
      secuencia.push(currentSequence)
    }

    // agregar el string horas a la celda
    let cellHoursMap = secuencia.map((value,index)=>{
      if(index === 0) return {'idCell': value, 'hora': CALENDARIO.turno}
      let hora = CALENDARIO.horas.find((value,idHora)=>{ return idHora + 1 === index })
      if(hora != undefined) return {'idCell': value, 'hora': hora}
    })

    return cellHoursMap
  }
  numCellHours(56)  

  function crearMatrizCalendario(){
    let calendarioMatriz = []
    let elementos = 7*8

    // obtener las celdas que son hora (con su respectivo texto de hora)
    let cellHours = numCellHours(56)

    // iteramos las celdas para buscar y agregar el texto en la celda requerida
    for (let i = 0; i < elementos; i++) {
      
      let sequence = cellHours.find(function(item,index) {
        return item.idCell === i
      })

      // texto para las horas
      if (sequence != undefined) {
        calendarioMatriz.push(`${sequence.hora}`)
      }
      else{
        // texto para los dias
        let dia = CALENDARIO.dias[i-1]
        if(dia != undefined) {
          calendarioMatriz.push(dia)
        }
        else{
          // celdas restantes
          calendarioMatriz.push(i)
        }
      }
    }

    return calendarioMatriz

  }

  // dibuja el calendario por turno en html 
  function drawMatrizCalendar(id){

    let calendar = crearMatrizCalendario()
    let calendarContentHTML = ''

    console.log(calendar)

    calendar.forEach((celda,index) => {

      if(index === 9){
        let celdaHTML = `<div class="cell">
        <div class="postick border rounded-2 bg-primary bg-opacity-50">
          <div class="postick-body d-flex justify-content-between align-items-center">
              adoradores <span class="badge bg-danger rounded-pill">14</span>
          </div>
        </div>
        </div>` 
        calendarContentHTML = calendarContentHTML + celdaHTML
      }
      else{
        let celdaHTML = `<div class="cell">${celda}</div>` 
        calendarContentHTML = calendarContentHTML + celdaHTML
      }

    });

    let calendarContainer = `<div class="container">${calendarContentHTML}</div>`

    let calendarDiv = document.getElementById(`calendar${id}`)
    calendarDiv.innerHTML = calendarContainer

    console.log(calendarContainer)
  }

  drawMatrizCalendar(1)
  drawMatrizCalendar(2)
  drawMatrizCalendar(3)
  drawMatrizCalendar(4)