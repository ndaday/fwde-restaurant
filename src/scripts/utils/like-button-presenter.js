import { createLikeButtonTemplate, createUnlikeButtonTemplate } from '../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteRestaurant, post }) {
    this._likeButtonContainer = likeButtonContainer;
    this._favoriteRestaurant = favoriteRestaurant;
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
    const post = await this._favoriteRestaurant.getRestaurant(id);
    return !!post;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.putRestaurant(this._post);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteRestaurant(this._post.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
