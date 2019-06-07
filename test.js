const mongoose = require ('mongoose')


const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/NodeJS_Test_Blog')

// Post.create({
//     title: 'My first blog post',
//     description: 'Blog post Description',
//     content: 'Lorem Ipsum Content'
// }, (error, post)=> {
//     console.log(error, post)
// })

// Post.create({
//     title: 'My second blog post',
//     description: 'Second Blog post Description',
//     content: 'Lorem Ipsum Content'
// }, (error, post)=> {
//     console.log(error, post)
// })

Post.find({}
, (error, post)=> {
    console.log(error, post)
})

// Post.findById("5cc251e20cfdc51a589e3845", (error, post)=>{
//     console.log(error, post)
// })

// Post.findByIdAndUpdate("5cc251e20cfdc51a589e3845", {
//
//     title:'My first blog post updated'
// }, (error, post)=> {
//     console.log(error, post)
// })