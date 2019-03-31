import * as React from 'react';
import { getData } from 'app/api/main';
import { PostModel } from 'app/models/PostModel';

export namespace Posts {
   export interface Props { }

   export interface State {
      posts?: PostModel[];
   }
}

export default class Posts extends React.Component<Posts.Props, Posts.State> {
   constructor(props: Posts.Props) {
      super(props);
      this.state = {
         posts: []
      };
   }

   async componentWillMount() {
      const data = await getData();
      this.setState({ posts: data });

      // getData().then(data => this.setState({ posts: data }));
   }

   renderPosts = () => {
      return this.state.posts && this.state.posts.length > 0
         ? this.state.posts.map((post) => (
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
