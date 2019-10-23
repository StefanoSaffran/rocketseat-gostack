import React, { Component } from 'react';
import './styles.css'

import Post from '../Post'
import Comment from '../Comment'

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Post owner",
          avatar: "https://i.pravatar.cc/150?img=69"
        },
        date: "22 Out 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Follower 1",
              avatar: "https://i.pravatar.cc/150?img=29"
            },
            content: "A Rocketseat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no Bootcamp, inclusive 80% do nosso time de devs é composto por alunos do Bootcamp. Além disso, se você tem vontade de ensinar gravando vídeos e criando posts, pode me chamar no Discord! (Sério, me chamem mesmo, esse comentário é real)"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Post owner",
          avatar: "https://i.pravatar.cc/150?img=69"
        },
        date: "04 Jun 2019",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, ad accusamus similique tempore magnam alias reiciendis magni laudantium enim, tenetur soluta quam suscipit recusandae ducimus quaerat mollitia placeat fugit assumenda.",
        comments: [
          {
            id: 1,
            author: {
              name: "Follower 2",
              avatar: "https://i.pravatar.cc/150?img=28"
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          },
          {
            id: 2,
            author: {
              name: "Follower 3",
              avatar: "https://i.pravatar.cc/150?img=26"
            },
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque maiores asperiores laboriosam eius odit quae. "
          },
          {
            id: 3,
            author: {
              name: "Post owner",
              avatar: "https://i.pravatar.cc/150?img=69"
            },
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque maiores asperiores laboriosam eius odit quae. "
          }
        ]
      },
      {
        id: 3,
        author: {
          name: "Post owner",
          avatar: "https://i.pravatar.cc/150?img=69"
        },
        date: "04 Jun 2019",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, ad accusamus similique tempore magnam alias reiciendis magni laudantium enim, tenetur soluta quam suscipit recusandae ducimus quaerat mollitia placeat fugit assumenda.",
        comments: [
          {
            id: 1,
            author: {
              name: "Follower 4",
              avatar: "https://i.pravatar.cc/150?img=11"
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          },
          {
            id: 2,
            author: {
              name: "Post owner",
              avatar: "https://i.pravatar.cc/150?img=69"
            },
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque maiores asperiores laboriosam eius odit quae. "
          },
          {
            id: 3,
            author: {
              name: "Follower 5",
              avatar: "https://i.pravatar.cc/150?img=9"
            },
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque maiores asperiores laboriosam eius odit quae. "
          },
          {
            id: 4,
            author: {
              name: "Follower 6",
              avatar: "https://i.pravatar.cc/150?img=6"
            },
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque maiores asperiores laboriosam eius odit quae. "
          }
        ]
      },
    ]
  }
  render() {
    const rows = this.state.posts.map(post => (
      <li key={post.id} className="content">
        <Post post={post} />
        <Comment post={post} />
      </li>
    ))

    return (
      <ul className="container">      
        {rows}
      </ul>
    )
  }
}

export default PostList;