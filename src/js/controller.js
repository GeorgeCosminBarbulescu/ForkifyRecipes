import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // For polyfilling everything else, for older version of internet browsers
import 'regenerator-runtime/runtime'; // For polyfilling async-await, for older version of internet

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    // Guard clause
    if (!id) return;

    // Render spinner
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Render recipe
    recipeView._render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

// Initiate handlers
const init = function () {
  // Publisher - Subscriber Design Patern: Subscriber, the code that wants when to react
  recipeView.addHandlerRender(controlRecipe);
};
init();
