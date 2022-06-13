import { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { fetchPosts } from "../actions";
import { fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";

const PostList = ({ posts, fetchPostsAndUsers }) => {
  useEffect(() => {
    // fetchPosts();
    fetchPostsAndUsers();
  }, []);

  const renderedList = posts.map((post) => {
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId}/>
          </div>
        </div>
      );
    });

  return (
    <div className="ui relaxed divided list">
      {renderedList}
      <h1></h1>
      {console.log(posts)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { posts: state.posts };
};

export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);
