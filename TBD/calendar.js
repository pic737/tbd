"use strict";
(function () {
  let year = document.querySelector("#year");
  for (let i = 1900; i < 2100; i++) {
    let option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    year.appendChild(option);
  }

  let month = document.querySelector("#month");
  let arrMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  (function () {
    for (let i = 0; i < 12; i++) {
      let option = document.createElement("option");
      option.textContent = arrMonth[i];
      option.value = i;
      month.appendChild(option);
    }
  })();

  let table = document.querySelector("#table");
  (function () {
    for (let i = 0; i < 7; i++) {
      let tr = document.createElement("tr");
      for (let i = 0; i < 7; i++) {
        let td = document.createElement("td");
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  })();

  let inputDate = document.querySelector("#date");
  let arrWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"];
  let tds = document.querySelectorAll("#table td");
  for (let i = 0; i < 7; i++) {
    tds[i].innerHTML = arrWeekDays[i];
    tds[i].style.width = "40px";
  }

  for (let i = 0; i < 49; i += 7) {
    tds[i].style.color = "red";
  }

  //actual date selected
  year.selectedIndex = selectedYear();
  function selectedYear() {
    let actDate = new Date();
    return 122 + (actDate.getFullYear() - 2022);
  }

  month.selectedIndex = selectedMonth();
  function selectedMonth() {
    let actDate = new Date();
    return actDate.getMonth();
  }

  let yearSelected = year.selectedIndex + 1900;
  let monthSelected = +month.selectedIndex;
  getCalendar(yearSelected, monthSelected);

  year.addEventListener("change", function () {
    yearSelected = +this.value;
    getCalendar(yearSelected, monthSelected);
    inputDate.value = "";
  });

  month.addEventListener("change", function () {
    monthSelected = +this.value;
    getCalendar(yearSelected, monthSelected);
    inputDate.value = "";
  });

  function getCalendar(year, month) {
    let date = new Date(year, month, 1);
    let shiftDay = date.getDay() + 7;
    let b = check();
    let arrDays = [];

    for (let i = 1; i <= b; i++) {
      let a = i - 1;
      arrDays[a] = i;
    }
    cleanTable();
    inputDays();
    function check() {
      for (let i = 31; i >= 28; i--) {
        let days = new Date(year, month, i);
        if (days.getDate() == i) {
          return i;
        }
      }
    }
    function cleanTable() {
      for (let i = 7; i < 49; i++) {
        tds[i].innerHTML = "";
      }
    }

    function inputDays() {
      let k = 0;
      for (let i = shiftDay; i < arrDays.length + shiftDay; i++) {
        tds[i].innerHTML = arrDays[k];
        k++;
        tds[i].addEventListener("click", function () {
          inputDate.value =
            this.innerHTML + " " + arrMonth[monthSelected] + " " + yearSelected;
          inputDate.dataset.date = this.innerHTML;
          inputDate.dataset.month = monthSelected;
          inputDate.dataset.year = yearSelected;
        });
        tds[i].addEventListener("mouseover", function () {
          this.style.backgroundColor = "grey";
          tds[i].addEventListener("mouseout", function () {
            this.style.backgroundColor = "white";
          });
        });
      }
    }
  }
})();
