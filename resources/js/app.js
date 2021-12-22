import jQuery from 'jquery';
window.$ = window.jQuery = jQuery
import { updateForm } from './updateForm';


/*------------
menu bars show
-------------*/ 
// var pathName = window.location.pathname
// if( pathName === '/' || pathName === '/registration' || pathName === '/student/registration' || pathName === '/student/login' || pathName === '/university/registration' || pathName === '/other/registration' || pathName === '/other/login' || pathName === '/university/login'){
    let menu = document.querySelector('#menu-bars');
    let navbar = document.querySelector('.navbar');

    menu.onclick = () =>{
      menu.classList.toggle('fa-times');
      navbar.classList.toggle('active');
    }

/*-------------
search box show
-------------*/ 
    document.querySelector('#search-icon').onclick = () =>{
        document.querySelector('#search-form').classList.toggle('active');
    }
  
    document.querySelector('#close').onclick = () =>{
        document.querySelector('#search-form').classList.remove('active');
    }
// } else{

/*---------------
Dashboard Sidebar
---------------*/ 
    // let sidebar = document.querySelector(".sidebar");
    // let sidebarBtn = document.querySelector(".sidebarBtn");
    // sidebarBtn.onclick = function() {
    //   sidebar.classList.toggle("active");
    //   if(sidebar.classList.contains("active")){
    //   sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
    // }else
    //  sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    // }

// }

/*-----------------------------
Call Certificate Operation File
-----------------------------*/
updateForm() 


/*---------------------------------
Call University Accounts Table File
---------------------------------*/
// initUniversityAccounts()










