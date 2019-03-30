import * as React from 'react';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import * as waitUntil from 'async-wait-until';
import Posts from 'app/components/Posts';

configure({ adapter: new Adapter() });

jest.mock('app/api/foo');

it('Posts renders', async () => {
  const wrapper = shallow(<Posts />);

  await waitUntil(() => {
    const posts: any[] = wrapper.state('posts');
    return posts !== null && posts.length > 0;
  });

  // console.log(wrapper.html());
  expect(wrapper.html()).toContain('Posts');
  expect(wrapper.html()).toContain(
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
  );

  // setImmediate(() => {
  //    // console.log(wrapper.html());

  //    // console.log(wrapper.state('posts'));
  //    done();
  // }, 0);
});
