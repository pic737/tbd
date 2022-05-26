(function () {
  ("use strict");

  let inpName = document.querySelector("#name");
  let inpGender = document.querySelector("#gender");
  let inpBD = document.querySelector("#bd");
  let addPerson = document.querySelector("#add");
  let table = document.querySelector("table");
  let inputDate = document.getElementById("date");
  let btnConfirmDate = document.getElementById("savedate");
  let selType = document.getElementById("type");

  btnConfirmDate.addEventListener("click", function () {
    inpBD.value =
      normalize(inputDate.dataset.date) +
      "." +
      normalize(+inputDate.dataset.month + 1) +
      "." +
      inputDate.dataset.year;
    function normalize(num) {
      if (+num < 10) {
        return "0" + String(num);
      } else {
        return num;
      }
    }
  });

  readDataBase();
  function readDataBase() {
    if (localStorage.getItem("databaseASD")) {
      let dbJson = JSON.parse(localStorage.getItem("databaseASD"));
      console.log(dbJson);
      for (let arr of dbJson) {
        createTab(arr);
      }
    }
  }

  function createDataBase(data) {
    if (!localStorage.getItem("databaseASD")) {
      let arr = [];
      arr.push(data);
      localStorage.setItem("databaseASD", JSON.stringify(arr));
    } else {
      let dbJson = JSON.parse(localStorage.getItem("databaseASD"));
      dbJson.push(data);
      localStorage.setItem("databaseASD", JSON.stringify(dbJson));
    }
  }

  function removeArrDB(name) {
    let dbJson = JSON.parse(localStorage.getItem("databaseASD"));
    for (let i = 0; i < dbJson.length; i++) {
      let arr = dbJson[i];
      if (name == arr[0]) {
        dbJson.splice(i, 1);
      }
      localStorage.setItem("databaseASD", JSON.stringify(dbJson));
    }
  }

  function addRemoveBtn(td, tr) {
    let btn = document.createElement("button");
    btn.innerHTML = "удалить";
    btn.classList.add("btn", "btn-outline-secondary", "btn-sm");
    btn.addEventListener("click", function (event) {
      tr.remove();
      event.preventDefault();
      removeArrDB(tr.children[0].innerHTML);
    });
    td.append(btn);
  }

  function variantPresent(td, arr) {
    let btn = document.createElement("button");
    btn.innerHTML = "посмотреть";
    btn.classList.add("btn", "btn-outline-secondary", "btn-sm");
    btn.dataset.bsToggle = "modal";
    btn.dataset.bsTarget = "#modalPresent";
    btn.addEventListener("click", function () {
      let list = document.getElementById("list");
      list.replaceChildren();
      for (let elm of listOfPresent(arr)) {
        let li = document.createElement("li");
        li.innerHTML = elm;
        list.append(li);
      }
    });
    td.append(btn);
  }

  addPerson.addEventListener("click", function func() {
    let data = [inpName.value, inpBD.value, inpGender.value, selType.value];
    console.log(data);
    if (
      inpName.value !== "" &&
      inpBD.value !== "дата рождения" &&
      inpGender.value !== "Пол" &&
      selType.value !== "выбрать"
    ) {
      createTab(data);
      createDataBase(data);
    }
    ``;
  });

  function createTab(data) {
    let normData = [data[0], data[1], age(data[1]), gender(data[2])];

    let tr = document.createElement("tr");
    if (diff(data[1]) <= 0 && diff(data[1]) >= -3) {
      tr.style.backgroundColor = "rgba(255, 0, 51, 0.1)";
      let audio = new Audio("./audio.mp3");
      audio.play();
    }
    for (let elem of normData) {
      let td = document.createElement("td");
      td.innerText = elem;
      tr.append(td);
    }
    let arrForPresent = [normData[2], data[2], data[3]];
    let tdVarPres = document.createElement("td");
    variantPresent(tdVarPres, arrForPresent);
    tr.appendChild(tdVarPres);
    table.appendChild(tr);

    let tdEdit = document.createElement("td");
    addRemoveBtn(tdEdit, tr);
    tr.appendChild(tdEdit);
    table.appendChild(tr);
  }

  function age(dateBirth) {
    let date = new Date(dateBirth.split(".").reverse());
    let now = new Date();
    let yearsOld = now.getFullYear() - date.getFullYear();
    if (diff(dateBirth) < 0) {
      yearsOld--;
    }
    return yearsOld;
  }

  function diff(dateBirth) {
    let date = new Date(dateBirth.split(".").reverse());
    let now = new Date();
    let birth = new Date(now.getFullYear(), date.getMonth(), date.getDate());
    let diff = ((now - birth) / (1000 * 60 * 60 * 24)).toFixed();
    return diff;
  }

  function gender(valueGen) {
    if (valueGen == "1") return "мужской";
    if (valueGen == "2") return "женский";
    if (valueGen == "Пол") return undefined;
  }
  function listOfPresent(arr) {
    let years = arr[0];
    let sex = +arr[1];
    let who = +arr[2];
    let infant = ["погремушки", "игровые коврики", "небольшие мягкие игрушки"];
    let childF = [
      "кукла",
      "красивые, яркие куклы и мягких игрушках для девочек",
      "игрушечный набор посуды",
      "мягкие и интерактивные игрушки",
      "детскую косметику, красивые наряды",
    ];
    let childM = [
      "самолетик",
      "машинка",
      "детский набор инструментов",
      "игрушечное оружие для мальчишек",
    ];
    let child = [
      "игрушки в виде животных",
      "конструктор",
      "головоломки",
      "набор настольных игр",
      "наборах для фокусов и опытов",
    ];
    let teenM = [
      "интересная литература по увлечениям подростка",
      "принадлежности и инвентарь для его хобби",
      "техника вроде мобильных телефонов, планшетов",
      "спортивный инвентарь",
    ];
    let teenF = [
      "билеты на концерт",
      "увлекательная поездка",
      "сувенирная продукция (кружки, подушки, именные блокноты и так далее)",
      "модная одежда",
      "различные активные развлечения и мастер — классы",
      "подарочные наборы и прочих сувениров",
    ];
    let spouseF = [
      "украшения",
      "модная одежда",
      "мягкие игрушки",
      "полезные подарки вроде курсов",
      "подарочные сертификаты",
      "бытовая техника",
      "путевка на заветный отдых",
      "красивое нижнее белье",
      "духи",
      "шкатулку с гравировкой",
      "фотосессия",
      "картина и другой предмет интерьера",
      "набор для ее хобби",
      "сладости",
      "авторский букет",
      "гаджет",
    ];
    let spouseM = [
      "органайзер",
      "	набор инструментов",
      "наборы для хобби, увлечений",
      "абонемент в спортзал",
      "стильная одежда и аксессуары",
      "запонки, ювелирные украшения",
      "подарочные наборы, сертификаты",
    ];
    let parent = [
      "путевки на отдых",
      "плед",
      "гаджет",
      "бытовая техника",
      "спортивный инвентарь",
      "картина и другой предмет интерьера",
      "родословную книгу",
      "оформленные красиво семейные фотографии",
    ];
    let friendM = [
      "билеты на спортивные мероприятия",
      "игрушки на радиоуправлении (да-да, вы не ослышались!)",
      "блокнот",
      "алкоголь",
      "брелки, аксессуары в машину",
      "оружие (не только сувенирное)",
      "любые другие вещи, которые можно коллекционировать, хранить",
    ];
    let friendF = [
      "ювелирные украшения",
      "авторские букеты",
      "цветочные композиции и флорариумы",
      "сладости",
      "гаджеты",
      "подарочные наборы",
      "декоративную косметику",
      "белье ручной работы",
      "витаминные комплексы",
      "органические косметические средства",
    ];
    let colligue = [
      "аксессуары в офис и для работы",
      "планер",
      "органайзер",
      "флешкa",
      "компьютерные мыши",
      "кружка",
      "сладости",
      "подарочные сертификаты",
    ];
    if (who == 5) {
      return colligue;
    }
    if (who == 2) {
      if (sex == 1) {
        return friendM;
      } else {
        return friendF;
      }
    }
    if (who == 3) {
      if (sex == 1) {
        return spouseM;
      } else {
        return spouseF;
      }
    }
    if (who == 4) {
      return parent;
    }
    if (years > 12 && years <= 19) {
      if (sex == 1) {
        return teenM;
      } else {
        return teenF;
      }
    }
    if (years > 3 && years <= 12) {
      if (sex == 1) {
        return childM.concat(child);
      } else {
        return childF.concat(child);
      }
    }

    if (years <= 3) {
      return infant;
    }
  }
})();
