import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createPostDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';

const Detail = {
  async render() {
    return `
      <div class="content">
        <div id="post" class="post"></div>
      </div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const post = await RestaurantDbSource.detailPost(url.id);
    const postContainer = document.querySelector('#post');
    postContainer.innerHTML = createPostDetailTemplate(post.restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
      post: {
        id: post.restaurant.id,
        name: post.restaurant.name,
        city: post.restaurant.city,
        description: post.restaurant.description,
        pictureId: post.restaurant.pictureId,
        rating: post.restaurant.rating,
      },
    });
    const formField = document.querySelector('#formField');
    const textName = document.querySelector('#nameReviewer');
    const textReview = document.querySelector('#textReview');
    const postId = post.restaurant.id;
    const addReview = document.querySelector('#addReview');
    addReview.addEventListener('click', (event) => {
      event.preventDefault();
      const review = {
        id: postId,
        name: textName.value,
        review: textReview.value,
      };
      const sendReview = RestaurantDbSource.addReview(review);
      formField.reset();
      console.log(sendReview);
    });
  },
};

export default Detail;
