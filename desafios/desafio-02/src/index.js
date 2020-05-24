const replaceImgSize = (imgSrc) => {
    let newImgSrc = imgSrc.split('=')
    newImgSrc[1] = 'medium'
    newImgSrc = newImgSrc.join('=')
    return newImgSrc
}

const getCardsDataBase = async () => {
    const dbURL = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72'
    const response = await fetch(dbURL)
    const data = await response.json()
    return data
}

const createCardElement = cardObj => {
    const card = document.createElement('div')
    const cardImg = document.createElement('img')
    const cardName = document.createElement('p')
    const cardPropertyType = document.createElement('p')
    const cardPrice = document.createElement('span')

    card.className = 'card' 
    cardImg.src = replaceImgSize(cardObj.photo)
    cardName.innerText = cardObj.name
    cardPropertyType.innerText = cardObj.property_type
    cardPrice.innerText = `R$ ${cardObj.price},00/dia`

    card.appendChild(cardImg)
    card.appendChild(cardName)
    card.appendChild(cardPropertyType)
    card.appendChild(cardPrice)

    return card
}

const addCards = () => {
    const cards = document.querySelector('.cards')

    getCardsDataBase()
        .then(data => {
            data.forEach(card => {
                cards.appendChild(createCardElement(card))
            })
        })
}

addCards()