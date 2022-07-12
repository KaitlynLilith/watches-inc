import View from "./View.js";

class FAQsView extends View {
  _parentEl = document.querySelector("#faqs-box");
  _errorMessage = "";
  _message = "";

  _generateMarkup() {
    return `
    <div id="faqs-insulation" class="rel flexc fcenter">
      <div id="faqs-heading-box" class="rel">
        <h1 id="faqs-heading" class="rel">
          <span class="bold">F</span>requently
          <span class="bold">A</span>sked
          <span class="bold">Q</span>uestions
        </h1>
      </div>
      <div id="faqs-holder" class="rel flexc">
        ${this._data
          .map((item, index) => {
            this._generateMarkupFaqs(item, index);
          })
          .join("")}
      </div>
    </div>
    `;
  }

  _generateMarkupFaqs(item, index) {
    return `
    <div class="rel faqs flexc">
      <div data-faqs="${index + 1}" class="question-box rel flexr">
        <h2 class="rel question">${item.question}</h2>
        <div class="rel arrow-box">
          <img src="images/angleUp.png" alt="arrow" id="arrow-${
            index + 1
          }" class="arrow target"></img>
        </div>
      </div>
      <div id="answer-${index + 1}" class="rel answer-box target">
        <p class="rel answer">${item.answer}</p>
      </div>
    </div>
    `;
  }

  setBackgroundColor() {
    this._parentEl.querySelectorAll(".question-box").forEach((element) => {
      const elementData = +element.dataset.faqs;
      if (elementData % 2 !== 0) {
        element.closest(".faqs").classList.add("odd");
      }
    });
  }

  addHandlerFaq() {
    this._parentEl.querySelectorAll(".question-box").forEach((question) => {
      question.addEventListener("click", (e) => {
        // Prevent reload
        e.preventDefault();
        // Stop other event triggers for the same click
        e.stopImmediatePropagation();
        // Send event to _questionClick method
        this._questionClick(e);
      });
    });
  }

  _questionClick(e) {
    const clickedQuestion = e.target.closest(".question-box").dataset.faqs;
    if (
      this._parentEl
        .querySelector(`#answer-${clickedQuestion}`)
        .classList.contains("show")
    ) {
      this._parentEl.querySelectorAll(".target").forEach((element) => {
        element.classList.remove("show");
      });
    } else {
      this._parentEl.querySelectorAll(".target").forEach((element) => {
        element.classList.remove("show");
      });
      this._parentEl
        .querySelector(`#answer-${clickedQuestion}`)
        .classList.add("show");
      this._parentEl
        .querySelector(`#arrow-${clickedQuestion}`)
        .classList.add("show");
    }
    e.target.closest(".question-box").scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}
export default new FAQsView();
