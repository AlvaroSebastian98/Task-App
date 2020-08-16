const inquirer = require('inquirer');

const { crear, listar, actualizar, borrar } = require('./actions/actions');


//* main
(() => {

    inquirer.prompt({
            type: 'rawlist',
            name: 'action',
            message: 'Qué acción deseas realizar?',
            choices: ['crear', 'listar', 'actualizar', 'borrar', 'salir']
        })
        .then(answer => {
            console.log(answer.action)
            escogerAccion(answer.action)
        })

})()



const escogerAccion = (comando = 'crear') => {

    switch (comando) {
        case 'crear':
            crear()
            break;

        case 'listar':
            listar()
            break;

        case 'actualizar':
            actualizar()
            break;

        case 'borrar':
            borrar()
            break;

        case 'salir':
            process.exit(1);

        default:
            console.log('Comando no es reconocido')
            break;
    }

}