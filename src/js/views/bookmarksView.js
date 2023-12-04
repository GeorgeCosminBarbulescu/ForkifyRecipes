import View from './View';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2 import

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = '🤖: No bookmarks yet. Find a nice recipe and bookmark it 😉';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
