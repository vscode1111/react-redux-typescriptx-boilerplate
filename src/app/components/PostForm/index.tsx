import * as React from 'react'
import { PostModel } from 'app/models/PostModel';

export namespace PostForm {
   export interface Props { }
   export interface State extends PostModel { }
}

export default class PostForm extends React.Component<PostForm.Props, PostForm.State> {
   constructor(props: PostForm.Props) {
      super(props);
      this.state = {
         title: '',
         body: ''
      };
      // this.onChange = this.onChange.bind(this);
   }

   onChange(e: React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>) {
      this.setState({ [e.target.name]: e.target.value })
   }

   onSubmit(e: React.FormEvent<EventTarget>) {
      e.preventDefault();
      const { title, body } = this.state;
      const post = {
         title, body
      }
   }

   render() {
      const { title, body } = this.state;
      return (
         <div>
            <h1>Post form</h1>
            <form onSubmit={e => this.onSubmit(e)}>
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
            </form>
         </div>
      )
   }
}
