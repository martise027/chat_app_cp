

const chatForm = document.getElementById('chat-form'); //* get element by id from HTML;
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//* Get username and room
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});

const socket = io();

//* Join chat room
socket.emit('joinRoom',{username,room});

//* get room and users
socket.on('roomUsers',({room,users}) => {
    //outputRoomName(room);
    outputUsers(users);
})

//* 1 catch here
//* Message from server
socket.on('message',message => {
    // console.log('front message :',message);
    // console.log(username);
    outputMessage(message,username);

    //* scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('admin-Messages' , message =>{
    printAdminmessage(message);
});

//* Message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    //* get message text
    const msg = e.target.elements.msg.value;

    //* emit message to server
    socket.emit('chatMessage',msg);

    //* Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});

//* Output message to DOM
function outputMessage(message,username) {
        var check = false;
        if(message.username === username) check = true;
        console.log(message.username);
        console.log(username);
        const divav = document.createElement('div');
        divav.classList.add('msg-container');
        const div = document.createElement('div');
        if(check){
            div.classList.add('msg_sent');
            console.log('sent');
        }else{
            div.classList.add('msg_received');
            console.log('received');
        }
        const p = document.createElement('p');
        if(check)p.classList.add('meta_sent');
        else p.classList.add('meta_received');
        p.innerText = message.username+" : ";
        p.innerHTML += `<span>${message.time}</span>`;
        const para = document.createElement('p');
        para.classList.add('text');
        para.innerText = message.text;
        para.appendChild(p);
        div.appendChild(para);
        divav.appendChild(div);
        console.log('div.classname :'+div.className+'\n'+'p.className '+p.className+'\n'+para.className);
        document.querySelector('.chat-messages').appendChild(divav);
}



function printAdminmessage(message){
    const divav = document.createElement('div');
    divav.classList.add('admin-message-container');

    const div = document.createElement('div');
    div.classList.add('admin-message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    
    console.log('div.classname :'+div.className+'\n'+'p.className '+p.className+'\n'+para.className);
    divav.appendChild(div);
    document.querySelector('.chat-messages').appendChild(divav);
}


//* Add user to DOM
function outputUsers(user){
    userList.innerHTML = `<p>Online ${user.length} people</p>`
}

document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
});