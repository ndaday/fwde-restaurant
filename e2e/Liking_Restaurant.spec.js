Feature('Liking Restaurant');

Scenario('test something', ({ I }) => {
    I.amOnPage('#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
    I.seeElement('#query');
    I.see('Tidak ada restaurant untuk ditampilkan', '.post-item');
});