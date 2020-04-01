const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const server = require("http").createServer(app)
const io = require("socket.io")(server)

const config = require("./config/key");

const mongoose = require("mongoose");
/*mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));*/
const { Comment } = require("./models/Comment")

const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/collections', require('./routes/collection'));
app.use('/api/like', require('./routes/like'));

app.use('/api/chat', require('./routes/chat'));

io.on("connection", socket => {
  socket.on("Input Comment", msg => {
    connect.then(db => {
      try {
        let comment = new Comment({ message: msg.chatMessage, sender: msg.userId, type: msg.type, itemId: msg.itemId })
        comment.save((err, doc) => {
          if (err) return res.json({ success: false, err })

          Comment.find({ _id: doc._id, itemId: doc.itemId })
            .populate("sender")
            .exec((err, doc) => {
              return io.emit("Output Comment", doc)
            })
        })
      } catch (error) {
        console.error(error)
      }
    })
  })
})


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Running at ${port}`)
});

/*async function start(){
  try{
      await mongoose.connect(config.get('mongoUri'),{
          useNewUrlParser:true,
           useUnifiedTopology:true,
           useCreateIndex:true

})
app.listen(PORT ,()=> console.log("Сервер слушает..."))
  }catch(e){
      console.log("Server error", e.message)
      process.exit(1)
  }
}

start()*/