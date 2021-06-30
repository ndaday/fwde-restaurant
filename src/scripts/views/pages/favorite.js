import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import { createPostItemTemplate } from '../templates/template-creator';
import FavoriteRestaurantSearchView from './liked-restaurant/favorite-restaurant-search-view';

const view = new FavoriteRestaurantSearchView();

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
