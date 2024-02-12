import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable'; // For polyfilling everything else, for older version of internet browsers
import 'regenerator-runtime/runtime'; // For polyfilling async-await, for older version of internet

// if (module.hot) module.hot.accept();

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    // Guard clause
    if (!id) return;

    // Render spinner
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating the bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Render recipe
    recipeView.render(model.state.recipe);

    // OPTIONAL (if needed please remove points 3, 4 nd 5)
    // 3) Load search results
    await model.loadSearchResults('pizza');

    // 4) Render search results
    resultsView.render(model.getSearchResultsPage());

    // 5) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderErrorMessage();
  }
};

const controlSearchResults = async function () {
  try {
    // resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    // Guard clause
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render search results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW search results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderSuccessMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    /*
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
    */
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderErrorMessage(err.message);
  }
};

// Initiate handlers
const init = function () {
  // Publisher - Subscriber Design Patern: - "controlX" is the "Subscriber" and is the code that wants to react; - "addHandlerX" is the "Publisher" and this is the code that knows when to react
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearchResults(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
