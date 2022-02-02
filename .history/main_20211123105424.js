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
    navbarMenu.classList.remove('visible');
})

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) =>{
    const target = event.target;
    const link = target.dataset.link;
    console.log(link);
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


// activate Navbar toggle button 
const hamburgerBtn = document.querySelector('.navbar__toggle_btn');
hamburgerBtn.addEventListener('click',(e) => {
    navbarMenu.classList.toggle('visible');
})




// 1. bring all the section element
// 2. intersectionObserver -> observe all section
// 3. activate menu item acd to a section

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
];

const sections = sectionIds.map(id => document.querySelector(id));
const navitems = sectionIds.map(id => 
    document.querySelector(`[data-link="${id}"]`)
    );
console.log(sections);
console.log(navitems);
let selectedNavIndex = 0;
let selectedNavitem = navitems[0];

function selectedNavitem_function(selected) {
    selectedNavitem.classList.remove('active');
    selectedNavitem = selected;
    selectedNavitem.classList.add('active');
}

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
    selectedNavitem_function(navitems[sectionIds.indexOf(selector)]);
}
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            } else{
                selectedNavIndex = index - 1;
            }
            
        }
    });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section))

window.addEventListener('wheel', () => {
    if(window.scrollY === 0) {
        selectedNavIndex =0;
    }
    else if(
        window.scrollY + window.innerHeight ===
        document.body.clientHeight
    ) {
        selectedNavIndex = navitems.length - 1;
    }
    selectedNavitem_function(navitems[selectedNavIndex]);
})