import icons from 'url:../../img/icons.svg'; // Parcel 2 import

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();

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

  renderErrorMessage(errMessage = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
            <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${errMessage}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccessMessage(suMessage = this._successMessage) {
    const markup = `
    <div class="message">
      <div>
        <svg>
            <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${suMessage}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
