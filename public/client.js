const socket = io()
let name;
let textarea = document.querySelector('#textarea')
// let message = document.querySelector("#message")
let messageArea = document.querySelector('.message__area')
let userList = document.querySelector("#user_List");

let usersConnected = []
do {
    name = prompt('Please enter your name: ')
} while(!name)

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

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

