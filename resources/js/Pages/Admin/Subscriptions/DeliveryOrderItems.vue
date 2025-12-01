<script setup>

import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";

const props = defineProps({
  order: Object,
  title: String,
});

</script>

<template>

  <Col>
    <Col>
      <p class="text-base font-bold">{{ props.title }}</p>
    </Col>
    <Col gap="2">
      <template v-for="item in props.order.items">
        <v-card color="grey-lighten-3" rounded="lg">
          <div class="p-4">
            <Row :center="true" justify="start">
              <div class="shrink-0 w-[50px]">
                <v-img aspect-ratio="1" color="grey"
                       :src="item.thumbnail" cover class="rounded-circle"
                />
              </div>
              <div class="grow">
                <Row :center="true" justify="between">
                  <div>
                    <p class="font-bold">{{ item.product_name }}</p>
                    <p>{{ item.variation_name }}</p>
                  </div>
                  <div>
                    <p class="text-2xl">x{{ item.quantity }}</p>
                  </div>
                </Row>
              </div>
            </Row>
          </div>
        </v-card>
      </template>
    </Col>
  </Col>

</template>
