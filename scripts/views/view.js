export default class View {
  _data1;
  _data2;
  _overlay = document.querySelector("#overlay");

  render(data1, data2, render) {
    if (!data1) return this.renderError();

    this._data1 = data1;
    this._data2 = data2;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  updateStars(data1, data2, render) {
    this._data1 = data1;
    this._data2 = data2;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const curElements = Array.from(this._parentEl.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild.nodeValue.trim() !== ""
      ) {
        curEl.classList = newEl.classList;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
          `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  showContent() {
    this._parentEl.classList.add("show");
    this._overlay.classList.add("show");
  }

  hideContent() {
    this._parentEl.classList.remove("show");
    this._overlay.classList.remove("show");
  }

  addHandlerXbtn(handler) {
    this._parentEl.querySelector(".x-btn").addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.dataset.xbtn;
      handler(target);
    });
  }

  addHandlerLeftBtn() {
    this._parentEl
      .querySelector(".arrow-left")
      .addEventListener("click", (e) => {
        e.preventDefault();
        this._parentEl.querySelector(".slider").scrollLeft -= 125;
      });
  }

  addHandlerRightBtn() {
    this._parentEl
      .querySelector(".arrow-right")
      .addEventListener("click", (e) => {
        e.preventDefault();
        this._parentEl.querySelector(".slider").scrollLeft += 125;
      });
  }

  addHandlerStars(handler) {
    this._parentEl.querySelectorAll(".star-box").forEach((star) => {
      star.addEventListener("click", (e) => {
        e.preventDefault();
        handler(+e.target.closest(".star-box").dataset.watch);
      });
    });
  }
}
