<template>
  <div>
    <p id="subs" class="display-3">Zastępstwa</p>
    <div id="view" class="container-fluid"></div>
  </div>
</template>

<script>
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const processSubstitutions = (rows) => {
  let subs = {};

  let teacherRe = /(.*) \/ ([0-9]{1,2}.[0-9]{2}.[0-9]{4} .*)/;

  let parseDay = 0;

  let lastDate = "";
  let lastTeacher = "";

  for (const row of rows) {
    if (row.children[0].textContent.trim().startsWith("Zastępstwa")) {
      continue;
    }
    if (row.children.length === 1) {
      let matches = row.children[0].textContent.trim().match(teacherRe);
      lastDate = matches[2].replace(" ", " - ");
      if (!lastDate.startsWith(new Date().getDate().toString())) {
        if (
          parseInt(lastDate.substring(0, 2).replace(".", "")) >
          new Date().getDate()
        ) {
          if (
            parseDay === 0 ||
            parseDay === parseInt(lastDate.substring(0, 2).replace(".", ""))
          ) {
            parseDay = parseInt(lastDate.substring(0, 2).replace(".", ""));
          } else {
            break;
          }
        }
      }
      lastTeacher = matches[1];
      if (!Object.prototype.hasOwnProperty.call(subs, lastTeacher)) {
        subs[lastTeacher] = [];
      }
    }
    if (row.children.length === 4) {
      if (row.children[0].textContent.trim() === "") {
        //console.log("empty row");
        continue;
      }
      if (row.children[0].textContent.trim() === "lekcja") {
        //console.log("header row");
        continue;
      }
      subs[lastTeacher].push({
        lekcja: row.children[0].textContent.trim(),
        klasa: row.children[1].textContent.trim().split("-")[0],
        opis: row.children[1].textContent.trim().split("-")[1],
        zastepca: row.children[2].textContent.trim() || "-",
        uwagi: row.children[3].textContent.trim() || "-",
      });
    }
  }

  return subs;
};

export default {
  name: "Substitutions",
  data() {
    return {
      scrollDelay: undefined,
    };
  },
  mounted() {
    this.setTableView();
    fetch("http://zastepstwa.staff.edu.pl/", { mode: "no-cors" })
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        let decoder = new TextDecoder("iso-8859-2");
        let text = decoder.decode(buffer);

        let dom = new JSDOM(text);

        let rowItr = dom.window.document.getElementsByTagName("tbody").item(0)
          .children;

        let subs = processSubstitutions(rowItr);

        this.$store.commit("setSubstitutions", subs);

        this.setTableView();
      });

    setTimeout(() => {
      this.pageScroll();
    }, 5000);
  },
  methods: {
    pageScroll() {
      window.scrollBy(0, 1);
      this.scrollDelay = setTimeout(this.pageScroll, 15);
      if (
        window.innerHeight + window.pageYOffset - 25 >=
        document.body.offsetHeight
      ) {
        clearTimeout(this.scrollDelay);
        this.scrollDelay = setTimeout(this.pageUp, 2000);
      }
    },
    pageUp() {
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.pageScroll();
      }, 600);
    },
    setTableView() {
      let view = document.getElementById("view");
      while (view.firstChild) {
        view.removeChild(view.firstChild);
      }
      let data = this.$store.getters.getSubstitutions;

      Object.keys(data).forEach((key) => {
        // Create teacher div
        let tDiv = document.createElement("div");
        tDiv.classList.add("teacher-div");

        // Create teacher h3
        let h3 = document.createElement("h3");
        h3.textContent = key;

        // Create table
        let table = document.createElement("table");
        table.classList.add("table", "table-striped", "table-sm");

        // Create table header
        let thead = document.createElement("thead");
        let thr = document.createElement("tr");
        thr.classList.add("row");
        let thLekcja = document.createElement("th");
        thLekcja.textContent = "Lekcja";
        thLekcja.classList.add("col-1");
        let thKlasa = document.createElement("th");
        thKlasa.textContent = "Klasa";
        thKlasa.classList.add("col-1");
        let thOpis = document.createElement("th");
        thOpis.textContent = "Opis";
        thOpis.classList.add("col-6");
        let thZastepca = document.createElement("th");
        thZastepca.textContent = "Zastępca";
        thZastepca.classList.add("col-2");
        let thUwagi = document.createElement("th");
        thUwagi.textContent = "Uwagi";
        thUwagi.classList.add("col-2");
        thr.appendChild(thLekcja);
        thr.appendChild(thKlasa);
        thr.appendChild(thOpis);
        thr.appendChild(thZastepca);
        thr.appendChild(thUwagi);
        thead.appendChild(thr);
        table.appendChild(thead);

        // Create tbody
        let tbody = document.createElement("tbody");

        // Populate table body
        data[key].forEach((item) => {
          let tRow = document.createElement("tr");
          tRow.classList.add("row");
          let tdLekcja = document.createElement("td");
          tdLekcja.textContent = item.lekcja;
          tdLekcja.classList.add("col-1");
          let tdKlasa = document.createElement("td");
          tdKlasa.textContent = item.klasa;
          tdKlasa.classList.add("col-1");
          let tdOpis = document.createElement("td");
          tdOpis.textContent = item.opis;
          tdOpis.classList.add("col-6");
          let tdZastepca = document.createElement("td");
          tdZastepca.textContent = item.zastepca;
          tdZastepca.classList.add("col-2");
          let tdUwagi = document.createElement("td");
          tdUwagi.textContent = item.uwagi;
          tdUwagi.classList.add("col-2");

          tRow.appendChild(tdLekcja);
          tRow.appendChild(tdKlasa);
          tRow.appendChild(tdOpis);
          tRow.appendChild(tdZastepca);
          tRow.appendChild(tdUwagi);

          tbody.appendChild(tRow);
        });

        // Add stuff up
        table.appendChild(tbody);
        tDiv.appendChild(h3);
        tDiv.appendChild(table);
        view.appendChild(tDiv);
      });
    },
  },
};
</script>

<style lang="scss">
#subs {
  margin-top: 0.5em;
}

h3 {
  text-align: left;
}

#view {
  padding-bottom: 2em;
}

table {
  font-size: 1.15em;
}

div.teacher-div {
  margin: 1.5em 1em;
}

fieldset.day-border {
  border: 2px groove rgb(255, 255, 255) !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 1em 1.5em 1em !important;
  -webkit-box-shadow: 0px 0px 0px 0px #000;
  box-shadow: 0px 0px 0px 0px #000;
}

legend.day-border {
  font-size: 2em !important;
  text-align: left !important;
  width: inherit;
  padding: 0 10px;
  border-bottom: none;
}

@import "../../node_modules/bootstrap/scss/bootstrap";
@import "../../node_modules/bootstrap-vue/src/index.scss";
</style>
