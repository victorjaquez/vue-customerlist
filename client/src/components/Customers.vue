<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Customers</h1>
        <hr><br><br>
        <!-- Alert component -->
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.customer-modal>Add customer</button>
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
  <!-- Add customer modal -->
  <!-- Use v-model directive for 2-way binding on elements -->
    <b-modal ref="addCustomerModal" id="customer-modal" title="Add a new customer" hide-footer>
    <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-name-group" label="Name:" label-for="form-name-input">
        <b-form-input id="form-name-input" type="text" v-model="addCustomerForm.name" required placeholder="Enter customer name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-email-group" label="Email:" label-for="form-email-input">
        <b-form-input id="form-email-input" type="text" v-model="addCustomerForm.email" required placeholder="Enter customer email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-phone-group" label="Phone:" label-for="form-phone-input">
        <b-form-input id="form-phone-input" type="text" v-model="addCustomerForm.phone" required placeholder="Enter customer phone">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-contacted-group">
        <b-form-checkbox-group v-model="addCustomerForm.contacted" id="form-checks">
          <b-form-checkbox value="true">Contacted?</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import Alert from "./Alert";

export default {
  data() {
    return {
      customers: [],
      addCustomerForm: {
        name: "",
        email: "",
        phone: "",
        contacted: []
      },
      message: "",
      showMessage: false
    };
  },
  components: {
    alert: Alert
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
    },
    addCustomer(payload) {
      axios
        .post(
          "https://0zrpjen2ze.execute-api.us-west-2.amazonaws.com/dev/customers",
          payload
        )
        .then(() => {
          this.getCustomers();
          this.message = "Customer added!";
          this.showMessage = true;
        })
        .catch(error => {
          console.log(error);
          this.getCustomers();
        });
    },
    initForm() {
      this.addCustomerForm.name = "";
      this.addCustomerForm.email = "";
      this.addCustomerForm.phone = "";
      this.addCustomerForm.contacted = [];
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addCustomerModal.hide();
      let contacted = false;
      if (this.addCustomerForm.contacted[0]) contacted = true;
      const payload = {
        name: this.addCustomerForm.name,
        email: this.addCustomerForm.email,
        phone: this.addCustomerForm.phone,
        contacted
      };
      this.addCustomer(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addCustomerModal.hide();
      this.initForm();
    },
    created() {
      this.getCustomers();
    }
  }
};
</script>
