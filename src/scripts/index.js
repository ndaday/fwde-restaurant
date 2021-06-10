import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import { restaurants } from '../data/DATA.json';

const navslide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav_list');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    burger.classList.toggle('toggle');
  });
};

navslide();

let html = '';
restaurants.forEach((resto) => {
  html += `
        <article class="post-item">
          <img class="post-item_thumb"
            src="${resto.pictureId}"
            alt="${resto.city}" />
          <h1 class="post-item_city">${resto.city}</h1>
          <div class="post-item_content">
            <h3 class="post-item_rating">Rating: ${resto.rating}</h3>
            <h1 class="post-item_title"><a href="#">${resto.name}</a></h1>
            <p class="post-item_description">${resto.description}</p>
          </div>
        </article>
    `;
  document.getElementById('post').innerHTML = html;
});
