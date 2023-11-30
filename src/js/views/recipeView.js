import icons from 'url:../../img/icons.svg'; // Parcel 2 import
import { Fraction } from 'fractional';

class RecipeView {
  _parentElement = document.querySelector('.recipe');
  _data;

  _render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderSpinner() {
    const markup = `
     <div class="spinner">
       <svg>
         <use href="${icons}#icon-loader"></use>
       </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _renderMarkupForParentElement() {
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Publisher - Subscriber Design Patern: Publisher, the code that knows when to react
  addHandlerRender(handler) {
    // Taking the hash for id and then Listening for load event
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    const recipeImageUrl = this._data.imageUrl;
    const recipeTitle = this._data.title;
    const recipeCookingTime = this._data.cookingTime;
    const recipeServings = this._data.servings;
    const recipeIngredients = this._data.ingredients;
    const recipePublisher = this._data.publisher;
    const recipeSourceUrl = this._data.sourceUrl;
    return `
      <figure class="recipe__fig">
        <img src="${recipeImageUrl}" alt="${recipeTitle}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipeTitle}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipeCookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipeServings}</span>
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
          ${recipeIngredients.map(this._generateMarkupIngredients).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${recipePublisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipeSourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  _generateMarkupIngredients(ing) {
    const ingQuantity = ing.quantity;
    const ingUnit = ing.unit;
    const ingDescription = ing.description;
    return `
    <li class="recipe__ingredient">
     <svg class="recipe__icon">
       <use href="${icons}#icon-check"></use>
     </svg>
     <div class="recipe__quantity">${
       ingQuantity ? new Fraction(ingQuantity).toString() : ''
     }</div>
     <div class="recipe__description">
       <span class="recipe__unit">${ingUnit}</span>
       ${ingDescription}
     </div>
    </li>
   `;
  }
}

export default new RecipeView();
