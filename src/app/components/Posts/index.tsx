import * as React from 'react';
// import { getData } from 'app/api/main';
import { PostModel } from 'app/models/PostModel';
import { connect } from 'react-redux';
import { PostActions } from 'app/actions/posts'
import { RootState } from 'app/reducers/state';

export namespace Posts {
   export interface Props {
      fetchPostsStart: Function;
      posts: PostModel[];
   }

   export interface State {
      posts?: PostModel[];
   }
}

class Posts extends React.Component<Posts.Props, Posts.State> {
   async componentWillMount() {
      this.props.fetchPostsStart();
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
         <>
            <h1>Posts</h1>
            {this.renderPosts()}
         </>
      );
   }
}

const mapStateToProps = (state: {posts: RootState.PostsState}) => ({
   posts: state.posts.items,
   newPost: state.posts.item
});

const actions = (dispatch: any) => ({
   fetchPostsStart: () => dispatch(PostActions.fetchPostsStart())
 });

export default connect(mapStateToProps, actions)(Posts)