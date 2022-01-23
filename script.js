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
                    <div class="skeleton">
                        <div class="skeletonChild">

                        </div>
                    </div>
                </a>
            </div>
    `
}



let projects = vjProjects.map(({ link, image, name }) => {
    return projectTemplate(link, image, name)
})

jsProjects.innerHTML = projects.join('')

let skeleton = document.getElementsByClassName('skeleton')

for (let i = 0; i < skeleton.length; i++) {
    setTimeout(() => {
        skeleton[i].classList.add('removeSekelton')
    }, 2000);

    setTimeout(() => {
        skeleton[i].classList.add('adjustSkeleton')
    }, 3000);
}

