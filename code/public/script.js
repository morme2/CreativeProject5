var app = new Vue({
  el: '#app',
  data: {
    addedName: '',
    budget: 1000,
    expenses: [],
  },
  created() {
    this.expenses.push({
      eName: "Food",
      eMoney: 200,
    });
    this.expenses.push({
      eName: "Rent",
      eMoney: 400,
    });
  },
  computed: {
    remaining() {
      let remaining = this.budget;
      for (let e in this.expenses) {
        remaining -= this.expenses[e].eMoney;
      }
      return remaining;
    }
  },
  methods: {
    addExpense() {
      this.expenses.push({
        eName: "Expense",
        eMoney: 0,
      });
    },
    deleteItem(item) {
      var index = this.expenses.indexOf(item);
      if (index > -1)
        this.expenses.splice(index, 1);
    },
    async postInfo() {
      try {
        console.log("posting");
        let response = await axios.post("http://mattheworme.com:4205/budget", {
          name: this.addedName,
          budget: this.budget,
          items: this.expenses,
        });
        console.log("posted");
        window.alert("Your budget has been saved!");
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("http://mattheworme.com:4205/budget");
        console.log(response);
        for (let i in response.data) {
          if (response.data[i].name == this.addedName) {
            this.budget = response.data[i].budget;
            this.expenses = [];
            for (let j in response.data[i].items) {
              this.expenses.push({
                eName: response.data[i].items[j].eName,
                eMoney: response.data[i].items[j].eMoney,
              });
            }
          }
        }
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
  }
});
