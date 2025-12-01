<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head} from "@inertiajs/vue3";
import Pagination from "@/Components/Pagination.vue";
const props = defineProps({
  payments: Object,
});


</script>

<template>
  <AdmLayout title="Payments">

    <v-table>
      <thead>
        <tr>
          <th>Order</th>
          <th>Amount</th>
          <th>Captured</th>
          <th>Card</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="payment in props.payments.data">
        <td>
          <p v-if="payment.orders.length" v-for="order in payment.orders">
            {{ order.number }}
          </p>
          <p v-else>-</p>
        </td>
        <td><p>{{ payment.amount_display }}</p></td>
        <td><p>{{ payment.amount_captured_display }}</p></td>
        <td><p>...{{ payment.card_last_4 }}</p></td>
      </tr>
      </tbody>
    </v-table>

    <div>
      <Pagination :entities="props.payments" />
    </div>

  </AdmLayout>
</template>