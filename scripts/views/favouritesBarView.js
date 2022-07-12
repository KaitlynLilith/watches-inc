import View from "./view.js";
import thumbnailView from "./thumbnailView.js";

class FavouritesBarView extends View {
  _parentEl = document.querySelector("#favourites-bar-box");
  _errorMessage = "";
  _message = "";

  _generateMarkup() {
    return `
    <div id="favourites-bar-insulation" class="rel flexc">
      <!-- Holds the logo and X button -->
      <div id="favourites-logo-xbtn-box" class="rel flexr">
        <!-- Holds the logo -->
        <div id="favourites-logo-box" class="rel flexc fcenter">
          <!-- Logo -->
          <img
            src="images/gold-logo.png"
            alt="Company logo"
            id="favourites-logo"
            class="rel"
          />
        </div>
        <!-- Holds the X button -->
        <div id="favourites-xbtn-box" class="rel x-btn" data-xbtn="favourites">
          <!-- X button -->
          <i class="fa-solid fa-xmark" data-xbtn="favourites"></i>
        </div>
      </div>
      <!-- Holds the heading Favourites -->
      <div id="favourites-heading-box" class="rel">
        <h4 id="favourites-heading" class="rel">Favourites</h4>
      </div>
      <!-- Holds the favourites saved to internal memory -->
      <div id="favourites-box" class="rel flexr">
        <div id="favourites-holder-text" class="rel ${
          this._data1.length === 0 ? "show" : ""
        }">
          <p id="holder-text" class="rel">
            Click on a <i class="fa-solid fa-star nav-i-link"></i>to save
            a watch to your Favourites!
          </p>
        </div>
        <div id="favourites-watches" class="rel">
        <!--  -->
        ${this._data1
          .map((watch) => thumbnailView.render(watch, 0, false))
          .join("")}
        <!--  -->
        </div>
      </div>
    </div>
    `;
  }
}
export default new FavouritesBarView();
