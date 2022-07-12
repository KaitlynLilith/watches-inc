import View from "./View.js";

class HeaderView extends View {
  _parentEl = document.querySelector("#hero");

  _generateMarkup() {
    return `
    <a
      href="${this._data2[0].url}">
      <div id="header-announcement" class="rel">${this._data1}</div>
    </a>
    `;
  }

  changeHeader(imgArr) {
    imgArr.forEach((el, i) => {
      setTimeout(() => {
        this._parentEl.firstElementChild.href = el.url;
        this._parentEl.style.backgroundImage = el.img;
      }, 30000);
    });
  }
}
export default new HeaderView();
