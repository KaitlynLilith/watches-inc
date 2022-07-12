import View from "./view.js";
import thumbnailView from "./thumbnailView.js";

class MainCarouselView extends View {
  #maxScrollLeftMain;
  #sliderMain;
  #playMain;
  _parentEl = document.querySelector("#product-carousel-box");
  _errorMessage = "";
  _message = "";

  _generateMarkup() {
    return `
    <div id="product-carousel-insulation" class="rel flexr">
      <div class="slider-container-main flexr rel">
        <div class="arrow-main arrow-left rel" id="slide-left-main">
          <i class="fa-solid fa-chevron-left"></i>
        </div>
        <div id="slider-main" class="container-main slider rel">
        <!--  -->
        ${this._data1
          .map((watch) => thumbnailView.render(watch, 0, false))
          .join("")}
        <!--  -->
        </div>
        <div class="arrow-main arrow-right" id="slide-right-main">
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </div>
    `;
  }

  playCarousel() {
    this.#sliderMain = document.querySelector("#slider-main");
    this.#maxScrollLeftMain =
      this.#sliderMain.scrollWidth - this.#sliderMain.clientWidth;
    this.#playMain = setInterval(this._autoPlayMain.bind(this), 50);
    this.#sliderMain.addEventListener(
      "mouseover",
      this._clearAutoPlay.bind(this)
    );
    this.#sliderMain.addEventListener(
      "mouseout",
      this._startAutoPlay.bind(this)
    );
  }

  _startAutoPlay() {
    const autoPlayMain = this._autoPlayMain;
    this.#playMain = setInterval(autoPlayMain.bind(this), 50);
  }

  _autoPlayMain() {
    if (this.#sliderMain.scrollLeft > this.#maxScrollLeftMain - 1) {
      this.#sliderMain.scrollLeft -= this.#maxScrollLeftMain;
    } else {
      this.#sliderMain.scrollLeft += 1;
    }
  }

  _clearAutoPlay() {
    const playMain = this.#playMain;
    clearInterval(playMain);
  }
}
export default new MainCarouselView();
