import { createPostItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
    getTemplate() {
        return `
        <div id="restaurant-search-container">
            <input id="query" type="text">
            <div class="restaurant-result-container">
                <ul class="restaurant">
                </ul>
            </div>
        </div>
        `;
    }

    getFavoriteItemTemplate() {
        return `<div class="content">
            <h2 class="content_heading">Favorite Restaurant</h2>
            <div id="posts" class="posts">

            </div>
        </div>
        `;
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('change', (event) => {
            callback(event.target.value);
        });
    }

    showRestaurant(resto) {
        let html;

        if (resto.length > 0) {
            html = resto.reduce(
                (carry, restaurant) => carry.concat(`<li class="restaurant"><span class="restaurant__title">${restaurant.title || '-'}</span></li>`),
                '',
            );
        } else {
            html = '<div class="restaurant__not__found">resto tidak ditemukan</div>';
        }

        document.querySelector('.restaurant').innerHTML = html;

        document.getElementById('restaurant-search-container').dispatchEvent(new Event('restaurant:searched:updated'));
    }

    showFavoriteRestaurant(restaurant = []) {
        let html;
        if (restaurant.length) {
            html = restaurant.reduce((carry, resto) => carry.concat(createPostItemTemplate(resto)), '');
        } else {
            html = '<div class="post-item__not__found"></div>';
        }

        document.getElementById('posts').innerHTML = html;

        document.getElementById('posts').dispatchEvent(new Event('posts:updated'));
    }
}

export default FavoriteRestaurantSearchView;