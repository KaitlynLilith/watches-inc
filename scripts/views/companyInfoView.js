import View from "./View.js";

class CompanyInfoView extends View {
  _parentEl = document.querySelector("#company-info-name-box");
  _errorMessage = "";
  _message = "";

  _generateMarkup() {
    return `
    <div id="company-info-insulation" class="rel flexc">
      <!-- Company name heading -->
      <h1 id="company-name" class="rel">${this._data1.heading}</h1>
      <!-- Holds company info -->
      <div id="company-info" class="rel">
        <!-- Company image -->
        <img
          src=${this._data1.image.src}
          alt=${this._data1.image.alt}
          id="company-info-img"
          class="rel"
        />
        <!-- Company info -->
        <p id="company-info-text" class="rel">
          ${this._data1.text}
        </p>
      </div>
    </div>
    `;
  }
}
export default new CompanyInfoView();
