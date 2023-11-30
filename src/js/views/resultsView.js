import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2 import

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = '🤖: No recipes found for your query! Please try again 😉';
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    const recipeId = result.id;
    const recipeImageUrl = result.imageUrl;
    const recipeTitle = result.title;
    const recipePublisher = result.publisher;
    return `
    <li class="preview">
      <a class="preview__link ${
        recipeId === id ? 'preview__link--active' : ''
      }" href="#${recipeId}">
        <figure class="preview__fig">
            <img src="${recipeImageUrl}" alt="${recipeTitle}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${recipeTitle}</h4>
              <p class="preview__publisher">${recipePublisher}</p>
            <!--<div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>-->
        </div>
      </a>
    </li>
    `;
  }
}

export default new ResultsView();
