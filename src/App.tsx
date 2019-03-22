import * as React from 'react';
// import Button from 'antd/lib/button';
import Wow from './components/Wow';
import './App.css';

const enum Player {
   None = 0,
   One,
   Two
}

interface AppProps {
   message: string;
}

interface IState {
   board: Player[];
}

export default class App extends React.Component<AppProps, IState> {
   state = {
      board: [
         Player.None,
         Player.None,
         Player.None,
         Player.None,
         Player.None,
         Player.None,
         Player.None,
         Player.None,
         Player.None
      ]
   };

   renderCell = (index: number) => {
      return <div className="cell" />;
   }

   renderBoard = () => {
      const { board } = this.state;
      return (
         <div className="board-container">
            {board.map((value, key) => this.renderCell(key))}
         </div>
      );
   }

   render() {
      const { message } = this.props;
      return (
         <div>
            <h1>Hello {message}</h1>
            {/* <Button type="primary">Test</Button> */}
            <Wow />
            {this.renderBoard()}
         </div>
      );
   }
}
