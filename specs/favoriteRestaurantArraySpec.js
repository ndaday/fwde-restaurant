/* eslint-disable no-return-assign */
import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';

let favoriteRestaurant = [];

const FavoriteRestaurantArray = {

    getRestaurant(id) {
        if (!id) {
            return;
        }

        return favoriteRestaurant.find((restaurant) => restaurant.id === id);
    },

    getAllRestaurant() {
        return favoriteRestaurant;
    },

    putRestaurant(restaurant) {
        if (!restaurant.hasOwnProperty('id')) {
            return;
        }

        // pastikan id ini belum ada dalam daftar favoriteRestaurant
        if (this.getRestaurant(restaurant.id)) {
            return;
        }

        favoriteRestaurant.push(restaurant);
    },

    deleteRestaurant(id) {
        // cara boros menghapus restaurant dengan meng-copy restaurant yang ada
        // kecuali restaurant dengan id == id
        favoriteRestaurant = favoriteRestaurant.filter((restaurant) => restaurant.id !== id);
    },

    searchRestaurant(query) {
        return this.getAllRestaurant()
            .filter((post) => {
                const loweredCaseMovieTitle = (post.name || '-').toLowerCase();
                const jammedMovieTitle = loweredCaseMovieTitle.replace(/\s/g, '');

                const loweredCaseQuery = query.toLowerCase();
                const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

                return jammedMovieTitle.indexOf(jammedQuery) !== -1;
            });
    },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
    afterEach(() => favoriteRestaurant = []);

    itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});