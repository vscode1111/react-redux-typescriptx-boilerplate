// import React from 'react';
import * as React from 'react';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import Posts from 'app/components/Posts';

configure({ adapter: new Adapter() });

it('Posts renders', () => {
   const wrapper = shallow(<Posts />);
   console.log(wrapper.html());
   expect(wrapper.html()).toContain('<div><h1>Posts</h1></div');
});
