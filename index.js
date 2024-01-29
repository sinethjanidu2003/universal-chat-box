const express = require("express");
const router = require("./routes/route.js");
const path = require("path"); 
const bodyParser = require('body-parser');  
const session = require('express-session');

/**
 * Server Dependencies
 */
const socketIo = require('socket.io');
const http = require('http');

/**
 * Host this in your sever, and use this chat box in any website with the js and css.
 * You can remove the local views and routes, if you don't need a home page for your socket
 */

const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//app Settings
app.use(urlencodedParser);
app.use(express.static(__dirname + "/public"));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(
    session({
      secret: 'ExpressJS@900',
      resave: true,
      saveUninitialized: true,
    })
  );


/**
 * Server COnfiguration
 * 
 */
const server = http.createServer(app);
const io = socketIo(server);
const allRooms = new Set();


io.on('connection', (socket) => {
  console.log('A user connected');
  /**
   * Move useres to seperate rooms to connect to an agent
   */


  const roomId = socket.handshake.query.roomId;


  socket.on('room-access', (userId) => {
    socket.join(userId);
    allRooms.add(userId);
    io.emit('admin-allRooms', Array.from(allRooms));
  });

  /**
   * Get all connections to the rooms
   */
 

  socket.on('message', (data) => {
    const { type, message } = data
    io.emit('message', data);
  });

  socket.on('sendMessage', data => {
    const { userId, message } = data;
      io.to(userId).emit('message', message);
  });

  socket.on('user-details', data=>{
    const { userId, userDeatils } = data;
    console.log(data);
    io.to(userId).emit('private-message', userDeatils);
  });


  socket.on('disconnect', () => {
    const roomId = socket.handshake.query.roomId;
    allRooms.delete(roomId);

    io.emit('admin-allRooms', Array.from(allRooms));
    console.log('User disconnected');
  });
});



router.get('/',(req,res)=>{

  res.send('index');
});

router.get('/view-allRooms',(req,res)=>{

  res.sendFile(__dirname+'/public/test.html');
});

server.listen(3000, () => {
  console.log('Server listening on port 80');
});



//routes
app.use(router);


