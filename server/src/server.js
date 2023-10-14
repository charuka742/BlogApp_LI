import express from "express";

let ArticleInfo = [{
    name:'learn-react',
    upvote: 0
},
{
    name:'learn-node',
    upvote: 0
},
{
    name:'mongodb',
    upvote: 0
}]

const app = express();
app.use(express.json());



app.put('/api/articles/:name/upvote', (req, res) => {
    
});










// app.get('/hello/:name', (req, res) => {
//     const {name} = req.params;
//     res.send(`Hello ${name} !!`);
// });


// app.post('/hello', (req, res) => {
//     res.send(`Hello ${req.body.name}!`);
// });


app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});