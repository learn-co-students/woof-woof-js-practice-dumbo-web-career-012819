const dogBarDiv = document.querySelector('#dog-bar');
const dogInfoDiv = document.querySelector('#dog-info');


fetch('http://localhost:3000/pups').then(resp => resp.json())
.then(dogObjs => (dogObjs.forEach(pup => {
     dogBarDiv.innerHTML += `<span data-id=${pup.id}>${pup.name}</span>`
})))


const specificDogFetch = (pupId) => {
    return fetch(`http://localhost:3000/pups/${pupId}`)
}

const updateDogFetch = (id, update) => {
    return fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: update
        })
    })
}


dogBarDiv.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    specificDogFetch(id).then(resp => resp.json())
    .then(pup => {
        if (pup.isGoodDog === false) {
            var answer = "Bad Dog!"
        } else if (pup.isGoodDog === true) {
            var answer = "Good Dog!"
        }
        dogInfoDiv.innerHTML = `<img src=${pup.image}>
        <h2>${pup.name}</h2>
        <button id="pupBtn" data-id=${pup.id}>${answer}</button>`
    })
})



dogInfoDiv.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        let pupId = e.target.dataset.id;
        let info = e.target.textContent;
        if (info === "Bad Dog!") {
            info = "Good Dog!"
            var update = true
        } else if (info === "Good Dog!") {
            info = "Bad Dog!"
            var update = false
        }
        updateDogFetch(pupId, update).then(resp => resp.json())
        e.target.innerText = `${info}`
    }
})
