import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import articles from './article-content'
import NotFoundPage from './NotFoundPage.';

const ArticlePage = () => {
  const {articleId} = useParams();
  const [articleInfo, setArticleInfo] = useState({upvotes:0, comments: []});

  const article = articles.find(article => article.name === articleId);  
  
  useEffect(() =>{
    setArticleInfo({upvotes: Math.ceil(Math.random() * 10), comments:[]});
  },[]);
  

  if(!article){
    return <NotFoundPage/>
  }

  return (
    <>
      <h1> {article.title}</h1>
      <p> This article has {articleInfo.upvotes} upvote(s)</p>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ) )}
    </>
    
  ); 
}

export default ArticlePage;