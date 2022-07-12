import View from "./View.js";

class RetailersView extends View {
  _parentEl = document.querySelector("#where-to-buy-box");
  _errorMessage = "";
  _message = "";

  _generateMarkup() {
    return `
    <div id="where-to-buy-insulation" class="rel flexc">
      <!-- Where to Buy heading -->
      <h2 id="where-to-buy-text" class="rel">
        Look for Our Watches at These Retailers!
      </h2>
      <!-- Where to Buy store list -->
      <!-- Holds links and icons for stores that sell our products -->
      <div id="where-to-buy-stores" class="rel flexr">
      ${this._data1.map((store) => this._generateMarkupStores(store)).join("")}
      </div>
    </div>
    `;
  }

  _generateMarkupStores(store) {
    return `
    <a href="${store.links.main}" class="store-link" target="_self"> 
      <div class="store-thumbnail">
        ${store.storeLogo}
        <p class="store-name">
          ${store.storeName}
        </p>
      </div>
    </a>
    `;
  }
}
export default new RetailersView();
