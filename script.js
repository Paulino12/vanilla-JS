import { vjProjects } from "./utitlities/vjProjects.js";

let jsProjects = document.querySelector('.mainArea')

const projectTemplate = (link, image, name) => {
    return `
            <div class="projectCard">
                <a href="${link}">
                    <img src="${image}" />
                    <div class="projectTitle">
                        ${name}
                    </div>
                </a>
            </div>
    `
}

let projects = vjProjects.map(({ link, image, name }) => {
    return projectTemplate(link, image, name)
})

jsProjects.innerHTML = projects.join('')