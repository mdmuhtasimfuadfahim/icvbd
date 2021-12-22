import axios from 'axios';
import moment from 'moment';
import Noty from 'noty';


export function initUniversityAccounts(socket){
    const tableRowCreator = document.querySelector('#tableRowCreator');

    let accounts = []
    let markup

    axios.get('/ugc/accounts/request',{
        headers:{
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res =>{
        accounts = res.data
        markup = generateMarkup(accounts)
        tableRowCreator.innerHTML = markup
    }).catch(err =>{
        console.log(err)
    })

    function generateMarkup(accounts){
        /*-------generating accounts table body-----------*/
        return accounts.map(account =>{
            return `

            `
        }).join('') 
    }

   /*----------socket operation-----------*/
   socket.on('ugcRoom', (account) =>{
      new Noty({
         type: 'success',
         timeout: 1000,
         text: 'New University Request',
         progressBar: false,
      }).show();
      accounts.unshift(account)
      tableRowCreator.innerHTML = ''
      tableRowCreator.innerHTML = generateMarkup(account)
   })  
}

