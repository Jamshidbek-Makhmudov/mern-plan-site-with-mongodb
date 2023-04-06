//there is a CRUD operators in nodejs when connect to mongoddb
//1.create-   await db.collection("items").insertOne({ text: req.body.item })
//2.read-   const items = await db.collection("items").find().toArray()
//3.updated- app.post("/update-item", function (req, res) { console.log(req.body.text)}) javascriptda ham kod yozildi
//4.delete-

//ObjectId mongodb keladi va va frond end qismida yozilgan idni shu ObjectId prametriga beriladi
//mongodbdagi idni ishtaishda shunchaki id deb bolmaydi _id deyish kerak
//requirements
let express = require("express")
let { MongoClient, ObjectId } = require("mongodb")

//calling requirements
let app = express()
let db
app.use(express.static("public"))

//run app
async function go() {
  let client = new MongoClient(
    "mongodb+srv://jamshid:ZahIQ3wOF9klMqoD@cluster1.ymeimhr.mongodb.net/TodoApp?retryWrites=true&w=majority"
  )
  client.connect()
  db = client.db()
  app.listen(3000)
}
go()

//boiling code || middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//html request to the server
app.get("/", async function (req, res) {
  //find datas from mongodb collection named items
  const items = await db.collection("items").find().toArray()

  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple To-Do App</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <h1 class="display-4 text-center py-1">To-Do App!</h1>
      
      <div class="jumbotron p-3 shadow-sm">
        <form action="/create-item" method="POST">
          <div class="d-flex align-items-center">
            <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
            <button class="btn btn-primary">Add New Item</button>
          </div>
        </form>
      </div>
      
      <ul class="list-group pb-5">
      ${items
        .map(
          (item) =>
            `<li
        class='list-group-item list-group-item-action d-flex align-items-center justify-content-between'
      >
        <span class='item-text'>${item.text}</span>
        <div>
          <button data-id=${item._id} class='edit-me btn btn-secondary btn-sm mr-1'>Edit</button>
          <button class='delete-me btn btn-danger btn-sm'>Delete</button>
        </div>
      </li>`
        )
        .join("")}
      </ul>
      
    </div>
    <script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
    <script src="/browser.js"></script>
  </body>
  </html>`)
})

//create method with post to mongodb
app.post("/create-item", async function (req, res) {
  await db.collection("items").insertOne({ text: req.body.item })
  res.redirect("/")
})

//front endda yozilgan code ni backend da ushlab olish editing
app.post("/update-item", async function (req, res) {
  await db.collection("items").findOneAndUpdate(
    //1-parametr mongodbadi nmani almashtirish
    //2-parametr qaysi update boladi objectimiz
    { _id: new ObjectId(req.body.id) },
    { $set: { text: req.body.text } }
  )

  res.send("success")
})
