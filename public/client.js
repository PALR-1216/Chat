const socket = io()
let name;
let textarea = document.querySelector('#textarea')
// let message = document.querySelector("#message")
let messageArea = document.querySelector('.message__area')

let usersConnected = []
do {
    name = prompt('Please enter your name: ')
} while(!name)

//send userName to server
socket.emit('UserName', name)

textarea.addEventListener('keyup', (e) => {
    //only send message when input is not empty
    if(e.key === 'Enter') {
        sendMessage(e.target.value)

        
    }
})





function sendMessage(message) {

    let msg = {
        user: name,
        message: message.trim()
    }

    // Append 
    if(msg.message == '' || msg.message == null) {
        alert("please enter a message to send")
        return
    }
    else{
        appendMessage(msg, 'outgoing')
        textarea.value = ''
        scrollToBottom()
    
        // Send to server 
        socket.emit('message', msg)

    }
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
    
}


function addUserList(users) {
    //create elelemt to add to list of connected users
    var li = document.createElement('li')
    li.innerHTML = users
    document.getElementById('user_List').appendChild(li)

}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

socket.on("userList", (users) =>{
    addUserList(users)
    
})




function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

