'use strict'

//Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () =>{
    //console.log(window.scrollY);
    //console.log(`navbar height :${navbarHeight}`);
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark')
    }else{
        navbar.classList.remove('navbar--dark')
    }
})

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) =>{
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    //console.log(event.target.dataset.link);
    scrollIntoView(link);
})

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', (event)=> {
    scrollIntoView('#contact');
})

// Make home slowly fade to transparent as the window scrolls down.
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    //console.log(1 - window.scrollY / homeHeight);
    home.style.opacity = 1 - window.scrollY / homeHeight;
})

// Handle click on "Arrow-Up" button on the bottom
const ArrowUpBtn = document.querySelector('#uparrow__btn');
ArrowUpBtn.addEventListener('click', (event) => {
    scrollIntoView('#home');
})
document.addEventListener('scroll', () =>{
    if(window.scrollY > homeHeight){
        ArrowUpBtn.classList.add('visible')
    }else{
        ArrowUpBtn.classList.remove('visible')
    }
})

// Projects filtering and animation
const workBtnContainer = document.querySelector('.work__catagories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(null == filter){
        return;
    }
    
    const active = document.querySelector('.catagory__btn.selected');
    active.classList.remove('selected');
    const target = 
        e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode; 
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(()=>{
        projects.forEach((project) => {
            //console.log(project.dataset.type);
             if(filter === '*' || filter === project.dataset.type){
                 project.classList.remove('invisible');
             } else {
                 project.classList.add('invisible');
             }
         })
        projectContainer.classList.remove('anim-out');
    },300)
    
})

//Remove selection from the previous item and select the new one


function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}

