import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const paginationButton = e.target.closest('.btn--inline');
      if (!paginationButton) return;

      const goToPage = +paginationButton.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numberOfPages);

    const btnNextMarkup = `
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;

    const btnPrevMarkup = `
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>
    `;

    const btnCurrentMarkup = `
    <button class="btn--inline-current-page pagination__btn--prev">
        <use href="${icons}#icon-arrow-left"></use>
        <span>Page ${currentPage}</span>
    </button>
    `;

    // Page 1, and there are other pages
    if (currentPage === 1 && numberOfPages > 1) {
      // return `
      //   <button data-goto="${
      //     currentPage + 1
      //   }" class="btn--inline pagination__btn--next">
      //     <span>Page ${currentPage + 1}</span>
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-right"></use>
      //     </svg>
      //   </button>
      // `;

      return btnNextMarkup;
    }

    // Last page
    if (currentPage === numberOfPages && numberOfPages > 1) {
      // return `
      //   <button data-goto="${
      //     currentPage - 1
      //   }" class="btn--inline pagination__btn--prev">
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-left"></use>
      //     </svg>
      //     <span>Page ${currentPage - 1}</span>
      //   </button>
      // `;

      return btnPrevMarkup;
    }

    // Other pages
    if (currentPage < numberOfPages) {
      // return `
      //   <button data-goto="${
      //     currentPage - 1
      //   }" class="btn--inline pagination__btn--prev">
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-left"></use>
      //     </svg>
      //     <span>Page ${currentPage - 1}</span>
      //   </button>

      //   <button class="btn--inline-current-page pagination__btn--prev">
      //       <use href="${icons}#icon-arrow-left"></use>
      //     <span>Page ${currentPage}</span>
      //   </button>

      //   <button data-goto="${
      //     currentPage + 1
      //   }" class="btn--inline pagination__btn--next">
      //     <span>Page ${currentPage + 1}</span>
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-right"></use>
      //     </svg>
      //   </button>
      // `;

      return `${btnPrevMarkup}${btnCurrentMarkup}${btnNextMarkup}`;
    }

    // Page 1, and there are no other pages
    return '';
  }
}

export default new PaginationView();
