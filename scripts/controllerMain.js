import * as model from "./model.js";
import View from "./views/view.js";

import companyInfoView from "./views/companyInfoView.js";
import favouritesBarView from "./views/favouritesBarView.js";
import footerView from "./views/footerView.js";
import mainCarouselView from "./views/mainCarouselView.js";
import headerView from "./views/headerView.js";
import menuView from "./views/menuView.js";
import navBarView from "./views/navBarView.js";
import retailersView from "./views/retailersView.js";
import searchBarView from "./views/searchBarView.js";
import shareView from "./views/shareView.js";

async function init() {
  try {
    await model.loadPageInfo();
    headerView.render(
      model.state.pageInfo.mainHeader,
      model.state.pageInfo.headerImgs,
      true
    );
    headerView.changeHeader(model.state.pageInfo.headerImgs, true);

    await model.loadLocalStorage();
    navBarView.render(
      model.state.pageInfo.navPages,
      model.state.bookmarks,
      true
    );
    favouritesBarView.render(model.state.bookmarks, 0, true);

    await model.loadPromoted();
    mainCarouselView.render(model.state.promoted, 0, true);
    menuView.render(model.state.promoted, model.state.pageInfo, true);
    searchBarView.render("nothing", 0, true);

    await model.loadRetailers();
    retailersView.render(model.state.retailers, 0, true);

    shareView.render(model.state.pageInfo.socialMedia, 0, true);
    companyInfoView.render(model.state.pageInfo.companyInfo, 0, true);
    footerView.render(model.state.pageInfo, 0, true);

    controlEventHandlers();

    searchBarView.addHandlerSearch(controlSearch);
    searchBarView.addHandlerXbtn(controlHideContent);
  } catch (err) {
    throw err;
  }
}
init();

function controlEventHandlers() {
  navBarView.addHandlerNav(controlNavClicks);
  mainCarouselView.playCarousel();
  favouritesBarView.addHandlerXbtn(controlHideContent);
  menuView.addHandlerXbtn(controlHideContent);
  menuView.addHandlerLeftBtn();
  menuView.addHandlerRightBtn();
  mainCarouselView.addHandlerLeftBtn();
  mainCarouselView.addHandlerRightBtn();
  favouritesBarView.addHandlerStars(controlBookmarks);
  mainCarouselView.addHandlerStars(controlBookmarks);
  menuView.addHandlerStars(controlBookmarks);
}

function controlNavClicks(btn) {
  if (btn === "menu") {
    menuView.showContent();
  }
  if (btn === "search") {
    searchBarView.showContent();
  }
  if (btn === "favourites") {
    favouritesBarView.showContent();
  }
  if (btn === "watches") {
    window.location.href = "products.html";
  }
  if (btn === "home") {
    window.location.href = "index.html";
  }
}

function controlHideContent(btn) {
  if (btn === "menu") {
    menuView.hideContent();
  }
  if (btn === "search") {
    searchBarView.hideContent();
  }
  if (btn === "favourites") {
    favouritesBarView.hideContent();
  }
}

async function controlSearch() {
  try {
    const query = searchBarView.getQuery();
    console.log(query);
    if (!query) return;
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
    // window.location.href = "search.html";
  } catch (err) {
    searchBarView.renderError();
  }
}

async function controlBookmarks(id) {
  if (!id) return;
  if (model.state.bookmarks.some((bookmark) => bookmark.id === id)) {
    await model.removeBookmark(id);
  } else {
    await model.addBookmark(id);
  }
  navBarView.updateStars(
    model.state.pageInfo.navPages,
    model.state.bookmarks,
    true
  );
  mainCarouselView.updateStars(model.state.promoted, 0, true);
  menuView.updateStars(model.state.promoted, model.state.pageInfo, true);
  favouritesBarView.render(model.state.bookmarks, 0, true);

  controlEventHandlers();
}
