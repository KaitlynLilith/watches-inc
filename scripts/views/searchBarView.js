import View from "./view.js";

class SearchBarView extends View {
  _parentEl = document.querySelector("#search-bar-box");
  _errorMessage = "";
  _message = "";

  _generateMarkup() {
    return `
    <div id="search-bar-insulation" class="rel flexc">
    <!-- Holds the logo and X button -->
    <div id="search-bar-logo-xbtn-box" class="rel flexr">
      <!-- Holds the logo -->
      <div id="search-bar-logo-box" class="rel flexc">
        <!-- Logo -->
        <img
          src="images/gold-logo.png"
          alt="Company logo"
          id="search-bar-logo"
          class="rel"
        />
      </div>
      <!-- Holds the X button  -->
      <div id="search-bar-xbtn-box" class="rel x-btn" data-xbtn="search">
        <i class="fa-solid fa-xmark" data-xbtn="search"></i>
      </div>
    </div>
    <!-- Holds the Search heading -->
    <div id="search-bar-heading-box" class="rel">
      <h4 id="search-bar-heading" class="rel">Search Our Website</h4>
    </div>
    <!-- Holds the bar form -->
    <div id="search-bar-form-box" class="rel flexr fcenter">
      <form action="" id="searchform" class="rel flexr fcenter">
        <!-- Holds the Search input and buttons -->
        <div id="inputtext" class="flexr fcenter rel">
          <!-- Search input -->
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
          />
          <!-- Holds the Search arrow button -->
          <div id="search-arrow-btn" class="rel">
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </form>
    </div>
  </div>
    `;
  }

  getQuery() {
    const query = this._parentEl.querySelector("#search").value;
    console.log(query);
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector("#search").value = "";
  }

  addHandlerSearch(handler) {
    this._parentEl
      .querySelector("#search-arrow-btn")
      .addEventListener("click", (e) => {
        e.preventDefault();
        handler();
      });
  }
}
export default new SearchBarView();
