// import React from 'react';
import * as React from 'react';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import Wow from 'app/components/Wow';

configure({ adapter: new Adapter() });

it('shallow renders without crashing', () => {
   const wrapper = shallow(<Wow />);
   // expect(shallow(<Wow />).contains(<h2>WOW++</h2>)).toBe(true);
   // expect(shallow(<Wow />).contains('WOW++</h2>')).toBe(true);
   console.log(wrapper.html());
   expect(wrapper.html()).toBe('<h2 class="text1">WOW++</h2>');
});
