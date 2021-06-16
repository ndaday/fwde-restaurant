import RestaurantDbSource from '../../data/restaurantdb-source';
import { createPostItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div class="content">
        <h2 class="content_heading">Explore Restaurant</h2>
        <div id="posts" class="posts">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const posts = await RestaurantDbSource.homePost();
    const postsContainer = document.querySelector('#posts');
    posts.forEach((post) => {
      postsContainer.innerHTML += createPostItemTemplate(post);
    });
  },
};

export default Home;
