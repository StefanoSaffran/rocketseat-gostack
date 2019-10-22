import React from 'react';
import './styles.css'

const Post = ({ post }) => {
  return (
    <>
      <div className="user-info">
        <img src={post.author.avatar} alt="Avatar" />
        <div>
          <strong>{post.author.name}</strong>
          <span>{post.date}</span>
        </div>
      </div>
      <p className="author-post">{post.content}</p>
    </>
  )
}

export default Post;