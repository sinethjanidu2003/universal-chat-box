/**
 * Getting the main url to load the sokcet
 */

// Get the script element
var scriptElement = document.currentScript || (function() {
  var scripts = document.getElementsByTagName('script');
  return scripts[scripts.length - 1];
})();

// Get the URL of the script
var scriptUrl = scriptElement.src;

// Remove "mainScript.js" from the URL
const mainUrl =  scriptUrl.replace(/\/js\/mainScript\.js$/, '');

/*
* Creaing the Sokcet connection & importing the required Scripts
*/
if (typeof jQuery === 'undefined') {
    const scriptJQuery = document.createElement('script');
    scriptJQuery.src = 'https://code.jquery.com/jquery-3.6.4.min.js';
    document.head.appendChild(scriptJQuery);
}


const scriptSocketIO = document.createElement('script');
scriptSocketIO.src = mainUrl +'/socket.io/socket.io.js';
document.head.appendChild(scriptSocketIO);


const chatScript = document.createElement('script');
chatScript.src =mainUrl+ '/js/chatScript.js';
document.head.appendChild(chatScript);

const chatScript1= document.createElement('script');
chatScript1.src = mainUrl+'/js/chatModel.js';
document.head.appendChild(chatScript1);

var linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = mainUrl + "/css/index.css";

// Append the link element to the head of the document
document.head.appendChild(linkElement);


addBootstrapStylesheet();

/**
 * End of importing
 */






  function addBootstrapStylesheet() {
    var linkElement = document.createElement("link");

    linkElement.rel = "stylesheet";
    linkElement.href = "https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css";
    linkElement.integrity = "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh";
    linkElement.crossOrigin = "anonymous";

    document.head.appendChild(linkElement);
}


function autoResizeMessageInput(textarea){
    textarea.style.height = 'auto'; // Reset height to auto to get the actual scrollHeight
    textarea.style.height = (textarea.scrollHeight) + 'px'; // Set the height to the scrollHeight
}


