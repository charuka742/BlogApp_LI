import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import useUser from '../hooks/useUser';


const AddCommentForm = ({articleName, onArticleUpdated}) => {
  const [namePosted, setNamePosted] = useState('');
  const [commentText, setCommentText] = useState('');
  const { user } = useUser();

  const addComment = async () => {
    const token = user && await user.getIdToken();   
    const headers = token ? {authToken: token} : {};
    const response = await axios.post(`/api/articles/${articleName}/comments`,{
      postedBy: namePosted,
      text: commentText,
    },{
      headers,
    });
    const updatedArticle = response.data;
    onArticleUpdated(updatedArticle);
    setNamePosted('');
    setCommentText('');
  }

  return (
    <div id='add-comment-form'>
        <h3>Add Comment</h3>
          {user && <p>You are posting as: {user.email}</p>}
          <textarea 
            rows={5} 
            cols={50}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}          
          />

        <button onClick={addComment}>Add Comment</button>
    </div>
  )
}

export default AddCommentForm;