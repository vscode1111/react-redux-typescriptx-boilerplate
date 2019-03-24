// import React, { Component } from 'react';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from 'app/containers/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App message="Hello" />, div);
  console.log(div.innerHTML);
  unmountComponentAtNode(div);
});
