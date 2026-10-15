const cl = console.log;


let blogs = [
  {
    userId: 1,
    id: "1",
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    userId: 1,
    id: "2",
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla "
  },
  {
    userId: 1,
    id: "3",
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut "
  },
  {
    userId: 1,
    id: "4",
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit "
  },
  {
    userId: 1,
    id: "5",
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque "
  }
]

const PORT = 3000 // localhost::3000
const express = require('express')

const app = express()
app.use(express.json())

//get All :: BASE_URL/api/blogs & GET 

app.get('/api/blogs',(req,res)=>{
    try{
        res.status(200).json({
            success:true,
            data:blogs
        })
    }catch(err){
      res.status(500).json({
        success : false,
        message :'error while fatching blogs',
        error: err.message
      })

    }
})

//get single blog

app.get("/api/blogs/:id",(req,res)=>{
  let blogId = req.params.id;
  let blog = blogs.find(b => b.id === blogId)
  
  try{
    if(!blog){
    return res.status(404).json({
      success:false,
      message:`blog not found with ${blogId}`,
    });
  }

  res.status(200).json({
    success : true,
    body : blog,
    message:`blog data found with id${blogId}`
  });
  }catch(err){
    res.status(500).json({
      success:false,
      message:"someting went wrong",
      error:err.message,
    })
  }

})

//....create blog

app.post("/api/blogs",(req,res)=>{
  try{
    let {userId ,title,body} = req.body;

    if(!title || !body){
      return res.status(400).json({
        success: false,
        message:"Title and content are required fields"
      })
    }
    let newBlog = {
      title:title,
      body:body,
      id:Date.now().toString(),
      createdAt:Date.now(),
      updatedAt:null
    }
    blogs.push(newBlog)

    res.status(201).json({
      success:true,
      message:"Post created successfully",
      body: newBlog
    })
  }catch(err){
    res.status(500).json({
      success:false,
      message:"Network Error",
      error:err.message
    })
  }
})

//delete

app.delete("/api/blogs/:id",(req,res)=>{
  try{
     let removeId = req.params.id;
     let getIndex = blogs.findIndex((ele)=>ele.id === removeId)

     if(getIndex === -1){
      return res.status(404).json({
        success:false,
        nessage:`blog not found with Id ${removeId}`
      });
     }
     let blogArr = blogs.splice(getIndex,1);
     res.status(200).json({
      success:true,
      message:`Blog daleted successfully!`,
      body:blogArr[0],
     })
  }catch{
     res.status(500).json({
      success:false,
      message:"something went wrong!!",
      error:err.message
    })
  }
})


//delete

app.patch("/api/blogs/:id",(req,res)=>{
  try{
    let updateId = req.params.id;
    let getIndex = blogs.findIndex(b=>b.id === updateId);

    if(getIndex === -1){
      return res.status(404).json({
        success:false,
        message:"blog not found"
      })
    }

    let obj = blogs.find(b=>b.id === updateId);
    let updateObj = {
      ...obj,
      ...req.body,
      id:obj.id
    }
    blogs[getIndex] = updateObj
    res.status(200).json({
      success:true,
      message:'blog Updated Successfully!',
      data:updateObj
    })
  }catch{
     res.status(500).json({
      success:false,
      message:"something went wrong!!",
      error:err.message
    })
  }
})

app.listen(PORT,() =>{
  cl(`server is running on port ${PORT}`)
})

