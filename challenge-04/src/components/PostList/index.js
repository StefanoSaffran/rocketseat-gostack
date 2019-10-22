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
          name: "Stefano Saffran",
          avatar: "https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/15203151_1382233968467894_2570941518286464205_n.jpg?_nc_cat=103&_nc_oc=AQnJpV0E2zKuA5x3xCpFXXOGW65vJX2g5Srx-3rzxN8mHFIr5ec2snsTgUAmXQRO79ovceDhPsZMH-wb5p4mNBU2&_nc_ht=scontent-frx5-1.xx&oh=ac02940d3e24567d652b28bb8398a5f0&oe=5E227CEB"
        },
        date: "22 Out 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/59480734_2249174048509235_2974090043016085504_n.jpg?_nc_cat=111&_nc_oc=AQnO4IGMcrf1I5iSr7TGXlYgG9ypEGy_D7bS5c97VJpYj19SWWMqHVQqqSeYFywtZTNCE6DxtVC7yMnuhtq8mcE-&_nc_ht=scontent-frx5-1.xx&oh=f09600a4389cc4e25ac90c6e730ced32&oe=5E63C376"
            },
            content: "A Rocketseat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no Bootcamp, inclusive 80% do nosso time de devs é composto por alunos do Bootcamp. Além disso, se você tem vontade de ensinar gravando vídeos e criando posts, pode me chamar no Discord! (Sério, me chamem mesmo, esse comentário é real)"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Stefano Saffran",
          avatar: "https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/15203151_1382233968467894_2570941518286464205_n.jpg?_nc_cat=103&_nc_oc=AQnJpV0E2zKuA5x3xCpFXXOGW65vJX2g5Srx-3rzxN8mHFIr5ec2snsTgUAmXQRO79ovceDhPsZMH-wb5p4mNBU2&_nc_ht=scontent-frx5-1.xx&oh=ac02940d3e24567d652b28bb8398a5f0&oe=5E227CEB"
        },
        date: "04 Jun 2019",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, ad accusamus similique tempore magnam alias reiciendis magni laudantium enim, tenetur soluta quam suscipit recusandae ducimus quaerat mollitia placeat fugit assumenda.",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/59480734_2249174048509235_2974090043016085504_n.jpg?_nc_cat=111&_nc_oc=AQnO4IGMcrf1I5iSr7TGXlYgG9ypEGy_D7bS5c97VJpYj19SWWMqHVQqqSeYFywtZTNCE6DxtVC7yMnuhtq8mcE-&_nc_ht=scontent-frx5-1.xx&oh=f09600a4389cc4e25ac90c6e730ced32&oe=5E63C376"
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          },
          {
            id: 2,
            author: {
              name: "Diego Fernandes",
              avatar: "https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/59480734_2249174048509235_2974090043016085504_n.jpg?_nc_cat=111&_nc_oc=AQnO4IGMcrf1I5iSr7TGXlYgG9ypEGy_D7bS5c97VJpYj19SWWMqHVQqqSeYFywtZTNCE6DxtVC7yMnuhtq8mcE-&_nc_ht=scontent-frx5-1.xx&oh=f09600a4389cc4e25ac90c6e730ced32&oe=5E63C376"
            },
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque maiores asperiores laboriosam eius odit quae. "
          },
          {
            id: 3,
            author: {
              name: "Stefano Saffran",
              avatar: "https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/15203151_1382233968467894_2570941518286464205_n.jpg?_nc_cat=103&_nc_oc=AQnJpV0E2zKuA5x3xCpFXXOGW65vJX2g5Srx-3rzxN8mHFIr5ec2snsTgUAmXQRO79ovceDhPsZMH-wb5p4mNBU2&_nc_ht=scontent-frx5-1.xx&oh=ac02940d3e24567d652b28bb8398a5f0&oe=5E227CEB"
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