const nodeFetch = require('node-fetch');

export const initializeChat = (io): void => {
  io.on('connection', function (socket) {
    io.emit('message', 'A new user has connected!');

    socket.on('disconnect', function () {
      // do something really sad when a user disconnects
    });

    socket.on('message', msg => {
      // when a message comes in on the "message" channel, emit it out to everyone that is connected
      socket.broadcast.emit('message', msg);
    });

    socket.on('sendGif', async () => {
      const gifUrl = await getRandomGif();
      io.emit('gif', gifUrl);
    });
  });
};

const getRandomGif = async () => {
  const response = await nodeFetch('https://api.giphy.com/v1/gifs/random?api_key=iy4oHQZmxRq8KH1x6S2yeeWIyh54ahGY&tag=fail&rating=G');
  const gifObject = await response.json();
  return gifObject.data.id;
};