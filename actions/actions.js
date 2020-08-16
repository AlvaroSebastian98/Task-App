const inquirer = require('inquirer')
const colors = require('colors') //('colors/safe')

const porHacer = require('../por-hacer/por-hacer')

const crear = () => {

    inquirer.prompt({
            name: 'task',
            message: 'Descripción de la tarea',
            default: ''
        })
        .then(answer => {
            let tarea = porHacer.crear(answer.task)
            console.log(tarea)
        })

}

const listar = () => {

    let listado = porHacer.listar()

    listado = listado.filter((tarea) => tarea.completado == false)

    for (const tarea of listado) {
        console.log('------Por hacer-------'.green)
        console.log(tarea.descripcion)
        console.log('----------------------'.green)
    }
}

const actualizar = () => {

    let data = porHacer.listar()

    data = data.map(task => {
        let res = {
            name: task.descripcion,
            checked: task.completado
        }

        return res
    })

    inquirer.prompt({
            type: 'checkbox',
            name: 'tasks',
            message: '',
            choices: data
        })
        .then(answer => {
            let actualizado = porHacer.actualizar(answer.tasks)
        })

}

const borrar = () => {

    let data = porHacer.listar()

    data = data.map(task => task.descripcion)

    inquirer.prompt(
            [{
                type: 'list',
                name: 'task',
                message: 'Qué tarea deseas eliminar?',
                choices: data
            }, {
                type: 'confirm',
                name: 'confirmation',
                message: 'Seguro de eliminar la tarea?',
            }])
        .then(answer => {
            if (answer.confirmation) {
                let borrado = porHacer.borrar(answer.task)
                console.log(borrado)
            }
        })

}

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
}