import View from "./View.js";

class ShareView extends View {
  _parentEl = document.querySelector("#share-this-page-box");

  _generateMarkup() {
    return `
    <div id="share-this-page-insulation" class="rel flexc fcenter">
      <!-- Share this page heading -->
      <h3 id="share-this-page-text" class="rel">Share This Page</h3>
      <!-- Holds the Share this page links and icons -->
      <div id="share-page-icons-box" class="rel flexr">

      ${this._data1
        .map((link) => this._generateMarkupShareIcons(link))
        .join("")}

      </div>
    </div>
    `;
  }

  _generateMarkupShareIcons(link) {
    return `
    <a
      href="${link.shareLink}"
      class="rel share-link"
      target="_blank">
      <div class="share-icon-box rel">
        <i class="fa-brands ${link.iconClass}"></i>
      </div>
    </a>
    `;
  }
}
export default new ShareView();
