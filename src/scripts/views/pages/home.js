/* eslint-disable import/named */
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createPostItemTemplate, createSkeletonTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div class="content">
        <h2 class="content_heading">Explore Restaurant</h2>
        <div id="posts" class="posts">
          ${createSkeletonTemplate(20)}
        </div>
      </div>
    `;
  },

  async afterRender() {
    const posts = await RestaurantDbSource.homePost();
    const postsContainer = document.querySelector('#posts');
    postsContainer.innerHTML = '';
    posts.forEach((post) => {
      postsContainer.innerHTML += createPostItemTemplate(post);
    });
  },
};

export default Home;
