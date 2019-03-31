import * as React from 'react';
import * as style from './style.less';
import Wow from 'app/components/Wow';
import TicTacToe from 'app/components/TicTacToe';
import Posts from 'app/components/Posts';
import PostForm from 'app/components/PostForm';

interface AppProps {
   message: string;
}

export default class App extends React.Component<AppProps> {
   render() {
      const { message } = this.props;
      return (
         <div>
            <h1 className={style.text1}>{message}</h1>
            <Wow />
            <TicTacToe />
            <PostForm />
            <Posts />
         </div>
      );
   }
}
