import FavoriteRestaurantIdb from '../data/favoriterestaurant-idb';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, post }) {
    this._likeButtonContainer = likeButtonContainer;
    this._post = post;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._post;

    if (await this._isPostExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isPostExist(id) {
    const post = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!post;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._post);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._post.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
