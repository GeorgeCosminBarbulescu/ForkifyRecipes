import icons from 'url:../img/icons.svg'; // Parcel 2 import
import { Fraction } from 'fractional';

import 'core-js/stable'; // For polyfilling everything else, for older version of internet browsers
import 'regenerator-runtime/runtime'; // For polyfilling async-await, for older version of internet

const recipeContainer = document.querySelector('.recipe');

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    // 1) Loading recipe
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    console.log(res, data);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let { recipe } = data.data;
    recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    console.log(recipe);

    // 2) Render recipe
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.imageUrl}" alt="${
      recipe.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <!--<svg>
            <use href="${icons}#icon-user"></use>
          </svg>-->
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map(function (ing) {
              return `
             <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ing.quantity ? new Fraction(ing.quantity).toString() : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
             </li>
            `;
            })
            .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    console.error(err);
  }
};
controlRecipe();

// Taking the hash for id and then Listening for load event
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);
