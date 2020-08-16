const fs = require('fs')

let listadoPorHacer = []

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer)

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err)
    })

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json')
    } catch (error) {
        listadoPorHacer = []
    }

}

const crear = (descripcion) => {

    cargarDB()

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer)

    guardarDB()

    return porHacer

}

const listar = () => {

    cargarDB()

    return listadoPorHacer

}

const actualizar = (listaTarea) => {

    cargarDB()

    listadoPorHacer.forEach(tarea => tarea.completado = false)

    listaTarea.forEach(descripcion => {
        let index = listadoPorHacer.findIndex(tarea => tarea.descripcion == descripcion)

        if (index >= 0) {
            listadoPorHacer[index].completado = true
        }
    })

    guardarDB()


}

const borrar = (descripcion) => {

    cargarDB()

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)

    if (listadoPorHacer.length === nuevoListado.length) {
        return false //no lo borró
    } else {
        listadoPorHacer = nuevoListado
        guardarDB()
        return 'Tarea eliminada'
    }

}

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
}