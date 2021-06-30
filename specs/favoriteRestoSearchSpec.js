import FavoriteRestaurantSearchPresenter
    from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';
import FavoriteRestaurantSearchView
    from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-view';

describe('Searching restaurant', () => {
    let presenter;
    let favoriteRestaurant;
    let view;

    const searchRestaurant = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };

    const setRestaurantSearchContainer = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    const constructPresenter = () => {
        favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
        presenter = new FavoriteRestaurantSearchPresenter({
            favoriteRestaurant,
            view,
        });
    };

    beforeEach(() => {
        setRestaurantSearchContainer();
        constructPresenter();
    });

    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            searchRestaurant('restaurant a');

            expect(presenter.latestQuery).toEqual('restaurant a');
        });

        it('should ask the model to search for liked restaurant', () => {
            searchRestaurant('restaurant a');

            expect(favoriteRestaurant.searchRestaurant)
                .toHaveBeenCalledWith('restaurant a');
        });

        it('should show the found restaurant', () => {
            presenter._showFoundRestaurant([{ id: 1 }]);
            expect(document.querySelectorAll('.restaurant').length).toEqual(2);

            presenter._showFoundRestaurant([{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }]);
            expect(document.querySelectorAll('.restaurant').length).toEqual(3);
        });

        it('should show - when the restaurant returned does not contain a title', (done) => {
            document.getElementById('restaurant-search-container').addEventListener('restaurant:searched:updated', () => {
                const restaurantTitles = document.querySelectorAll('.restaurant__title');
                expect(restaurantTitles.item(0).textContent).toEqual('-');
                done();
            });
            favoriteRestaurant.searchRestaurant.withArgs('resto a').and.returnValues([
                { id: 444 },
            ]);

            searchRestaurant('resto a');
        });
    });

    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            searchRestaurant(' ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurant('    ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurant('');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurant('\t');
            expect(presenter.latestQuery.length).toEqual(0);
        });

        it('should show all favorite resto', () => {
            searchRestaurant('    ');
            expect(favoriteRestaurant.getAllRestaurant)
                .toHaveBeenCalled();
        });
    });

    describe('When no favorite resto could be found', () => {
        it('should show the empty message', (done) => {
            document.getElementById('restaurant-search-container')
                .addEventListener('restaurant:searched:updated', () => {
                    expect(document.querySelectorAll('.restaurant__not__found').length)
                        .toEqual(1);
                    done();
                });

            favoriteRestaurant.searchRestaurant.withArgs('resto a').and.returnValues([]);

            searchRestaurant('resto a');
        });

        it('should not show any restaurant', (done) => {
            document.getElementById('restaurant-search-container').addEventListener('restaurant:searched:updated', () => {
                expect(document.querySelectorAll('.restaurant').length).toEqual(1);
                done();
            });

            favoriteRestaurant.searchRestaurant.withArgs('resto a').and.returnValues([]);

            searchRestaurant('resto a');
        });
    });
});