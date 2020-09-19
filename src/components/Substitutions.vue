<template>
  <div>
    <p id="subs">Zastępstwa</p>
    <div id="view"></div>
  </div>
</template>

<script>
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const processSubstitutions = (rows) => {
  let subs = {};

  let teacherRe = /(.*) \/ ([0-9]{1,2}.[0-9]{2}.[0-9]{4} .*)/;

  let lastDate = "";
  let lastTeacher = "";

  for (const row of rows) {
    if (row.children[0].textContent.trim().startsWith("Zastępstwa")) {
      continue;
    }
    if (row.children.length === 1) {
      let matches = row.children[0].textContent.trim().match(teacherRe);
      lastDate = matches[2].replace(" ", " - ");
      lastTeacher = matches[1];
      if (!Object.prototype.hasOwnProperty.call(subs, lastDate)) {
        subs[lastDate] = {};
      }
      subs[lastDate][lastTeacher] = [];
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
      subs[lastDate][lastTeacher].push({
        lekcja: row.children[0].textContent.trim(),
        opis: row.children[1].textContent.trim(),
        zastępca: row.children[2].textContent.trim() || "-",
        uwagi: row.children[3].textContent.trim() || "-",
      });
    }
  }

  return subs;
};

export default {
  name: "Substitutions",
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
  },
  methods: {
    test() {
      this.$store.commit("switchComponent", "Test");
    },
    setTableView() {
      let view = document.getElementById("view");
      while (view.firstChild) {
        view.removeChild(view.firstChild);
      }
      let data = this.$store.getters.getSubstitutions;

      Object.keys(data).forEach((key) => {
        let fieldset = document.createElement("fieldset");
        fieldset.classList.add("day-border");

        let legend = document.createElement("legend");
        legend.classList.add("day-border");
        legend.textContent = key;

        fieldset.appendChild(legend);
        view.appendChild(fieldset);
      });
    },
  },
};
</script>

<style lang="scss">
#subs {
  font-size: 3em;
  font-weight: bolder;
}

fieldset.day-border {
  border: 1px groove #ddd !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
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
