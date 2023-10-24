import fs from 'fs';
import admin from 'firebase-admin';
import express from "express";
import {db, connectToDb} from './db.js';

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());


app.use(async (req, res, next) => {
    const {authToken} = req.headers;

    if(authToken) {
        try{
            req.user = await admin.auth().verifyIdToken(authToken);
        }catch (e) {
            
            return res.sendStatus(400);
        }
    }

    req.user = req.user || {};
    next();
});


app.get('/api/articles/:name', async(req, res) => {
    const { name } = req.params;
    const { uid } = req.user;
    const article = await db.collection('articles').findOne({ name });

    if(article){
        const upvotesId = article.upvotesId || [];
        article.canUpvote = uid && !upvotesId.includes(uid);
        res.json(article);
    } else {
        res.sendStatus(404);
    } 

});



app.use((req, res, next) => {
    if(req.user){
        next();
    }else{
        res.sendStatus(401);
    }
});


app.put('/api/articles/:name/upvote', async (req, res) => {
    const {name} = req.params;
    const {uid} = req.user;

    const article = await db.collection('articles').findOne({ name });

    if(article){
        const upvotesId = article.upvotesId || [];
        const canUpvote = uid && !upvotesId.includes(uid); 

        if(canUpvote){
            await db.collection('articles').updateOne({ name },{
                $inc: {upvotes :1},
                $push: {upvotesId: uid},
            });
        }

        const updatedArticle = await db.collection('articles').findOne({name});
        res.json(updatedArticle);

        }else{
            res.send('That article doesn\'t exist.');
        }

}); 
 


app.post('/api/articles/:name/comments', async (req, res) => {
    const {name} = req.params;
    const {text} = req.body;
    const {email} = req.user;
    
    await db.collection('articles').updateOne({ name },{
        $push: {comments: { postedBy: email, text}},
    });

    const article = await db.collection('articles').findOne({name});

    if(article){
        res.json(article);
    }else{
        res.send('That article doesn\'t exist.');
    }
});


connectToDb(() =>{
    console.log("successfully connected to the database.!!");

    app.listen(8000, () => {
        console.log("Server is listening on port 8000");
    });

});