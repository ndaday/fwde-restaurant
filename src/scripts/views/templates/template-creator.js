import CONFIG from '../../globals/config';

const createPostDetailTemplate = (post) => `
    <div class="post-detail_header">
      <h2 class="restaurant__title">${post.name}</h2>
      <p>⭐️ ${post.rating}</p>
      <p>${post.city}, ${post.address}</p>
      <p class="categories">Categories: ${post.categories.map((category) => category.name).join(', ')}</p>
    </div>
    <div class="post-detail_description">
      <img class="lazyload post__poster" data-src="${CONFIG.LARGE_IMAGE_URL + post.pictureId}" alt="${post.name}" />
      <p>${post.description}</p>
    </div>
    <div class="post-detail_menu">
      <div class="post-detail_foods">
        <h3>Foods :</h3>
        <ul>
          ${post.menus.foods
    .map(
      (foods) => `
          <li>
            <p>${foods.name}</p>
          </li>
          `,
    )
    .join('')}
        </ul>
      </div>
      <div class="post-detail_drinks">
        <h3>Drinks :</h3>
        <ul>
          ${post.menus.drinks
    .map(
      (drinks) => `
          <li>
            <p>${drinks.name}</p>
          </li>`,
    )
    .join(' ')}
        </ul>
      </div>
    </div>
    <div class="post-detail_review">
    <div id="addReviewContainer">
      <h3>Add Review</h3>
      <form id="formField">
        <input type="hidden" id="postId">
        <input aria-label="Name" type="text" id="nameReviewer" placeholder="Your name.."><br>
        <input aria-label="Review" type="text" id="textReview" placeholder="Your review.."><br>
        <input type="submit" id="addReview" value="Submit"></input>
      </form>
    </div>
      <h3>Customer Review</h3>
      ${post.customerReviews
    .map(
      (review) => `
      <div>
        <h4>${review.name}</h4>
        <p class="review-date">${review.date}</p>
        <p>${review.review}</p>
      </div>
      `,
    )
    .join('')}
    </div>
`;

const createPostItemTemplate = (post) => `
  <div class="post-item">
    <div class="post-item__header">
        <img class="lazyload post-item__header__poster" width="100%" height="350px" src="./images/placeholder.png" alt="${post.name || '-'}"
            data-src="${post.pictureId ? CONFIG.BASE_IMAGE_URL + post.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
        <div class="post-item__header__city">
          <p>${post.city}
        </div>
        <div class="post-item__header__rating">
            <p>⭐️<span class="post-item__header__rating__score">${post.rating || '-'}</span></p>
        </div>
    </div>
    <div class="post-item__content">
        <h3 class="restaurant__title"><a href="${`/#/detail/${post.id}`}">${post.name || '-'}</a></h3>
        <p>${post.description || '-'}</p>
    </div>
  </div>
  `;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createSkeletonTemplate = (count) => {
  let template = '';

  for (let i = 0; i < count; i += 1) {
    template += `
      <div class="post-item">
        <div class="post-item__header">
            <img class="post-item__header__poster" width="100%" height="350px" src="./images/placeholder.png" alt="skeleton">
        </div>
        <div class="post-item__content">
            <h3 class="skeleton">Lorem ipsum dolor sit.</a></h3>
            <p class="skeleton">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci alias aspernatur, assumenda aut consectetur consequuntur debitis deleniti dicta dolorem dolorum eos exercitationem labore laboriosam magni nihil, nobis obcaecati optio perspiciatis placeat qui recusandae saepe sapiente sequi totam ullam ut.</p>
        </div>
      </div>
  `;
  }
  return template;
};

export { createPostItemTemplate, createPostDetailTemplate, createLikeButtonTemplate, createUnlikeButtonTemplate, createSkeletonTemplate };
