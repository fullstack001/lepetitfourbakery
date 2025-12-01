<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head} from "@inertiajs/vue3";
import WrapperFull from "@/Components/WrapperFull.vue";
import Wrapper from "@/Components/Wrapper.vue";
import Header from "@/Components/Header.vue";
import Col from "@/Components/Col.vue";

const props = defineProps({
  categories: Object,
});

defineOptions({ layout: AppLayout });

</script>

<template>

  <Head title="Privacy Policy"></Head>

  <WrapperFull wrapper="section">
    <Wrapper wrapper="section" maxWidth="max-w-4xl">

      <div class="pt-10">
        <div>
          <div>
            <div>
              <Header>Privacy policy</Header>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div class="block">
            <div>
              <template v-for="category in props.categories">
                <div>
                  <Col gap="4">
                    <h2 class="text-2xl mt-10">{{ category.position }}. {{ category.title }}</h2>
                    <template v-for="paragraph in category.paragraphs">
                      <v-card color="grey-lighten-4" rounded="lg">
                        <div class="p-4">
                          <p class="text-lg">{{ category.position }}.{{ paragraph.position }}. {{ paragraph.title }}</p>
                          <p v-html="paragraph.content_formatted" />
                        </div>
                      </v-card>
                    </template>
                  </Col>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  </WrapperFull>



</template>
