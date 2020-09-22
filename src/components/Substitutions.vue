<template>
  <div>
    <p id="subs" class="display-3">Zastępstwa</p>
    <div id="view" class="container-fluid"></div>
  </div>
</template>

<script>
  //import fetch from "node-fetch";
  import api from '@/api';

export default {
  name: "Substitutions",
  data() {
    return {
      scrollDelay: undefined,
    };
  },
  async mounted() {
    this.setTableView();

      const r = await api('get', '/substitutions/classes');

      console.log(r);
      this.$store.commit("setSubstitutions", r);
      this.setTableView();

    if (this.$store.getters.getSubstitutionsScrolling === false) {
      this.$store.commit("setSubstitutionsScrolling", true);
      setTimeout(() => {
        this.pageScroll();
      }, 5000);
    }
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
      if (this.$store.getters.getSubstitutions == undefined) return;

      let view = document.getElementById("view");
      while (view.firstChild) {
        view.removeChild(view.firstChild);
      }

      let key = Object.keys(this.$store.getters.getSubstitutions)[0];

      let data = this.$store.getters.getSubstitutions[key];

      Object.keys(data).forEach((key) => {
        // Create class div
        let cDiv = document.createElement("div");
        cDiv.classList.add("class-div");

        // Create class h3
        let h3 = document.createElement("h3");
        h3.textContent = key;

        // Create table
        let table = document.createElement("table");
        table.classList.add("table", "table-striped", "table-sm");
        table.cellSpacing = 0;
        table.cellPadding = 0;

        // Create table header
        let thead = document.createElement("thead");
        let thr = document.createElement("tr");
        thr.classList.add("row");
        let thLekcja = document.createElement("th");
        thLekcja.textContent = "Lekcja";
        thLekcja.classList.add("col-1");
        let thOpis = document.createElement("th");
        thOpis.textContent = "Opis";
        thOpis.classList.add("col-7");
        let thZastepca = document.createElement("th");
        thZastepca.textContent = "Zastępca";
        thZastepca.classList.add("col-2");
        let thUwagi = document.createElement("th");
        thUwagi.textContent = "Uwagi";
        thUwagi.classList.add("col-2");

        thr.appendChild(thLekcja);
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
          tdLekcja.textContent = item.number;
          tdLekcja.classList.add("col-1");
          let tdOpis = document.createElement("td");
          tdOpis.textContent = item.description;
          tdOpis.classList.add("col-7");
          let tdZastepca = document.createElement("td");
          tdZastepca.textContent = item.substitute || "-";
          tdZastepca.classList.add("col-2");
          let tdUwagi = document.createElement("td");
          tdUwagi.textContent = item.comment || "-";
          tdUwagi.classList.add("col-2");

          tRow.appendChild(tdLekcja);
          tRow.appendChild(tdOpis);
          tRow.appendChild(tdZastepca);
          tRow.appendChild(tdUwagi);

          tbody.appendChild(tRow);
        });

        // Add stuff up
        table.appendChild(tbody);
        cDiv.appendChild(h3);
        cDiv.appendChild(table);
        view.appendChild(cDiv);
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
  border-collapse: collapse;
  width: 100%;
}

div.class-div {
  margin: 1.5em 1em;
}

th, td {
  padding: 8px;
}
table, thead, tbody, tr, td {
    border: none !important;
}


@import "../../node_modules/bootstrap/scss/bootstrap";
@import "../../node_modules/bootstrap-vue/src/index.scss";
</style>
