import * as React from 'react'
import { PostModel } from 'app/models/PostModel';
import { postData } from 'app/api/main';

export namespace PostForm {
   export interface Props { }
   export interface State {
      status?: string;
      post: PostModel;
   }
}

export default class PostForm extends React.Component<PostForm.Props, PostForm.State> {
   constructor(props: PostForm.Props) {
      super(props);
      this.state = {
         status: '...',
         post: {
            title: '',
            body: ''
         }
      };
      // this.onChange = this.onChange.bind(this);
   }

   onChange(e: React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>) {
      const post = this.state.post;
      const newPost = { ...post, ...{ [e.target.name]: e.target.value } };
      const newState = { ...this.state, post: newPost };
      this.setState(newState);
   }

   async onSubmit(e: React.FormEvent<EventTarget>) {
      e.preventDefault();
      let newState = { ...this.state, status: 'Request...' };
      this.setState(newState);
      const { title, body } = this.state.post;
      const data = {
         title, body
      }
      await postData(data);
      newState = { ...this.state, status: 'Finished' };
      this.setState(newState);
   }

   render() {
      const { status, post } = this.state;
      const { title, body } = post;
      return (
         <div>
            <h1>Post form</h1>
            <form onSubmit={async e => await this.onSubmit(e)}>
               <div>
                  <label>Title: </label>
                  <br />
                  <input
                     type="text"
                     name="title"
                     value={title}
                     onChange={e => this.onChange(e)}
                  />
               </div>
               <br />
               <div>
                  <label>Body: </label>
                  <br />
                  <textarea
                     name="body"
                     value={body}
                     onChange={e => this.onChange(e)}
                  />
               </div>
               <br />
               <button type="submit">Submit</button>
               <div>{status}</div>
            </form>
         </div>
      )
   }
}
