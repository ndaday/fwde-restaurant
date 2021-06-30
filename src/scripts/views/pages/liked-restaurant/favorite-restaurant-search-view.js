import { createPostItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
    getTemplate() {
        return `
        <div class="content">
        <input id="query" type="text">
        <h2 class="content_heading">Favorite Restaurant</h2>     
            <div id="posts" class="posts">
            </div>     
        </div>
        `;
    }

    runWhenUserIsSearching(callback) {
        console.log(callback);
        document.getElementById('query').addEventListener('change', (event) => {
            callback(event.target.value);
        });
    }

    showRestaurant(resto) {
        this.showFavoriteRestaurant(resto);
    }

    showFavoriteRestaurant(restaurant = []) {
        let html;
        if (restaurant.length) {
            html = restaurant.reduce((carry, resto) => carry.concat(createPostItemTemplate(resto)), '');
        } else {
            html = this._getEmptyRestaurantTemplate();
        }

        document.getElementById('posts').innerHTML = html;

        document.getElementById('posts').dispatchEvent(new Event('posts:updated'));
    }

    _getEmptyRestaurantTemplate() {
        return '<div class="post-item__not__found posts__not__found">Tidak ada restaurant untuk ditampilkan</div>';
    }
}

export default FavoriteRestaurantSearchView;