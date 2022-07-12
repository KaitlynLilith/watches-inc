import View from "./View.js";

class ThumbnailView extends View {
  _parentEl = "";

  _generateMarkup() {
    return `
    <div class="product-box rel flexc">
        <div class="star-box rel ${
          this._data1.bookmarked ? "saved" : ""
        }" data-watch="${this._data1.id}">
          <i class="fa-solid fa-star stars"></i>
        </div>
        <a href=${this._data1.url} target="_self" class="rel"> 
          <div class="thumbnail-main rel">
            <img src=${this._data1.image.src} alt=${
      this._data1.image.alt
    } class="thumbnail-image-main rel" />
            <div class="product-details-main rel">
              <h2>${this._data1.name}</h2>
              <p>${this._data1.shortDesc}</p>
            </div>
          </div>
        </a>
      </div>
    `;
  }
}
export default new ThumbnailView();
