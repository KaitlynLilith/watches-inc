import View from "./View.js";

class FooterView extends View {
  _parentEl = document.querySelector("#footer");

  _generateMarkup() {
    return `
    <div id="footer-insulation" class="grid-container rel">
    <!-- Holds the logo -->
    <div id="footer-logo-box" class="rel flexr fcenter">
      <img
        src="${this._data1.logo.src}"
        alt="${this._data1.logo.alt}"
        id="footer-logo-img"
        class="rel"
      />
    </div>
    <!-- Holds the company info -->
    <div id="footer-company-info-box" class="rel">
      <p id="address-street" class="rel">${
        this._data1.footer.address.street
      }</p>
    </div>
    <!-- Holds a list of site pages -->
    <div id="footer-list-pages" class="rel flexc footer-lists">
      <!-- Pages list header -->
      <p id="footer-pages-heading" class="footer-headings rel">Pages</p>
      ${this._data1.pages
        .map((page) => this._generateMarkupLinks(page))
        .join("")}
    </div>
    <!-- Holds a list of social pages -->
    <div id="footer-list-social" class="rel flexc footer-lists">
      <!-- Social list heading -->
      <p id="footer-social-heading" class="footer-headings rel">
        Social Media
      </p>
      ${this._data1.socialMedia
        .map((media) => this._generateMarkupSocialMedia(media))
        .join("")}
      
    </div>
    <!-- Copyright info -->
    <div id="copyright" class="rel">
    ${this._data1.footer.copyright}
    </div>
  </div>
    `;
  }

  _generateMarkupLinks(link) {
    return `
    <a
      href="${link.url}"
      class="rel alink footer-link word-link ${
        window.location.href.includes(link.url) ? "clicked" : ""
      }"
    >
    ${link.name}
    </a>
    `;
  }

  _generateMarkupSocialMedia(link) {
    return `
    <a
      href="${link.url}"
      id="twitter-footer-icon-link"
      class="rel alink"
      target="_blank"
    >
      <div
        id="twitter-footer-icon-box"
        class="footer-icon-box footer-link rel"
      >
        <i class="fa-brands ${link.iconClass}"></i>
        ${link.name}
      </div>
    </a>
    `;
  }
}
export default new FooterView();
