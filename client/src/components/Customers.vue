<template>
  <div class="container-fluid">
    
    <div class="row">
      <div class="col-sm-10">
        <h1>Customers</h1>
        <hr>
        <button type="button" class="btn btn-info btn-sm" v-b-modal.customer-modal>Add customer</button>
        <br><br>
        <!-- Customer table-->
        <div class="table-responsive-sm">
        <table class="table table-hover">
          <thead class="thead-dark">
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
                <button type="button" class="btn btn-outline-info btn-sm " v-b-modal.customer-edit-modal @click="editCustomer(customer)"><i class="fa fa-edit"></i></button>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteCustomer(customer)"><i class="fa fa-trash"></i></button>
                
            
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        <!-- Alert component -->
        <alert :message=message v-if="showMessage"></alert>
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
      <b-button type="submit" variant="info">Submit</b-button>
      <b-button type="reset" variant="outline-danger">Reset</b-button>
    </b-form>
  </b-modal>

  <!-- Edit customer modal -->
  <b-modal ref="editCustomerModal" id="customer-edit-modal" title="Edit" hide-footer>
    <b-form @submit="onSubmitEdit" @reset="onResetEdit" class="w-100">
      <b-form-group id="form-name-edit-group" label="Name:" label-for="form-name-edit-input">
        <b-form-input id="form-name-edit-input" type="text" v-model="editForm.name" required placeholder="Enter name"></b-form-input>
      </b-form-group>
      <b-form-group id="form-email-edit-group" label="Email:" label-for="form-email-edit-input">
        <b-form-input id="form-email-edit-input" type="text" v-model="editForm.email" required placeholder="Enter email"></b-form-input>
      </b-form-group>
      <b-form-group id="form-phone-edit-group" label="Phone:" label-for="form-phone-edit-input">
        <b-form-input id="form-phone-edit-input" type="text" v-model="editForm.phone" required placeholder="Enter phone"></b-form-input>
      </b-form-group>
      <b-form-group id="form-contacted-edit-group">
        <b-form-checkbox-group id="form-checks" v-model="editForm.contacted">
          <b-form-checkbox value="true">Contacted?</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="info">Update</b-button>
      <b-button type="reset" variant="outline-danger">Cancel</b-button>
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
      editForm: {
        id: "",
        name: "",
        email: "",
        phone: "",
        read: []
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
    editCustomer(payload, customerID) {
      axios
        .put(
          `https://0zrpjen2ze.execute-api.us-west-2.amazonaws.com/dev/customers/${customerID}`,
          payload
        )
        .then(() => {
          this.getCustomers();
          this.message = "Customer updated!";
          this.showMessage = true;
        })
        .catch(error => {
          console.error(error);
          this.getCustomers();
        });
    },
    removeCustomer(customerID) {
      axios
        .delete(
          `https://0zrpjen2ze.execute-api.us-west-2.amazonaws.com/dev/customers/${customerID}`
        )
        .then(() => {
          this.getCustomers();
          this.message = "Customer removed!";
          this.showMessage = true;
        })
        .catch(error => {
          console.error(error);
          this.getCustomers();
        });
    },
    initForm() {
      this.addCustomerForm.name = "";
      this.addCustomerForm.email = "";
      this.addCustomerForm.phone = "";
      this.addCustomerForm.contacted = [];
      this.editForm.id = "";
      this.editForm.name = "";
      this.editForm.email = "";
      this.editForm.phone = "";
      this.editForm.contacted = [];
      this.editForm.id = "";
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
    onSubmitEdit(evt) {
      evt.preventDefault();
      this.$refs.editCustomerModal.hide();
      let contacted = false;
      if (this.editForm.contacted[0]) contacted = true;
      const payload = {
        name: this.editForm.name,
        email: this.editForm.email,
        phone: this.editForm.phone,
        contacted
      };
      this.editCustomer(payload, this.editForm.id);
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addCustomerModal.hide();
      this.initForm();
    },
    onResetEdit(evt) {
      evt.preventDefault();
      this.$refs.editCustomerModal.hide();
      this.initForm();
      this.getCustomers();
    },
    deleteCustomer(customer) {
      this.removeCustomer(customer.id);
    },
    editCustomer(customer) {
      this.editForm = customer;
    },
    created() {
      this.getCustomers();
    }
  },
  mounted() {
    axios
      .get(
        "https://0zrpjen2ze.execute-api.us-west-2.amazonaws.com/dev/customers"
      )
      .then(res => {
        this.customers = res.data.customers;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

<style>
.container {
  background: white;
  padding: 0px;
}
table {
  margin: 0 auto;
}
h1 {
  font-weight: 200;
}
#add-customer {
  background: black;
}
.icon {
  width: 2em;
  height: 2em;
}
</style>
