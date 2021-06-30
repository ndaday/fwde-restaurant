import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import { createPostItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <div class="content">
        <h2 class="content_heading">Favorite Restaurant</h2>
        <div id="posts" class="posts">
 
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantsContainer = document.querySelector('#posts');
    restaurants.forEach((post) => {
      restaurantsContainer.innerHTML += createPostItemTemplate(post);
    });
  },
};

export default Favorite;
