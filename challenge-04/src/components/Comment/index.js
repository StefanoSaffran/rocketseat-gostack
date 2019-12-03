import React from 'react';
import './styles.css'

const Comment = ({ post }) => {

  const comments = post.comments.map(comment => (
    <div key={comment.id} className="comments-info">
      <img src={comment.author.avatar} alt="Avatar"/>
      <div><p><strong>{comment.author.name}</strong>{comment.content}</p></div>
    </div>
  ))

  return (
    <>
      {comments}
    </>
  )
}

export default Comment;