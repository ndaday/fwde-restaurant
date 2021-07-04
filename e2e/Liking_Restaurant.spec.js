/* eslint-disable codeceptjs/no-pause-in-scenario */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable semi */
Feature('Liking Restaurant');

const assert = require('assert');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('like and unlike', async ({ I }) => {
    // liking
    I.seeElement('#query');
    I.see('Tidak ada restaurant untuk ditampilkan', '.post-item__not__found');

    I.amOnPage('/');

    I.seeElement('.restaurant__title a');

    const firstPost = locate('.restaurant__title a').first();
    const firstPostTitle = await I.grabTextFrom(firstPost);
    I.click(firstPostTitle)

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.post-item');
    const likedPostTitle = await I.grabTextFrom('.restaurant__title');

    assert.strictEqual(firstPostTitle, likedPostTitle);

    // unlike
    I.amOnPage('/#/favorite');
    I.seeElement('.restaurant__title a');

    const firstFav = locate('.restaurant__title a').first();
    const firstFavTitle = await I.grabTextFrom(firstFav);
    I.click(firstFavTitle)

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('#query');
    I.see('Tidak ada restaurant untuk ditampilkan', '.post-item__not__found');
});

Scenario('searching resto', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '.post-item__not__found');

    I.amOnPage('/');

    I.seeElement('.restaurant__title a');

    const titles = [];

    for (let i = 1; i <= 3; i++) {
        I.click(locate('.restaurant__title a').at(i));
        I.seeElement('#likeButton');
        I.click('#likeButton');
        titles.push(await I.grabTextFrom('.restaurant__title'));
        I.amOnPage('/');
    }

    I.amOnPage('/#/favorite');
    I.seeElement('#query');

    const searchQuery = titles[1].substring(1, 3);
    const matchingPosts = titles.filter((title) => title.indexOf(searchQuery) !== -1);

    I.fillField('#query', searchQuery);
    I.pressKey('Enter');

    const visibleLikedPosts = await I.grabNumberOfVisibleElements('.post-item');
    assert.strictEqual(matchingPosts.length, visibleLikedPosts);

    matchingPosts.forEach(async (title, index) => {
        const visibleTitle = await I.grabTextFrom(locate('.restaurant__title').at(index + 1));
        assert.strictEqual(title, visibleTitle);
    });
});