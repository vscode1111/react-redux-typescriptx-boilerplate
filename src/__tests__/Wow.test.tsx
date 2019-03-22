// import React from 'react';
import * as React from 'react';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import Wow from '../components/Wow';

configure({ adapter: new Adapter() });

it('shallow renders without crashing', () => {
   expect(shallow(<Wow />).contains(<h2>WOW++</h2>)).toBe(true);
});
