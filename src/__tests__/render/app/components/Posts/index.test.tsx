import * as React from 'react';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import * as waitUntil from 'async-wait-until';
import * as nock from 'nock';
import Posts from 'app/components/Posts';

configure({ adapter: new Adapter() });

jest.mock('app/api/foo');

describe('<Posts />', () => {
   beforeAll(() => {
      nock('https://jsonplaceholder.typicode.com')
         .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
         .get('/posts')
         .reply(200, {
            post: [
               {
                  body:
                     'quia et suscipit↵suscipit recusandae consequuntur expedita et cum↵reprehenderit molestiae ut ut quas totam↵nostrum rerum est autem sunt rem eveniet architecto',
                  id: 1,
                  title:
                     'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                  userId: 1
               }
            ]
         });
   });
   it('Posts renders', async () => {
      const wrapper = shallow(<Posts />);

      await waitUntil(() => {
         const posts: any[] = wrapper.state('posts');
         console.log(posts.length);
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
});
