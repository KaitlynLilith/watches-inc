import View from "./view.js";

class NavBarView extends View {
  _parentEl = document.querySelector("#nav-bar-box");

  _generateMarkup() {
    return `
    <div id="nav-bar-insulation" class="rel flexc">
      <!-- Holds the nav links -->
      <div id="nav-box" class="rel grid-container">
        <div id="nav-bar-menu-info-box" class="rel flexr">
          <!-- Holds the Menu buttons -->
          <div id="nav-bar-menu-box" class="rel flexr nav-link btn-nav" data-nav="menu">
            <!-- Holds the 3-line menu icon -->
            <div id="nav-bar-menu-bars-box" class="rel nav-small">
              <!-- 3-line menu icon -->
              <i class="fa-solid fa-bars nav-i-link nav"></i>
            </div>
            <!-- Holds the word Menu -->
            <!-- Disappears in the smallest screens -->
            <div id="nav-bar-menu-word-box" class="rel nav-medium nav">
              Menu
            </div>
          </div>
          <!-- Holds the info buttons -->
          <!-- Disappears in medium and small screens -->
          <div id="nav-bar-info-box" class="rel nav-large flexr nav-link">
            <!-- Products page link -->
            <a
              href="${this._data1[0].url}"
              id="nav-bar-watches-link"
              class="rel word-link nav  btn-nav"  data-nav="watches"
              >
              ${this._data1[0].name}
            </a>
            
          </div>
        </div>

        <!-- Holds the Logo with name -->
        <a href="index.html" class="rel alink  btn-nav"  data-nav="home">
          <div
            id="nav-bar-icon-name-box"
            class="rel nav-small nav-link flexr fcenter">
            <div id="nav-bar-kaitlyn" class="name nav">KAITLYN</div>
            <img
              src="images/gold-logo.png"
              alt="Company logo"
              id="nav-bar-logo"
             />
            <div id="nav-bar-lilith" class="name nav">LILITH</div>
          </div>
        </a>
        <!-- Holds the Search and Favourites buttons -->
        <div
          id="nav-bar-search-favourites-box"
          class="rel flexr nav-small">
          <!-- Holds the Search button and icon -->
          <div id="nav-bar-search-box" class="rel flexr nav-link btn-nav" data-nav="search">
            <!-- Holds the Search icon -->
            <div id="nav-bar-search-icon-box" class="rel nav-small">
              <!-- Search icon -->
              <i class="fa-solid fa-magnifying-glass nav-i-link nav"></i>
            </div>
            <!-- Holds the word Search -->
            <!-- Disappears in the smallest screens -->
            <div id="nav-bar-search-word-box" class="rel nav-medium nav">
              Search
            </div>
          </div>
          <!-- Holds the Favourites button and icon -->
          <div
            id="nav-bar-favourites-box"
            class="rel flexr nav-small nav-link btn-nav ${
              this._data2.length > 0 ? "full" : ""
            }" data-nav="favourites">
            <!-- Holds the Favourites icon -->
            <div id="nav-bar-favourites-icon-box" class="rel nav-small">
              <!-- Favourites icon -->
              <i class="fa-solid fa-star nav-i-link nav"></i>
            </div>
            <!-- Holds the word Favourites -->
            <!-- Disappears in the smallest screens -->
            <div      id="nav-bar-favourites-word-box" class="rel nav-medium nav">
              Favourites
            </div>
          </div>
        </div>
      </div>
      <!-- Holds the breadcrumbs -->
      <!-- Not functional yet -->
      <div id="nav-bar-breadcrumbs-box"></div>
    </div>
    `;

    // <!-- Where to buy link -->
    //         <a
    //         href="${this._data1[1].url}"
    //         id="nav-bar-where-link"
    //         class="rel word-link nav">
    //         ${this._data1[1].name}
    //         </a>
  }

  addHandlerNav(handler) {
    this._parentEl.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.closest(".btn-nav").dataset.nav;
      handler(target);
    });
  }
}
export default new NavBarView();
