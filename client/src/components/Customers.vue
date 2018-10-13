<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Customers</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm">Add customer</button>
        <br><br>
        <!-- Customer table-->
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Contacted?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!--Use v-for directive to render list of items in array, add key for tracking each node item identity-->
            <tr v-for="(customer, index) in customers" :key="index">
              <td>{{ customer.name }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
              <td>
                <!-- Use v-if and v-else directive for conditional rendering  -->
                <span v-if="customer.contacted">Yes</span>
                <span v-else>No</span>
              </td>
              <td>
                <button type="button" class="btn btn-warning btn-sm">Edit</button>
                <button type="button" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      customers: []
    };
  },
  methods: {
    getCustomers() {
      axios
        .get(
          "https://0zrpjen2ze.execute-api.us-west-2.amazonaws.com/dev/customers"
        )
        .then(res => {
          console.log(res.data.customers);
          this.customers = res.data.customers;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  created() {
    this.getCustomers();
  }
};
</script>
