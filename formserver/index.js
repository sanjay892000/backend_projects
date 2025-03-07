const connectToMongo = require("./database");
const express = require("express")
const formRouter = require('./routes/formRouter')
const app = express();

const PORT = 5000;

connectToMongo();
/* const user = new UserForm({
  name: "John singh",
  email: "johndoe@example.com",
  contact: 638877438,
  address: "vikas nagar"
})

user.save()
  .then((result) => {
    console.log('data added')
  }).catch((err) => {
    console.log(err)
  }); */

/* UserForm.insertMany([{
  name: "kamlesh singh",
  email: "kamlesh.com",
  contact: 638877438,
  address: "vikas nagar"
},
{
  name: "vijay singh",
  email: "vijay@example.com",
  contact: 638877438,
  address: "ram nagar"
}])
.then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err)
}); */

/* UserForm.findOne({email:"kamlesh.com"})
.then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err)
}); */

/* UserForm.findOneAndUpdate({email:"kamlesh.com"},{email:"kamlesh524@example.com"})
.then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err)
});  */

/* UserForm.find()
.then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err)
}); */ 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.send("hello world")
})

app.use('/userform', formRouter)


app.listen(PORT,()=>{
  console.log(`server is running on port http://localhost:${PORT}`)  // server is listening on port 5000
})



