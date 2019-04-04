import * as React from 'react';
// import { getData } from 'app/api/main';
import { PostModel } from 'app/models/PostModel';
import { connect } from 'react-redux';
import { PostActions } from 'app/actions/postActions'
const fetchPosts = PostActions.fetchPosts;

export namespace Posts {
   export interface Props {
      fetchPosts: Function;
      posts: PostModel[];
   }

   export interface State {
      posts?: PostModel[];
   }
}

class Posts extends React.Component<Posts.Props, Posts.State> {
   async componentWillMount() {
      this.props.fetchPosts();
   }

   componentWillReceiveProps(nextProps: any) {
      if (nextProps.newPost) {
         this.props.posts.unshift(nextProps.newPost)
      }
   }

   renderPosts = () => {
      const data = this.props.posts;
      return data && data.length > 0
         ? data.map((post) => (
            <div key={post.id}>
               <h3>{post.title}</h3>
               <p>{post.body}</p>
            </div>
         ))
         : '';
   };

   render() {
      return (
         <div>
            <h1>Posts</h1>
            {this.renderPosts()}
         </div>
      );
   }
}

const mapStateToProps = (state: any) => ({
   posts: state.posts.items,
   newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Posts)