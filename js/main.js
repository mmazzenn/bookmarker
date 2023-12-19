var siteName = document.getElementById("siteName"),
  siteUrl = document.getElementById("siteUrl"),
  tableData = document.getElementById("tableData"),
  nameField = document.querySelector(".check-name"),
  urlField = document.querySelector(".check-url"),
  sitesList = [],
  invalidName = `<span class="text-danger invalid-name">Minimum name length is 3 starts with letter</span>`,
  invalidUrl = `<span class="text-danger pt-1 invalid-url">Please enter url in format: (https://google.com) or (google.com)</span>`,
  invalidIcon = `<span class="invlaid-icon position-absolute text-danger"><i class="fa-solid fa-exclamation"></i></span>`,
  validIcon = `<span class="valid-icon position-absolute text-success"><i class="fa-solid fa-check"></i></span>`;

// Stop Form

document.forms[0].addEventListener("click", function (e) {
  e.preventDefault();
});

// Check For Local Storage

if (localStorage.getItem("sites")) {
  sitesList = JSON.parse(localStorage.getItem("sites"));
  display(sitesList);
}

// Add Site

document.getElementById("saveData").addEventListener("click", addSite);

function addSite() {
  var validNameInput = validateSiteName(siteName.value),
    validUrlInput = validateSiteUrl(siteUrl.value);

  if (validNameInput && validUrlInput) {
    console.log("here");
    var site = {
      id: sitesList.length,
      name: siteName.value,
      url: siteUrl.value,
    };
    sitesList.push(site);
    display(sitesList);

    localStorage.setItem("sites", JSON.stringify(sitesList));
  }
}

// Show Sites

function display(list) {
  var box = "";
  for (var i = 0; i < list.length; i++) {
    box += `<tr>
      <td>${i + 1}</td>
      <td>${list[i].name}</td>
      <td><button class="btn btn-success" id="visit" data-site="${i}"><i class="fa-solid fa-eye me-2"></i>Visit</button></td>
      <td><button class="btn btn-danger" id="delete" data-site="${i}"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
    </tr>`;
  }
  tableData.innerHTML = box;
}

// Check For Target Button

document.addEventListener("click", function (e) {
  if (
    e.target.getAttribute("id") === "visit" ||
    e.target.classList.contains("fa-eye")
  ) {
    visitSite(+e.target.getAttribute("data-site"));
  } else if (
    e.target.getAttribute("id") === "delete" ||
    e.target.classList.contains("fa-trash-can")
  ) {
    deleteSite(+e.target.getAttribute("data-site"));
  }
});

// Visit Site

function visitSite(currentIndex) {
  var link = "",
    targerUrl = sitesList[currentIndex].url;
  if (targerUrl.indexOf("www.") === -1) {
    link = `http://www.${targerUrl}`;
  } else {
    link = targerUrl;
  }
  window.open(link, "_blank");
}

// Delete Site

function deleteSite(currentIndex) {
  sitesList.splice(currentIndex, 1);
  localStorage.setItem("sites", JSON.stringify(sitesList));
  display(sitesList);
}

// Validation

function validateSiteName(text) {
  var regex = /^[A-Za-z][\w]{2,}$/gi;
  if (regex.test(text)) {
    if (nameField.classList.contains("not-valid")) {
      nameField.classList.remove("not-valid");
      nameField.innerHTML = "";
    }
    return true;
  } else {
    if (!nameField.classList.contains("not-valid")) {
      nameField.classList.add("not-valid");
      var box = "";
      box += invalidName;
      box += invalidIcon;
      nameField.innerHTML += box;
    }
  }
}

function validateSiteUrl(text) {
  var regex = /^((https|http):\/\/www\.|www\.)?\w+\.[A-Za-z]{2,5}\/?\w*$/gi;
  if (regex.test(text)) {
    if (urlField.classList.contains("not-valid")) {
      urlField.classList.remove("not-valid");
      urlField.innerHTML = "";
    }
    return true;
  } else {
    if (!urlField.classList.contains("not-valid")) {
      urlField.classList.add("not-valid");
      var box = "";
      box += invalidUrl;
      box += invalidIcon;
      urlField.innerHTML += box;
    }
  }
}

// On Input Actions

siteName.addEventListener("input", function () {
  var checkName = validateSiteName(this.value);
  if (checkName) {
    siteName.style.cssText =
      "box-shadow: 2px 2px 15px 2px rgb(25, 135, 84) !important;";
    nameField.innerHTML = validIcon;
  } else {
    if (nameField.children[0].classList.contains("valid-icon")) {
      nameField.children[0].remove();
    }
    siteName.style.cssText = "box-shadow: 1px 1px 15px 1px #dc3545 !important;";
  }
});

siteUrl.addEventListener("input", function () {
  checkUrl = validateSiteUrl(this.value);
  if (checkUrl) {
    siteUrl.style.cssText =
      "box-shadow: 2px 2px 15px 2px rgb(25, 135, 84) !important;";
    urlField.innerHTML = validIcon;
  } else {
    if (urlField.children[0].classList.contains("valid-icon")) {
      urlField.children[0].remove();
    }
    siteUrl.style.cssText = "box-shadow: 1px 1px 15px 1px #dc3545 !important;";
  }
});
