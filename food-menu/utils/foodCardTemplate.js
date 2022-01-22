
export function foodCardTemplate(image, name, price, description) {

    return `<div class="foodCard">
                <img src="${image}" />
                <div class="foodInfo">
                    <div class="foodInfoCover">
                        <div class="foodName">
                            <h4>${name}</h4>
                            <small>${price}</small>
                        </div>
                        <div class="foodDescription">
                            <p>${description}</p>
                        </div>
                    </div>
                </div>
            </div>`

}