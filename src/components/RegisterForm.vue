<template>
  <!-- Registration Form -->
  <div
    class="text-whit text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form
    :validation-schema="schema"
    @submit="register"
    :initial-values="initialUserData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-filed
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-filed
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-filed
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-filed name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          type="password"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="(error, i) in errors" :key="i">
          {{ error }}
        </div>
      </vee-filed>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-filed
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-filed
        name="country"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Palestine">Palestine</option>
        <option value="Egypt">Egypt</option>
        <option value="Syria">Syria</option>
        <option value="USA">USA</option>
      </vee-filed>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-filed
        name="tos"
        type="checkbox"
        value="1"
        class="block w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600 block" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      Register
    </button>
  </vee-form>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      schema: {
        name: { required: true, min: 4, max: 25, alpha_spaces: true },
        email: { required: true, min: 3, max: 100, email: true },
        age: { required: true, min_value: 12, max_value: 100 },
        password: { required: true, min: 8, max: 100, exculded: "password" },
        confirm_password: { passwords_mismatch: "@password" },
        country: { required: true, country_exculded: "USA" },
        tos: { tos: true },
      },
      initialUserData: {
        country: "Palestine",
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-blue-500",
      reg_alert_msg: "Please wait! Yout account is  being created.",
    };
  },
  methods: {
    register() {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = "bg-blue-500";
      this.reg_alert_msg = "Please wait! Yout account is  being created.";
      setTimeout(() => {
        this.reg_alert_variant = "bg-green-500";
        this.reg_alert_msg = "Success! Your account has been created.";
      }, 3000);
    },
  },
};
</script>

<style></style>
