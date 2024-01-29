/**
 * Testing Purposes - Here is the list of messages
 */
const messages = [
    {"welcome" : "Hello ! How can I help you ?"},
    {"options":["Contact Agent","More options comming "]}
 ];



 var messagesPanel = document.getElementById("message-container");

 var userId = null;
var sokcetConnection = null;

window.onload = ()=>{
    createCatWindow();
    

}

function createRobotButtons(buttonArray){

    var containerDiv = document.createElement("div");
    containerDiv.className = "d-flex flex-row p-3";

    buttonArray.forEach(element => {
        var button1 = document.createElement("button");
        button1.className = "btn btn-secondary mr-2";
        button1.style.fontSize = "12px";
        button1.innerHTML = element;
        button1.onclick = function() {
            
            connectToServer(this, element);
        };
        containerDiv.appendChild(button1);
    });

    messagesPanel.appendChild(containerDiv);
}

function createUserMessage(message){
    var mainContainer = document.createElement("div");
    mainContainer.className = "d-flex flex-row p-3 message-chat";

    // Create the first inner div with text
    var innerDivText = document.createElement("div");
    innerDivText.className = "bg-white mr-2 p-3 message-chat";
    var textNode = document.createTextNode(message);
    innerDivText.appendChild(textNode);

    // Create the second inner div with an image
    var innerDivImage = document.createElement("div");
    var img = document.createElement("img");
    img.src = "https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png";
    img.width = 30;
    img.height = 30;
    innerDivImage.appendChild(img);

    // Append inner divs to the main container
    mainContainer.appendChild(innerDivText);
    mainContainer.appendChild(innerDivImage);
    messagesPanel.appendChild(mainContainer);

}

function createRobotInputs(message){
    var chatMessageContainer = document.createElement("div");
        chatMessageContainer.className = "d-flex flex-row p-3";

        var imageElement = document.createElement("img");
        imageElement.src = "https://img.icons8.com/3d-fluency/94/robot-1.png";
        imageElement.width = 30;
        imageElement.height = 30;

        var chatTextContainer = document.createElement("div");
        chatTextContainer.className = "chat ml-2 p-3";
        chatTextContainer.textContent = message;

        chatMessageContainer.appendChild(imageElement);
        chatMessageContainer.appendChild(chatTextContainer);

        messagesPanel.appendChild(chatMessageContainer);

        var container = document.getElementById("message-container");
        container.scrollTop = container.scrollHeight;
}


function createAdminInputs(message){
    var chatMessageContainer = document.createElement("div");
        chatMessageContainer.className = "d-flex flex-row p-3  message-chat";

        var imageElement = document.createElement("img");
        imageElement.src = "https://img.icons8.com/color/48/administrator-male--v1.png";
        imageElement.width = 30;
        imageElement.height = 30;

        var chatTextContainer = document.createElement("div");
        chatTextContainer.className = "chat ml-2 p-3  message-chat";
        chatTextContainer.textContent = message;

        chatMessageContainer.appendChild(imageElement);
        chatMessageContainer.appendChild(chatTextContainer);

        messagesPanel.appendChild(chatMessageContainer);

        
    }



/**
 * Genrated random userId
 * @returns UserIDString
 */
function generateUserId(){
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  const userId = `${timestamp}_${randomString}`;
  return userId;
}



