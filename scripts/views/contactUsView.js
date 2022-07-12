import View from "./View.js";

class ContactUsView extends View {
  _parentEl = document.querySelector("#contact-box");
  _errorMessage = "";
  _message = "";

  _generateMarkup() {
    return `
    <div id="contact-insulation" class="rel flexc">
    <div id="contact-heading-box" class="rel">
      <h1 id="contact-heading" class="rel">Contact Us</h1>
    </div>
    <div id="call-email-signup-box" class="rel">
    ${this._generateMarkupCallList(this._data1[0])}
    ${this._generateMarkupEmailList(this._data1[1])}
    ${this._generateMarkupNotify(this._data1[2])}
    `;
  }

  _generateMarkupCallList(data) {
    let html = `
    <div id="call-box" class="rel info-box flexc">
    <div id="call-heading-box" class="rel heading-box">
      <h2 id="call-heading" class="rel heading">${data.title}</h2>
    </div>
    <div id="call-list-box" class="rel list-box flexc">
      <ul id="call-list" class="rel list fa-ul">
    `;

    for (let [index, obj] of Object.entries(data.info)) {
      for (let [key, value] of Object.entries(obj)) {
        if (key === "hours") {
          html += `<li class="info-list-li">
          <span class="fa-li">
            <i class="fa-solid fa-star"></i>
          </span>
          <div id="hours" class="rel flexr">
            <p class="info-list-text rel">
              <span class="capital"> 
              ${key} 
              </span>
              :
            </p>
            <ul id="hours-list" class="rel">
              ${this._displayHoursList(data.info[1].hours, data["time zone"])}
              </ul>
            </div>
          </li>`;
        } else {
          html += `
          <li class="info-list-li">
            <span class="fa-li">
              <i class="fa-solid fa-star"></i>
            </span>
            <p class="info-list-text rel">
              <span class="capital"> 
                ${key}  
              </span>
              : 
              ${value}
            </p>
          </li>`;
        }
      }
    }

    html += `                    
      </ul>
    </div>
  </div>`;

    return html;
  }

  _generateMarkupHoursList(data, time) {
    let html = ``;
    for (let [index, obj] of Object.entries(data)) {
      for (let [key, value] of Object.entries(obj)) {
        html += `                            <li class="hours-list-li">
        <p class="hours-list-text rel">
          <span class="capital"> ${key} </span>
          : ${value.open} - ${value.close} ${time}
        </p>
      </li>`;
      }
    }
    return html;
  }

  _generateMarkupEmailList(data) {
    let html = `                
    <div id="email-box" class="rel info-box">
      <div id="email-heading-box" class="rel heading-box">
        <h2 id="email-heading" class="rel heading">${data.title}</h2>
      </div>
      <div id="email-list-box" class="rel list flexc">
        <ul id="email-list" class="rel list fa-ul">`;

    for (let [index, obj] of Object.entries(data.info)) {
      for (let [key, value] of Object.entries(obj)) {
        html += `
        <li class="info-list-li">
          <span class="fa-li">
            <i class="fa-solid fa-star"></i>
          </span>
          <p class="info-list-text rel">
            <span class="capital">
            ${key}
            </span>:
            ${value}
          </p>
        </li>`;
      }
    }

    html += `                    
      </ul>
    </div>
  </div>`;

    return html;
  }

  _generateMarkupNotify(data) {
    let html = `                <div id="signup-box" class="rel info-box flexc">
    <div id="signup-box-heading-box" class="rel heading-box">
      <h2 id="signup-box-heading" class="rel heading">
      ${data.title}
      </h2>
    </div>
    <form
      id="signup-form" 
      class="rel flexc"
    >`;
    html += `${this._displayInputs(data.input)}`;

    html += `
    </form>
    <div id="thank-you-box" class="rel">
    ${data.info["thank-you"]}
    </div>
  </div>`;
    return html;
  }

  _generateMarkupInputs(data) {
    let html = `<input `;
    for (let [index, obj] of Object.entries(data)) {
      html += `<input `;
      for (let [key, value] of Object.entries(obj)) {
        if (key === "email") {
          html += `${key}="${value}"`;
          html += ``;
        } else {
          html += `${key}="${value}"`;
        }
      }
      html += ` />`;
    }
    return html;
  }

  getFormData() {
    const formData = [];
    data.push({
      name: this._parentEl.querySelector("#signup-name").value,
      email: this._parentEl.querySelector("#signup-email").value,
      phone: this._parentEl.querySelector("#signup-phone").value,
    });

    this._clearInput();
    return formData;
  }

  _clearInput() {
    this._parentEl.querySelector("#signup-name").value = "";
    this._parentEl.querySelector("#signup-email").value = "";
    this._parentEl.querySelector("#signup-phone").value = "";
  }

  addHandlerForm(handler) {
    this._parentEl
      .querySelector("#signup-submit")
      .addEventListener("click", (e) => {
        console.log(e);
        // Prevent reload
        e.preventDefault();
        // Send event to _questionClick method
        handler();
      });
  }
}
export default new ContactUsView();
