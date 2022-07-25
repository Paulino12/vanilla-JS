import { vjProjects } from "./utitlities/vjProjects.js";

let projectsContainer = document.querySelector('.projectsContainer')
let jsProjects = document.querySelector('.mainArea')
let total = document.querySelector('.total')

const projectTemplate = (link, image, name) => {
    return `
            <div class="projectCard">
                <a href="${link}">
                    <img src="${image}" />
                    <div class="projectTitle">
                        ${name}
                    </div>
                    <div class="skeleton">
                        <div class="skeletonChild">

                        </div>
                    </div>
                </a>
            </div>
    `
}

const numberOfProjects = vjProjects.length
let perPage = 3
const numberOfPages = Math.ceil(numberOfProjects/perPage)
let currentPage = 1
// slice vjsProjects
let begin = (currentPage - 1) * perPage
let end = begin + perPage

const getProjects = () => {
    let paginatedProjects = vjProjects.slice(begin, end)
    let currentProjects = paginatedProjects.map(({ link, image, name }) => {
        return projectTemplate(link, image, name)
    })
    return currentProjects.join('')  
}      

total.innerText = numberOfProjects
jsProjects.innerHTML = getProjects()

let skeleton = document.getElementsByClassName('skeleton')
const skeletonLoad = () => {
    for (let i = 0; i < skeleton.length; i++) {
        setTimeout(() => {
            skeleton[i].classList.add('removeSekelton')
        }, 1000);
    
        setTimeout(() => {
            skeleton[i].classList.add('adjustSkeleton')
        }, 2000);
    }
}

// load more projects logic
const btnContainer = document.querySelector('.btnContainer')
btnContainer.innerHTML = '<button type="button" class="showMore">Load More</button>'
const showMore = document.querySelector('.showMore')
showMore.addEventListener('click', () => {
    // load more projects
    currentPage = currentPage + 1
    begin = (currentPage - 1) * perPage
    end = begin + perPage
    if(currentPage > numberOfPages){
        btnContainer.innerHTML = '<button type="button" class="showMore">No More to Load</button>'
        return
    }else{
        let extended = document.createElement('div')
        projectsContainer.appendChild(extended) 
        extended.classList.add('mainArea')
        extended.innerHTML = getProjects()
        
        skeletonLoad()
    }
    
}) 

skeletonLoad()