function openSokcet(){
    const socket = io('',{
        query :{roomId : userId}
    });

    const name = document.getElementById("chat-box-name").value;
    const email = document.getElementById("chat-box-email").value;
    const phone = document.getElementById("chat-box-phone").value;
    userId =   name + "__" +generateUserId() ;

    var check = 0;

    socket.on('message', function(data) {
        const { type, message } = data
        if(type == 'admin'){
            createAdminInputs(message);
        }

        if(check == 0){
           
            socket.emit('user-details',{userId:userId,userDeatils :{name:name,email:email,phone:phone}});
        }
        var container = document.getElementById("message-container");
        container.scrollTop = container.scrollHeight;

        check = 1;
    });


   
    createRobotInputs("Connecting to an Agent , Estimated 5 seconds....");

    sokcetConnection = socket;
    socket.emit('room-access',userId,name);
    return socket;
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

function getResponse(userInput) {
    const lowerCaseInput = userInput.toLowerCase();
  
    if (importedResponses.hasOwnProperty(lowerCaseInput)) {
      return importedResponses[lowerCaseInput];
    } else {
      return "I'm not sure how to respond to that. Can you please provide more details?";
    }
  }


function connectToServer(button,response){
    if(button != null){
        button.disabled = true;
    }
    
    if(response == "Contact Agent" || response=="contact agent" || response == "contact" || response == "connect" || response == "contact me to an agent"){

        createRobotInputs("Before Conecting you to an agent, please fill the form below"); 
        createUserDataForm();
       

    }else{
        createRobotInputs(getResponse(response));
        // createRobotInputs("Sorry , I am still Training please contact agent !...");
    }


}

function connectNowServerChat(event){
    event.preventDefault();
    document.getElementById("chat-form-main-response").disabled = true;
    const socket = openSokcet();
}


function createUserDataForm(){
    var chatMessageContainer = document.createElement("div");
        chatMessageContainer.className = "d-flex flex-row p-3";

        var imageElement = document.createElement("img");
        imageElement.src = "https://img.icons8.com/3d-fluency/94/robot-1.png";
        imageElement.width = 30;
        imageElement.height = 30;

        var chatTextContainer = document.createElement("div");
        chatTextContainer.className = "chat ml-2 p-3";

        var form = document.createElement('form');
        form.addEventListener('submit', connectNowServerChat);

        // Create Name input
        var nameDiv = document.createElement('div');
        nameDiv.classList.add('form-group');
        var nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', 'name');
        nameLabel.textContent = 'Name:';
        var nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.classList.add('form-control');
        nameInput.setAttribute('id', 'chat-box-name');
        nameInput.setAttribute('placeholder', 'Enter your name');
        nameInput.setAttribute('required', 'true');
        nameDiv.appendChild(nameLabel);
        nameDiv.appendChild(nameInput);

        // Create Email input
        var emailDiv = document.createElement('div');
        emailDiv.classList.add('form-group');
        var emailLabel = document.createElement('label');
        emailLabel.setAttribute('for', 'email');
        emailLabel.textContent = 'Email:';
        var emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'email');
        emailInput.classList.add('form-control');
        emailInput.setAttribute('id', 'chat-box-email');
        emailInput.setAttribute('placeholder', 'Enter your email');
        emailInput.setAttribute('required', 'true');
        emailDiv.appendChild(emailLabel);
        emailDiv.appendChild(emailInput);

        // Create Phone Number input
        var phoneDiv = document.createElement('div');
        phoneDiv.classList.add('form-group');
        var phoneLabel = document.createElement('label');
        phoneLabel.setAttribute('for', 'phone');
        phoneLabel.textContent = 'Phone Number:';
        var phoneInput = document.createElement('input');
        phoneInput.setAttribute('type', 'tel');
        phoneInput.classList.add('form-control');
        phoneInput.setAttribute('id', 'chat-box-phone');
        phoneInput.setAttribute('placeholder', 'Enter your phone number');
        phoneInput.setAttribute('required', 'true');
        phoneDiv.appendChild(phoneLabel);
        phoneDiv.appendChild(phoneInput);

        // Create Submit button
        var submitButton = document.createElement('button');
        submitButton.setAttribute('id','chat-form-main-response');
        submitButton.setAttribute('type', 'Connect');
        submitButton.classList.add('btn', 'btn-primary');
        submitButton.textContent = 'Submit';

        // Append elements to form
        form.appendChild(nameDiv);
        form.appendChild(emailDiv);
        form.appendChild(phoneDiv);
        form.appendChild(submitButton);

        chatTextContainer.appendChild(form);

        chatMessageContainer.appendChild(imageElement);
        chatMessageContainer.appendChild(chatTextContainer);

        messagesPanel.appendChild(chatMessageContainer);

        var container = document.getElementById("message-container");
        container.scrollTop = container.scrollHeight;
}

function sendMessage(){
    const me = document.getElementById("user-message-input");
    createUserMessage(me.value);
    if(sokcetConnection == null){
        connectToServer(null,me.value);
    }else{
        sokcetConnection.emit('sendMessage', { userId: userId, message : {type : "user" ,message : me.value} });
    }
    me.value = "";
    autoResizeMessageInput(me);
}


function createCatWindow(){
    // Create elements
        var button = document.createElement("button");
        button.className = "open-button";
        button.innerHTML = "👋 Chat";
        button.onclick = openForm;

        var chatPopup = document.createElement("div");
        chatPopup.className = "chat-popup";
        chatPopup.id = "myForm";

        var card = document.createElement("div");
        card.className = "card mt-5 card-chat";

        var header = document.createElement("div");
        header.className = "d-flex flex-row justify-content-between p-3 adiv text-white";

        var leftChevron = document.createElement("i");
        leftChevron.className = "fas fa-chevron-left";

        var headerText = document.createElement("span");
        headerText.className = "pb-3";
        headerText.textContent = "Live chat - By Sineth Janidu";

        var closeIcon = document.createElement("i");
        closeIcon.className = "fas fa-times";
        closeIcon.onclick = closeForm;

        header.appendChild(leftChevron);
        header.appendChild(headerText);
        header.appendChild(closeIcon);

        var chatContainer = document.createElement("div");
        chatContainer.className = "chat-container";
        chatContainer.id = "message-container";

        messagesPanel = chatContainer;

        var formGroup = document.createElement("div");
        formGroup.className = "form-group px-3 d-flex input-chat-";

        var textarea = document.createElement("textarea");
        textarea.id = "user-message-input";
        textarea.className = "form-control form-control-chat";
        textarea.rows = "1";
        textarea.placeholder = "Type your message";
        textarea.oninput = function () {
        autoResizeMessageInput(this);
        };

        var sendButton = document.createElement("button");
        sendButton.id = "chat-button-id";
        sendButton.className = "btn btn-success ml-2";
        sendButton.innerHTML = "Send";
        sendButton.onclick = sendMessage;

        formGroup.appendChild(textarea);
        formGroup.appendChild(sendButton);

        card.appendChild(header);
        card.appendChild(chatContainer);
        card.appendChild(formGroup);

        chatPopup.appendChild(card);

        // Append elements to body
        document.body.appendChild(button);
        document.body.appendChild(chatPopup);

        createRobotInputs(messages[0].welcome)
        createRobotButtons(messages[1].options);

}

