import * as React from 'react';
// import { getData } from 'app/api/main';
import { PostModel } from 'app/models/PostModel';
import { connect } from 'react-redux';
import { fetchPosts } from 'app/actions/postActions'

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
   // constructor(props: Posts.Props) {
   //    super(props);
   //    this.state = {
   //       posts: []
   //    };
   // }

   async componentWillMount() {
      this.props.fetchPosts();
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
   posts: state.posts.items
});

export default connect(mapStateToProps, { fetchPosts })(Posts)