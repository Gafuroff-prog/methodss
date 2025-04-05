const nameInput = document.getElementById("nameInput")
const numberInput = document.getElementById("numberInput")
const usersContainer = document.createElement("div")
usersContainer.className = "users"
document.body.appendChild(usersContainer)

const api = "https://67ee92fac11d5ff4bf7a1fcd.mockapi.io/api/methods"

function renderUsers(users) {
    users.forEach(user => {
        const userDiv = document.createElement("div")
        userDiv.style.display = "flex"
        userDiv.style.justifyContent = "space-between"
        userDiv.style.alignItems = "center"
        userDiv.style.gap = "20px"
        userDiv.style.border = "1px solid #ccc"
        userDiv.style.padding = "15px"
        userDiv.style.borderRadius = "10px"

        const info = document.createElement("div")
        info.innerHTML = `<h2>${user.name ?? "No name"}</h2><p>${user.number ?? "No number"}</p>`

        const actions = document.createElement("div")
        actions.style.display = "flex"
        actions.style.gap = "10px"

        const editBtn = document.createElement("img")
        editBtn.src = "tabler_edit.png"
        editBtn.style.cursor = "pointer"
        editBtn.style.width = "24px"
        editBtn.setAttribute("data-id", user.id)

        const deleteBtn = document.createElement("img")
        deleteBtn.src = "Vector.png"
        deleteBtn.style.cursor = "pointer"
        deleteBtn.style.width = "24px"
        deleteBtn.setAttribute("data-id", user.id)

        actions.appendChild(editBtn)
        actions.appendChild(deleteBtn)
        userDiv.appendChild(info)
        userDiv.appendChild(actions)
        usersContainer.appendChild(userDiv)

        editBtn.onclick = () => {
            const newName = prompt("Yangi ism kiriting", user.name)
            const newNumber = prompt("Yangi raqam kiriting", user.number)
            if (newName && newNumber) {
                fetch(`${api}/${user.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: newName, number: newNumber })
                }).then(() => {
                    userDiv.querySelector("h2").textContent = newName
                    userDiv.querySelector("p").textContent = newNumber
                })
            }
        }

        deleteBtn.onclick = () => {
            fetch(`${api}/${user.id}`, {
                method: "DELETE"
            }).then(() => userDiv.remove())
        }
    })
}

function addButton() {
    if (!nameInput.value || !numberInput.value) return
    const newUser = {
        name: nameInput.value,
        number: numberInput.value
    }
    fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => renderUsers([data]))
}
