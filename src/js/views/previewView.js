import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2 import

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    const recipeId = this._data.id;
    const recipeImageUrl = this._data.imageUrl;
    const recipeTitle = this._data.title;
    const recipePublisher = this._data.publisher;
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

export default new PreviewView();
