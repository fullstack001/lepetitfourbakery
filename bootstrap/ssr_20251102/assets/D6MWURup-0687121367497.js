import { ref, reactive, computed, watch, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, unref, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, nextTick, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { A as AdmLayout } from "./BZf0ki2W-7956103712867.js";
import { useForm, router } from "@inertiajs/vue3";
import { _ as _sfc_main$8 } from "./koZmu1d6-1739686778130.js";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./Cyl_ukyB-5873697610160.js";
import { _ as _sfc_main$7 } from "./CbZ9NF89-6736177896019.js";
import { _ as _sfc_main$2 } from "./D2KjorHx-1875739460561.js";
import { _ as _sfc_main$5 } from "./DsvTyKEu-3067955167518.js";
import { _ as _sfc_main$6 } from "./CeVcRmCk-1577655618930.js";
import flatPickr from "vue-flatpickr-component";
import "flickity";
/* empty css                       */
import { _ as _export_sfc } from "./1tPrXgE0-4581736670159.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./BQTBzxda-1835617976051.js";
import "vuetify";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./BPBs_0V9-9736651018597.js";
import "./C6q4kDV--1536774619085.js";
const _sfc_main$1 = {
  __name: "CustomOrderModal",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  setup(__props, { expose: __expose }) {
    const showCustomOrderModal = ref(false);
    const selectedCustomOrder = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const formCustomOrder = useForm({
      full_name: "",
      email: "",
      phone: "",
      notes: "",
      date: "",
      time: "",
      selected: [],
      quantities: {}
    });
    ref(null);
    const calendar = ref(null);
    const selectedDate = ref("");
    const selectedTime = ref("");
    ref(false);
    ref(false);
    ref(true);
    const closedDates = ref([]);
    const quick_days = ref({});
    const first_day_string = ref("");
    const closed_dates = ref([]);
    const first_pickup_date = ref("");
    const last_pickup_date = ref("");
    const is_weekend_only = ref(false);
    ref("");
    const orderStep = ref(1);
    const calendarKey = ref(0);
    const localProducts = ref([]);
    const selectedQuantities = reactive({});
    const selectedProducts = computed(
      () => localProducts.value.map((product) => {
        const matchedVariations = product.variations.filter(
          (variation) => formCustomOrder.selected.includes(variation.uid)
        );
        return matchedVariations.length ? { ...product, variations: matchedVariations } : null;
      }).filter(Boolean)
    );
    const totalPrice = computed(() => {
      const total = selectedProducts.value.reduce(
        (total2, product) => total2 + product.variations.reduce(
          (sum, variation) => sum + variation.price * (selectedQuantities[variation.uid] || 1),
          0
        ),
        0
      );
      return total.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
    watch(selectedProducts, (products) => {
      for (const product of products) {
        for (const variation of product.variations) {
          if (!(variation.uid in selectedQuantities)) {
            selectedQuantities[variation.uid] = 1;
          }
        }
      }
    });
    const openCustomOrder = (custom_order = null) => {
      localProducts.value = [];
      axios.get(route("get_available_products")).then((response) => {
        localProducts.value = response.data.products;
        if (custom_order) {
          modalTitle.value = "Edit custom order";
          selectedCustomOrder.value = custom_order;
          formCustomOrder.name = "";
        } else {
          modalTitle.value = "Create custom order";
          selectedCustomOrder.value = null;
          formCustomOrder.name = "";
        }
        saveButtonText.value = "Save custom order";
        orderStep.value = 1;
        formCustomOrder.reset();
        for (const key in selectedQuantities) {
          delete selectedQuantities[key];
        }
        closedDates.value = [];
        quick_days.value = {};
        first_day_string.value = "";
        closed_dates.value = [];
        first_pickup_date.value = "";
        last_pickup_date.value = "";
        is_weekend_only.value = false;
        selectedDate.value = "";
        selectedTime.value = "";
        showCustomOrderModal.value = true;
      }).catch((error) => {
        console.error(error);
      });
    };
    const closeCustomOrder = () => {
      showCustomOrderModal.value = false;
    };
    const resetFormCustomOrder = () => {
      formCustomOrder.reset();
    };
    const saveCustomOrder = () => {
      let url;
      if (selectedCustomOrder.value) {
        url = route("admin.update_custom_order", { custom_order: selectedCustomOrder.value.uid });
      } else {
        url = route("admin.create_custom_order");
      }
      formCustomOrder.date = selectedDate.value;
      formCustomOrder.time = selectedTime.value;
      formCustomOrder.quantities = selectedQuantities;
      formCustomOrder.post(url, {
        onSuccess: () => {
          resetFormCustomOrder();
          showCustomOrderModal.value = false;
        }
      });
    };
    const getPickupDates = () => {
      axios.post(route("admin.get_pickup_dates"), {
        products: selectedQuantities
      }).then((response) => {
        orderStep.value = 2;
        console.log(response.data);
        closedDates.value = response.data.closed_dates;
        quick_days.value = response.data.quick_days;
        first_day_string.value = response.data.first_day_string;
        closed_dates.value = response.data.closed_dates;
        first_pickup_date.value = response.data.first_pickup_date;
        last_pickup_date.value = response.data.last_pickup_date;
        is_weekend_only.value = response.data.is_weekend_only;
        calendarKey.value = Date.now();
      }).catch((error) => {
        console.error(error);
      });
    };
    const timeslotsAvailable = ref(false);
    const timeslots = ref({});
    const getPickupTimes = () => {
      timeslotsAvailable.value = false;
      selectedTime.value = "";
      nextTick(() => {
        axios.post(route("admin.get_pickup_times"), {
          date: selectedDate.value
        }).then((response) => {
          timeslots.value = { ...response.data.available_times };
          timeslotsAvailable.value = true;
        }).catch((error) => {
          console.error("error");
        });
      });
    };
    const selectTime = (time) => {
      selectedTime.value = time;
    };
    const defineInstance = (instance) => {
      calendar.value = instance;
    };
    const calendarTargetRef = ref(null);
    ref(null);
    computed(() => {
      return selectedDate.value && selectedTime.value;
    });
    const isTimeSlotAvailable = (time) => {
      return selectedDate.value && timeslotsAvailable.value && time.available;
    };
    __expose({ openCustomOrder });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_chip = resolveComponent("v-chip");
      const _component_v_img = resolveComponent("v-img");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      const _component_v_slider = resolveComponent("v-slider");
      resolveComponent("v-card-item");
      resolveComponent("v-icon");
      const _component_v_btn = resolveComponent("v-btn");
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        show: showCustomOrderModal.value,
        onClose: closeCustomOrder,
        maxWidth: "6xl"
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(modalTitle.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(modalTitle.value), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-3"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { gap: "2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>Client name</p>`);
                  _push3(ssrRenderComponent(_component_v_text_field, {
                    modelValue: unref(formCustomOrder).full_name,
                    "onUpdate:modelValue": ($event) => unref(formCustomOrder).full_name = $event,
                    "error-messages": unref(formCustomOrder).errors.full_name
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", null, "Client name"),
                    createVNode(_component_v_text_field, {
                      modelValue: unref(formCustomOrder).full_name,
                      "onUpdate:modelValue": ($event) => unref(formCustomOrder).full_name = $event,
                      "error-messages": unref(formCustomOrder).errors.full_name
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { gap: "2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>Client email</p>`);
                  _push3(ssrRenderComponent(_component_v_text_field, {
                    modelValue: unref(formCustomOrder).email,
                    "onUpdate:modelValue": ($event) => unref(formCustomOrder).email = $event,
                    "error-messages": unref(formCustomOrder).errors.email
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", null, "Client email"),
                    createVNode(_component_v_text_field, {
                      modelValue: unref(formCustomOrder).email,
                      "onUpdate:modelValue": ($event) => unref(formCustomOrder).email = $event,
                      "error-messages": unref(formCustomOrder).errors.email
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { gap: "2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>Client phone number</p>`);
                  _push3(ssrRenderComponent(_component_v_text_field, {
                    modelValue: unref(formCustomOrder).phone,
                    "onUpdate:modelValue": ($event) => unref(formCustomOrder).phone = $event,
                    "error-messages": unref(formCustomOrder).errors.phone
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", null, "Client phone number"),
                    createVNode(_component_v_text_field, {
                      modelValue: unref(formCustomOrder).phone,
                      "onUpdate:modelValue": ($event) => unref(formCustomOrder).phone = $event,
                      "error-messages": unref(formCustomOrder).errors.phone
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { gap: "2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>Order notes</p>`);
                  _push3(ssrRenderComponent(_component_v_text_field, {
                    modelValue: unref(formCustomOrder).notes,
                    "onUpdate:modelValue": ($event) => unref(formCustomOrder).notes = $event,
                    "error-messages": unref(formCustomOrder).errors.notes
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", null, "Order notes"),
                    createVNode(_component_v_text_field, {
                      modelValue: unref(formCustomOrder).notes,
                      "onUpdate:modelValue": ($event) => unref(formCustomOrder).notes = $event,
                      "error-messages": unref(formCustomOrder).errors.notes
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-3"${_scopeId}>`);
            if (orderStep.value === 1) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, { gap: "2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-xl font-bold text-[#222]"${_scopeId2}>Catering menu</p>`);
                    if (localProducts.value) {
                      _push3(`<!--[-->`);
                      ssrRenderList(localProducts.value, (product) => {
                        _push3(ssrRenderComponent(_component_v_card, {
                          color: "grey-lighten-2",
                          rounded: "lg"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="p-4"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_sfc_main$3, { gap: "2" }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(_sfc_main$4, {
                                      center: true,
                                      justify: "between"
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`<p class="text-black font-bold"${_scopeId5}>${ssrInterpolate(product.name)}</p>`);
                                          if (product.weekend_only) {
                                            _push6(ssrRenderComponent(_component_v_chip, {
                                              size: "x-small",
                                              color: "amber",
                                              variant: "flat"
                                            }, {
                                              default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(`Weekend only`);
                                                } else {
                                                  return [
                                                    createTextVNode("Weekend only")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                          } else {
                                            _push6(`<!---->`);
                                          }
                                        } else {
                                          return [
                                            createVNode("p", { class: "text-black font-bold" }, toDisplayString(product.name), 1),
                                            product.weekend_only ? (openBlock(), createBlock(_component_v_chip, {
                                              key: 0,
                                              size: "x-small",
                                              color: "amber",
                                              variant: "flat"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Weekend only")
                                              ]),
                                              _: 1
                                            })) : createCommentVNode("", true)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                    _push5(ssrRenderComponent(_sfc_main$3, { gap: "2" }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`<!--[-->`);
                                          ssrRenderList(product.variations, (variation) => {
                                            _push6(ssrRenderComponent(_component_v_card, {
                                              color: "grey-lighten-3",
                                              rounded: "lg"
                                            }, {
                                              default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(`<div class="p-4"${_scopeId6}>`);
                                                  _push7(ssrRenderComponent(_sfc_main$4, {
                                                    center: true,
                                                    justify: "start"
                                                  }, {
                                                    default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                      if (_push8) {
                                                        _push8(`<div class="w-[50px]"${_scopeId7}>`);
                                                        _push8(ssrRenderComponent(_component_v_img, {
                                                          "aspect-ratio": "1",
                                                          color: "transparent",
                                                          src: variation.image_url,
                                                          cover: ""
                                                        }, null, _parent8, _scopeId7));
                                                        _push8(`</div><div class="grow"${_scopeId7}><p${_scopeId7}>${ssrInterpolate(variation.name)}</p><p${_scopeId7}>${ssrInterpolate(variation.price_string)}</p></div><div${_scopeId7}>`);
                                                        _push8(ssrRenderComponent(_component_v_checkbox, {
                                                          modelValue: unref(formCustomOrder).selected,
                                                          "onUpdate:modelValue": ($event) => unref(formCustomOrder).selected = $event,
                                                          value: variation.uid,
                                                          multiple: "",
                                                          "hide-details": ""
                                                        }, null, _parent8, _scopeId7));
                                                        _push8(`</div>`);
                                                      } else {
                                                        return [
                                                          createVNode("div", { class: "w-[50px]" }, [
                                                            createVNode(_component_v_img, {
                                                              "aspect-ratio": "1",
                                                              color: "transparent",
                                                              src: variation.image_url,
                                                              cover: ""
                                                            }, null, 8, ["src"])
                                                          ]),
                                                          createVNode("div", { class: "grow" }, [
                                                            createVNode("p", null, toDisplayString(variation.name), 1),
                                                            createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                          ]),
                                                          createVNode("div", null, [
                                                            createVNode(_component_v_checkbox, {
                                                              modelValue: unref(formCustomOrder).selected,
                                                              "onUpdate:modelValue": ($event) => unref(formCustomOrder).selected = $event,
                                                              value: variation.uid,
                                                              multiple: "",
                                                              "hide-details": ""
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                                                          ])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent7, _scopeId6));
                                                  _push7(`</div>`);
                                                } else {
                                                  return [
                                                    createVNode("div", { class: "p-4" }, [
                                                      createVNode(_sfc_main$4, {
                                                        center: true,
                                                        justify: "start"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "w-[50px]" }, [
                                                            createVNode(_component_v_img, {
                                                              "aspect-ratio": "1",
                                                              color: "transparent",
                                                              src: variation.image_url,
                                                              cover: ""
                                                            }, null, 8, ["src"])
                                                          ]),
                                                          createVNode("div", { class: "grow" }, [
                                                            createVNode("p", null, toDisplayString(variation.name), 1),
                                                            createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                          ]),
                                                          createVNode("div", null, [
                                                            createVNode(_component_v_checkbox, {
                                                              modelValue: unref(formCustomOrder).selected,
                                                              "onUpdate:modelValue": ($event) => unref(formCustomOrder).selected = $event,
                                                              value: variation.uid,
                                                              multiple: "",
                                                              "hide-details": ""
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                          });
                                          _push6(`<!--]-->`);
                                        } else {
                                          return [
                                            (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                              return openBlock(), createBlock(_component_v_card, {
                                                color: "grey-lighten-3",
                                                rounded: "lg"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "p-4" }, [
                                                    createVNode(_sfc_main$4, {
                                                      center: true,
                                                      justify: "start"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "w-[50px]" }, [
                                                          createVNode(_component_v_img, {
                                                            "aspect-ratio": "1",
                                                            color: "transparent",
                                                            src: variation.image_url,
                                                            cover: ""
                                                          }, null, 8, ["src"])
                                                        ]),
                                                        createVNode("div", { class: "grow" }, [
                                                          createVNode("p", null, toDisplayString(variation.name), 1),
                                                          createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                        ]),
                                                        createVNode("div", null, [
                                                          createVNode(_component_v_checkbox, {
                                                            modelValue: unref(formCustomOrder).selected,
                                                            "onUpdate:modelValue": ($event) => unref(formCustomOrder).selected = $event,
                                                            value: variation.uid,
                                                            multiple: "",
                                                            "hide-details": ""
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                                                        ])
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 256))
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$4, {
                                        center: true,
                                        justify: "between"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-black font-bold" }, toDisplayString(product.name), 1),
                                          product.weekend_only ? (openBlock(), createBlock(_component_v_chip, {
                                            key: 0,
                                            size: "x-small",
                                            color: "amber",
                                            variant: "flat"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Weekend only")
                                            ]),
                                            _: 1
                                          })) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_sfc_main$3, { gap: "2" }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                            return openBlock(), createBlock(_component_v_card, {
                                              color: "grey-lighten-3",
                                              rounded: "lg"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "p-4" }, [
                                                  createVNode(_sfc_main$4, {
                                                    center: true,
                                                    justify: "start"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "w-[50px]" }, [
                                                        createVNode(_component_v_img, {
                                                          "aspect-ratio": "1",
                                                          color: "transparent",
                                                          src: variation.image_url,
                                                          cover: ""
                                                        }, null, 8, ["src"])
                                                      ]),
                                                      createVNode("div", { class: "grow" }, [
                                                        createVNode("p", null, toDisplayString(variation.name), 1),
                                                        createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                      ]),
                                                      createVNode("div", null, [
                                                        createVNode(_component_v_checkbox, {
                                                          modelValue: unref(formCustomOrder).selected,
                                                          "onUpdate:modelValue": ($event) => unref(formCustomOrder).selected = $event,
                                                          value: variation.uid,
                                                          multiple: "",
                                                          "hide-details": ""
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 256))
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              _push4(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode(_sfc_main$3, { gap: "2" }, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$4, {
                                        center: true,
                                        justify: "between"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-black font-bold" }, toDisplayString(product.name), 1),
                                          product.weekend_only ? (openBlock(), createBlock(_component_v_chip, {
                                            key: 0,
                                            size: "x-small",
                                            color: "amber",
                                            variant: "flat"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Weekend only")
                                            ]),
                                            _: 1
                                          })) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_sfc_main$3, { gap: "2" }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                            return openBlock(), createBlock(_component_v_card, {
                                              color: "grey-lighten-3",
                                              rounded: "lg"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "p-4" }, [
                                                  createVNode(_sfc_main$4, {
                                                    center: true,
                                                    justify: "start"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "w-[50px]" }, [
                                                        createVNode(_component_v_img, {
                                                          "aspect-ratio": "1",
                                                          color: "transparent",
                                                          src: variation.image_url,
                                                          cover: ""
                                                        }, null, 8, ["src"])
                                                      ]),
                                                      createVNode("div", { class: "grow" }, [
                                                        createVNode("p", null, toDisplayString(variation.name), 1),
                                                        createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                      ]),
                                                      createVNode("div", null, [
                                                        createVNode(_component_v_checkbox, {
                                                          modelValue: unref(formCustomOrder).selected,
                                                          "onUpdate:modelValue": ($event) => unref(formCustomOrder).selected = $event,
                                                          value: variation.uid,
                                                          multiple: "",
                                                          "hide-details": ""
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 256))
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode("p", { class: "text-xl font-bold text-[#222]" }, "Catering menu"),
                      localProducts.value ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(localProducts.value, (product) => {
                        return openBlock(), createBlock(_component_v_card, {
                          color: "grey-lighten-2",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "p-4" }, [
                              createVNode(_sfc_main$3, { gap: "2" }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$4, {
                                    center: true,
                                    justify: "between"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-black font-bold" }, toDisplayString(product.name), 1),
                                      product.weekend_only ? (openBlock(), createBlock(_component_v_chip, {
                                        key: 0,
                                        size: "x-small",
                                        color: "amber",
                                        variant: "flat"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Weekend only")
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_sfc_main$3, { gap: "2" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                        return openBlock(), createBlock(_component_v_card, {
                                          color: "grey-lighten-3",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "p-4" }, [
                                              createVNode(_sfc_main$4, {
                                                center: true,
                                                justify: "start"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "w-[50px]" }, [
                                                    createVNode(_component_v_img, {
                                                      "aspect-ratio": "1",
                                                      color: "transparent",
                                                      src: variation.image_url,
                                                      cover: ""
                                                    }, null, 8, ["src"])
                                                  ]),
                                                  createVNode("div", { class: "grow" }, [
                                                    createVNode("p", null, toDisplayString(variation.name), 1),
                                                    createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                  ]),
                                                  createVNode("div", null, [
                                                    createVNode(_component_v_checkbox, {
                                                      modelValue: unref(formCustomOrder).selected,
                                                      "onUpdate:modelValue": ($event) => unref(formCustomOrder).selected = $event,
                                                      value: variation.uid,
                                                      multiple: "",
                                                      "hide-details": ""
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 256))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ]),
                          _: 2
                        }, 1024);
                      }), 256)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}>`);
            if (selectedProducts.value.length) {
              _push2(ssrRenderComponent(_sfc_main$3, { gap: "2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-xl font-bold text-[#222]"${_scopeId2}>Selected products</p><!--[-->`);
                    ssrRenderList(selectedProducts.value, (product) => {
                      _push3(ssrRenderComponent(_component_v_card, {
                        color: "grey",
                        rounded: "lg"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="p-4"${_scopeId3}>`);
                            _push4(ssrRenderComponent(_sfc_main$3, { gap: "2" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<p class="text-black font-bold"${_scopeId4}>${ssrInterpolate(product.name)}</p>`);
                                  _push5(ssrRenderComponent(_sfc_main$3, { gap: "2" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<!--[-->`);
                                        ssrRenderList(product.variations, (variation) => {
                                          _push6(ssrRenderComponent(_component_v_card, {
                                            color: "grey-lighten-2",
                                            rounded: "lg"
                                          }, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`<div class="p-4"${_scopeId6}>`);
                                                _push7(ssrRenderComponent(_sfc_main$4, {
                                                  center: true,
                                                  justify: "start"
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(`<div class="w-[50px]"${_scopeId7}>`);
                                                      _push8(ssrRenderComponent(_component_v_img, {
                                                        "aspect-ratio": "1",
                                                        color: "transparent",
                                                        src: variation.image_url,
                                                        cover: ""
                                                      }, null, _parent8, _scopeId7));
                                                      _push8(`</div><div class="grow"${_scopeId7}><p${_scopeId7}>${ssrInterpolate(variation.name)}</p><p${_scopeId7}>${ssrInterpolate(variation.price_string)}</p></div>`);
                                                    } else {
                                                      return [
                                                        createVNode("div", { class: "w-[50px]" }, [
                                                          createVNode(_component_v_img, {
                                                            "aspect-ratio": "1",
                                                            color: "transparent",
                                                            src: variation.image_url,
                                                            cover: ""
                                                          }, null, 8, ["src"])
                                                        ]),
                                                        createVNode("div", { class: "grow" }, [
                                                          createVNode("p", null, toDisplayString(variation.name), 1),
                                                          createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                        ])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                                _push7(`<div class="w-full"${_scopeId6}>`);
                                                _push7(ssrRenderComponent(_component_v_slider, {
                                                  modelValue: selectedQuantities[variation.uid],
                                                  "onUpdate:modelValue": ($event) => selectedQuantities[variation.uid] = $event,
                                                  min: "1",
                                                  max: "50",
                                                  "hide-details": "",
                                                  "show-ticks": "always",
                                                  "thumb-label": "always",
                                                  step: "1"
                                                }, null, _parent7, _scopeId6));
                                                _push7(`</div></div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "p-4" }, [
                                                    createVNode(_sfc_main$4, {
                                                      center: true,
                                                      justify: "start"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "w-[50px]" }, [
                                                          createVNode(_component_v_img, {
                                                            "aspect-ratio": "1",
                                                            color: "transparent",
                                                            src: variation.image_url,
                                                            cover: ""
                                                          }, null, 8, ["src"])
                                                        ]),
                                                        createVNode("div", { class: "grow" }, [
                                                          createVNode("p", null, toDisplayString(variation.name), 1),
                                                          createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                        ])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode("div", { class: "w-full" }, [
                                                      createVNode(_component_v_slider, {
                                                        modelValue: selectedQuantities[variation.uid],
                                                        "onUpdate:modelValue": ($event) => selectedQuantities[variation.uid] = $event,
                                                        min: "1",
                                                        max: "50",
                                                        "hide-details": "",
                                                        "show-ticks": "always",
                                                        "thumb-label": "always",
                                                        step: "1"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                    ])
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        });
                                        _push6(`<!--]-->`);
                                      } else {
                                        return [
                                          (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                            return openBlock(), createBlock(_component_v_card, {
                                              color: "grey-lighten-2",
                                              rounded: "lg"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "p-4" }, [
                                                  createVNode(_sfc_main$4, {
                                                    center: true,
                                                    justify: "start"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "w-[50px]" }, [
                                                        createVNode(_component_v_img, {
                                                          "aspect-ratio": "1",
                                                          color: "transparent",
                                                          src: variation.image_url,
                                                          cover: ""
                                                        }, null, 8, ["src"])
                                                      ]),
                                                      createVNode("div", { class: "grow" }, [
                                                        createVNode("p", null, toDisplayString(variation.name), 1),
                                                        createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode("div", { class: "w-full" }, [
                                                    createVNode(_component_v_slider, {
                                                      modelValue: selectedQuantities[variation.uid],
                                                      "onUpdate:modelValue": ($event) => selectedQuantities[variation.uid] = $event,
                                                      min: "1",
                                                      max: "50",
                                                      "hide-details": "",
                                                      "show-ticks": "always",
                                                      "thumb-label": "always",
                                                      step: "1"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                  ])
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 256))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode("p", { class: "text-black font-bold" }, toDisplayString(product.name), 1),
                                    createVNode(_sfc_main$3, { gap: "2" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                          return openBlock(), createBlock(_component_v_card, {
                                            color: "grey-lighten-2",
                                            rounded: "lg"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "p-4" }, [
                                                createVNode(_sfc_main$4, {
                                                  center: true,
                                                  justify: "start"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "w-[50px]" }, [
                                                      createVNode(_component_v_img, {
                                                        "aspect-ratio": "1",
                                                        color: "transparent",
                                                        src: variation.image_url,
                                                        cover: ""
                                                      }, null, 8, ["src"])
                                                    ]),
                                                    createVNode("div", { class: "grow" }, [
                                                      createVNode("p", null, toDisplayString(variation.name), 1),
                                                      createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode("div", { class: "w-full" }, [
                                                  createVNode(_component_v_slider, {
                                                    modelValue: selectedQuantities[variation.uid],
                                                    "onUpdate:modelValue": ($event) => selectedQuantities[variation.uid] = $event,
                                                    min: "1",
                                                    max: "50",
                                                    "hide-details": "",
                                                    "show-ticks": "always",
                                                    "thumb-label": "always",
                                                    step: "1"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ])
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 256))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div>`);
                          } else {
                            return [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$3, { gap: "2" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-black font-bold" }, toDisplayString(product.name), 1),
                                    createVNode(_sfc_main$3, { gap: "2" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                          return openBlock(), createBlock(_component_v_card, {
                                            color: "grey-lighten-2",
                                            rounded: "lg"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "p-4" }, [
                                                createVNode(_sfc_main$4, {
                                                  center: true,
                                                  justify: "start"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "w-[50px]" }, [
                                                      createVNode(_component_v_img, {
                                                        "aspect-ratio": "1",
                                                        color: "transparent",
                                                        src: variation.image_url,
                                                        cover: ""
                                                      }, null, 8, ["src"])
                                                    ]),
                                                    createVNode("div", { class: "grow" }, [
                                                      createVNode("p", null, toDisplayString(variation.name), 1),
                                                      createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode("div", { class: "w-full" }, [
                                                  createVNode(_component_v_slider, {
                                                    modelValue: selectedQuantities[variation.uid],
                                                    "onUpdate:modelValue": ($event) => selectedQuantities[variation.uid] = $event,
                                                    min: "1",
                                                    max: "50",
                                                    "hide-details": "",
                                                    "show-ticks": "always",
                                                    "thumb-label": "always",
                                                    step: "1"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ])
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 256))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--><div class="p-4 text-center"${_scopeId2}><p class="text-2xl font-bold text-black"${_scopeId2}>$${ssrInterpolate(totalPrice.value)}</p></div>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-xl font-bold text-[#222]" }, "Selected products"),
                      (openBlock(true), createBlock(Fragment, null, renderList(selectedProducts.value, (product) => {
                        return openBlock(), createBlock(_component_v_card, {
                          color: "grey",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "p-4" }, [
                              createVNode(_sfc_main$3, { gap: "2" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-black font-bold" }, toDisplayString(product.name), 1),
                                  createVNode(_sfc_main$3, { gap: "2" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                        return openBlock(), createBlock(_component_v_card, {
                                          color: "grey-lighten-2",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "p-4" }, [
                                              createVNode(_sfc_main$4, {
                                                center: true,
                                                justify: "start"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "w-[50px]" }, [
                                                    createVNode(_component_v_img, {
                                                      "aspect-ratio": "1",
                                                      color: "transparent",
                                                      src: variation.image_url,
                                                      cover: ""
                                                    }, null, 8, ["src"])
                                                  ]),
                                                  createVNode("div", { class: "grow" }, [
                                                    createVNode("p", null, toDisplayString(variation.name), 1),
                                                    createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode("div", { class: "w-full" }, [
                                                createVNode(_component_v_slider, {
                                                  modelValue: selectedQuantities[variation.uid],
                                                  "onUpdate:modelValue": ($event) => selectedQuantities[variation.uid] = $event,
                                                  min: "1",
                                                  max: "50",
                                                  "hide-details": "",
                                                  "show-ticks": "always",
                                                  "thumb-label": "always",
                                                  step: "1"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 256))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ]),
                          _: 2
                        }, 1024);
                      }), 256)),
                      createVNode("div", { class: "p-4 text-center" }, [
                        createVNode("p", { class: "text-2xl font-bold text-black" }, "$" + toDisplayString(totalPrice.value), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (orderStep.value === 2) {
              _push2(`<div${_scopeId}><div class="text-center"${_scopeId}><p class="text-lg font-bold text-black"${_scopeId}>Pick a date</p></div>`);
              {
                _push2(`<!---->`);
              }
              _push2(`<div class="px-1 relative"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(flatPickr), {
                ref: "datepicker",
                modelValue: selectedDate.value,
                "onUpdate:modelValue": ($event) => selectedDate.value = $event,
                placeholder: "No date selected",
                config: {
                  dateFormat: "m/d/Y",
                  minDate: first_pickup_date.value,
                  maxDate: last_pickup_date.value,
                  disable: closedDates.value,
                  ...is_weekend_only.value && {
                    enable: [
                      (date) => {
                        const isWeekend = [0, 6].includes(date.getDay());
                        const isClosed = closedDates.value.some(
                          (d) => date.toDateString() === new Date(d).toDateString()
                        );
                        return isWeekend && !isClosed;
                      }
                    ]
                  },
                  onReady: (selectedDates, dateStr, instance) => {
                    defineInstance(instance);
                    nextTick(() => {
                      const target = calendarTargetRef.value;
                      if (target) {
                        target.appendChild(instance.calendarContainer);
                        instance.set("static", true);
                        nextTick(() => {
                          Object.assign(instance.calendarContainer.style, {
                            position: "absolute",
                            top: "10px",
                            left: "0",
                            zIndex: "9999"
                          });
                        });
                      }
                    });
                  },
                  onValueUpdate: (selectedDates, dateStr, instance) => {
                    defineInstance(instance);
                  },
                  onClose: (selectedDates, dateStr, instance) => {
                    getPickupTimes();
                    defineInstance(instance);
                  }
                },
                class: "main-input rounded-md"
              }, null, _parent2, _scopeId));
              _push2(`<div id="calendar-target" class="position-relative"${_scopeId}></div></div><div class="mt-10 mb-3 text-center"${_scopeId}><p class="text-lg font-bold text-black"${_scopeId}>Pick a time</p></div><div class="flex flex-row justify-center mb-5"${_scopeId}><div class="grid grid-cols-4 gap-3"${_scopeId}><!--[-->`);
              ssrRenderList(timeslots.value, (time) => {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_v_btn, {
                  disabled: !isTimeSlotAvailable(time),
                  class: `${isTimeSlotAvailable(time) ? "opacity-100" : "opacity-40"}`,
                  onClick: ($event) => selectTime(time.displayed_time),
                  color: isTimeSlotAvailable(time) ? selectedTime.value === time.displayed_time ? "#000000" : "#f99c19" : "#ffffff"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(time.displayed_time)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(time.displayed_time), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-3" }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$3, { gap: "2" }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Client name"),
                      createVNode(_component_v_text_field, {
                        modelValue: unref(formCustomOrder).full_name,
                        "onUpdate:modelValue": ($event) => unref(formCustomOrder).full_name = $event,
                        "error-messages": unref(formCustomOrder).errors.full_name
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$3, { gap: "2" }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Client email"),
                      createVNode(_component_v_text_field, {
                        modelValue: unref(formCustomOrder).email,
                        "onUpdate:modelValue": ($event) => unref(formCustomOrder).email = $event,
                        "error-messages": unref(formCustomOrder).errors.email
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$3, { gap: "2" }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Client phone number"),
                      createVNode(_component_v_text_field, {
                        modelValue: unref(formCustomOrder).phone,
                        "onUpdate:modelValue": ($event) => unref(formCustomOrder).phone = $event,
                        "error-messages": unref(formCustomOrder).errors.phone
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$3, { gap: "2" }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Order notes"),
                      createVNode(_component_v_text_field, {
                        modelValue: unref(formCustomOrder).notes,
                        "onUpdate:modelValue": ($event) => unref(formCustomOrder).notes = $event,
                        "error-messages": unref(formCustomOrder).errors.notes
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-3" }, [
                orderStep.value === 1 ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode(_sfc_main$3, { gap: "2" }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "text-xl font-bold text-[#222]" }, "Catering menu"),
                      localProducts.value ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(localProducts.value, (product) => {
                        return openBlock(), createBlock(_component_v_card, {
                          color: "grey-lighten-2",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "p-4" }, [
                              createVNode(_sfc_main$3, { gap: "2" }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$4, {
                                    center: true,
                                    justify: "between"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-black font-bold" }, toDisplayString(product.name), 1),
                                      product.weekend_only ? (openBlock(), createBlock(_component_v_chip, {
                                        key: 0,
                                        size: "x-small",
                                        color: "amber",
                                        variant: "flat"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Weekend only")
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_sfc_main$3, { gap: "2" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                        return openBlock(), createBlock(_component_v_card, {
                                          color: "grey-lighten-3",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "p-4" }, [
                                              createVNode(_sfc_main$4, {
                                                center: true,
                                                justify: "start"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "w-[50px]" }, [
                                                    createVNode(_component_v_img, {
                                                      "aspect-ratio": "1",
                                                      color: "transparent",
                                                      src: variation.image_url,
                                                      cover: ""
                                                    }, null, 8, ["src"])
                                                  ]),
                                                  createVNode("div", { class: "grow" }, [
                                                    createVNode("p", null, toDisplayString(variation.name), 1),
                                                    createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                  ]),
                                                  createVNode("div", null, [
                                                    createVNode(_component_v_checkbox, {
                                                      modelValue: unref(formCustomOrder).selected,
                                                      "onUpdate:modelValue": ($event) => unref(formCustomOrder).selected = $event,
                                                      value: variation.uid,
                                                      multiple: "",
                                                      "hide-details": ""
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 256))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ]),
                          _: 2
                        }, 1024);
                      }), 256)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true),
                createVNode("div", null, [
                  selectedProducts.value.length ? (openBlock(), createBlock(_sfc_main$3, {
                    key: 0,
                    gap: "2"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "text-xl font-bold text-[#222]" }, "Selected products"),
                      (openBlock(true), createBlock(Fragment, null, renderList(selectedProducts.value, (product) => {
                        return openBlock(), createBlock(_component_v_card, {
                          color: "grey",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "p-4" }, [
                              createVNode(_sfc_main$3, { gap: "2" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-black font-bold" }, toDisplayString(product.name), 1),
                                  createVNode(_sfc_main$3, { gap: "2" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                        return openBlock(), createBlock(_component_v_card, {
                                          color: "grey-lighten-2",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "p-4" }, [
                                              createVNode(_sfc_main$4, {
                                                center: true,
                                                justify: "start"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "w-[50px]" }, [
                                                    createVNode(_component_v_img, {
                                                      "aspect-ratio": "1",
                                                      color: "transparent",
                                                      src: variation.image_url,
                                                      cover: ""
                                                    }, null, 8, ["src"])
                                                  ]),
                                                  createVNode("div", { class: "grow" }, [
                                                    createVNode("p", null, toDisplayString(variation.name), 1),
                                                    createVNode("p", null, toDisplayString(variation.price_string), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode("div", { class: "w-full" }, [
                                                createVNode(_component_v_slider, {
                                                  modelValue: selectedQuantities[variation.uid],
                                                  "onUpdate:modelValue": ($event) => selectedQuantities[variation.uid] = $event,
                                                  min: "1",
                                                  max: "50",
                                                  "hide-details": "",
                                                  "show-ticks": "always",
                                                  "thumb-label": "always",
                                                  step: "1"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 256))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ]),
                          _: 2
                        }, 1024);
                      }), 256)),
                      createVNode("div", { class: "p-4 text-center" }, [
                        createVNode("p", { class: "text-2xl font-bold text-black" }, "$" + toDisplayString(totalPrice.value), 1)
                      ])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                orderStep.value === 2 ? (openBlock(), createBlock("div", { key: calendarKey.value }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("p", { class: "text-lg font-bold text-black" }, "Pick a date")
                  ]),
                  createCommentVNode("", true),
                  createVNode("div", { class: "px-1 relative" }, [
                    createVNode(unref(flatPickr), {
                      ref: "datepicker",
                      modelValue: selectedDate.value,
                      "onUpdate:modelValue": ($event) => selectedDate.value = $event,
                      placeholder: "No date selected",
                      config: {
                        dateFormat: "m/d/Y",
                        minDate: first_pickup_date.value,
                        maxDate: last_pickup_date.value,
                        disable: closedDates.value,
                        ...is_weekend_only.value && {
                          enable: [
                            (date) => {
                              const isWeekend = [0, 6].includes(date.getDay());
                              const isClosed = closedDates.value.some(
                                (d) => date.toDateString() === new Date(d).toDateString()
                              );
                              return isWeekend && !isClosed;
                            }
                          ]
                        },
                        onReady: (selectedDates, dateStr, instance) => {
                          defineInstance(instance);
                          nextTick(() => {
                            const target = calendarTargetRef.value;
                            if (target) {
                              target.appendChild(instance.calendarContainer);
                              instance.set("static", true);
                              nextTick(() => {
                                Object.assign(instance.calendarContainer.style, {
                                  position: "absolute",
                                  top: "10px",
                                  left: "0",
                                  zIndex: "9999"
                                });
                              });
                            }
                          });
                        },
                        onValueUpdate: (selectedDates, dateStr, instance) => {
                          defineInstance(instance);
                        },
                        onClose: (selectedDates, dateStr, instance) => {
                          getPickupTimes();
                          defineInstance(instance);
                        }
                      },
                      class: "main-input rounded-md"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "config"]),
                    createVNode("div", {
                      id: "calendar-target",
                      class: "position-relative",
                      ref_key: "calendarTargetRef",
                      ref: calendarTargetRef
                    }, null, 512)
                  ]),
                  createVNode("div", { class: "mt-10 mb-3 text-center" }, [
                    createVNode("p", { class: "text-lg font-bold text-black" }, "Pick a time")
                  ]),
                  createVNode("div", { class: "flex flex-row justify-center mb-5" }, [
                    createVNode("div", { class: "grid grid-cols-4 gap-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(timeslots.value, (time) => {
                        return openBlock(), createBlock("div", null, [
                          createVNode(_component_v_btn, {
                            disabled: !isTimeSlotAvailable(time),
                            class: `${isTimeSlotAvailable(time) ? "opacity-100" : "opacity-40"}`,
                            onClick: withModifiers(($event) => selectTime(time.displayed_time), ["prevent"]),
                            color: isTimeSlotAvailable(time) ? selectedTime.value === time.displayed_time ? "#000000" : "#f99c19" : "#ffffff"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(time.displayed_time), 1)
                            ]),
                            _: 2
                          }, 1032, ["disabled", "class", "onClick", "color"])
                        ]);
                      }), 256))
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (orderStep.value === 1) {
              _push2(ssrRenderComponent(_sfc_main$5, {
                disabled: unref(formCustomOrder).processing,
                onClick: getPickupDates,
                class: "me-3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Next`);
                  } else {
                    return [
                      createTextVNode("Next")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (orderStep.value === 2) {
              _push2(ssrRenderComponent(_sfc_main$5, {
                disabled: unref(formCustomOrder).processing,
                onClick: saveCustomOrder,
                class: "me-3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Save`);
                  } else {
                    return [
                      createTextVNode("Save")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$6, { onClick: closeCustomOrder }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancel`);
                } else {
                  return [
                    createTextVNode("Cancel")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              orderStep.value === 1 ? (openBlock(), createBlock(_sfc_main$5, {
                key: 0,
                disabled: unref(formCustomOrder).processing,
                onClick: getPickupDates,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode("Next")
                ]),
                _: 1
              }, 8, ["disabled"])) : createCommentVNode("", true),
              orderStep.value === 2 ? (openBlock(), createBlock(_sfc_main$5, {
                key: 1,
                disabled: unref(formCustomOrder).processing,
                onClick: saveCustomOrder,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode("Save")
                ]),
                _: 1
              }, 8, ["disabled"])) : createCommentVNode("", true),
              createVNode(_sfc_main$6, { onClick: closeCustomOrder }, {
                default: withCtx(() => [
                  createTextVNode("Cancel")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CustomOrderModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    orders: Object,
    paid_count: Number,
    ready_count: Number,
    completed_count: Number,
    canceled_count: Number,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const showOrderModal = ref(false);
    const selectedOrder = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const canOpen = ref(true);
    const openOrder = (order = null) => {
      if (order && canOpen.value) {
        modalTitle.value = "View order";
        selectedOrder.value = order;
        currentStatus.value = order.status;
      } else {
        return 0;
      }
      canOpen.value = false;
      saveButtonText.value = "Update order";
      editOrderNotes.value = false;
      showOrderModal.value = true;
    };
    const closeOrder = () => {
      showOrderModal.value = false;
      setTimeout(() => {
        selectedOrder.value = null;
        canOpen.value = true;
      }, 500);
    };
    const updateOrder = () => {
      let url;
      if (selectedOrder.value) {
        url = route("admin.update_order_status", { order: selectedOrder.value.uid });
      } else {
        return 0;
      }
      router.post(url, {
        status: currentStatus.value
      }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          closeOrder();
        },
        onError: (error) => {
          console.log(error);
        }
      });
    };
    const isRefunding = ref(false);
    const local_errors = ref({});
    const initiateRefund = () => {
      local_errors.value = {};
      isRefunding.value = true;
      router.post(route("admin.initiate_refund", { order: selectedOrder.value.uid }), refundForm, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          const updatedOrder = props.orders.data.find((order) => order.uid === selectedOrder.value.uid);
          selectedOrder.value = { ...updatedOrder };
          refundForm.stripe = "";
          refundForm.gift_card = "";
          isRefunding.value = false;
        },
        onError: (error) => {
          local_errors.value = props.errors;
          isRefunding.value = false;
        }
      });
    };
    const refundForm = reactive({
      stripe: "",
      gift_card: "",
      confirm: false
    });
    const statuses = ref(["paid", "ready", "completed", "canceled"]);
    const currentStatus = ref(null);
    const showRefunds = ref(false);
    const toggleRefunds = () => {
      showRefunds.value = !showRefunds.value;
    };
    const editOrderNotes = ref(false);
    const orderNotes = ref("");
    const toggleEditOrderNotes = () => {
      orderNotes.value = selectedOrder.value.notes;
      editOrderNotes.value = !editOrderNotes.value;
    };
    const updateOrderNotes = () => {
      local_errors.value = {};
      router.post(route("admin.update_order_notes", { order: selectedOrder.value.uid }), {
        notes: orderNotes.value
      }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          console.log(props.orders);
          selectedOrder.value = props.orders.data.find((o) => o.uid === selectedOrder.value.uid);
          editOrderNotes.value = false;
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    const customOrderModal = ref(null);
    const createCustomOrder = () => {
      customOrderModal.value.openCustomOrder();
    };
    const hasNotesOrClientNotes = (order) => {
      if (order.notes && order.notes.trim() !== "") {
        return true;
      }
      if (order.items && Array.isArray(order.items)) {
        return order.items.some((item) => item.client_note && item.client_note.trim() !== "");
      }
      return false;
    };
    const showClientNotesModal = ref(false);
    const selectedOrderForClientNotes = ref(null);
    const openClientNotesModal = (order) => {
      selectedOrderForClientNotes.value = order;
      showClientNotesModal.value = true;
    };
    const closeClientNotesModal = () => {
      showClientNotesModal.value = false;
      setTimeout(() => {
        selectedOrderForClientNotes.value = null;
      }, 500);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_textarea = resolveComponent("v-textarea");
      const _component_v_img = resolveComponent("v-img");
      const _component_v_radio_group = resolveComponent("v-radio-group");
      const _component_v_radio = resolveComponent("v-radio");
      const _component_v_table = resolveComponent("v-table");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Orders" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row flex-wrap gap-3 mb-5" data-v-17ecad36${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.orders"))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Paid orders ${ssrInterpolate(`(${props.paid_count})`)}`);
                } else {
                  return [
                    createTextVNode(" Paid orders " + toDisplayString(`(${props.paid_count})`), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.orders_ready"))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Ready orders ${ssrInterpolate(`(${props.ready_count})`)}`);
                } else {
                  return [
                    createTextVNode(" Ready orders " + toDisplayString(`(${props.ready_count})`), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.orders_completed"))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Completed orders ${ssrInterpolate(`(${props.completed_count})`)}`);
                } else {
                  return [
                    createTextVNode(" Completed orders " + toDisplayString(`(${props.completed_count})`), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.orders_canceled"))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Canceled orders ${ssrInterpolate(`(${props.canceled_count})`)}`);
                } else {
                  return [
                    createTextVNode(" Canceled orders " + toDisplayString(`(${props.canceled_count})`), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: createCustomOrder,
              variant: "tonal",
              "prepend-icon": "mdi-plus-circle-outline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Custom order`);
                } else {
                  return [
                    createTextVNode("Custom order")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (props.orders.data.length > 0) {
              _push2(`<div class="flex flex-col gap-7 md:gap-3 text-sm" data-v-17ecad36${_scopeId}><!--[-->`);
              ssrRenderList(props.orders.data, (order) => {
                _push2(ssrRenderComponent(_component_v_card, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_v_card_item, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_sfc_main$7, {
                              cols: "2",
                              md: "2",
                              lg: "5",
                              xl: "5",
                              "2xl": "5",
                              gap: "2"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" data-v-17ecad36${_scopeId4}><div data-v-17ecad36${_scopeId4}><strong data-v-17ecad36${_scopeId4}>${ssrInterpolate(order.initial)}${ssrInterpolate(order.number)} </strong><span class="text-blue" data-v-17ecad36${_scopeId4}>(${ssrInterpolate(order.type)})</span></div><p data-v-17ecad36${_scopeId4}><span data-v-17ecad36${_scopeId4}>${ssrInterpolate(order.full_name ?? "No name")}</span>`);
                                  if (order.user_id) {
                                    _push5(`<span data-v-17ecad36${_scopeId4}> (${ssrInterpolate(order.user.name)})</span>`);
                                  } else {
                                    _push5(`<span data-v-17ecad36${_scopeId4}> (guest)</span>`);
                                  }
                                  _push5(`</p><div class="flex flex-row flex-wrap items-center gap-0" data-v-17ecad36${_scopeId4}><p data-v-17ecad36${_scopeId4}>${ssrInterpolate(order.email ?? "no email")}</p>`);
                                  if (order.phone) {
                                    _push5(ssrRenderComponent(_component_v_icon, null, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`mdi-circle-small`);
                                        } else {
                                          return [
                                            createTextVNode("mdi-circle-small")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  if (order.phone) {
                                    _push5(`<p data-v-17ecad36${_scopeId4}>${ssrInterpolate(order.phone)}</p>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div></div><div class="flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-17ecad36${_scopeId4}><p class="font-bold" data-v-17ecad36${_scopeId4}>Amount</p> $${ssrInterpolate(order.amount)}</div><div class="flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-17ecad36${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_sfc_main$4, {
                                    center: true,
                                    justify: "start"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<p class="font-bold" data-v-17ecad36${_scopeId5}>${ssrInterpolate(order.type === "catering" ? "Pickup" : "Delivery")}</p>`);
                                        if (hasNotesOrClientNotes(order)) {
                                          _push6(ssrRenderComponent(_component_v_icon, {
                                            class: "bg-red text-white rounded-circle cursor-pointer",
                                            onClick: ($event) => openClientNotesModal(order),
                                            style: { "cursor": "pointer" }
                                          }, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(` mdi-pencil-circle `);
                                              } else {
                                                return [
                                                  createTextVNode(" mdi-pencil-circle ")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                      } else {
                                        return [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(order.type === "catering" ? "Pickup" : "Delivery"), 1),
                                          hasNotesOrClientNotes(order) ? (openBlock(), createBlock(_component_v_icon, {
                                            key: 0,
                                            class: "bg-red text-white rounded-circle cursor-pointer",
                                            onClick: withModifiers(($event) => openClientNotesModal(order), ["prevent"]),
                                            style: { "cursor": "pointer" }
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" mdi-pencil-circle ")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])) : createCommentVNode("", true)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(` ${ssrInterpolate(order.datetime_formatted)}</div><div class="flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-17ecad36${_scopeId4}><p class="font-bold" data-v-17ecad36${_scopeId4}>Items</p><div data-v-17ecad36${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_v_btn, {
                                    onClick: ($event) => openOrder(order),
                                    size: "small"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(order.total_quantity)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(order.total_quantity), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</div></div><div class="uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-17ecad36${_scopeId4}><p class="font-bold" data-v-17ecad36${_scopeId4}>Status</p> ${ssrInterpolate(order.status)} `);
                                  if (order.source === "custom") {
                                    _push5(`<!--[--> (custom) <!--]-->`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                      createVNode("div", null, [
                                        createVNode("strong", null, toDisplayString(order.initial) + toDisplayString(order.number) + " ", 1),
                                        createVNode("span", { class: "text-blue" }, "(" + toDisplayString(order.type) + ")", 1)
                                      ]),
                                      createVNode("p", null, [
                                        createVNode("span", null, toDisplayString(order.full_name ?? "No name"), 1),
                                        order.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(order.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                      ]),
                                      createVNode("div", { class: "flex flex-row flex-wrap items-center gap-0" }, [
                                        createVNode("p", null, toDisplayString(order.email ?? "no email"), 1),
                                        order.phone ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-circle-small")
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true),
                                        order.phone ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(order.phone), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, "Amount"),
                                      createTextVNode(" $" + toDisplayString(order.amount), 1)
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode(_sfc_main$4, {
                                        center: true,
                                        justify: "start"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(order.type === "catering" ? "Pickup" : "Delivery"), 1),
                                          hasNotesOrClientNotes(order) ? (openBlock(), createBlock(_component_v_icon, {
                                            key: 0,
                                            class: "bg-red text-white rounded-circle cursor-pointer",
                                            onClick: withModifiers(($event) => openClientNotesModal(order), ["prevent"]),
                                            style: { "cursor": "pointer" }
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" mdi-pencil-circle ")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createTextVNode(" " + toDisplayString(order.datetime_formatted), 1)
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, "Items"),
                                      createVNode("div", null, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(($event) => openOrder(order), ["prevent"]),
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(order.total_quantity), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ])
                                    ]),
                                    createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, "Status"),
                                      createTextVNode(" " + toDisplayString(order.status) + " ", 1),
                                      order.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createTextVNode(" (custom) ")
                                      ], 64)) : createCommentVNode("", true)
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_sfc_main$7, {
                                cols: "2",
                                md: "2",
                                lg: "5",
                                xl: "5",
                                "2xl": "5",
                                gap: "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                    createVNode("div", null, [
                                      createVNode("strong", null, toDisplayString(order.initial) + toDisplayString(order.number) + " ", 1),
                                      createVNode("span", { class: "text-blue" }, "(" + toDisplayString(order.type) + ")", 1)
                                    ]),
                                    createVNode("p", null, [
                                      createVNode("span", null, toDisplayString(order.full_name ?? "No name"), 1),
                                      order.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(order.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                    ]),
                                    createVNode("div", { class: "flex flex-row flex-wrap items-center gap-0" }, [
                                      createVNode("p", null, toDisplayString(order.email ?? "no email"), 1),
                                      order.phone ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-circle-small")
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      order.phone ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(order.phone), 1)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                    createVNode("p", { class: "font-bold" }, "Amount"),
                                    createTextVNode(" $" + toDisplayString(order.amount), 1)
                                  ]),
                                  createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                    createVNode(_sfc_main$4, {
                                      center: true,
                                      justify: "start"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "font-bold" }, toDisplayString(order.type === "catering" ? "Pickup" : "Delivery"), 1),
                                        hasNotesOrClientNotes(order) ? (openBlock(), createBlock(_component_v_icon, {
                                          key: 0,
                                          class: "bg-red text-white rounded-circle cursor-pointer",
                                          onClick: withModifiers(($event) => openClientNotesModal(order), ["prevent"]),
                                          style: { "cursor": "pointer" }
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" mdi-pencil-circle ")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createTextVNode(" " + toDisplayString(order.datetime_formatted), 1)
                                  ]),
                                  createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                    createVNode("p", { class: "font-bold" }, "Items"),
                                    createVNode("div", null, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(($event) => openOrder(order), ["prevent"]),
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(order.total_quantity), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])
                                    ])
                                  ]),
                                  createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                    createVNode("p", { class: "font-bold" }, "Status"),
                                    createTextVNode(" " + toDisplayString(order.status) + " ", 1),
                                    order.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      createTextVNode(" (custom) ")
                                    ], 64)) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_v_card_item, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$7, {
                              cols: "2",
                              md: "2",
                              lg: "5",
                              xl: "5",
                              "2xl": "5",
                              gap: "2"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                  createVNode("div", null, [
                                    createVNode("strong", null, toDisplayString(order.initial) + toDisplayString(order.number) + " ", 1),
                                    createVNode("span", { class: "text-blue" }, "(" + toDisplayString(order.type) + ")", 1)
                                  ]),
                                  createVNode("p", null, [
                                    createVNode("span", null, toDisplayString(order.full_name ?? "No name"), 1),
                                    order.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(order.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                  ]),
                                  createVNode("div", { class: "flex flex-row flex-wrap items-center gap-0" }, [
                                    createVNode("p", null, toDisplayString(order.email ?? "no email"), 1),
                                    order.phone ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-circle-small")
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    order.phone ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(order.phone), 1)) : createCommentVNode("", true)
                                  ])
                                ]),
                                createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                  createVNode("p", { class: "font-bold" }, "Amount"),
                                  createTextVNode(" $" + toDisplayString(order.amount), 1)
                                ]),
                                createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                  createVNode(_sfc_main$4, {
                                    center: true,
                                    justify: "start"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "font-bold" }, toDisplayString(order.type === "catering" ? "Pickup" : "Delivery"), 1),
                                      hasNotesOrClientNotes(order) ? (openBlock(), createBlock(_component_v_icon, {
                                        key: 0,
                                        class: "bg-red text-white rounded-circle cursor-pointer",
                                        onClick: withModifiers(($event) => openClientNotesModal(order), ["prevent"]),
                                        style: { "cursor": "pointer" }
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" mdi-pencil-circle ")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createTextVNode(" " + toDisplayString(order.datetime_formatted), 1)
                                ]),
                                createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                  createVNode("p", { class: "font-bold" }, "Items"),
                                  createVNode("div", null, [
                                    createVNode(_component_v_btn, {
                                      onClick: withModifiers(($event) => openOrder(order), ["prevent"]),
                                      size: "small"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(order.total_quantity), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"])
                                  ])
                                ]),
                                createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                  createVNode("p", { class: "font-bold" }, "Status"),
                                  createTextVNode(" " + toDisplayString(order.status) + " ", 1),
                                  order.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createTextVNode(" (custom) ")
                                  ], 64)) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--><div data-v-17ecad36${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$8, {
                entities: props.orders
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div data-v-17ecad36${_scopeId}><p data-v-17ecad36${_scopeId}>There are no orders to show here at the moment.</p></div>`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showOrderModal.value,
              onClose: closeOrder,
              maxWidth: "6xl"
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(modalTitle.value)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(modalTitle.value), 1)
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (selectedOrder.value) {
                    _push3(`<div class="flex flex-col gap-3" data-v-17ecad36${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_card, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="mb-5" data-v-17ecad36${_scopeId3}><p class="text-2xl font-bold mb-2" data-v-17ecad36${_scopeId3}>Order summary</p>`);
                          _push4(ssrRenderComponent(_component_v_card, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div data-v-17ecad36${_scopeId4}>`);
                                _push5(ssrRenderComponent(_sfc_main$7, {
                                  cols: "2",
                                  md: "2",
                                  lg: "5",
                                  xl: "5",
                                  "2xl": "5",
                                  gap: "2"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" data-v-17ecad36${_scopeId5}><div data-v-17ecad36${_scopeId5}><strong data-v-17ecad36${_scopeId5}>${ssrInterpolate(selectedOrder.value.initial)}${ssrInterpolate(selectedOrder.value.number)} </strong><span class="text-blue" data-v-17ecad36${_scopeId5}>(${ssrInterpolate(selectedOrder.value.type)})</span></div><p data-v-17ecad36${_scopeId5}><span data-v-17ecad36${_scopeId5}>${ssrInterpolate(selectedOrder.value.full_name ?? "No name")}</span>`);
                                      if (selectedOrder.value.user_id) {
                                        _push6(`<span data-v-17ecad36${_scopeId5}> (${ssrInterpolate(selectedOrder.value.user.name)})</span>`);
                                      } else {
                                        _push6(`<span data-v-17ecad36${_scopeId5}> (guest)</span>`);
                                      }
                                      _push6(`</p><div data-v-17ecad36${_scopeId5}><p data-v-17ecad36${_scopeId5}>${ssrInterpolate(selectedOrder.value.email ?? "no email")}</p>`);
                                      if (selectedOrder.value.phone) {
                                        _push6(`<p data-v-17ecad36${_scopeId5}>${ssrInterpolate(selectedOrder.value.phone)}</p>`);
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(`</div></div><div class="flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-17ecad36${_scopeId5}><p class="font-bold" data-v-17ecad36${_scopeId5}>Amount</p> $${ssrInterpolate(selectedOrder.value.amount)}</div><div class="flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-17ecad36${_scopeId5}><p class="font-bold" data-v-17ecad36${_scopeId5}>${ssrInterpolate(selectedOrder.value.type === "catering" ? "Pickup" : "Delivery")}</p> ${ssrInterpolate(selectedOrder.value.datetime_formatted)}</div><div class="flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-17ecad36${_scopeId5}><p class="font-bold" data-v-17ecad36${_scopeId5}>Items</p><div data-v-17ecad36${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_v_btn, {
                                        size: "small",
                                        color: "grey-darken-2"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(selectedOrder.value.total_quantity)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(selectedOrder.value.total_quantity), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div></div><div class="uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-17ecad36${_scopeId5}><p class="font-bold" data-v-17ecad36${_scopeId5}>Status</p> ${ssrInterpolate(selectedOrder.value.status)} `);
                                      if (selectedOrder.value.source === "custom") {
                                        _push6(`<!--[--> (custom) <!--]-->`);
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                          createVNode("div", null, [
                                            createVNode("strong", null, toDisplayString(selectedOrder.value.initial) + toDisplayString(selectedOrder.value.number) + " ", 1),
                                            createVNode("span", { class: "text-blue" }, "(" + toDisplayString(selectedOrder.value.type) + ")", 1)
                                          ]),
                                          createVNode("p", null, [
                                            createVNode("span", null, toDisplayString(selectedOrder.value.full_name ?? "No name"), 1),
                                            selectedOrder.value.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(selectedOrder.value.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                          ]),
                                          createVNode("div", null, [
                                            createVNode("p", null, toDisplayString(selectedOrder.value.email ?? "no email"), 1),
                                            selectedOrder.value.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedOrder.value.phone), 1)) : createCommentVNode("", true)
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Amount"),
                                          createTextVNode(" $" + toDisplayString(selectedOrder.value.amount), 1)
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(selectedOrder.value.type === "catering" ? "Pickup" : "Delivery"), 1),
                                          createTextVNode(" " + toDisplayString(selectedOrder.value.datetime_formatted), 1)
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Items"),
                                          createVNode("div", null, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              color: "grey-darken-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(selectedOrder.value.total_quantity), 1)
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Status"),
                                          createTextVNode(" " + toDisplayString(selectedOrder.value.status) + " ", 1),
                                          selectedOrder.value.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                            createTextVNode(" (custom) ")
                                          ], 64)) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", null, [
                                    createVNode(_sfc_main$7, {
                                      cols: "2",
                                      md: "2",
                                      lg: "5",
                                      xl: "5",
                                      "2xl": "5",
                                      gap: "2"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                          createVNode("div", null, [
                                            createVNode("strong", null, toDisplayString(selectedOrder.value.initial) + toDisplayString(selectedOrder.value.number) + " ", 1),
                                            createVNode("span", { class: "text-blue" }, "(" + toDisplayString(selectedOrder.value.type) + ")", 1)
                                          ]),
                                          createVNode("p", null, [
                                            createVNode("span", null, toDisplayString(selectedOrder.value.full_name ?? "No name"), 1),
                                            selectedOrder.value.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(selectedOrder.value.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                          ]),
                                          createVNode("div", null, [
                                            createVNode("p", null, toDisplayString(selectedOrder.value.email ?? "no email"), 1),
                                            selectedOrder.value.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedOrder.value.phone), 1)) : createCommentVNode("", true)
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Amount"),
                                          createTextVNode(" $" + toDisplayString(selectedOrder.value.amount), 1)
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(selectedOrder.value.type === "catering" ? "Pickup" : "Delivery"), 1),
                                          createTextVNode(" " + toDisplayString(selectedOrder.value.datetime_formatted), 1)
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Items"),
                                          createVNode("div", null, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              color: "grey-darken-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(selectedOrder.value.total_quantity), 1)
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Status"),
                                          createTextVNode(" " + toDisplayString(selectedOrder.value.status) + " ", 1),
                                          selectedOrder.value.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                            createTextVNode(" (custom) ")
                                          ], 64)) : createCommentVNode("", true)
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div><div class="mb-5" data-v-17ecad36${_scopeId3}><p class="text-2xl font-bold mb-2" data-v-17ecad36${_scopeId3}>Order notes</p>`);
                          _push4(ssrRenderComponent(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="p-4" data-v-17ecad36${_scopeId4}>`);
                                if (editOrderNotes.value) {
                                  _push5(`<div class="mb-4" data-v-17ecad36${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_v_textarea, {
                                    modelValue: orderNotes.value,
                                    "onUpdate:modelValue": ($event) => orderNotes.value = $event,
                                    rows: "3",
                                    "auto-grow": "",
                                    "hide-details": ""
                                  }, null, _parent5, _scopeId4));
                                  _push5(`</div>`);
                                } else if (selectedOrder.value.notes) {
                                  _push5(`<p data-v-17ecad36${_scopeId4}>${selectedOrder.value.notes_formatted ?? ""}</p>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<div class="mt-2" data-v-17ecad36${_scopeId4}>`);
                                _push5(ssrRenderComponent(_sfc_main$4, {
                                  center: true,
                                  justify: "start"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      if (editOrderNotes.value) {
                                        _push6(`<div data-v-17ecad36${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_v_btn, {
                                          size: "small",
                                          onClick: updateOrderNotes
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`Save`);
                                            } else {
                                              return [
                                                createTextVNode("Save")
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(`<div data-v-17ecad36${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_v_btn, {
                                        size: "small",
                                        variant: "outlined",
                                        onClick: toggleEditOrderNotes
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(editOrderNotes.value ? "Cancel" : "Edit notes")}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(editOrderNotes.value ? "Cancel" : "Edit notes"), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        editOrderNotes.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                          createVNode(_component_v_btn, {
                                            size: "small",
                                            onClick: withModifiers(updateOrderNotes, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Save")
                                            ]),
                                            _: 1
                                          })
                                        ])) : createCommentVNode("", true),
                                        createVNode("div", null, [
                                          createVNode(_component_v_btn, {
                                            size: "small",
                                            variant: "outlined",
                                            onClick: withModifiers(toggleEditOrderNotes, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(editOrderNotes.value ? "Cancel" : "Edit notes"), 1)
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "p-4" }, [
                                    editOrderNotes.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mb-4"
                                    }, [
                                      createVNode(_component_v_textarea, {
                                        modelValue: orderNotes.value,
                                        "onUpdate:modelValue": ($event) => orderNotes.value = $event,
                                        rows: "3",
                                        "auto-grow": "",
                                        "hide-details": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ])) : selectedOrder.value.notes ? (openBlock(), createBlock("p", {
                                      key: 1,
                                      innerHTML: selectedOrder.value.notes_formatted
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode(_sfc_main$4, {
                                        center: true,
                                        justify: "start"
                                      }, {
                                        default: withCtx(() => [
                                          editOrderNotes.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              onClick: withModifiers(updateOrderNotes, ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Save")
                                              ]),
                                              _: 1
                                            })
                                          ])) : createCommentVNode("", true),
                                          createVNode("div", null, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              variant: "outlined",
                                              onClick: withModifiers(toggleEditOrderNotes, ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(editOrderNotes.value ? "Cancel" : "Edit notes"), 1)
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div><p class="text-2xl font-bold mb-2" data-v-17ecad36${_scopeId3}>Order items</p><div data-v-17ecad36${_scopeId3}>`);
                          _push4(ssrRenderComponent(_sfc_main$3, { gap: "4" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(selectedOrder.value.items, (item) => {
                                  _push5(`<div class="bg-grey-lighten-2 p-3" data-v-17ecad36${_scopeId4}><div class="flex lg:flex-row items-center justify-start gap-3 w-full" data-v-17ecad36${_scopeId4}><div class="hidden lg:flex shrink-0 w-[70px]" data-v-17ecad36${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_v_img, {
                                    "aspect-ratio": "1",
                                    src: item.thumbnail,
                                    cover: ""
                                  }, null, _parent5, _scopeId4));
                                  _push5(`</div><div class="grow" data-v-17ecad36${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_sfc_main$7, {
                                    cols: "1",
                                    md: "5",
                                    lg: "5",
                                    xl: "5",
                                    "2xl": "5",
                                    gap: "1"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="uppercase font-bold" data-v-17ecad36${_scopeId5}>${ssrInterpolate(item.product_name)}</div><div class="uppercase" data-v-17ecad36${_scopeId5}>${ssrInterpolate(item.variation_name)}</div><div class="uppercase" data-v-17ecad36${_scopeId5}>$${ssrInterpolate(item.variation_price)}</div><div class="uppercase" data-v-17ecad36${_scopeId5}>${ssrInterpolate(item.quantity)}</div><div class="uppercase" data-v-17ecad36${_scopeId5}>$${ssrInterpolate(item.amount)}</div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "uppercase font-bold" }, toDisplayString(item.product_name), 1),
                                          createVNode("div", { class: "uppercase" }, toDisplayString(item.variation_name), 1),
                                          createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.variation_price), 1),
                                          createVNode("div", { class: "uppercase" }, toDisplayString(item.quantity), 1),
                                          createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.amount), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</div></div>`);
                                  if (item.client_note) {
                                    _push5(`<div class="mt-2" data-v-17ecad36${_scopeId4}><p class="text-red" data-v-17ecad36${_scopeId4}>Client note</p>`);
                                    _push5(ssrRenderComponent(_component_v_textarea, {
                                      rows: "1",
                                      "auto-grow": "",
                                      "model-value": item.client_note,
                                      variant: "solo",
                                      flat: "",
                                      "bg-color": "red-lighten-3",
                                      "hide-details": "",
                                      readonly: ""
                                    }, null, _parent5, _scopeId4));
                                    _push5(`</div>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div>`);
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.items, (item) => {
                                    return openBlock(), createBlock("div", { class: "bg-grey-lighten-2 p-3" }, [
                                      createVNode("div", { class: "flex lg:flex-row items-center justify-start gap-3 w-full" }, [
                                        createVNode("div", { class: "hidden lg:flex shrink-0 w-[70px]" }, [
                                          createVNode(_component_v_img, {
                                            "aspect-ratio": "1",
                                            src: item.thumbnail,
                                            cover: ""
                                          }, null, 8, ["src"])
                                        ]),
                                        createVNode("div", { class: "grow" }, [
                                          createVNode(_sfc_main$7, {
                                            cols: "1",
                                            md: "5",
                                            lg: "5",
                                            xl: "5",
                                            "2xl": "5",
                                            gap: "1"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "uppercase font-bold" }, toDisplayString(item.product_name), 1),
                                              createVNode("div", { class: "uppercase" }, toDisplayString(item.variation_name), 1),
                                              createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.variation_price), 1),
                                              createVNode("div", { class: "uppercase" }, toDisplayString(item.quantity), 1),
                                              createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.amount), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ]),
                                      item.client_note ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "mt-2"
                                      }, [
                                        createVNode("p", { class: "text-red" }, "Client note"),
                                        createVNode(_component_v_textarea, {
                                          rows: "1",
                                          "auto-grow": "",
                                          "model-value": item.client_note,
                                          variant: "solo",
                                          flat: "",
                                          "bg-color": "red-lighten-3",
                                          "hide-details": "",
                                          readonly: ""
                                        }, null, 8, ["model-value"])
                                      ])) : createCommentVNode("", true)
                                    ]);
                                  }), 256))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "mb-5" }, [
                              createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order summary"),
                              createVNode(_component_v_card, null, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode(_sfc_main$7, {
                                      cols: "2",
                                      md: "2",
                                      lg: "5",
                                      xl: "5",
                                      "2xl": "5",
                                      gap: "2"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                          createVNode("div", null, [
                                            createVNode("strong", null, toDisplayString(selectedOrder.value.initial) + toDisplayString(selectedOrder.value.number) + " ", 1),
                                            createVNode("span", { class: "text-blue" }, "(" + toDisplayString(selectedOrder.value.type) + ")", 1)
                                          ]),
                                          createVNode("p", null, [
                                            createVNode("span", null, toDisplayString(selectedOrder.value.full_name ?? "No name"), 1),
                                            selectedOrder.value.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(selectedOrder.value.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                          ]),
                                          createVNode("div", null, [
                                            createVNode("p", null, toDisplayString(selectedOrder.value.email ?? "no email"), 1),
                                            selectedOrder.value.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedOrder.value.phone), 1)) : createCommentVNode("", true)
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Amount"),
                                          createTextVNode(" $" + toDisplayString(selectedOrder.value.amount), 1)
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(selectedOrder.value.type === "catering" ? "Pickup" : "Delivery"), 1),
                                          createTextVNode(" " + toDisplayString(selectedOrder.value.datetime_formatted), 1)
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Items"),
                                          createVNode("div", null, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              color: "grey-darken-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(selectedOrder.value.total_quantity), 1)
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Status"),
                                          createTextVNode(" " + toDisplayString(selectedOrder.value.status) + " ", 1),
                                          selectedOrder.value.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                            createTextVNode(" (custom) ")
                                          ], 64)) : createCommentVNode("", true)
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "mb-5" }, [
                              createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order notes"),
                              createVNode(_component_v_card, {
                                color: "grey-lighten-3",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-4" }, [
                                    editOrderNotes.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mb-4"
                                    }, [
                                      createVNode(_component_v_textarea, {
                                        modelValue: orderNotes.value,
                                        "onUpdate:modelValue": ($event) => orderNotes.value = $event,
                                        rows: "3",
                                        "auto-grow": "",
                                        "hide-details": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ])) : selectedOrder.value.notes ? (openBlock(), createBlock("p", {
                                      key: 1,
                                      innerHTML: selectedOrder.value.notes_formatted
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode(_sfc_main$4, {
                                        center: true,
                                        justify: "start"
                                      }, {
                                        default: withCtx(() => [
                                          editOrderNotes.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              onClick: withModifiers(updateOrderNotes, ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Save")
                                              ]),
                                              _: 1
                                            })
                                          ])) : createCommentVNode("", true),
                                          createVNode("div", null, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              variant: "outlined",
                                              onClick: withModifiers(toggleEditOrderNotes, ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(editOrderNotes.value ? "Cancel" : "Edit notes"), 1)
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order items"),
                            createVNode("div", null, [
                              createVNode(_sfc_main$3, { gap: "4" }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.items, (item) => {
                                    return openBlock(), createBlock("div", { class: "bg-grey-lighten-2 p-3" }, [
                                      createVNode("div", { class: "flex lg:flex-row items-center justify-start gap-3 w-full" }, [
                                        createVNode("div", { class: "hidden lg:flex shrink-0 w-[70px]" }, [
                                          createVNode(_component_v_img, {
                                            "aspect-ratio": "1",
                                            src: item.thumbnail,
                                            cover: ""
                                          }, null, 8, ["src"])
                                        ]),
                                        createVNode("div", { class: "grow" }, [
                                          createVNode(_sfc_main$7, {
                                            cols: "1",
                                            md: "5",
                                            lg: "5",
                                            xl: "5",
                                            "2xl": "5",
                                            gap: "1"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "uppercase font-bold" }, toDisplayString(item.product_name), 1),
                                              createVNode("div", { class: "uppercase" }, toDisplayString(item.variation_name), 1),
                                              createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.variation_price), 1),
                                              createVNode("div", { class: "uppercase" }, toDisplayString(item.quantity), 1),
                                              createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.amount), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ]),
                                      item.client_note ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "mt-2"
                                      }, [
                                        createVNode("p", { class: "text-red" }, "Client note"),
                                        createVNode(_component_v_textarea, {
                                          rows: "1",
                                          "auto-grow": "",
                                          "model-value": item.client_note,
                                          variant: "solo",
                                          flat: "",
                                          "bg-color": "red-lighten-3",
                                          "hide-details": "",
                                          readonly: ""
                                        }, null, 8, ["model-value"])
                                      ])) : createCommentVNode("", true)
                                    ]);
                                  }), 256))
                                ]),
                                _: 1
                              })
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$7, {
                      cols: "1",
                      md: "2",
                      lg: "2",
                      xl: "2",
                      "2xl": "2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="my-5 h-full bg-grey-lighten-2 px-3 py-2" data-v-17ecad36${_scopeId3}><p class="text-2xl font-bold mb-2" data-v-17ecad36${_scopeId3}>Order status</p>`);
                          _push4(ssrRenderComponent(_component_v_card, { color: "grey-lighten-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="p-1" data-v-17ecad36${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_v_radio_group, {
                                  modelValue: currentStatus.value,
                                  "onUpdate:modelValue": ($event) => currentStatus.value = $event,
                                  "hide-details": "",
                                  density: "comfortable"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(statuses.value, (status) => {
                                        _push6(`<div data-v-17ecad36${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_v_radio, {
                                          value: status,
                                          label: status,
                                          "hide-details": ""
                                        }, null, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(statuses.value, (status) => {
                                          return openBlock(), createBlock("div", null, [
                                            createVNode(_component_v_radio, {
                                              value: status,
                                              label: status,
                                              "hide-details": ""
                                            }, null, 8, ["value", "label"])
                                          ]);
                                        }), 256))
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "p-1" }, [
                                    createVNode(_component_v_radio_group, {
                                      modelValue: currentStatus.value,
                                      "onUpdate:modelValue": ($event) => currentStatus.value = $event,
                                      "hide-details": "",
                                      density: "comfortable"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(statuses.value, (status) => {
                                          return openBlock(), createBlock("div", null, [
                                            createVNode(_component_v_radio, {
                                              value: status,
                                              label: status,
                                              "hide-details": ""
                                            }, null, 8, ["value", "label"])
                                          ]);
                                        }), 256))
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div><div class="my-5 h-full bg-grey-lighten-2 px-3 py-2" data-v-17ecad36${_scopeId3}><p class="text-2xl font-bold mb-2" data-v-17ecad36${_scopeId3}>Payment</p><!--[-->`);
                          ssrRenderList(selectedOrder.value.payments, (payment) => {
                            _push4(ssrRenderComponent(_sfc_main$7, {
                              cols: "2",
                              md: "2",
                              lg: "2",
                              xl: "2",
                              "2xl": "2"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div data-v-17ecad36${_scopeId4}><p class="font-bold" data-v-17ecad36${_scopeId4}>Amount</p><div data-v-17ecad36${_scopeId4}><p data-v-17ecad36${_scopeId4}>${ssrInterpolate(payment.amount_display)}</p></div></div><div data-v-17ecad36${_scopeId4}><p class="font-bold" data-v-17ecad36${_scopeId4}>Captured</p><div data-v-17ecad36${_scopeId4}><p data-v-17ecad36${_scopeId4}>${ssrInterpolate(payment.amount_captured_display)}</p></div></div><div data-v-17ecad36${_scopeId4}><p class="font-bold" data-v-17ecad36${_scopeId4}>Card</p><div data-v-17ecad36${_scopeId4}><p data-v-17ecad36${_scopeId4}>...${ssrInterpolate(payment.card_last_4)}</p></div></div><div data-v-17ecad36${_scopeId4}><p class="font-bold" data-v-17ecad36${_scopeId4}>Status</p><div data-v-17ecad36${_scopeId4}><p data-v-17ecad36${_scopeId4}>${ssrInterpolate(payment.status)}</p></div></div>`);
                                } else {
                                  return [
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold" }, "Amount"),
                                      createVNode("div", null, [
                                        createVNode("p", null, toDisplayString(payment.amount_display), 1)
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold" }, "Captured"),
                                      createVNode("div", null, [
                                        createVNode("p", null, toDisplayString(payment.amount_captured_display), 1)
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold" }, "Card"),
                                      createVNode("div", null, [
                                        createVNode("p", null, "..." + toDisplayString(payment.card_last_4), 1)
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold" }, "Status"),
                                      createVNode("div", null, [
                                        createVNode("p", null, toDisplayString(payment.status), 1)
                                      ])
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "my-5 h-full bg-grey-lighten-2 px-3 py-2" }, [
                              createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order status"),
                              createVNode(_component_v_card, { color: "grey-lighten-2" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-1" }, [
                                    createVNode(_component_v_radio_group, {
                                      modelValue: currentStatus.value,
                                      "onUpdate:modelValue": ($event) => currentStatus.value = $event,
                                      "hide-details": "",
                                      density: "comfortable"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(statuses.value, (status) => {
                                          return openBlock(), createBlock("div", null, [
                                            createVNode(_component_v_radio, {
                                              value: status,
                                              label: status,
                                              "hide-details": ""
                                            }, null, 8, ["value", "label"])
                                          ]);
                                        }), 256))
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "my-5 h-full bg-grey-lighten-2 px-3 py-2" }, [
                              createVNode("p", { class: "text-2xl font-bold mb-2" }, "Payment"),
                              (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.payments, (payment) => {
                                return openBlock(), createBlock(_sfc_main$7, {
                                  cols: "2",
                                  md: "2",
                                  lg: "2",
                                  xl: "2",
                                  "2xl": "2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold" }, "Amount"),
                                      createVNode("div", null, [
                                        createVNode("p", null, toDisplayString(payment.amount_display), 1)
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold" }, "Captured"),
                                      createVNode("div", null, [
                                        createVNode("p", null, toDisplayString(payment.amount_captured_display), 1)
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold" }, "Card"),
                                      createVNode("div", null, [
                                        createVNode("p", null, "..." + toDisplayString(payment.card_last_4), 1)
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold" }, "Status"),
                                      createVNode("div", null, [
                                        createVNode("p", null, toDisplayString(payment.status), 1)
                                      ])
                                    ])
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 256))
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div data-v-17ecad36${_scopeId2}><div class="my-5" data-v-17ecad36${_scopeId2}><p class="text-2xl font-bold mb-2" data-v-17ecad36${_scopeId2}>Refunds</p>`);
                    _push3(ssrRenderComponent(_component_v_card, { color: "grey-lighten-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_card_item, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (selectedOrder.value.refunds.length > 0) {
                                  _push5(ssrRenderComponent(_component_v_table, { class: "bg-grey-lighten-2" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<thead data-v-17ecad36${_scopeId5}><tr data-v-17ecad36${_scopeId5}><th data-v-17ecad36${_scopeId5}>Amount</th><th data-v-17ecad36${_scopeId5}>Status</th></tr></thead><tbody data-v-17ecad36${_scopeId5}><!--[-->`);
                                        ssrRenderList(selectedOrder.value.refunds, (refund) => {
                                          _push6(`<tr data-v-17ecad36${_scopeId5}><td data-v-17ecad36${_scopeId5}><p data-v-17ecad36${_scopeId5}>${ssrInterpolate(refund.amount_display)}</p></td><td data-v-17ecad36${_scopeId5}><p data-v-17ecad36${_scopeId5}>${ssrInterpolate(refund.status)}</p></td></tr>`);
                                        });
                                        _push6(`<!--]--></tbody>`);
                                      } else {
                                        return [
                                          createVNode("thead", null, [
                                            createVNode("tr", null, [
                                              createVNode("th", null, "Amount"),
                                              createVNode("th", null, "Status")
                                            ])
                                          ]),
                                          createVNode("tbody", null, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.refunds, (refund) => {
                                              return openBlock(), createBlock("tr", null, [
                                                createVNode("td", null, [
                                                  createVNode("p", null, toDisplayString(refund.amount_display), 1)
                                                ]),
                                                createVNode("td", null, [
                                                  createVNode("p", null, toDisplayString(refund.status), 1)
                                                ])
                                              ]);
                                            }), 256))
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<div data-v-17ecad36${_scopeId4}><p data-v-17ecad36${_scopeId4}>There are no refunds to show for this order</p></div>`);
                                }
                              } else {
                                return [
                                  selectedOrder.value.refunds.length > 0 ? (openBlock(), createBlock(_component_v_table, {
                                    key: 0,
                                    class: "bg-grey-lighten-2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("thead", null, [
                                        createVNode("tr", null, [
                                          createVNode("th", null, "Amount"),
                                          createVNode("th", null, "Status")
                                        ])
                                      ]),
                                      createVNode("tbody", null, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.refunds, (refund) => {
                                          return openBlock(), createBlock("tr", null, [
                                            createVNode("td", null, [
                                              createVNode("p", null, toDisplayString(refund.amount_display), 1)
                                            ]),
                                            createVNode("td", null, [
                                              createVNode("p", null, toDisplayString(refund.status), 1)
                                            ])
                                          ]);
                                        }), 256))
                                      ])
                                    ]),
                                    _: 1
                                  })) : (openBlock(), createBlock("div", { key: 1 }, [
                                    createVNode("p", null, "There are no refunds to show for this order")
                                  ]))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_card_item, null, {
                              default: withCtx(() => [
                                selectedOrder.value.refunds.length > 0 ? (openBlock(), createBlock(_component_v_table, {
                                  key: 0,
                                  class: "bg-grey-lighten-2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("thead", null, [
                                      createVNode("tr", null, [
                                        createVNode("th", null, "Amount"),
                                        createVNode("th", null, "Status")
                                      ])
                                    ]),
                                    createVNode("tbody", null, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.refunds, (refund) => {
                                        return openBlock(), createBlock("tr", null, [
                                          createVNode("td", null, [
                                            createVNode("p", null, toDisplayString(refund.amount_display), 1)
                                          ]),
                                          createVNode("td", null, [
                                            createVNode("p", null, toDisplayString(refund.status), 1)
                                          ])
                                        ]);
                                      }), 256))
                                    ])
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock("div", { key: 1 }, [
                                  createVNode("p", null, "There are no refunds to show for this order")
                                ]))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (showRefunds.value) {
                      _push3(`<div class="mt-5" data-v-17ecad36${_scopeId2}><div class="flex flex-col lg:flex-row items-center gap-2 w-full" data-v-17ecad36${_scopeId2}><div class="grow w-full" data-v-17ecad36${_scopeId2}><div class="grid grid-cols-1 lg:grid-cols-2 gap-3" data-v-17ecad36${_scopeId2}><div class="w-full" data-v-17ecad36${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_text_field, {
                        disabled: selectedOrder.value.refundable_stripe <= 0,
                        modelValue: refundForm.stripe,
                        "onUpdate:modelValue": ($event) => refundForm.stripe = $event,
                        label: `Online payment refundable (USD): ${selectedOrder.value.refundable_stripe}`,
                        class: "w-full",
                        "hide-details": ""
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div data-v-17ecad36${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_text_field, {
                        disabled: selectedOrder.value.refundable_gift_card <= 0,
                        modelValue: refundForm.gift_card,
                        "onUpdate:modelValue": ($event) => refundForm.gift_card = $event,
                        label: `Gift card amount refundable (USD): ${selectedOrder.value.refundable_gift_card}`,
                        class: "w-full",
                        "hide-details": ""
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div></div><div class="shrink-0" data-v-17ecad36${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_btn, {
                        onClick: initiateRefund,
                        disabled: isRefunding.value
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(isRefunding.value ? "Processing..." : "Initiate refund")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(isRefunding.value ? "Processing..." : "Initiate refund"), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div></div><div class="flex flex-row items-center justify-center w-full" data-v-17ecad36${_scopeId2}><div data-v-17ecad36${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_checkbox, {
                        modelValue: refundForm.confirm,
                        "onUpdate:modelValue": ($event) => refundForm.confirm = $event,
                        label: "Confirm that you want to proceed with the refund",
                        "hide-details": ""
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                    if (Object.keys(local_errors.value).length) {
                      _push3(`<div class="flex flex-col justify-center" data-v-17ecad36${_scopeId2}><!--[-->`);
                      ssrRenderList(Object.values(local_errors.value), (error, index) => {
                        _push3(`<p class="text-red w-full text-center" data-v-17ecad36${_scopeId2}>${ssrInterpolate(error)}</p>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex flex-row justify-center items-center gap-2 w-full my-5" data-v-17ecad36${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_btn, {
                      onClick: toggleRefunds,
                      color: "grey-darken-2",
                      variant: "plain"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(`${showRefunds.value ? "Hide" : "Show"}`)} refund form`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(`${showRefunds.value ? "Hide" : "Show"}`) + " refund form", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    selectedOrder.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col gap-3"
                    }, [
                      createVNode(_component_v_card, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "mb-5" }, [
                            createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order summary"),
                            createVNode(_component_v_card, null, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode(_sfc_main$7, {
                                    cols: "2",
                                    md: "2",
                                    lg: "5",
                                    xl: "5",
                                    "2xl": "5",
                                    gap: "2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                        createVNode("div", null, [
                                          createVNode("strong", null, toDisplayString(selectedOrder.value.initial) + toDisplayString(selectedOrder.value.number) + " ", 1),
                                          createVNode("span", { class: "text-blue" }, "(" + toDisplayString(selectedOrder.value.type) + ")", 1)
                                        ]),
                                        createVNode("p", null, [
                                          createVNode("span", null, toDisplayString(selectedOrder.value.full_name ?? "No name"), 1),
                                          selectedOrder.value.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(selectedOrder.value.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("p", null, toDisplayString(selectedOrder.value.email ?? "no email"), 1),
                                          selectedOrder.value.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedOrder.value.phone), 1)) : createCommentVNode("", true)
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                        createVNode("p", { class: "font-bold" }, "Amount"),
                                        createTextVNode(" $" + toDisplayString(selectedOrder.value.amount), 1)
                                      ]),
                                      createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                        createVNode("p", { class: "font-bold" }, toDisplayString(selectedOrder.value.type === "catering" ? "Pickup" : "Delivery"), 1),
                                        createTextVNode(" " + toDisplayString(selectedOrder.value.datetime_formatted), 1)
                                      ]),
                                      createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                        createVNode("p", { class: "font-bold" }, "Items"),
                                        createVNode("div", null, [
                                          createVNode(_component_v_btn, {
                                            size: "small",
                                            color: "grey-darken-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(selectedOrder.value.total_quantity), 1)
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                        createVNode("p", { class: "font-bold" }, "Status"),
                                        createTextVNode(" " + toDisplayString(selectedOrder.value.status) + " ", 1),
                                        selectedOrder.value.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                          createTextVNode(" (custom) ")
                                        ], 64)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "mb-5" }, [
                            createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order notes"),
                            createVNode(_component_v_card, {
                              color: "grey-lighten-3",
                              rounded: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-4" }, [
                                  editOrderNotes.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mb-4"
                                  }, [
                                    createVNode(_component_v_textarea, {
                                      modelValue: orderNotes.value,
                                      "onUpdate:modelValue": ($event) => orderNotes.value = $event,
                                      rows: "3",
                                      "auto-grow": "",
                                      "hide-details": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])) : selectedOrder.value.notes ? (openBlock(), createBlock("p", {
                                    key: 1,
                                    innerHTML: selectedOrder.value.notes_formatted
                                  }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                  createVNode("div", { class: "mt-2" }, [
                                    createVNode(_sfc_main$4, {
                                      center: true,
                                      justify: "start"
                                    }, {
                                      default: withCtx(() => [
                                        editOrderNotes.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                          createVNode(_component_v_btn, {
                                            size: "small",
                                            onClick: withModifiers(updateOrderNotes, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Save")
                                            ]),
                                            _: 1
                                          })
                                        ])) : createCommentVNode("", true),
                                        createVNode("div", null, [
                                          createVNode(_component_v_btn, {
                                            size: "small",
                                            variant: "outlined",
                                            onClick: withModifiers(toggleEditOrderNotes, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(editOrderNotes.value ? "Cancel" : "Edit notes"), 1)
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order items"),
                          createVNode("div", null, [
                            createVNode(_sfc_main$3, { gap: "4" }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.items, (item) => {
                                  return openBlock(), createBlock("div", { class: "bg-grey-lighten-2 p-3" }, [
                                    createVNode("div", { class: "flex lg:flex-row items-center justify-start gap-3 w-full" }, [
                                      createVNode("div", { class: "hidden lg:flex shrink-0 w-[70px]" }, [
                                        createVNode(_component_v_img, {
                                          "aspect-ratio": "1",
                                          src: item.thumbnail,
                                          cover: ""
                                        }, null, 8, ["src"])
                                      ]),
                                      createVNode("div", { class: "grow" }, [
                                        createVNode(_sfc_main$7, {
                                          cols: "1",
                                          md: "5",
                                          lg: "5",
                                          xl: "5",
                                          "2xl": "5",
                                          gap: "1"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "uppercase font-bold" }, toDisplayString(item.product_name), 1),
                                            createVNode("div", { class: "uppercase" }, toDisplayString(item.variation_name), 1),
                                            createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.variation_price), 1),
                                            createVNode("div", { class: "uppercase" }, toDisplayString(item.quantity), 1),
                                            createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.amount), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]),
                                    item.client_note ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-2"
                                    }, [
                                      createVNode("p", { class: "text-red" }, "Client note"),
                                      createVNode(_component_v_textarea, {
                                        rows: "1",
                                        "auto-grow": "",
                                        "model-value": item.client_note,
                                        variant: "solo",
                                        flat: "",
                                        "bg-color": "red-lighten-3",
                                        "hide-details": "",
                                        readonly: ""
                                      }, null, 8, ["model-value"])
                                    ])) : createCommentVNode("", true)
                                  ]);
                                }), 256))
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$7, {
                        cols: "1",
                        md: "2",
                        lg: "2",
                        xl: "2",
                        "2xl": "2"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "my-5 h-full bg-grey-lighten-2 px-3 py-2" }, [
                            createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order status"),
                            createVNode(_component_v_card, { color: "grey-lighten-2" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-1" }, [
                                  createVNode(_component_v_radio_group, {
                                    modelValue: currentStatus.value,
                                    "onUpdate:modelValue": ($event) => currentStatus.value = $event,
                                    "hide-details": "",
                                    density: "comfortable"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(statuses.value, (status) => {
                                        return openBlock(), createBlock("div", null, [
                                          createVNode(_component_v_radio, {
                                            value: status,
                                            label: status,
                                            "hide-details": ""
                                          }, null, 8, ["value", "label"])
                                        ]);
                                      }), 256))
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "my-5 h-full bg-grey-lighten-2 px-3 py-2" }, [
                            createVNode("p", { class: "text-2xl font-bold mb-2" }, "Payment"),
                            (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.payments, (payment) => {
                              return openBlock(), createBlock(_sfc_main$7, {
                                cols: "2",
                                md: "2",
                                lg: "2",
                                xl: "2",
                                "2xl": "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-bold" }, "Amount"),
                                    createVNode("div", null, [
                                      createVNode("p", null, toDisplayString(payment.amount_display), 1)
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-bold" }, "Captured"),
                                    createVNode("div", null, [
                                      createVNode("p", null, toDisplayString(payment.amount_captured_display), 1)
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-bold" }, "Card"),
                                    createVNode("div", null, [
                                      createVNode("p", null, "..." + toDisplayString(payment.card_last_4), 1)
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-bold" }, "Status"),
                                    createVNode("div", null, [
                                      createVNode("p", null, toDisplayString(payment.status), 1)
                                    ])
                                  ])
                                ]),
                                _: 2
                              }, 1024);
                            }), 256))
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode("div", null, [
                        createVNode("div", { class: "my-5" }, [
                          createVNode("p", { class: "text-2xl font-bold mb-2" }, "Refunds"),
                          createVNode(_component_v_card, { color: "grey-lighten-2" }, {
                            default: withCtx(() => [
                              createVNode(_component_v_card_item, null, {
                                default: withCtx(() => [
                                  selectedOrder.value.refunds.length > 0 ? (openBlock(), createBlock(_component_v_table, {
                                    key: 0,
                                    class: "bg-grey-lighten-2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("thead", null, [
                                        createVNode("tr", null, [
                                          createVNode("th", null, "Amount"),
                                          createVNode("th", null, "Status")
                                        ])
                                      ]),
                                      createVNode("tbody", null, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.refunds, (refund) => {
                                          return openBlock(), createBlock("tr", null, [
                                            createVNode("td", null, [
                                              createVNode("p", null, toDisplayString(refund.amount_display), 1)
                                            ]),
                                            createVNode("td", null, [
                                              createVNode("p", null, toDisplayString(refund.status), 1)
                                            ])
                                          ]);
                                        }), 256))
                                      ])
                                    ]),
                                    _: 1
                                  })) : (openBlock(), createBlock("div", { key: 1 }, [
                                    createVNode("p", null, "There are no refunds to show for this order")
                                  ]))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          showRefunds.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-5"
                          }, [
                            createVNode("div", { class: "flex flex-col lg:flex-row items-center gap-2 w-full" }, [
                              createVNode("div", { class: "grow w-full" }, [
                                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-3" }, [
                                  createVNode("div", { class: "w-full" }, [
                                    createVNode(_component_v_text_field, {
                                      disabled: selectedOrder.value.refundable_stripe <= 0,
                                      modelValue: refundForm.stripe,
                                      "onUpdate:modelValue": ($event) => refundForm.stripe = $event,
                                      label: `Online payment refundable (USD): ${selectedOrder.value.refundable_stripe}`,
                                      class: "w-full",
                                      "hide-details": ""
                                    }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "label"])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode(_component_v_text_field, {
                                      disabled: selectedOrder.value.refundable_gift_card <= 0,
                                      modelValue: refundForm.gift_card,
                                      "onUpdate:modelValue": ($event) => refundForm.gift_card = $event,
                                      label: `Gift card amount refundable (USD): ${selectedOrder.value.refundable_gift_card}`,
                                      class: "w-full",
                                      "hide-details": ""
                                    }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "label"])
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "shrink-0" }, [
                                createVNode(_component_v_btn, {
                                  onClick: withModifiers(initiateRefund, ["prevent"]),
                                  disabled: isRefunding.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(isRefunding.value ? "Processing..." : "Initiate refund"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ])
                            ]),
                            createVNode("div", { class: "flex flex-row items-center justify-center w-full" }, [
                              createVNode("div", null, [
                                createVNode(_component_v_checkbox, {
                                  modelValue: refundForm.confirm,
                                  "onUpdate:modelValue": ($event) => refundForm.confirm = $event,
                                  label: "Confirm that you want to proceed with the refund",
                                  "hide-details": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        Object.keys(local_errors.value).length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex flex-col justify-center"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(Object.values(local_errors.value), (error, index) => {
                            return openBlock(), createBlock("p", {
                              class: "text-red w-full text-center",
                              key: index
                            }, toDisplayString(error), 1);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex flex-row justify-center items-center gap-2 w-full my-5" }, [
                          createVNode(_component_v_btn, {
                            onClick: withModifiers(toggleRefunds, ["prevent"]),
                            color: "grey-darken-2",
                            variant: "plain"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(`${showRefunds.value ? "Hide" : "Show"}`) + " refund form", 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$5, { onClick: updateOrder }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(saveButtonText.value)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(saveButtonText.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$6, { onClick: closeOrder }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`close`);
                            } else {
                              return [
                                createTextVNode("close")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$5, { onClick: updateOrder }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(saveButtonText.value), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$6, { onClick: closeOrder }, {
                            default: withCtx(() => [
                              createTextVNode("close")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4, null, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$5, { onClick: updateOrder }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(saveButtonText.value), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$6, { onClick: closeOrder }, {
                          default: withCtx(() => [
                            createTextVNode("close")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "customOrderModal",
              ref: customOrderModal,
              errors: props.errors
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showClientNotesModal.value,
              onClose: closeClientNotesModal,
              maxWidth: "2xl"
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(` Client Notes - Order ${ssrInterpolate((_a = selectedOrderForClientNotes.value) == null ? void 0 : _a.initial)}${ssrInterpolate((_b = selectedOrderForClientNotes.value) == null ? void 0 : _b.number)}`);
                } else {
                  return [
                    createTextVNode(" Client Notes - Order " + toDisplayString((_c = selectedOrderForClientNotes.value) == null ? void 0 : _c.initial) + toDisplayString((_d = selectedOrderForClientNotes.value) == null ? void 0 : _d.number), 1)
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (selectedOrderForClientNotes.value) {
                    _push3(`<div class="flex flex-col gap-3" data-v-17ecad36${_scopeId2}>`);
                    if (selectedOrderForClientNotes.value.notes) {
                      _push3(`<div class="mb-4" data-v-17ecad36${_scopeId2}><p class="text-2xl font-bold mb-2" data-v-17ecad36${_scopeId2}>Order Notes</p>`);
                      _push3(ssrRenderComponent(_component_v_card, {
                        color: "grey-lighten-3",
                        rounded: "lg"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="p-4" data-v-17ecad36${_scopeId3}><p data-v-17ecad36${_scopeId3}>${(selectedOrderForClientNotes.value.notes_formatted || selectedOrderForClientNotes.value.notes) ?? ""}</p></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "p-4" }, [
                                createVNode("p", {
                                  innerHTML: selectedOrderForClientNotes.value.notes_formatted || selectedOrderForClientNotes.value.notes
                                }, null, 8, ["innerHTML"])
                              ])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (selectedOrderForClientNotes.value.items && selectedOrderForClientNotes.value.items.length > 0) {
                      _push3(`<div data-v-17ecad36${_scopeId2}><p class="text-2xl font-bold mb-2" data-v-17ecad36${_scopeId2}>Item Client Notes</p>`);
                      _push3(ssrRenderComponent(_sfc_main$3, { gap: "4" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(selectedOrderForClientNotes.value.items, (item) => {
                              _push4(`<!--[-->`);
                              if (item.client_note) {
                                _push4(`<div class="bg-grey-lighten-2 p-4 rounded-lg" data-v-17ecad36${_scopeId3}><div class="flex flex-row items-start gap-3" data-v-17ecad36${_scopeId3}><div class="hidden lg:flex shrink-0 w-[70px]" data-v-17ecad36${_scopeId3}>`);
                                if (item.thumbnail) {
                                  _push4(ssrRenderComponent(_component_v_img, {
                                    "aspect-ratio": "1",
                                    src: item.thumbnail,
                                    cover: ""
                                  }, null, _parent4, _scopeId3));
                                } else {
                                  _push4(`<!---->`);
                                }
                                _push4(`</div><div class="grow" data-v-17ecad36${_scopeId3}><div class="mb-2" data-v-17ecad36${_scopeId3}><p class="font-bold text-lg" data-v-17ecad36${_scopeId3}>${ssrInterpolate(item.product_name)}</p><p class="text-sm text-grey-darken-1" data-v-17ecad36${_scopeId3}>${ssrInterpolate(item.variation_name)}</p><p class="text-xs text-grey-darken-2" data-v-17ecad36${_scopeId3}>Quantity: ${ssrInterpolate(item.quantity)}</p></div><div class="mt-3" data-v-17ecad36${_scopeId3}><p class="text-red font-bold mb-1" data-v-17ecad36${_scopeId3}>Client Note:</p>`);
                                _push4(ssrRenderComponent(_component_v_textarea, {
                                  rows: "2",
                                  "auto-grow": "",
                                  "model-value": item.client_note,
                                  variant: "solo",
                                  flat: "",
                                  "bg-color": "red-lighten-3",
                                  "hide-details": "",
                                  readonly: ""
                                }, null, _parent4, _scopeId3));
                                _push4(`</div></div></div></div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`<!--]-->`);
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(selectedOrderForClientNotes.value.items, (item) => {
                                return openBlock(), createBlock(Fragment, {
                                  key: item.id || item.uid
                                }, [
                                  item.client_note ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "bg-grey-lighten-2 p-4 rounded-lg"
                                  }, [
                                    createVNode("div", { class: "flex flex-row items-start gap-3" }, [
                                      createVNode("div", { class: "hidden lg:flex shrink-0 w-[70px]" }, [
                                        item.thumbnail ? (openBlock(), createBlock(_component_v_img, {
                                          key: 0,
                                          "aspect-ratio": "1",
                                          src: item.thumbnail,
                                          cover: ""
                                        }, null, 8, ["src"])) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", { class: "grow" }, [
                                        createVNode("div", { class: "mb-2" }, [
                                          createVNode("p", { class: "font-bold text-lg" }, toDisplayString(item.product_name), 1),
                                          createVNode("p", { class: "text-sm text-grey-darken-1" }, toDisplayString(item.variation_name), 1),
                                          createVNode("p", { class: "text-xs text-grey-darken-2" }, "Quantity: " + toDisplayString(item.quantity), 1)
                                        ]),
                                        createVNode("div", { class: "mt-3" }, [
                                          createVNode("p", { class: "text-red font-bold mb-1" }, "Client Note:"),
                                          createVNode(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            "model-value": item.client_note,
                                            variant: "solo",
                                            flat: "",
                                            "bg-color": "red-lighten-3",
                                            "hide-details": "",
                                            readonly: ""
                                          }, null, 8, ["model-value"])
                                        ])
                                      ])
                                    ])
                                  ])) : createCommentVNode("", true)
                                ], 64);
                              }), 128))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (!selectedOrderForClientNotes.value.notes && (!selectedOrderForClientNotes.value.items || !selectedOrderForClientNotes.value.items.some((item) => item.client_note))) {
                      _push3(`<div class="text-center py-4" data-v-17ecad36${_scopeId2}><p class="text-grey" data-v-17ecad36${_scopeId2}>No notes found for this order.</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    selectedOrderForClientNotes.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col gap-3"
                    }, [
                      selectedOrderForClientNotes.value.notes ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-4"
                      }, [
                        createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order Notes"),
                        createVNode(_component_v_card, {
                          color: "grey-lighten-3",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "p-4" }, [
                              createVNode("p", {
                                innerHTML: selectedOrderForClientNotes.value.notes_formatted || selectedOrderForClientNotes.value.notes
                              }, null, 8, ["innerHTML"])
                            ])
                          ]),
                          _: 1
                        })
                      ])) : createCommentVNode("", true),
                      selectedOrderForClientNotes.value.items && selectedOrderForClientNotes.value.items.length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("p", { class: "text-2xl font-bold mb-2" }, "Item Client Notes"),
                        createVNode(_sfc_main$3, { gap: "4" }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(selectedOrderForClientNotes.value.items, (item) => {
                              return openBlock(), createBlock(Fragment, {
                                key: item.id || item.uid
                              }, [
                                item.client_note ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "bg-grey-lighten-2 p-4 rounded-lg"
                                }, [
                                  createVNode("div", { class: "flex flex-row items-start gap-3" }, [
                                    createVNode("div", { class: "hidden lg:flex shrink-0 w-[70px]" }, [
                                      item.thumbnail ? (openBlock(), createBlock(_component_v_img, {
                                        key: 0,
                                        "aspect-ratio": "1",
                                        src: item.thumbnail,
                                        cover: ""
                                      }, null, 8, ["src"])) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "grow" }, [
                                      createVNode("div", { class: "mb-2" }, [
                                        createVNode("p", { class: "font-bold text-lg" }, toDisplayString(item.product_name), 1),
                                        createVNode("p", { class: "text-sm text-grey-darken-1" }, toDisplayString(item.variation_name), 1),
                                        createVNode("p", { class: "text-xs text-grey-darken-2" }, "Quantity: " + toDisplayString(item.quantity), 1)
                                      ]),
                                      createVNode("div", { class: "mt-3" }, [
                                        createVNode("p", { class: "text-red font-bold mb-1" }, "Client Note:"),
                                        createVNode(_component_v_textarea, {
                                          rows: "2",
                                          "auto-grow": "",
                                          "model-value": item.client_note,
                                          variant: "solo",
                                          flat: "",
                                          "bg-color": "red-lighten-3",
                                          "hide-details": "",
                                          readonly: ""
                                        }, null, 8, ["model-value"])
                                      ])
                                    ])
                                  ])
                                ])) : createCommentVNode("", true)
                              ], 64);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ])) : createCommentVNode("", true),
                      !selectedOrderForClientNotes.value.notes && (!selectedOrderForClientNotes.value.items || !selectedOrderForClientNotes.value.items.some((item) => item.client_note)) ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "text-center py-4"
                      }, [
                        createVNode("p", { class: "text-grey" }, "No notes found for this order.")
                      ])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$6, { onClick: closeClientNotesModal }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Close`);
                      } else {
                        return [
                          createTextVNode("Close")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$6, { onClick: closeClientNotesModal }, {
                      default: withCtx(() => [
                        createTextVNode("Close")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "flex flex-row flex-wrap gap-3 mb-5" }, [
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.orders")), ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Paid orders " + toDisplayString(`(${props.paid_count})`), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.orders_ready")), ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Ready orders " + toDisplayString(`(${props.ready_count})`), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.orders_completed")), ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Completed orders " + toDisplayString(`(${props.completed_count})`), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.orders_canceled")), ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Canceled orders " + toDisplayString(`(${props.canceled_count})`), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_v_btn, {
                  onClick: withModifiers(createCustomOrder, ["prevent"]),
                  variant: "tonal",
                  "prepend-icon": "mdi-plus-circle-outline"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Custom order")
                  ]),
                  _: 1
                })
              ]),
              props.orders.data.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col gap-7 md:gap-3 text-sm"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(props.orders.data, (order) => {
                  return openBlock(), createBlock(_component_v_card, null, {
                    default: withCtx(() => [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$7, {
                            cols: "2",
                            md: "2",
                            lg: "5",
                            xl: "5",
                            "2xl": "5",
                            gap: "2"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                createVNode("div", null, [
                                  createVNode("strong", null, toDisplayString(order.initial) + toDisplayString(order.number) + " ", 1),
                                  createVNode("span", { class: "text-blue" }, "(" + toDisplayString(order.type) + ")", 1)
                                ]),
                                createVNode("p", null, [
                                  createVNode("span", null, toDisplayString(order.full_name ?? "No name"), 1),
                                  order.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(order.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                ]),
                                createVNode("div", { class: "flex flex-row flex-wrap items-center gap-0" }, [
                                  createVNode("p", null, toDisplayString(order.email ?? "no email"), 1),
                                  order.phone ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-circle-small")
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  order.phone ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(order.phone), 1)) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                createVNode("p", { class: "font-bold" }, "Amount"),
                                createTextVNode(" $" + toDisplayString(order.amount), 1)
                              ]),
                              createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                createVNode(_sfc_main$4, {
                                  center: true,
                                  justify: "start"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "font-bold" }, toDisplayString(order.type === "catering" ? "Pickup" : "Delivery"), 1),
                                    hasNotesOrClientNotes(order) ? (openBlock(), createBlock(_component_v_icon, {
                                      key: 0,
                                      class: "bg-red text-white rounded-circle cursor-pointer",
                                      onClick: withModifiers(($event) => openClientNotesModal(order), ["prevent"]),
                                      style: { "cursor": "pointer" }
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" mdi-pencil-circle ")
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1024),
                                createTextVNode(" " + toDisplayString(order.datetime_formatted), 1)
                              ]),
                              createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                createVNode("p", { class: "font-bold" }, "Items"),
                                createVNode("div", null, [
                                  createVNode(_component_v_btn, {
                                    onClick: withModifiers(($event) => openOrder(order), ["prevent"]),
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(order.total_quantity), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                createVNode("p", { class: "font-bold" }, "Status"),
                                createTextVNode(" " + toDisplayString(order.status) + " ", 1),
                                order.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createTextVNode(" (custom) ")
                                ], 64)) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024);
                }), 256)),
                createVNode("div", null, [
                  createVNode(_sfc_main$8, {
                    entities: props.orders
                  }, null, 8, ["entities"])
                ])
              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode("p", null, "There are no orders to show here at the moment.")
              ])),
              createVNode(_sfc_main$2, {
                show: showOrderModal.value,
                onClose: closeOrder,
                maxWidth: "6xl"
              }, {
                title: withCtx(() => [
                  createTextVNode(toDisplayString(modalTitle.value), 1)
                ]),
                content: withCtx(() => [
                  selectedOrder.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col gap-3"
                  }, [
                    createVNode(_component_v_card, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "mb-5" }, [
                          createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order summary"),
                          createVNode(_component_v_card, null, {
                            default: withCtx(() => [
                              createVNode("div", null, [
                                createVNode(_sfc_main$7, {
                                  cols: "2",
                                  md: "2",
                                  lg: "5",
                                  xl: "5",
                                  "2xl": "5",
                                  gap: "2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                      createVNode("div", null, [
                                        createVNode("strong", null, toDisplayString(selectedOrder.value.initial) + toDisplayString(selectedOrder.value.number) + " ", 1),
                                        createVNode("span", { class: "text-blue" }, "(" + toDisplayString(selectedOrder.value.type) + ")", 1)
                                      ]),
                                      createVNode("p", null, [
                                        createVNode("span", null, toDisplayString(selectedOrder.value.full_name ?? "No name"), 1),
                                        selectedOrder.value.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(selectedOrder.value.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("p", null, toDisplayString(selectedOrder.value.email ?? "no email"), 1),
                                        selectedOrder.value.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedOrder.value.phone), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, "Amount"),
                                      createTextVNode(" $" + toDisplayString(selectedOrder.value.amount), 1)
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, toDisplayString(selectedOrder.value.type === "catering" ? "Pickup" : "Delivery"), 1),
                                      createTextVNode(" " + toDisplayString(selectedOrder.value.datetime_formatted), 1)
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, "Items"),
                                      createVNode("div", null, [
                                        createVNode(_component_v_btn, {
                                          size: "small",
                                          color: "grey-darken-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(selectedOrder.value.total_quantity), 1)
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, "Status"),
                                      createTextVNode(" " + toDisplayString(selectedOrder.value.status) + " ", 1),
                                      selectedOrder.value.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createTextVNode(" (custom) ")
                                      ], 64)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "mb-5" }, [
                          createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order notes"),
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                editOrderNotes.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mb-4"
                                }, [
                                  createVNode(_component_v_textarea, {
                                    modelValue: orderNotes.value,
                                    "onUpdate:modelValue": ($event) => orderNotes.value = $event,
                                    rows: "3",
                                    "auto-grow": "",
                                    "hide-details": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])) : selectedOrder.value.notes ? (openBlock(), createBlock("p", {
                                  key: 1,
                                  innerHTML: selectedOrder.value.notes_formatted
                                }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode(_sfc_main$4, {
                                    center: true,
                                    justify: "start"
                                  }, {
                                    default: withCtx(() => [
                                      editOrderNotes.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                        createVNode(_component_v_btn, {
                                          size: "small",
                                          onClick: withModifiers(updateOrderNotes, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Save")
                                          ]),
                                          _: 1
                                        })
                                      ])) : createCommentVNode("", true),
                                      createVNode("div", null, [
                                        createVNode(_component_v_btn, {
                                          size: "small",
                                          variant: "outlined",
                                          onClick: withModifiers(toggleEditOrderNotes, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(editOrderNotes.value ? "Cancel" : "Edit notes"), 1)
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order items"),
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, { gap: "4" }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.items, (item) => {
                                return openBlock(), createBlock("div", { class: "bg-grey-lighten-2 p-3" }, [
                                  createVNode("div", { class: "flex lg:flex-row items-center justify-start gap-3 w-full" }, [
                                    createVNode("div", { class: "hidden lg:flex shrink-0 w-[70px]" }, [
                                      createVNode(_component_v_img, {
                                        "aspect-ratio": "1",
                                        src: item.thumbnail,
                                        cover: ""
                                      }, null, 8, ["src"])
                                    ]),
                                    createVNode("div", { class: "grow" }, [
                                      createVNode(_sfc_main$7, {
                                        cols: "1",
                                        md: "5",
                                        lg: "5",
                                        xl: "5",
                                        "2xl": "5",
                                        gap: "1"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "uppercase font-bold" }, toDisplayString(item.product_name), 1),
                                          createVNode("div", { class: "uppercase" }, toDisplayString(item.variation_name), 1),
                                          createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.variation_price), 1),
                                          createVNode("div", { class: "uppercase" }, toDisplayString(item.quantity), 1),
                                          createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.amount), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ])
                                  ]),
                                  item.client_note ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mt-2"
                                  }, [
                                    createVNode("p", { class: "text-red" }, "Client note"),
                                    createVNode(_component_v_textarea, {
                                      rows: "1",
                                      "auto-grow": "",
                                      "model-value": item.client_note,
                                      variant: "solo",
                                      flat: "",
                                      "bg-color": "red-lighten-3",
                                      "hide-details": "",
                                      readonly: ""
                                    }, null, 8, ["model-value"])
                                  ])) : createCommentVNode("", true)
                                ]);
                              }), 256))
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$7, {
                      cols: "1",
                      md: "2",
                      lg: "2",
                      xl: "2",
                      "2xl": "2"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "my-5 h-full bg-grey-lighten-2 px-3 py-2" }, [
                          createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order status"),
                          createVNode(_component_v_card, { color: "grey-lighten-2" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-1" }, [
                                createVNode(_component_v_radio_group, {
                                  modelValue: currentStatus.value,
                                  "onUpdate:modelValue": ($event) => currentStatus.value = $event,
                                  "hide-details": "",
                                  density: "comfortable"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(statuses.value, (status) => {
                                      return openBlock(), createBlock("div", null, [
                                        createVNode(_component_v_radio, {
                                          value: status,
                                          label: status,
                                          "hide-details": ""
                                        }, null, 8, ["value", "label"])
                                      ]);
                                    }), 256))
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "my-5 h-full bg-grey-lighten-2 px-3 py-2" }, [
                          createVNode("p", { class: "text-2xl font-bold mb-2" }, "Payment"),
                          (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.payments, (payment) => {
                            return openBlock(), createBlock(_sfc_main$7, {
                              cols: "2",
                              md: "2",
                              lg: "2",
                              xl: "2",
                              "2xl": "2"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-bold" }, "Amount"),
                                  createVNode("div", null, [
                                    createVNode("p", null, toDisplayString(payment.amount_display), 1)
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-bold" }, "Captured"),
                                  createVNode("div", null, [
                                    createVNode("p", null, toDisplayString(payment.amount_captured_display), 1)
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-bold" }, "Card"),
                                  createVNode("div", null, [
                                    createVNode("p", null, "..." + toDisplayString(payment.card_last_4), 1)
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-bold" }, "Status"),
                                  createVNode("div", null, [
                                    createVNode("p", null, toDisplayString(payment.status), 1)
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024);
                          }), 256))
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode("div", { class: "my-5" }, [
                        createVNode("p", { class: "text-2xl font-bold mb-2" }, "Refunds"),
                        createVNode(_component_v_card, { color: "grey-lighten-2" }, {
                          default: withCtx(() => [
                            createVNode(_component_v_card_item, null, {
                              default: withCtx(() => [
                                selectedOrder.value.refunds.length > 0 ? (openBlock(), createBlock(_component_v_table, {
                                  key: 0,
                                  class: "bg-grey-lighten-2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("thead", null, [
                                      createVNode("tr", null, [
                                        createVNode("th", null, "Amount"),
                                        createVNode("th", null, "Status")
                                      ])
                                    ]),
                                    createVNode("tbody", null, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.refunds, (refund) => {
                                        return openBlock(), createBlock("tr", null, [
                                          createVNode("td", null, [
                                            createVNode("p", null, toDisplayString(refund.amount_display), 1)
                                          ]),
                                          createVNode("td", null, [
                                            createVNode("p", null, toDisplayString(refund.status), 1)
                                          ])
                                        ]);
                                      }), 256))
                                    ])
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock("div", { key: 1 }, [
                                  createVNode("p", null, "There are no refunds to show for this order")
                                ]))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        showRefunds.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-5"
                        }, [
                          createVNode("div", { class: "flex flex-col lg:flex-row items-center gap-2 w-full" }, [
                            createVNode("div", { class: "grow w-full" }, [
                              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-3" }, [
                                createVNode("div", { class: "w-full" }, [
                                  createVNode(_component_v_text_field, {
                                    disabled: selectedOrder.value.refundable_stripe <= 0,
                                    modelValue: refundForm.stripe,
                                    "onUpdate:modelValue": ($event) => refundForm.stripe = $event,
                                    label: `Online payment refundable (USD): ${selectedOrder.value.refundable_stripe}`,
                                    class: "w-full",
                                    "hide-details": ""
                                  }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "label"])
                                ]),
                                createVNode("div", null, [
                                  createVNode(_component_v_text_field, {
                                    disabled: selectedOrder.value.refundable_gift_card <= 0,
                                    modelValue: refundForm.gift_card,
                                    "onUpdate:modelValue": ($event) => refundForm.gift_card = $event,
                                    label: `Gift card amount refundable (USD): ${selectedOrder.value.refundable_gift_card}`,
                                    class: "w-full",
                                    "hide-details": ""
                                  }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "label"])
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "shrink-0" }, [
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(initiateRefund, ["prevent"]),
                                disabled: isRefunding.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(isRefunding.value ? "Processing..." : "Initiate refund"), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ])
                          ]),
                          createVNode("div", { class: "flex flex-row items-center justify-center w-full" }, [
                            createVNode("div", null, [
                              createVNode(_component_v_checkbox, {
                                modelValue: refundForm.confirm,
                                "onUpdate:modelValue": ($event) => refundForm.confirm = $event,
                                label: "Confirm that you want to proceed with the refund",
                                "hide-details": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      Object.keys(local_errors.value).length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col justify-center"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(Object.values(local_errors.value), (error, index) => {
                          return openBlock(), createBlock("p", {
                            class: "text-red w-full text-center",
                            key: index
                          }, toDisplayString(error), 1);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex flex-row justify-center items-center gap-2 w-full my-5" }, [
                        createVNode(_component_v_btn, {
                          onClick: withModifiers(toggleRefunds, ["prevent"]),
                          color: "grey-darken-2",
                          variant: "plain"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(`${showRefunds.value ? "Hide" : "Show"}`) + " refund form", 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                footer: withCtx(() => [
                  createVNode(_sfc_main$4, null, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$5, { onClick: updateOrder }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(saveButtonText.value), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$6, { onClick: closeOrder }, {
                        default: withCtx(() => [
                          createTextVNode("close")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["show"]),
              createVNode(_sfc_main$1, {
                ref_key: "customOrderModal",
                ref: customOrderModal,
                errors: props.errors
              }, null, 8, ["errors"]),
              createVNode(_sfc_main$2, {
                show: showClientNotesModal.value,
                onClose: closeClientNotesModal,
                maxWidth: "2xl"
              }, {
                title: withCtx(() => {
                  var _a, _b;
                  return [
                    createTextVNode(" Client Notes - Order " + toDisplayString((_a = selectedOrderForClientNotes.value) == null ? void 0 : _a.initial) + toDisplayString((_b = selectedOrderForClientNotes.value) == null ? void 0 : _b.number), 1)
                  ];
                }),
                content: withCtx(() => [
                  selectedOrderForClientNotes.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col gap-3"
                  }, [
                    selectedOrderForClientNotes.value.notes ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-4"
                    }, [
                      createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order Notes"),
                      createVNode(_component_v_card, {
                        color: "grey-lighten-3",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-4" }, [
                            createVNode("p", {
                              innerHTML: selectedOrderForClientNotes.value.notes_formatted || selectedOrderForClientNotes.value.notes
                            }, null, 8, ["innerHTML"])
                          ])
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    selectedOrderForClientNotes.value.items && selectedOrderForClientNotes.value.items.length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("p", { class: "text-2xl font-bold mb-2" }, "Item Client Notes"),
                      createVNode(_sfc_main$3, { gap: "4" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(selectedOrderForClientNotes.value.items, (item) => {
                            return openBlock(), createBlock(Fragment, {
                              key: item.id || item.uid
                            }, [
                              item.client_note ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "bg-grey-lighten-2 p-4 rounded-lg"
                              }, [
                                createVNode("div", { class: "flex flex-row items-start gap-3" }, [
                                  createVNode("div", { class: "hidden lg:flex shrink-0 w-[70px]" }, [
                                    item.thumbnail ? (openBlock(), createBlock(_component_v_img, {
                                      key: 0,
                                      "aspect-ratio": "1",
                                      src: item.thumbnail,
                                      cover: ""
                                    }, null, 8, ["src"])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "grow" }, [
                                    createVNode("div", { class: "mb-2" }, [
                                      createVNode("p", { class: "font-bold text-lg" }, toDisplayString(item.product_name), 1),
                                      createVNode("p", { class: "text-sm text-grey-darken-1" }, toDisplayString(item.variation_name), 1),
                                      createVNode("p", { class: "text-xs text-grey-darken-2" }, "Quantity: " + toDisplayString(item.quantity), 1)
                                    ]),
                                    createVNode("div", { class: "mt-3" }, [
                                      createVNode("p", { class: "text-red font-bold mb-1" }, "Client Note:"),
                                      createVNode(_component_v_textarea, {
                                        rows: "2",
                                        "auto-grow": "",
                                        "model-value": item.client_note,
                                        variant: "solo",
                                        flat: "",
                                        "bg-color": "red-lighten-3",
                                        "hide-details": "",
                                        readonly: ""
                                      }, null, 8, ["model-value"])
                                    ])
                                  ])
                                ])
                              ])) : createCommentVNode("", true)
                            ], 64);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    !selectedOrderForClientNotes.value.notes && (!selectedOrderForClientNotes.value.items || !selectedOrderForClientNotes.value.items.some((item) => item.client_note)) ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "text-center py-4"
                    }, [
                      createVNode("p", { class: "text-grey" }, "No notes found for this order.")
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ]),
                footer: withCtx(() => [
                  createVNode(_sfc_main$6, { onClick: closeClientNotesModal }, {
                    default: withCtx(() => [
                      createTextVNode("Close")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["show"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Orders/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-17ecad36"]]);
export {
  Home as default
};
