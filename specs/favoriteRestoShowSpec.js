import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-show-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';

describe('Showing all favorite restaurants', () => {
    let view;

    const renderTemplate = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    beforeEach(() => {
        renderTemplate();
    });

    describe('When no restourants have been liked', () => {
        it('should ask for the favorite resto', () => {
            const favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurant,
            });

            expect(favoriteRestaurant.getAllRestaurant).toHaveBeenCalledTimes(1);
        });

        it('should show the information that no resto have been liked', (done) => {
            document.getElementById('posts').addEventListener('posts:updated', () => {
                expect(document.querySelectorAll('.post-item__not__found').length)
                    .toEqual(1);

                done();
            });

            const favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
            favoriteRestaurant.getAllRestaurant.and.returnValues([]);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurant,
            });
        });
    });

    describe('When favorite resto exist', () => {
        it('should show the resto', (done) => {
            document.getElementById('posts').addEventListener('posts:updated', () => {
                expect(document.querySelectorAll('.post-item').length).toEqual(2);
                done();
            });

            const favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
            favoriteRestaurant.getAllRestaurant.and.returnValues([
                {
                    id: 11, title: 'A', vote_average: 3, overview: 'Sebuah resto A',
                },
                {
                    id: 22, title: 'B', vote_average: 4, overview: 'Sebuah resto B',
                },
            ]);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurant,
            });
        });
    });
});