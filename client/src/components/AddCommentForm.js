import axios from 'axios';
import React from 'react'
import { useState } from 'react';


const AddCommentForm = ({articleName, onArticleUpdated}) => {
  const [namePosted, setNamePosted] = useState('');
  const [commentText, setCommentText] = useState('');
  
  const addComment = async () => {
    const response = await axios.post(`/api/articles/${articleName}/comments`,{
      postedBy: namePosted,
      text: commentText,
    });
    const updatedArticle = response.data;
    onArticleUpdated(updatedArticle);
    setNamePosted('');
    setCommentText('');
  }

  return (
    <div id='add-comment-form'>
        <h3>Add Comment</h3>
        
        <label>
          Name:
          <input 
            value = {namePosted}
            onChange = {e => setNamePosted(e.target.value)}
            type="text" />
        </label>

        <label>
          Comment:
          <textarea 
            rows={5} 
            cols={50}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}          
          />
        </label>
        
        <button onClick={addComment}>Add Comment</button>
    </div>
  )
}

export default AddCommentForm;