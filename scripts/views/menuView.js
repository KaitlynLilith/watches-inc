import View from "./view.js";
import thumbnailView from "./thumbnailView.js";

class MenuView extends View {
  _parentEl = document.querySelector("#side-menu-box");
  _errorMessage = "";
  _message = "";

  _generateMarkup() {
    return `
    <!-- Insulates the contents -->
      <div id="side-menu-insulation" class="rel flexc">
        <!-- Holds the X button and logo -->
        <div id="side-menu-xbtn-logo-box" class="rel flexr">
          <!-- Holds the X button -->
          <div id="side-menu-xbtn-box" class="rel x-btn" data-xbtn="menu">
            <!-- X button -->
            <i class="fa-solid fa-xmark" data-xbtn="menu"></i>
          </div>
          <!-- Holds the logo -->
          <div id="side-menu-logo-box" class="rel flexc fcenter">
            <!-- Logo -->
            <img
              src="${this._data2.logo.src}"
              alt="${this._data2.logo.alt}"
              id="side-menu-logo"
              class="rel"
            />
          </div>
        </div>
        <!-- Holds the products and slider function -->
        <div id="side-menu-product-slider-box" class="rel flexc">
          <div class="slider-container">
            <div class="arrow arrow-left" id="side-menu-slide-left">
              <i class="fa-solid fa-chevron-left"></i>
            </div>
            <div id="side-menu-slider" class="container slider">
              <!--  -->
              ${this._data1
                .map((watch) => thumbnailView.render(watch, 0, false))
                .join("")}
              <!--  -->
            </div>
            <div class="arrow arrow-right" id="side-menu-slide-right">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>
        <!-- Holds the page links -->
        <div id="side-menu-pages-links" class="rel flexc">
          <!--  -->
          ${this._data2.pages
            .map((page) => this._generateMarkupLinks(page))
            .join("")}
          <!--  -->
        </div>
      </div>
    `;
  }

  _generateMarkupLinks(link) {
    return `
    <a
      href="${link.url}"
      class="rel alink side-link word-link ${
        window.location.href.includes(link.url) ? "clicked" : ""
      }"
    >
    ${link.name}
    </a>
    `;
  }
}
export default new MenuView();
