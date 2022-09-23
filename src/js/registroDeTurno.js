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

  // const CALENDARIO = {
  //   turno : 'MADRUGADA',
  //   dias: ['DOM','LUN','MAR','MIER','JUE','VIE','SAB'],
  //   horas: [
  //     '0 - 1 AM', 
  //     '1 - 2 AM', 
  //     '2 - 3 AM', 
  //     '3 - 4 AM', 
  //     '4 - 5 AM', 
  //     '5 - 6 AM']
  // }

  const CALENDARIO = {
    madrugada:{
      tittle : 'MADRUGADA',
      dias: ['DOM','LUN','MAR','MIER','JUE','VIE','SAB'],
      horas: ['0 - 1 AM', '1 - 2 AM', '2 - 3 AM', '3 - 4 AM', '4 - 5 AM', '5 - 6 AM']
    },
    manana:{
      tittle : 'MAÑANA',
      dias: ['DOM','LUN','MAR','MIER','JUE','VIE','SAB'],
      horas: ['6 - 7 AM', '7 - 8 AM', '8 - 9 AM', '9 - 10 AM', '10 - 11 AM', '11 - 12 AM']
    },
    tarde:{
      tittle : 'TARDE',
      dias: ['DOM','LUN','MAR','MIER','JUE','VIE','SAB'],
      horas: ['12 - 1 PM', '1 - 2 PM', '2 - 3 PM', '3 - 4 PM', '4 - 5 PM', '5 - 6 PM']
    },
    noche:{
      tittle : 'NOCHE',
      dias: ['DOM','LUN','MAR','MIER','JUE','VIE','SAB'],
      horas: ['6 - 7 PM', '7 - 8 PM', '8 - 9 PM', '9 - 10 PM', '10 - 11 PM', '11 - 12 PM']
    }
  }


  function numCellHours (totalCells,calendario){
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
      if(index === 0) return {'idCell': value, 'hora': calendario.tittle}
      let hora = calendario.horas.find((value,idHora)=>{ return idHora + 1 === index })
      if(hora != undefined) return {'idCell': value, 'hora': hora}
    })

    return cellHoursMap
  }

  function crearMatrizCalendario(calendario){
    let calendarioMatriz = []
    let elementos = 7*8

    // obtener las celdas que son hora (con su respectivo texto de hora)
    let cellHours = numCellHours(56,calendario)

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
        let dia = calendario.dias[i-1]
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
  function drawMatrizCalendar(id,calendarioTurno){

    let calendar = crearMatrizCalendario(calendarioTurno)
    let calendarContentHTML = ''


    calendar.forEach((celda,index) => {

      let celdaHTML = `<div class="cell">${celda}</div>` 
      calendarContentHTML = calendarContentHTML + celdaHTML

    });

    let calendarContainer = `<div class="container">${calendarContentHTML}</div>`

    let calendarDiv = document.getElementById(`calendar${id}`)
    calendarDiv.innerHTML = calendarContainer

  }


  // obtiene el objeto que identifica cada celda 
  function asignarIdsGridTurno(){

    // asignar identificadores de dia y hora
    const DIAS_SEMANA = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB']
    const TURNO = [
      {
        turno: 'MADRUGADA',
        horas:[0,1,2,3,4,5]
      },
      {
        turno: 'MAÑANA',
        horas:[6,7,8,9,10,11]
      },
      {
        turno: 'TARDE',
        horas:[12,13,14,15,16,17]
      },
      {
        turno: 'MAÑANA',
        horas:[18,19,20,21,22,23]
      },
    ]

    // itereamos los turnos
    let turnoJSON = []
    TURNO.forEach((turno,id)=>{
      
        // iteramos las horas
        let res = []
        turno.horas.forEach((hora)=>{
            
          // iteramos los dias
            let horaDias = []
            DIAS_SEMANA.forEach((dia)=>{
                let id = `${dia}-${hora}`
                horaDias.push({id})
            })
            
            res.push({ 'hora': hora, 'horaDia': horaDias })
        })

        turnoJSON.push({'turno': turno.turno, 'data': res})
    })

    return turnoJSON
}

  console.log(asignarIdsGridTurno())

  drawMatrizCalendar(1, CALENDARIO.madrugada)
  // drawMatrizCalendar(2, CALENDARIO.manana)
  // drawMatrizCalendar(3, CALENDARIO.tarde)
  // drawMatrizCalendar(4, CALENDARIO.noche)

  
