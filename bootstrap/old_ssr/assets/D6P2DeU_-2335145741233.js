import { reactive, ref, computed, watch, onMounted, nextTick, resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, withModifiers, createCommentVNode, useSSRContext, mergeProps, unref, withKeys } from "vue";
import { ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttrs, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { A as AppLayout } from "./BT2Gi1aL-2117352433356.js";
import { router, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$8 } from "./CznY329j-2334615712833.js";
import { W as Wrapper } from "./CbcLIE-O-3135473238126.js";
import { _ as _sfc_main$6 } from "./CeVcRmCk-1453137522733.js";
import { _ as _sfc_main$7 } from "./DsvTyKEu-3355343127127.js";
import { _ as _sfc_main$5 } from "./BFeg_3wS-5313717233245.js";
import { _ as _export_sfc } from "./1tPrXgE0-1751246333532.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { _ as _sfc_main$9 } from "./kZV6a-x4-2437327355113.js";
import { useDisplay } from "vuetify";
import { f as formatTitle, a as formatEmphasis } from "./DEmmWHtk-3413287365321.js";
import "./BW6cC8iL-1754723312335.js";
import "./DKEAH6nn-4333751172235.js";
import "mitt";
import "gsap/ScrollSmoother.js";
import "./AK26aD-S-7313723521453.js";
import "./C6q4kDV--4257163313235.js";
import "./Cyl_ukyB-3352317127354.js";
const _sfc_main$4 = {
  __name: "PlanProducts",
  __ssrInlineRender: true,
  props: {
    plan: { type: Object, default: null },
    products: { type: Object, default: null },
    items: { type: Object, default: null },
    source: { type: String, default: "plan" },
    next_available_date: String,
    placeholder: { type: Boolean, default: false },
    image_url: { type: String, default: "" },
    selectable: { type: Boolean, default: false }
  },
  emits: ["open"],
  setup(__props, { emit: __emit }) {
    const props2 = __props;
    reactive({});
    const selectedProducts = ref([]);
    const selectedQuantities = ref([]);
    const selectedAmounts = ref([]);
    const selectedAmountsFormatted = ref([]);
    const variationPrices = ref({});
    const amountsSum = computed(() => {
      return Object.values(selectedAmounts.value).reduce((sum, value) => sum + value, 0);
    });
    const amountsSumFormatted = computed(() => {
      return formatNumber(amountsSum.value);
    });
    watch(selectedProducts, (newVal, oldVal) => {
      const updatedQuantities = { ...selectedQuantities.value };
      const updatedAmounts = { ...selectedAmounts.value };
      const updatedAmountsFormatted = { ...selectedAmountsFormatted.value };
      newVal.forEach((uid) => {
        if (!updatedQuantities.hasOwnProperty(uid)) {
          updatedQuantities[uid] = 1;
        }
        if (!updatedAmounts.hasOwnProperty(uid)) {
          updatedAmounts[uid] = variationPrices.value[uid];
        }
        if (!updatedAmountsFormatted.hasOwnProperty(uid)) {
          updatedAmountsFormatted[uid] = formatNumber(variationPrices.value[uid]);
        }
      });
      oldVal.forEach((uid) => {
        if (!newVal.includes(uid)) {
          delete updatedQuantities[uid];
          delete updatedAmounts[uid];
          delete updatedAmountsFormatted[uid];
        }
      });
      selectedQuantities.value = updatedQuantities;
      selectedAmounts.value = updatedAmounts;
      selectedAmountsFormatted.value = updatedAmountsFormatted;
    });
    function formatNumber(value) {
      const number = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
      return "$" + number;
    }
    const updateSelectedAmount = (uid) => {
      selectedAmounts.value[uid] = variationPrices.value[uid] * selectedQuantities.value[uid];
      selectedAmountsFormatted.value[uid] = formatNumber(variationPrices.value[uid] * selectedQuantities.value[uid]);
    };
    const subQuantity = (uid) => {
      if (selectedQuantities.value[uid] > 1) {
        selectedQuantities.value[uid]--;
        updateSelectedAmount(uid);
      }
    };
    const addQuantity = (uid) => {
      selectedQuantities.value[uid]++;
      updateSelectedAmount(uid);
    };
    const checkout = () => {
      axios.post(route("add_on_checkout"), {
        addons: selectedQuantities.value
      }).then((response) => {
        const url = response.data.url;
        if (url === "error") {
          console.log("An error occurred");
        } else if (isValidUrl(url)) {
          window.location.href = url;
        } else {
          console.log("Invalid URL");
        }
      }).catch((error) => {
        console.error("error");
      });
    };
    function isValidUrl(url) {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    }
    const openProductModal = (product) => {
      emit("open", product);
    };
    const emit = __emit;
    onMounted(() => {
      nextTick(() => {
        const list = {};
        if (props2.source === "addons" && props2.products) {
          props2.products.forEach((product) => {
            var _a;
            if (((_a = product.variations) == null ? void 0 : _a.length) ?? 0) {
              product.variations.forEach((variation) => {
                list[variation.uid] = variation.price;
              });
              variationPrices.value = list;
            }
          });
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      const _component_v_img = resolveComponent("v-img");
      const _component_v_progress_circular = resolveComponent("v-progress-circular");
      const _component_v_btn = resolveComponent("v-btn");
      _push(`<!--[--><div data-v-528050d4>`);
      if (props2.source === "addons") {
        _push(`<div class="text-center my-10" data-v-528050d4><p class="text-3xl font-bold" data-v-528050d4>Add-ons</p><p data-v-528050d4>You can add products to your next delivery on ${ssrInterpolate(__props.next_available_date)}</p><div class="flex flex-col gap-3 mt-5" data-v-528050d4><!--[-->`);
        ssrRenderList(props2.products, (product) => {
          var _a;
          _push(`<div data-v-528050d4>`);
          if (((_a = product.variations) == null ? void 0 : _a.length) ?? 0) {
            _push(ssrRenderComponent(_component_v_card, {
              color: "white",
              elevation: "2",
              rounded: "lg"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_v_card_item, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="flex flex-col gap-3" data-v-528050d4${_scopeId2}><!--[-->`);
                        ssrRenderList(product.variations, (variation) => {
                          _push3(`<div data-v-528050d4${_scopeId2}><div class="flex flex-row flex-wrap gap-6 items-center" data-v-528050d4${_scopeId2}><div class="shrink-0" data-v-528050d4${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_v_checkbox, {
                            value: variation.uid,
                            modelValue: selectedProducts.value,
                            "onUpdate:modelValue": ($event) => selectedProducts.value = $event,
                            multiple: "",
                            "hide-details": ""
                          }, null, _parent3, _scopeId2));
                          _push3(`</div><div class="shrink-0" data-v-528050d4${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_v_img, {
                            rounded: "lg",
                            width: "50px",
                            "aspect-ratio": "1",
                            cover: "",
                            class: "zoom-image shadow-sm",
                            src: variation.image_url,
                            alt: ""
                          }, {
                            placeholder: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`<div class="d-flex align-center justify-center fill-height" data-v-528050d4${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_v_progress_circular, {
                                  color: "grey-lighten-4",
                                  indeterminate: ""
                                }, null, _parent4, _scopeId3));
                                _push4(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                    createVNode(_component_v_progress_circular, {
                                      color: "grey-lighten-4",
                                      indeterminate: ""
                                    })
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                          _push3(`</div><div class="grow flex flex-row items-center" data-v-528050d4${_scopeId2}><div class="grid grid-cols-1 lg:grid-cols-4 gap-3 w-full items-center" data-v-528050d4${_scopeId2}><div class="text-left" data-v-528050d4${_scopeId2}><p class="text-lg" data-v-528050d4${_scopeId2}><strong data-v-528050d4${_scopeId2}>${ssrInterpolate(product.name)}</strong> (${ssrInterpolate(variation.name)})</p></div><div class="text-center" data-v-528050d4${_scopeId2}><p class="text-lg" data-v-528050d4${_scopeId2}>${ssrInterpolate(variation.price_string)}</p></div><div class="flex flex-row items-center" data-v-528050d4${_scopeId2}>`);
                          if (selectedQuantities.value[variation.uid] !== void 0) {
                            _push3(`<div data-v-528050d4${_scopeId2}>`);
                            _push3(ssrRenderComponent(_component_v_btn, {
                              size: "x-small",
                              icon: "mdi-minus",
                              onClick: ($event) => subQuantity(variation.uid)
                            }, null, _parent3, _scopeId2));
                            _push3(ssrRenderComponent(_component_v_btn, { color: "transparent" }, {
                              default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                                if (_push4) {
                                  _push4(`${ssrInterpolate(selectedQuantities.value[variation.uid])}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(selectedQuantities.value[variation.uid]), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent3, _scopeId2));
                            _push3(ssrRenderComponent(_component_v_btn, {
                              size: "x-small",
                              icon: "mdi-plus",
                              onClick: ($event) => addQuantity(variation.uid)
                            }, null, _parent3, _scopeId2));
                            _push3(`</div>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div><div data-v-528050d4${_scopeId2}>`);
                          if (selectedAmountsFormatted.value[variation.uid] !== void 0) {
                            _push3(`<p class="text-lg" data-v-528050d4${_scopeId2}>${ssrInterpolate(selectedAmountsFormatted.value[variation.uid])}</p>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div></div></div></div></div>`);
                        });
                        _push3(`<!--]--></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col gap-3" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                              return openBlock(), createBlock("div", null, [
                                createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                  createVNode("div", { class: "shrink-0" }, [
                                    createVNode(_component_v_checkbox, {
                                      value: variation.uid,
                                      modelValue: selectedProducts.value,
                                      "onUpdate:modelValue": ($event) => selectedProducts.value = $event,
                                      multiple: "",
                                      "hide-details": ""
                                    }, null, 8, ["value", "modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "shrink-0" }, [
                                    createVNode(_component_v_img, {
                                      rounded: "lg",
                                      width: "50px",
                                      "aspect-ratio": "1",
                                      cover: "",
                                      class: "zoom-image shadow-sm",
                                      src: variation.image_url,
                                      alt: ""
                                    }, {
                                      placeholder: withCtx(() => [
                                        createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                          createVNode(_component_v_progress_circular, {
                                            color: "grey-lighten-4",
                                            indeterminate: ""
                                          })
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["src"])
                                  ]),
                                  createVNode("div", { class: "grow flex flex-row items-center" }, [
                                    createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-4 gap-3 w-full items-center" }, [
                                      createVNode("div", { class: "text-left" }, [
                                        createVNode("p", { class: "text-lg" }, [
                                          createVNode("strong", null, toDisplayString(product.name), 1),
                                          createTextVNode(" (" + toDisplayString(variation.name) + ")", 1)
                                        ])
                                      ]),
                                      createVNode("div", { class: "text-center" }, [
                                        createVNode("p", { class: "text-lg" }, toDisplayString(variation.price_string), 1)
                                      ]),
                                      createVNode("div", { class: "flex flex-row items-center" }, [
                                        selectedQuantities.value[variation.uid] !== void 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                                          createVNode(_component_v_btn, {
                                            size: "x-small",
                                            icon: "mdi-minus",
                                            onClick: withModifiers(($event) => subQuantity(variation.uid), ["prevent"])
                                          }, null, 8, ["onClick"]),
                                          createVNode(_component_v_btn, { color: "transparent" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(selectedQuantities.value[variation.uid]), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_v_btn, {
                                            size: "x-small",
                                            icon: "mdi-plus",
                                            onClick: withModifiers(($event) => addQuantity(variation.uid), ["prevent"])
                                          }, null, 8, ["onClick"])
                                        ])) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", null, [
                                        selectedAmountsFormatted.value[variation.uid] !== void 0 ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "text-lg"
                                        }, toDisplayString(selectedAmountsFormatted.value[variation.uid]), 1)) : createCommentVNode("", true)
                                      ])
                                    ])
                                  ])
                                ])
                              ]);
                            }), 256))
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_v_card_item, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-3" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                            return openBlock(), createBlock("div", null, [
                              createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                createVNode("div", { class: "shrink-0" }, [
                                  createVNode(_component_v_checkbox, {
                                    value: variation.uid,
                                    modelValue: selectedProducts.value,
                                    "onUpdate:modelValue": ($event) => selectedProducts.value = $event,
                                    multiple: "",
                                    "hide-details": ""
                                  }, null, 8, ["value", "modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "shrink-0" }, [
                                  createVNode(_component_v_img, {
                                    rounded: "lg",
                                    width: "50px",
                                    "aspect-ratio": "1",
                                    cover: "",
                                    class: "zoom-image shadow-sm",
                                    src: variation.image_url,
                                    alt: ""
                                  }, {
                                    placeholder: withCtx(() => [
                                      createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                        createVNode(_component_v_progress_circular, {
                                          color: "grey-lighten-4",
                                          indeterminate: ""
                                        })
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["src"])
                                ]),
                                createVNode("div", { class: "grow flex flex-row items-center" }, [
                                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-4 gap-3 w-full items-center" }, [
                                    createVNode("div", { class: "text-left" }, [
                                      createVNode("p", { class: "text-lg" }, [
                                        createVNode("strong", null, toDisplayString(product.name), 1),
                                        createTextVNode(" (" + toDisplayString(variation.name) + ")", 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "text-center" }, [
                                      createVNode("p", { class: "text-lg" }, toDisplayString(variation.price_string), 1)
                                    ]),
                                    createVNode("div", { class: "flex flex-row items-center" }, [
                                      selectedQuantities.value[variation.uid] !== void 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                                        createVNode(_component_v_btn, {
                                          size: "x-small",
                                          icon: "mdi-minus",
                                          onClick: withModifiers(($event) => subQuantity(variation.uid), ["prevent"])
                                        }, null, 8, ["onClick"]),
                                        createVNode(_component_v_btn, { color: "transparent" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(selectedQuantities.value[variation.uid]), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_v_btn, {
                                          size: "x-small",
                                          icon: "mdi-plus",
                                          onClick: withModifiers(($event) => addQuantity(variation.uid), ["prevent"])
                                        }, null, 8, ["onClick"])
                                      ])) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", null, [
                                      selectedAmountsFormatted.value[variation.uid] !== void 0 ? (openBlock(), createBlock("p", {
                                        key: 0,
                                        class: "text-lg"
                                      }, toDisplayString(selectedAmountsFormatted.value[variation.uid]), 1)) : createCommentVNode("", true)
                                    ])
                                  ])
                                ])
                              ])
                            ]);
                          }), 256))
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(ssrRenderComponent(_component_v_card, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_v_card_item, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="flex flex-row flex-wrap gap-6 items-center" data-v-528050d4${_scopeId2}><div class="shrink-0" data-v-528050d4${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_v_checkbox, { "hide-details": "" }, null, _parent3, _scopeId2));
                        _push3(`</div><div class="shrink-0" data-v-528050d4${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_v_img, {
                          rounded: "lg",
                          width: "50px",
                          "aspect-ratio": "1",
                          cover: "",
                          class: "zoom-image shadow-sm",
                          src: product.image_url,
                          alt: ""
                        }, {
                          placeholder: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="d-flex align-center justify-center fill-height" data-v-528050d4${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_v_progress_circular, {
                                color: "grey-lighten-4",
                                indeterminate: ""
                              }, null, _parent4, _scopeId3));
                              _push4(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                  createVNode(_component_v_progress_circular, {
                                    color: "grey-lighten-4",
                                    indeterminate: ""
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div><div class="grow flex flex-row items-center" data-v-528050d4${_scopeId2}><div data-v-528050d4${_scopeId2}><p class="font-bold text-lg" data-v-528050d4${_scopeId2}>${ssrInterpolate(product.name)}</p></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                            createVNode("div", { class: "shrink-0" }, [
                              createVNode(_component_v_checkbox, { "hide-details": "" })
                            ]),
                            createVNode("div", { class: "shrink-0" }, [
                              createVNode(_component_v_img, {
                                rounded: "lg",
                                width: "50px",
                                "aspect-ratio": "1",
                                cover: "",
                                class: "zoom-image shadow-sm",
                                src: product.image_url,
                                alt: ""
                              }, {
                                placeholder: withCtx(() => [
                                  createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                    createVNode(_component_v_progress_circular, {
                                      color: "grey-lighten-4",
                                      indeterminate: ""
                                    })
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["src"])
                            ]),
                            createVNode("div", { class: "grow flex flex-row items-center" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "font-bold text-lg" }, toDisplayString(product.name), 1)
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_v_card_item, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                          createVNode("div", { class: "shrink-0" }, [
                            createVNode(_component_v_checkbox, { "hide-details": "" })
                          ]),
                          createVNode("div", { class: "shrink-0" }, [
                            createVNode(_component_v_img, {
                              rounded: "lg",
                              width: "50px",
                              "aspect-ratio": "1",
                              cover: "",
                              class: "zoom-image shadow-sm",
                              src: product.image_url,
                              alt: ""
                            }, {
                              placeholder: withCtx(() => [
                                createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                  createVNode(_component_v_progress_circular, {
                                    color: "grey-lighten-4",
                                    indeterminate: ""
                                  })
                                ])
                              ]),
                              _: 2
                            }, 1032, ["src"])
                          ]),
                          createVNode("div", { class: "grow flex flex-row items-center" }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "font-bold text-lg" }, toDisplayString(product.name), 1)
                            ])
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div data-v-528050d4><div class="flex flex-col gap-0" data-v-528050d4>`);
        if (props2.placeholder) {
          _push(`<div class="mt-2" data-v-528050d4>`);
          if (props2.plan && props2.plan.has_customization) {
            _push(ssrRenderComponent(_component_v_card, {
              onClick: ($event) => openProductModal(null),
              class: "cursor-pointer",
              variant: "flat",
              rounded: "lg",
              color: "grey-lighten-4"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_v_card_item, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div data-v-528050d4${_scopeId2}><div class="flex flex-row flex-wrap gap-6 items-center" data-v-528050d4${_scopeId2}><div class="shrink-0" data-v-528050d4${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_v_img, {
                          rounded: "lg",
                          width: "50px",
                          "aspect-ratio": "1",
                          cover: "",
                          class: "zoom-image shadow-sm",
                          src: props2.image_url,
                          alt: ""
                        }, {
                          placeholder: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="d-flex align-center justify-center fill-height" data-v-528050d4${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_v_progress_circular, {
                                color: "grey-lighten-4",
                                indeterminate: ""
                              }, null, _parent4, _scopeId3));
                              _push4(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                  createVNode(_component_v_progress_circular, {
                                    color: "grey-lighten-4",
                                    indeterminate: ""
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(`</div><div class="grow flex flex-row items-center" data-v-528050d4${_scopeId2}><div data-v-528050d4${_scopeId2}><p class="text-lg" data-v-528050d4${_scopeId2}>Select a product</p></div></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                              createVNode("div", { class: "shrink-0" }, [
                                createVNode(_component_v_img, {
                                  rounded: "lg",
                                  width: "50px",
                                  "aspect-ratio": "1",
                                  cover: "",
                                  class: "zoom-image shadow-sm",
                                  src: props2.image_url,
                                  alt: ""
                                }, {
                                  placeholder: withCtx(() => [
                                    createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                      createVNode(_component_v_progress_circular, {
                                        color: "grey-lighten-4",
                                        indeterminate: ""
                                      })
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["src"])
                              ]),
                              createVNode("div", { class: "grow flex flex-row items-center" }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-lg" }, "Select a product")
                                ])
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_v_card_item, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                            createVNode("div", { class: "shrink-0" }, [
                              createVNode(_component_v_img, {
                                rounded: "lg",
                                width: "50px",
                                "aspect-ratio": "1",
                                cover: "",
                                class: "zoom-image shadow-sm",
                                src: props2.image_url,
                                alt: ""
                              }, {
                                placeholder: withCtx(() => [
                                  createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                    createVNode(_component_v_progress_circular, {
                                      color: "grey-lighten-4",
                                      indeterminate: ""
                                    })
                                  ])
                                ]),
                                _: 1
                              }, 8, ["src"])
                            ]),
                            createVNode("div", { class: "grow flex flex-row items-center" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-lg" }, "Select a product")
                              ])
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(ssrRenderComponent(_component_v_card, {
              variant: "flat",
              rounded: "lg",
              color: "grey-lighten-4"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_v_card_item, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div data-v-528050d4${_scopeId2}><div class="flex flex-row flex-wrap gap-6 items-center" data-v-528050d4${_scopeId2}><div class="shrink-0" data-v-528050d4${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_v_img, {
                          rounded: "lg",
                          width: "50px",
                          "aspect-ratio": "1",
                          cover: "",
                          class: "zoom-image shadow-sm",
                          src: props2.image_url,
                          alt: ""
                        }, {
                          placeholder: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="d-flex align-center justify-center fill-height" data-v-528050d4${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_v_progress_circular, {
                                color: "grey-lighten-4",
                                indeterminate: ""
                              }, null, _parent4, _scopeId3));
                              _push4(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                  createVNode(_component_v_progress_circular, {
                                    color: "grey-lighten-4",
                                    indeterminate: ""
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(`</div><div class="grow flex flex-row items-center" data-v-528050d4${_scopeId2}><div data-v-528050d4${_scopeId2}><p class="text-lg" data-v-528050d4${_scopeId2}>???</p></div></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                              createVNode("div", { class: "shrink-0" }, [
                                createVNode(_component_v_img, {
                                  rounded: "lg",
                                  width: "50px",
                                  "aspect-ratio": "1",
                                  cover: "",
                                  class: "zoom-image shadow-sm",
                                  src: props2.image_url,
                                  alt: ""
                                }, {
                                  placeholder: withCtx(() => [
                                    createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                      createVNode(_component_v_progress_circular, {
                                        color: "grey-lighten-4",
                                        indeterminate: ""
                                      })
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["src"])
                              ]),
                              createVNode("div", { class: "grow flex flex-row items-center" }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-lg" }, "???")
                                ])
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_v_card_item, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                            createVNode("div", { class: "shrink-0" }, [
                              createVNode(_component_v_img, {
                                rounded: "lg",
                                width: "50px",
                                "aspect-ratio": "1",
                                cover: "",
                                class: "zoom-image shadow-sm",
                                src: props2.image_url,
                                alt: ""
                              }, {
                                placeholder: withCtx(() => [
                                  createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                    createVNode(_component_v_progress_circular, {
                                      color: "grey-lighten-4",
                                      indeterminate: ""
                                    })
                                  ])
                                ]),
                                _: 1
                              }, 8, ["src"])
                            ]),
                            createVNode("div", { class: "grow flex flex-row items-center" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-lg" }, "???")
                              ])
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent));
          }
          _push(`</div>`);
        } else if (props2.items) {
          _push(`<!--[-->`);
          ssrRenderList(props2.items, (item) => {
            _push(`<div class="mt-2" data-v-528050d4>`);
            _push(ssrRenderComponent(_component_v_card, {
              class: __props.selectable ? "cursor-pointer" : "cursor-default",
              onClick: ($event) => props2.selectable ? openProductModal(item) : null,
              variant: "flat",
              rounded: "lg"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_v_card_item, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="flex flex-col gap-3" data-v-528050d4${_scopeId2}><div data-v-528050d4${_scopeId2}><div class="flex flex-row flex-wrap gap-6 items-center" data-v-528050d4${_scopeId2}><div class="shrink-0" data-v-528050d4${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_v_img, {
                          rounded: "lg",
                          width: "50px",
                          "aspect-ratio": "1",
                          cover: "",
                          class: "zoom-image shadow-sm",
                          src: item.variation.image_url,
                          alt: ""
                        }, {
                          placeholder: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="d-flex align-center justify-center fill-height" data-v-528050d4${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_v_progress_circular, {
                                color: "grey-lighten-4",
                                indeterminate: ""
                              }, null, _parent4, _scopeId3));
                              _push4(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                  createVNode(_component_v_progress_circular, {
                                    color: "grey-lighten-4",
                                    indeterminate: ""
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div><div class="grow flex flex-row items-center" data-v-528050d4${_scopeId2}><div class="flex flex-row w-full justify-between items-center" data-v-528050d4${_scopeId2}><p class="text-lg" data-v-528050d4${_scopeId2}><span class="font-bold" data-v-528050d4${_scopeId2}>${ssrInterpolate(item.product.name)}</span> <span data-v-528050d4${_scopeId2}>(${ssrInterpolate(item.variation.name)})</span></p><p class="text-lg" data-v-528050d4${_scopeId2}><span data-v-528050d4${_scopeId2}>x${ssrInterpolate(item.quantity)}</span></p></div></div></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col gap-3" }, [
                            createVNode("div", null, [
                              createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                createVNode("div", { class: "shrink-0" }, [
                                  createVNode(_component_v_img, {
                                    rounded: "lg",
                                    width: "50px",
                                    "aspect-ratio": "1",
                                    cover: "",
                                    class: "zoom-image shadow-sm",
                                    src: item.variation.image_url,
                                    alt: ""
                                  }, {
                                    placeholder: withCtx(() => [
                                      createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                        createVNode(_component_v_progress_circular, {
                                          color: "grey-lighten-4",
                                          indeterminate: ""
                                        })
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["src"])
                                ]),
                                createVNode("div", { class: "grow flex flex-row items-center" }, [
                                  createVNode("div", { class: "flex flex-row w-full justify-between items-center" }, [
                                    createVNode("p", { class: "text-lg" }, [
                                      createVNode("span", { class: "font-bold" }, toDisplayString(item.product.name), 1),
                                      createTextVNode(" "),
                                      createVNode("span", null, "(" + toDisplayString(item.variation.name) + ")", 1)
                                    ]),
                                    createVNode("p", { class: "text-lg" }, [
                                      createVNode("span", null, "x" + toDisplayString(item.quantity), 1)
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_v_card_item, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-3" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                              createVNode("div", { class: "shrink-0" }, [
                                createVNode(_component_v_img, {
                                  rounded: "lg",
                                  width: "50px",
                                  "aspect-ratio": "1",
                                  cover: "",
                                  class: "zoom-image shadow-sm",
                                  src: item.variation.image_url,
                                  alt: ""
                                }, {
                                  placeholder: withCtx(() => [
                                    createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                      createVNode(_component_v_progress_circular, {
                                        color: "grey-lighten-4",
                                        indeterminate: ""
                                      })
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["src"])
                              ]),
                              createVNode("div", { class: "grow flex flex-row items-center" }, [
                                createVNode("div", { class: "flex flex-row w-full justify-between items-center" }, [
                                  createVNode("p", { class: "text-lg" }, [
                                    createVNode("span", { class: "font-bold" }, toDisplayString(item.product.name), 1),
                                    createTextVNode(" "),
                                    createVNode("span", null, "(" + toDisplayString(item.variation.name) + ")", 1)
                                  ]),
                                  createVNode("p", { class: "text-lg" }, [
                                    createVNode("span", null, "x" + toDisplayString(item.quantity), 1)
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        } else if (props2.plan) {
          _push(`<!--[-->`);
          ssrRenderList(props2.plan.variations, (variation) => {
            _push(`<div class="mt-2" data-v-528050d4>`);
            _push(ssrRenderComponent(_component_v_card, {
              variant: "flat",
              rounded: "lg"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_v_card_item, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="flex flex-col gap-3" data-v-528050d4${_scopeId2}><div data-v-528050d4${_scopeId2}><div class="flex flex-row flex-wrap gap-6 items-center" data-v-528050d4${_scopeId2}>`);
                        if (props2.source === "addons") {
                          _push3(`<div class="shrink-0" data-v-528050d4${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_v_checkbox, {
                            value: variation.uid,
                            modelValue: selectedProducts.value,
                            "onUpdate:modelValue": ($event) => selectedProducts.value = $event,
                            multiple: "",
                            "hide-details": ""
                          }, null, _parent3, _scopeId2));
                          _push3(`</div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`<div class="shrink-0" data-v-528050d4${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_v_img, {
                          rounded: "lg",
                          width: "50px",
                          "aspect-ratio": "1",
                          cover: "",
                          class: "zoom-image shadow-sm",
                          src: variation.image_url,
                          alt: ""
                        }, {
                          placeholder: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="d-flex align-center justify-center fill-height" data-v-528050d4${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_v_progress_circular, {
                                color: "grey-lighten-4",
                                indeterminate: ""
                              }, null, _parent4, _scopeId3));
                              _push4(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                  createVNode(_component_v_progress_circular, {
                                    color: "grey-lighten-4",
                                    indeterminate: ""
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div><div class="grow flex flex-row items-center" data-v-528050d4${_scopeId2}>`);
                        if (props2.source === "addons") {
                          _push3(`<div class="grid grid-cols-1 lg:grid-cols-4 gap-3 w-full items-center" data-v-528050d4${_scopeId2}><div data-v-528050d4${_scopeId2}><p class="font-bold text-lg" data-v-528050d4${_scopeId2}>${ssrInterpolate(variation.product.name)} (${ssrInterpolate(variation.name)})</p></div><div data-v-528050d4${_scopeId2}><p class="text-lg" data-v-528050d4${_scopeId2}>${ssrInterpolate(variation.price_string)}</p></div><div class="flex flex-row items-center" data-v-528050d4${_scopeId2}>`);
                          if (selectedQuantities.value[variation.uid] !== void 0) {
                            _push3(`<div data-v-528050d4${_scopeId2}>`);
                            _push3(ssrRenderComponent(_component_v_btn, {
                              size: "x-small",
                              icon: "mdi-minus",
                              onClick: ($event) => subQuantity(variation.uid)
                            }, null, _parent3, _scopeId2));
                            _push3(ssrRenderComponent(_component_v_btn, { color: "transparent" }, {
                              default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                                if (_push4) {
                                  _push4(`${ssrInterpolate(selectedQuantities.value[variation.uid])}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(selectedQuantities.value[variation.uid]), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent3, _scopeId2));
                            _push3(ssrRenderComponent(_component_v_btn, {
                              size: "x-small",
                              icon: "mdi-plus",
                              onClick: ($event) => addQuantity(variation.uid)
                            }, null, _parent3, _scopeId2));
                            _push3(`</div>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div><div data-v-528050d4${_scopeId2}>`);
                          if (selectedAmountsFormatted.value[variation.uid] !== void 0) {
                            _push3(`<p class="text-lg" data-v-528050d4${_scopeId2}>${ssrInterpolate(selectedAmountsFormatted.value[variation.uid])}</p>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div></div>`);
                        } else {
                          _push3(`<div class="flex flex-row w-full justify-between items-center" data-v-528050d4${_scopeId2}><p class="text-lg" data-v-528050d4${_scopeId2}><span class="font-bold" data-v-528050d4${_scopeId2}>${ssrInterpolate(variation.product.name)}</span> <span data-v-528050d4${_scopeId2}>(${ssrInterpolate(variation.name)})</span></p><p class="text-lg" data-v-528050d4${_scopeId2}><span data-v-528050d4${_scopeId2}>x${ssrInterpolate(variation.pivot.quantity)}</span></p></div>`);
                        }
                        _push3(`</div></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col gap-3" }, [
                            createVNode("div", null, [
                              createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                props2.source === "addons" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "shrink-0"
                                }, [
                                  createVNode(_component_v_checkbox, {
                                    value: variation.uid,
                                    modelValue: selectedProducts.value,
                                    "onUpdate:modelValue": ($event) => selectedProducts.value = $event,
                                    multiple: "",
                                    "hide-details": ""
                                  }, null, 8, ["value", "modelValue", "onUpdate:modelValue"])
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "shrink-0" }, [
                                  createVNode(_component_v_img, {
                                    rounded: "lg",
                                    width: "50px",
                                    "aspect-ratio": "1",
                                    cover: "",
                                    class: "zoom-image shadow-sm",
                                    src: variation.image_url,
                                    alt: ""
                                  }, {
                                    placeholder: withCtx(() => [
                                      createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                        createVNode(_component_v_progress_circular, {
                                          color: "grey-lighten-4",
                                          indeterminate: ""
                                        })
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["src"])
                                ]),
                                createVNode("div", { class: "grow flex flex-row items-center" }, [
                                  props2.source === "addons" ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "grid grid-cols-1 lg:grid-cols-4 gap-3 w-full items-center"
                                  }, [
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold text-lg" }, toDisplayString(variation.product.name) + " (" + toDisplayString(variation.name) + ")", 1)
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "text-lg" }, toDisplayString(variation.price_string), 1)
                                    ]),
                                    createVNode("div", { class: "flex flex-row items-center" }, [
                                      selectedQuantities.value[variation.uid] !== void 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                                        createVNode(_component_v_btn, {
                                          size: "x-small",
                                          icon: "mdi-minus",
                                          onClick: withModifiers(($event) => subQuantity(variation.uid), ["prevent"])
                                        }, null, 8, ["onClick"]),
                                        createVNode(_component_v_btn, { color: "transparent" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(selectedQuantities.value[variation.uid]), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_v_btn, {
                                          size: "x-small",
                                          icon: "mdi-plus",
                                          onClick: withModifiers(($event) => addQuantity(variation.uid), ["prevent"])
                                        }, null, 8, ["onClick"])
                                      ])) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", null, [
                                      selectedAmountsFormatted.value[variation.uid] !== void 0 ? (openBlock(), createBlock("p", {
                                        key: 0,
                                        class: "text-lg"
                                      }, toDisplayString(selectedAmountsFormatted.value[variation.uid]), 1)) : createCommentVNode("", true)
                                    ])
                                  ])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex flex-row w-full justify-between items-center"
                                  }, [
                                    createVNode("p", { class: "text-lg" }, [
                                      createVNode("span", { class: "font-bold" }, toDisplayString(variation.product.name), 1),
                                      createTextVNode(" "),
                                      createVNode("span", null, "(" + toDisplayString(variation.name) + ")", 1)
                                    ]),
                                    createVNode("p", { class: "text-lg" }, [
                                      createVNode("span", null, "x" + toDisplayString(variation.pivot.quantity), 1)
                                    ])
                                  ]))
                                ])
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_v_card_item, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-3" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                              props2.source === "addons" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "shrink-0"
                              }, [
                                createVNode(_component_v_checkbox, {
                                  value: variation.uid,
                                  modelValue: selectedProducts.value,
                                  "onUpdate:modelValue": ($event) => selectedProducts.value = $event,
                                  multiple: "",
                                  "hide-details": ""
                                }, null, 8, ["value", "modelValue", "onUpdate:modelValue"])
                              ])) : createCommentVNode("", true),
                              createVNode("div", { class: "shrink-0" }, [
                                createVNode(_component_v_img, {
                                  rounded: "lg",
                                  width: "50px",
                                  "aspect-ratio": "1",
                                  cover: "",
                                  class: "zoom-image shadow-sm",
                                  src: variation.image_url,
                                  alt: ""
                                }, {
                                  placeholder: withCtx(() => [
                                    createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                      createVNode(_component_v_progress_circular, {
                                        color: "grey-lighten-4",
                                        indeterminate: ""
                                      })
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["src"])
                              ]),
                              createVNode("div", { class: "grow flex flex-row items-center" }, [
                                props2.source === "addons" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "grid grid-cols-1 lg:grid-cols-4 gap-3 w-full items-center"
                                }, [
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-bold text-lg" }, toDisplayString(variation.product.name) + " (" + toDisplayString(variation.name) + ")", 1)
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "text-lg" }, toDisplayString(variation.price_string), 1)
                                  ]),
                                  createVNode("div", { class: "flex flex-row items-center" }, [
                                    selectedQuantities.value[variation.uid] !== void 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                                      createVNode(_component_v_btn, {
                                        size: "x-small",
                                        icon: "mdi-minus",
                                        onClick: withModifiers(($event) => subQuantity(variation.uid), ["prevent"])
                                      }, null, 8, ["onClick"]),
                                      createVNode(_component_v_btn, { color: "transparent" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(selectedQuantities.value[variation.uid]), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_v_btn, {
                                        size: "x-small",
                                        icon: "mdi-plus",
                                        onClick: withModifiers(($event) => addQuantity(variation.uid), ["prevent"])
                                      }, null, 8, ["onClick"])
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", null, [
                                    selectedAmountsFormatted.value[variation.uid] !== void 0 ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "text-lg"
                                    }, toDisplayString(selectedAmountsFormatted.value[variation.uid]), 1)) : createCommentVNode("", true)
                                  ])
                                ])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex flex-row w-full justify-between items-center"
                                }, [
                                  createVNode("p", { class: "text-lg" }, [
                                    createVNode("span", { class: "font-bold" }, toDisplayString(variation.product.name), 1),
                                    createTextVNode(" "),
                                    createVNode("span", null, "(" + toDisplayString(variation.name) + ")", 1)
                                  ]),
                                  createVNode("p", { class: "text-lg" }, [
                                    createVNode("span", null, "x" + toDisplayString(variation.pivot.quantity), 1)
                                  ])
                                ]))
                              ])
                            ])
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div>`);
      if (props2.source === "addons") {
        _push(`<div data-v-528050d4><div class="flex flex-col justify-center mt-10" data-v-528050d4><div class="text-center mb-10" data-v-528050d4><p class="text-3xl" data-v-528050d4>${ssrInterpolate(amountsSumFormatted.value)}</p></div><div class="text-center" data-v-528050d4>`);
        if (amountsSum.value > 0) {
          _push(ssrRenderComponent(_component_v_btn, { onClick: checkout }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Add to next delivery`);
              } else {
                return [
                  createTextVNode("Add to next delivery")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(ssrRenderComponent(_component_v_btn, { color: "grey" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Add to next delivery`);
              } else {
                return [
                  createTextVNode("Add to next delivery")
                ];
              }
            }),
            _: 1
          }, _parent));
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PlanProducts.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props2, ctx) : void 0;
};
const PlanProducts = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-528050d4"]]);
const _sfc_main$3 = {
  __name: "CustomPlanProductModal",
  __ssrInlineRender: true,
  props: {
    products: Object
  },
  setup(__props, { expose: __expose }) {
    const showProductModal = ref(false);
    const selectedProduct = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const props2 = __props;
    const formProduct = reactive({
      uid: null,
      quantity: 0
    });
    const openProduct = (product = null) => {
      local_errors.value = {};
      if (product) {
        modalTitle.value = "Select an item";
        selectedProduct.value = product;
        formProduct.uid = product.uid;
        formProduct.quantity = product.quantity;
      } else {
        modalTitle.value = "Select an item";
        selectedProduct.value = null;
        formProduct.uid = null;
        formProduct.quantity = 0;
      }
      saveButtonText.value = "Save product";
      showProductModal.value = true;
    };
    const closeProduct = () => {
      showProductModal.value = false;
      selectedProduct.value = null;
    };
    const local_errors = ref({});
    const saveProduct = () => {
      let url;
      if (selectedProduct.value) {
        url = route("update_premium_subscription_item", { item: selectedProduct.value.uid });
      } else {
        url = route(`create_premium_subscription_item`);
      }
      router.post(url, formProduct, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          closeProduct();
        },
        onError: (error) => {
          local_errors.value = props2.errors;
        }
      });
    };
    const selectProduct = (variation, quantity) => {
      formProduct.uid = variation.uid;
      formProduct.quantity = quantity;
      saveProduct();
    };
    const removeProduct = (variation, quantity) => {
      formProduct.uid = variation.uid;
      formProduct.quantity = 0;
      saveProduct();
    };
    __expose({ openProduct });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_menu = resolveComponent("v-menu");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_img = resolveComponent("v-img");
      const _component_v_progress_circular = resolveComponent("v-progress-circular");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_list_item = resolveComponent("v-list-item");
      _push(ssrRenderComponent(_sfc_main$5, mergeProps({
        show: showProductModal.value,
        onClose: closeProduct
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
            _push2(`<div class="flex flex-col gap-3"${_scopeId}><!--[-->`);
            ssrRenderList(props2.products, (product, index) => {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_menu, null, {
                activator: withCtx(({ props: props3 }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div${ssrRenderAttrs(mergeProps({ ref_for: true }, props3, { class: "cursor-pointer" }))}${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_card, {
                      color: selectedProduct.value && selectedProduct.value.product.uid === product.uid ? "#f99c19" : "grey-lighten-4",
                      rounded: "lg"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_card_item, null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex flex-row flex-wrap gap-6 items-center"${_scopeId4}><div class="shrink-0"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_v_img, {
                                  rounded: "lg",
                                  width: "50px",
                                  "aspect-ratio": "1",
                                  cover: "",
                                  class: "zoom-image shadow-sm",
                                  src: product.image_url,
                                  alt: ""
                                }, {
                                  placeholder: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="d-flex align-center justify-center fill-height"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_v_progress_circular, {
                                        color: "grey-lighten-4",
                                        indeterminate: ""
                                      }, null, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                          createVNode(_component_v_progress_circular, {
                                            color: "grey-lighten-4",
                                            indeterminate: ""
                                          })
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`</div><div class="grow flex flex-row items-center"${_scopeId4}><div${_scopeId4}><p class="font-bold text-lg"${_scopeId4}>${ssrInterpolate(product.name)}</p></div></div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                    createVNode("div", { class: "shrink-0" }, [
                                      createVNode(_component_v_img, {
                                        rounded: "lg",
                                        width: "50px",
                                        "aspect-ratio": "1",
                                        cover: "",
                                        class: "zoom-image shadow-sm",
                                        src: product.image_url,
                                        alt: ""
                                      }, {
                                        placeholder: withCtx(() => [
                                          createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                            createVNode(_component_v_progress_circular, {
                                              color: "grey-lighten-4",
                                              indeterminate: ""
                                            })
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["src"])
                                    ]),
                                    createVNode("div", { class: "grow flex flex-row items-center" }, [
                                      createVNode("div", null, [
                                        createVNode("p", { class: "font-bold text-lg" }, toDisplayString(product.name), 1)
                                      ])
                                    ])
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_card_item, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                  createVNode("div", { class: "shrink-0" }, [
                                    createVNode(_component_v_img, {
                                      rounded: "lg",
                                      width: "50px",
                                      "aspect-ratio": "1",
                                      cover: "",
                                      class: "zoom-image shadow-sm",
                                      src: product.image_url,
                                      alt: ""
                                    }, {
                                      placeholder: withCtx(() => [
                                        createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                          createVNode(_component_v_progress_circular, {
                                            color: "grey-lighten-4",
                                            indeterminate: ""
                                          })
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["src"])
                                  ]),
                                  createVNode("div", { class: "grow flex flex-row items-center" }, [
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold text-lg" }, toDisplayString(product.name), 1)
                                    ])
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", mergeProps({ ref_for: true }, props3, { class: "cursor-pointer" }), [
                        createVNode(_component_v_card, {
                          color: selectedProduct.value && selectedProduct.value.product.uid === product.uid ? "#f99c19" : "grey-lighten-4",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_card_item, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                  createVNode("div", { class: "shrink-0" }, [
                                    createVNode(_component_v_img, {
                                      rounded: "lg",
                                      width: "50px",
                                      "aspect-ratio": "1",
                                      cover: "",
                                      class: "zoom-image shadow-sm",
                                      src: product.image_url,
                                      alt: ""
                                    }, {
                                      placeholder: withCtx(() => [
                                        createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                          createVNode(_component_v_progress_circular, {
                                            color: "grey-lighten-4",
                                            indeterminate: ""
                                          })
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["src"])
                                  ]),
                                  createVNode("div", { class: "grow flex flex-row items-center" }, [
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold text-lg" }, toDisplayString(product.name), 1)
                                    ])
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["color"])
                      ], 16)
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_list, {
                      elevation: "3",
                      color: "blue",
                      class: "flex flex-col gap-1"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(product.variations, (variation) => {
                            _push4(ssrRenderComponent(_component_v_list_item, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_v_menu, null, {
                                    activator: withCtx(({ props: props3 }, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div${ssrRenderAttrs(mergeProps({ ref_for: true }, props3, { class: "cursor-pointer" }))}${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_v_card, {
                                          class: "cursor-pointer",
                                          color: selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? "#f99c19" : "grey-lighten-4",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_v_card_item, null, {
                                                default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`<div class="flex flex-row flex-wrap gap-6 items-center"${_scopeId7}><div class="shrink-0"${_scopeId7}>`);
                                                    _push8(ssrRenderComponent(_component_v_img, {
                                                      rounded: "lg",
                                                      width: "50px",
                                                      "aspect-ratio": "1",
                                                      cover: "",
                                                      class: "zoom-image shadow-sm",
                                                      src: variation.image_url,
                                                      alt: ""
                                                    }, {
                                                      placeholder: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`<div class="d-flex align-center justify-center fill-height"${_scopeId8}>`);
                                                          _push9(ssrRenderComponent(_component_v_progress_circular, {
                                                            color: "grey-lighten-4",
                                                            indeterminate: ""
                                                          }, null, _parent9, _scopeId8));
                                                          _push9(`</div>`);
                                                        } else {
                                                          return [
                                                            createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                              createVNode(_component_v_progress_circular, {
                                                                color: "grey-lighten-4",
                                                                indeterminate: ""
                                                              })
                                                            ])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(`</div><div class="grow flex flex-row items-center"${_scopeId7}><div${_scopeId7}><p class="font-bold text-lg"${_scopeId7}>${ssrInterpolate(variation.name)}</p></div></div></div>`);
                                                  } else {
                                                    return [
                                                      createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                                        createVNode("div", { class: "shrink-0" }, [
                                                          createVNode(_component_v_img, {
                                                            rounded: "lg",
                                                            width: "50px",
                                                            "aspect-ratio": "1",
                                                            cover: "",
                                                            class: "zoom-image shadow-sm",
                                                            src: variation.image_url,
                                                            alt: ""
                                                          }, {
                                                            placeholder: withCtx(() => [
                                                              createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                                createVNode(_component_v_progress_circular, {
                                                                  color: "grey-lighten-4",
                                                                  indeterminate: ""
                                                                })
                                                              ])
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["src"])
                                                        ]),
                                                        createVNode("div", { class: "grow flex flex-row items-center" }, [
                                                          createVNode("div", null, [
                                                            createVNode("p", { class: "font-bold text-lg" }, toDisplayString(variation.name), 1)
                                                          ])
                                                        ])
                                                      ])
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_v_card_item, null, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                                      createVNode("div", { class: "shrink-0" }, [
                                                        createVNode(_component_v_img, {
                                                          rounded: "lg",
                                                          width: "50px",
                                                          "aspect-ratio": "1",
                                                          cover: "",
                                                          class: "zoom-image shadow-sm",
                                                          src: variation.image_url,
                                                          alt: ""
                                                        }, {
                                                          placeholder: withCtx(() => [
                                                            createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                              createVNode(_component_v_progress_circular, {
                                                                color: "grey-lighten-4",
                                                                indeterminate: ""
                                                              })
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["src"])
                                                      ]),
                                                      createVNode("div", { class: "grow flex flex-row items-center" }, [
                                                        createVNode("div", null, [
                                                          createVNode("p", { class: "font-bold text-lg" }, toDisplayString(variation.name), 1)
                                                        ])
                                                      ])
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        return [
                                          createVNode("div", mergeProps({ ref_for: true }, props3, { class: "cursor-pointer" }), [
                                            createVNode(_component_v_card, {
                                              class: "cursor-pointer",
                                              color: selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? "#f99c19" : "grey-lighten-4",
                                              rounded: "lg"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_card_item, null, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                                      createVNode("div", { class: "shrink-0" }, [
                                                        createVNode(_component_v_img, {
                                                          rounded: "lg",
                                                          width: "50px",
                                                          "aspect-ratio": "1",
                                                          cover: "",
                                                          class: "zoom-image shadow-sm",
                                                          src: variation.image_url,
                                                          alt: ""
                                                        }, {
                                                          placeholder: withCtx(() => [
                                                            createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                              createVNode(_component_v_progress_circular, {
                                                                color: "grey-lighten-4",
                                                                indeterminate: ""
                                                              })
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["src"])
                                                      ]),
                                                      createVNode("div", { class: "grow flex flex-row items-center" }, [
                                                        createVNode("div", null, [
                                                          createVNode("p", { class: "font-bold text-lg" }, toDisplayString(variation.name), 1)
                                                        ])
                                                      ])
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1032, ["color"])
                                          ], 16)
                                        ];
                                      }
                                    }),
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="p-4"${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_v_list, {
                                          elevation: "2",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_v_list_item, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`<div class="flex flex-row items-center gap-2 w-full"${_scopeId7}>`);
                                                    if (variation.possible_quantity) {
                                                      _push8(`<div class="flex flex-row items-center gap-2 w-full"${_scopeId7}><!--[-->`);
                                                      ssrRenderList(variation.possible_quantity, (quantity) => {
                                                        _push8(`<div class="bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"${_scopeId7}> x${ssrInterpolate(quantity)}</div>`);
                                                      });
                                                      _push8(`<!--]--></div>`);
                                                    } else {
                                                      _push8(`<div${_scopeId7}><p${_scopeId7}>The subscription has reached the maximum of 9 items.</p></div>`);
                                                    }
                                                    if (selectedProduct.value && selectedProduct.value.variation.uid === variation.uid) {
                                                      _push8(`<div class="bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"${_scopeId7}> Remove </div>`);
                                                    } else {
                                                      _push8(`<!---->`);
                                                    }
                                                    _push8(`</div>`);
                                                  } else {
                                                    return [
                                                      createVNode("div", { class: "flex flex-row items-center gap-2 w-full" }, [
                                                        variation.possible_quantity ? (openBlock(), createBlock("div", {
                                                          key: 0,
                                                          class: "flex flex-row items-center gap-2 w-full"
                                                        }, [
                                                          (openBlock(true), createBlock(Fragment, null, renderList(variation.possible_quantity, (quantity) => {
                                                            return openBlock(), createBlock("div", {
                                                              onClick: withModifiers(($event) => selectProduct(variation, quantity), ["prevent"]),
                                                              class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                            }, " x" + toDisplayString(quantity), 9, ["onClick"]);
                                                          }), 256))
                                                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                                          createVNode("p", null, "The subscription has reached the maximum of 9 items.")
                                                        ])),
                                                        selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? (openBlock(), createBlock("div", {
                                                          key: 2,
                                                          onClick: withModifiers(($event) => removeProduct(variation, _ctx.quantity), ["prevent"]),
                                                          class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                        }, " Remove ", 8, ["onClick"])) : createCommentVNode("", true)
                                                      ])
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_v_list_item, null, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "flex flex-row items-center gap-2 w-full" }, [
                                                      variation.possible_quantity ? (openBlock(), createBlock("div", {
                                                        key: 0,
                                                        class: "flex flex-row items-center gap-2 w-full"
                                                      }, [
                                                        (openBlock(true), createBlock(Fragment, null, renderList(variation.possible_quantity, (quantity) => {
                                                          return openBlock(), createBlock("div", {
                                                            onClick: withModifiers(($event) => selectProduct(variation, quantity), ["prevent"]),
                                                            class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                          }, " x" + toDisplayString(quantity), 9, ["onClick"]);
                                                        }), 256))
                                                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                                        createVNode("p", null, "The subscription has reached the maximum of 9 items.")
                                                      ])),
                                                      selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? (openBlock(), createBlock("div", {
                                                        key: 2,
                                                        onClick: withModifiers(($event) => removeProduct(variation, _ctx.quantity), ["prevent"]),
                                                        class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                      }, " Remove ", 8, ["onClick"])) : createCommentVNode("", true)
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "p-4" }, [
                                            createVNode(_component_v_list, {
                                              elevation: "2",
                                              rounded: "lg"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_list_item, null, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "flex flex-row items-center gap-2 w-full" }, [
                                                      variation.possible_quantity ? (openBlock(), createBlock("div", {
                                                        key: 0,
                                                        class: "flex flex-row items-center gap-2 w-full"
                                                      }, [
                                                        (openBlock(true), createBlock(Fragment, null, renderList(variation.possible_quantity, (quantity) => {
                                                          return openBlock(), createBlock("div", {
                                                            onClick: withModifiers(($event) => selectProduct(variation, quantity), ["prevent"]),
                                                            class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                          }, " x" + toDisplayString(quantity), 9, ["onClick"]);
                                                        }), 256))
                                                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                                        createVNode("p", null, "The subscription has reached the maximum of 9 items.")
                                                      ])),
                                                      selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? (openBlock(), createBlock("div", {
                                                        key: 2,
                                                        onClick: withModifiers(($event) => removeProduct(variation, _ctx.quantity), ["prevent"]),
                                                        class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                      }, " Remove ", 8, ["onClick"])) : createCommentVNode("", true)
                                                    ])
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
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_v_menu, null, {
                                      activator: withCtx(({ props: props3 }) => [
                                        createVNode("div", mergeProps({ ref_for: true }, props3, { class: "cursor-pointer" }), [
                                          createVNode(_component_v_card, {
                                            class: "cursor-pointer",
                                            color: selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? "#f99c19" : "grey-lighten-4",
                                            rounded: "lg"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_card_item, null, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                                    createVNode("div", { class: "shrink-0" }, [
                                                      createVNode(_component_v_img, {
                                                        rounded: "lg",
                                                        width: "50px",
                                                        "aspect-ratio": "1",
                                                        cover: "",
                                                        class: "zoom-image shadow-sm",
                                                        src: variation.image_url,
                                                        alt: ""
                                                      }, {
                                                        placeholder: withCtx(() => [
                                                          createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                            createVNode(_component_v_progress_circular, {
                                                              color: "grey-lighten-4",
                                                              indeterminate: ""
                                                            })
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["src"])
                                                    ]),
                                                    createVNode("div", { class: "grow flex flex-row items-center" }, [
                                                      createVNode("div", null, [
                                                        createVNode("p", { class: "font-bold text-lg" }, toDisplayString(variation.name), 1)
                                                      ])
                                                    ])
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1032, ["color"])
                                        ], 16)
                                      ]),
                                      default: withCtx(() => [
                                        createVNode("div", { class: "p-4" }, [
                                          createVNode(_component_v_list, {
                                            elevation: "2",
                                            rounded: "lg"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_list_item, null, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex flex-row items-center gap-2 w-full" }, [
                                                    variation.possible_quantity ? (openBlock(), createBlock("div", {
                                                      key: 0,
                                                      class: "flex flex-row items-center gap-2 w-full"
                                                    }, [
                                                      (openBlock(true), createBlock(Fragment, null, renderList(variation.possible_quantity, (quantity) => {
                                                        return openBlock(), createBlock("div", {
                                                          onClick: withModifiers(($event) => selectProduct(variation, quantity), ["prevent"]),
                                                          class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                        }, " x" + toDisplayString(quantity), 9, ["onClick"]);
                                                      }), 256))
                                                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                                      createVNode("p", null, "The subscription has reached the maximum of 9 items.")
                                                    ])),
                                                    selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? (openBlock(), createBlock("div", {
                                                      key: 2,
                                                      onClick: withModifiers(($event) => removeProduct(variation, _ctx.quantity), ["prevent"]),
                                                      class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                    }, " Remove ", 8, ["onClick"])) : createCommentVNode("", true)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                              return openBlock(), createBlock(_component_v_list_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_menu, null, {
                                    activator: withCtx(({ props: props3 }) => [
                                      createVNode("div", mergeProps({ ref_for: true }, props3, { class: "cursor-pointer" }), [
                                        createVNode(_component_v_card, {
                                          class: "cursor-pointer",
                                          color: selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? "#f99c19" : "grey-lighten-4",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_card_item, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                                  createVNode("div", { class: "shrink-0" }, [
                                                    createVNode(_component_v_img, {
                                                      rounded: "lg",
                                                      width: "50px",
                                                      "aspect-ratio": "1",
                                                      cover: "",
                                                      class: "zoom-image shadow-sm",
                                                      src: variation.image_url,
                                                      alt: ""
                                                    }, {
                                                      placeholder: withCtx(() => [
                                                        createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                          createVNode(_component_v_progress_circular, {
                                                            color: "grey-lighten-4",
                                                            indeterminate: ""
                                                          })
                                                        ])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["src"])
                                                  ]),
                                                  createVNode("div", { class: "grow flex flex-row items-center" }, [
                                                    createVNode("div", null, [
                                                      createVNode("p", { class: "font-bold text-lg" }, toDisplayString(variation.name), 1)
                                                    ])
                                                  ])
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1032, ["color"])
                                      ], 16)
                                    ]),
                                    default: withCtx(() => [
                                      createVNode("div", { class: "p-4" }, [
                                        createVNode(_component_v_list, {
                                          elevation: "2",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_list_item, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex flex-row items-center gap-2 w-full" }, [
                                                  variation.possible_quantity ? (openBlock(), createBlock("div", {
                                                    key: 0,
                                                    class: "flex flex-row items-center gap-2 w-full"
                                                  }, [
                                                    (openBlock(true), createBlock(Fragment, null, renderList(variation.possible_quantity, (quantity) => {
                                                      return openBlock(), createBlock("div", {
                                                        onClick: withModifiers(($event) => selectProduct(variation, quantity), ["prevent"]),
                                                        class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                      }, " x" + toDisplayString(quantity), 9, ["onClick"]);
                                                    }), 256))
                                                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                                    createVNode("p", null, "The subscription has reached the maximum of 9 items.")
                                                  ])),
                                                  selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? (openBlock(), createBlock("div", {
                                                    key: 2,
                                                    onClick: withModifiers(($event) => removeProduct(variation, _ctx.quantity), ["prevent"]),
                                                    class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                  }, " Remove ", 8, ["onClick"])) : createCommentVNode("", true)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 256))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_v_list, {
                        elevation: "3",
                        color: "blue",
                        class: "flex flex-col gap-1"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                            return openBlock(), createBlock(_component_v_list_item, null, {
                              default: withCtx(() => [
                                createVNode(_component_v_menu, null, {
                                  activator: withCtx(({ props: props3 }) => [
                                    createVNode("div", mergeProps({ ref_for: true }, props3, { class: "cursor-pointer" }), [
                                      createVNode(_component_v_card, {
                                        class: "cursor-pointer",
                                        color: selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? "#f99c19" : "grey-lighten-4",
                                        rounded: "lg"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_card_item, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                                createVNode("div", { class: "shrink-0" }, [
                                                  createVNode(_component_v_img, {
                                                    rounded: "lg",
                                                    width: "50px",
                                                    "aspect-ratio": "1",
                                                    cover: "",
                                                    class: "zoom-image shadow-sm",
                                                    src: variation.image_url,
                                                    alt: ""
                                                  }, {
                                                    placeholder: withCtx(() => [
                                                      createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                        createVNode(_component_v_progress_circular, {
                                                          color: "grey-lighten-4",
                                                          indeterminate: ""
                                                        })
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["src"])
                                                ]),
                                                createVNode("div", { class: "grow flex flex-row items-center" }, [
                                                  createVNode("div", null, [
                                                    createVNode("p", { class: "font-bold text-lg" }, toDisplayString(variation.name), 1)
                                                  ])
                                                ])
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["color"])
                                    ], 16)
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("div", { class: "p-4" }, [
                                      createVNode(_component_v_list, {
                                        elevation: "2",
                                        rounded: "lg"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_list_item, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex flex-row items-center gap-2 w-full" }, [
                                                variation.possible_quantity ? (openBlock(), createBlock("div", {
                                                  key: 0,
                                                  class: "flex flex-row items-center gap-2 w-full"
                                                }, [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(variation.possible_quantity, (quantity) => {
                                                    return openBlock(), createBlock("div", {
                                                      onClick: withModifiers(($event) => selectProduct(variation, quantity), ["prevent"]),
                                                      class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                    }, " x" + toDisplayString(quantity), 9, ["onClick"]);
                                                  }), 256))
                                                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                                  createVNode("p", null, "The subscription has reached the maximum of 9 items.")
                                                ])),
                                                selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? (openBlock(), createBlock("div", {
                                                  key: 2,
                                                  onClick: withModifiers(($event) => removeProduct(variation, _ctx.quantity), ["prevent"]),
                                                  class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                }, " Remove ", 8, ["onClick"])) : createCommentVNode("", true)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
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
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-3" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(props2.products, (product, index) => {
                  return openBlock(), createBlock("div", null, [
                    createVNode(_component_v_menu, null, {
                      activator: withCtx(({ props: props3 }) => [
                        createVNode("div", mergeProps({ ref_for: true }, props3, { class: "cursor-pointer" }), [
                          createVNode(_component_v_card, {
                            color: selectedProduct.value && selectedProduct.value.product.uid === product.uid ? "#f99c19" : "grey-lighten-4",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_card_item, null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                    createVNode("div", { class: "shrink-0" }, [
                                      createVNode(_component_v_img, {
                                        rounded: "lg",
                                        width: "50px",
                                        "aspect-ratio": "1",
                                        cover: "",
                                        class: "zoom-image shadow-sm",
                                        src: product.image_url,
                                        alt: ""
                                      }, {
                                        placeholder: withCtx(() => [
                                          createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                            createVNode(_component_v_progress_circular, {
                                              color: "grey-lighten-4",
                                              indeterminate: ""
                                            })
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["src"])
                                    ]),
                                    createVNode("div", { class: "grow flex flex-row items-center" }, [
                                      createVNode("div", null, [
                                        createVNode("p", { class: "font-bold text-lg" }, toDisplayString(product.name), 1)
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["color"])
                        ], 16)
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_v_list, {
                          elevation: "3",
                          color: "blue",
                          class: "flex flex-col gap-1"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                              return openBlock(), createBlock(_component_v_list_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_menu, null, {
                                    activator: withCtx(({ props: props3 }) => [
                                      createVNode("div", mergeProps({ ref_for: true }, props3, { class: "cursor-pointer" }), [
                                        createVNode(_component_v_card, {
                                          class: "cursor-pointer",
                                          color: selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? "#f99c19" : "grey-lighten-4",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_card_item, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex flex-row flex-wrap gap-6 items-center" }, [
                                                  createVNode("div", { class: "shrink-0" }, [
                                                    createVNode(_component_v_img, {
                                                      rounded: "lg",
                                                      width: "50px",
                                                      "aspect-ratio": "1",
                                                      cover: "",
                                                      class: "zoom-image shadow-sm",
                                                      src: variation.image_url,
                                                      alt: ""
                                                    }, {
                                                      placeholder: withCtx(() => [
                                                        createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                          createVNode(_component_v_progress_circular, {
                                                            color: "grey-lighten-4",
                                                            indeterminate: ""
                                                          })
                                                        ])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["src"])
                                                  ]),
                                                  createVNode("div", { class: "grow flex flex-row items-center" }, [
                                                    createVNode("div", null, [
                                                      createVNode("p", { class: "font-bold text-lg" }, toDisplayString(variation.name), 1)
                                                    ])
                                                  ])
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1032, ["color"])
                                      ], 16)
                                    ]),
                                    default: withCtx(() => [
                                      createVNode("div", { class: "p-4" }, [
                                        createVNode(_component_v_list, {
                                          elevation: "2",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_list_item, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex flex-row items-center gap-2 w-full" }, [
                                                  variation.possible_quantity ? (openBlock(), createBlock("div", {
                                                    key: 0,
                                                    class: "flex flex-row items-center gap-2 w-full"
                                                  }, [
                                                    (openBlock(true), createBlock(Fragment, null, renderList(variation.possible_quantity, (quantity) => {
                                                      return openBlock(), createBlock("div", {
                                                        onClick: withModifiers(($event) => selectProduct(variation, quantity), ["prevent"]),
                                                        class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                      }, " x" + toDisplayString(quantity), 9, ["onClick"]);
                                                    }), 256))
                                                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                                    createVNode("p", null, "The subscription has reached the maximum of 9 items.")
                                                  ])),
                                                  selectedProduct.value && selectedProduct.value.variation.uid === variation.uid ? (openBlock(), createBlock("div", {
                                                    key: 2,
                                                    onClick: withModifiers(($event) => removeProduct(variation, _ctx.quantity), ["prevent"]),
                                                    class: "bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                  }, " Remove ", 8, ["onClick"])) : createCommentVNode("", true)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
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
                  ]);
                }), 256))
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$6, { onClick: closeProduct }, {
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
              createVNode(_sfc_main$6, { onClick: closeProduct }, {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CustomPlanProductModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props2, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "AddressModal",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  setup(__props, { expose: __expose }) {
    const showAddressModal = ref(false);
    const selectedAddress = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const props2 = __props;
    const formAddress = reactive({
      phone: "",
      full_name: "",
      address_1: "",
      address_2: "",
      post_code: "",
      city: ""
    });
    const openAddress = () => {
      local_errors.value = {};
      modalTitle.value = "Edit address";
      selectedAddress.value = null;
      formAddress.name = null;
      saveButtonText.value = "Save address";
      axios.get(route("get_address")).then((response) => {
        formAddress.phone = response.data.phone;
        formAddress.full_name = response.data.full_name;
        formAddress.address_1 = response.data.address_1;
        formAddress.address_2 = response.data.address_2;
        formAddress.post_code = response.data.post_code;
        formAddress.city = response.data.city;
        showAddressModal.value = true;
      }).catch((error) => {
        console.error("error");
      });
    };
    const closeAddress = () => {
      showAddressModal.value = false;
      selectedAddress.value = null;
    };
    const local_errors = ref({});
    const saveAddress = () => {
      const url = route("update_address");
      router.post(url, formAddress, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          closeAddress();
        },
        onError: (error) => {
          local_errors.value = props2.errors;
        }
      });
    };
    __expose({ openAddress });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      _push(ssrRenderComponent(_sfc_main$5, mergeProps({
        show: showAddressModal.value,
        onClose: closeAddress
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
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Recipient name`);
                } else {
                  return [
                    createTextVNode("Recipient name")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              density: "compact",
              modelValue: formAddress.full_name,
              "onUpdate:modelValue": ($event) => formAddress.full_name = $event,
              "error-messages": local_errors.value.full_name
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Address line 1`);
                } else {
                  return [
                    createTextVNode("Address line 1")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              density: "compact",
              modelValue: formAddress.address_1,
              "onUpdate:modelValue": ($event) => formAddress.address_1 = $event,
              "error-messages": local_errors.value.address_1
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Address line 2`);
                } else {
                  return [
                    createTextVNode("Address line 2")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              density: "compact",
              modelValue: formAddress.address_2,
              "onUpdate:modelValue": ($event) => formAddress.address_2 = $event,
              "error-messages": local_errors.value.address_2
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`City`);
                } else {
                  return [
                    createTextVNode("City")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              density: "compact",
              modelValue: formAddress.city,
              "onUpdate:modelValue": ($event) => formAddress.city = $event,
              "error-messages": local_errors.value.city
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Post code`);
                } else {
                  return [
                    createTextVNode("Post code")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              density: "compact",
              modelValue: formAddress.post_code,
              "onUpdate:modelValue": ($event) => formAddress.post_code = $event,
              "error-messages": local_errors.value.post_code
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Phone`);
                } else {
                  return [
                    createTextVNode("Phone")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              density: "compact",
              modelValue: formAddress.phone,
              "onUpdate:modelValue": ($event) => formAddress.phone = $event,
              "error-messages": local_errors.value.phone
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(_component_v_label, null, {
                  default: withCtx(() => [
                    createTextVNode("Recipient name")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_text_field, {
                  density: "compact",
                  modelValue: formAddress.full_name,
                  "onUpdate:modelValue": ($event) => formAddress.full_name = $event,
                  "error-messages": local_errors.value.full_name
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
              ]),
              createVNode("div", null, [
                createVNode(_component_v_label, null, {
                  default: withCtx(() => [
                    createTextVNode("Address line 1")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_text_field, {
                  density: "compact",
                  modelValue: formAddress.address_1,
                  "onUpdate:modelValue": ($event) => formAddress.address_1 = $event,
                  "error-messages": local_errors.value.address_1
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
              ]),
              createVNode("div", null, [
                createVNode(_component_v_label, null, {
                  default: withCtx(() => [
                    createTextVNode("Address line 2")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_text_field, {
                  density: "compact",
                  modelValue: formAddress.address_2,
                  "onUpdate:modelValue": ($event) => formAddress.address_2 = $event,
                  "error-messages": local_errors.value.address_2
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
              ]),
              createVNode("div", null, [
                createVNode(_component_v_label, null, {
                  default: withCtx(() => [
                    createTextVNode("City")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_text_field, {
                  density: "compact",
                  modelValue: formAddress.city,
                  "onUpdate:modelValue": ($event) => formAddress.city = $event,
                  "error-messages": local_errors.value.city
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
              ]),
              createVNode("div", null, [
                createVNode(_component_v_label, null, {
                  default: withCtx(() => [
                    createTextVNode("Post code")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_text_field, {
                  density: "compact",
                  modelValue: formAddress.post_code,
                  "onUpdate:modelValue": ($event) => formAddress.post_code = $event,
                  "error-messages": local_errors.value.post_code
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
              ]),
              createVNode("div", null, [
                createVNode(_component_v_label, null, {
                  default: withCtx(() => [
                    createTextVNode("Phone")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_text_field, {
                  density: "compact",
                  modelValue: formAddress.phone,
                  "onUpdate:modelValue": ($event) => formAddress.phone = $event,
                  "error-messages": local_errors.value.phone
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$7, {
              onClick: saveAddress,
              class: "me-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(saveButtonText.value)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(saveButtonText.value), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, { onClick: closeAddress }, {
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
              createVNode(_sfc_main$7, {
                onClick: saveAddress,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(saveButtonText.value), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$6, { onClick: closeAddress }, {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AddressModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props2, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DeliveryDayModal",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const showDeliveryDayModal = ref(false);
    const selectedDeliveryDay = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const formDeliveryDay = reactive({
      day: null
    });
    const openDeliveryDay = (day = null) => {
      local_errors.value = {};
      if (day) {
        modalTitle.value = "Edit delivery day";
        selectedDeliveryDay.value = day;
        formDeliveryDay.day = day;
        saveButtonText.value = "Save delivery day";
        showDeliveryDayModal.value = true;
      }
    };
    const closeDeliveryDay = () => {
      showDeliveryDayModal.value = false;
      selectedDeliveryDay.value = null;
    };
    const local_errors = ref({});
    const saveDeliveryDay = () => {
      let url;
      if (selectedDeliveryDay.value) {
        url = route("update_delivery_day");
        router.post(url, formDeliveryDay, {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (page) => {
            closeDeliveryDay();
          },
          onError: (error) => {
            local_errors.value = props.errors;
          }
        });
      }
    };
    __expose({ openDeliveryDay });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_radio_group = resolveComponent("v-radio-group");
      const _component_v_radio = resolveComponent("v-radio");
      _push(ssrRenderComponent(_sfc_main$5, mergeProps({
        show: showDeliveryDayModal.value,
        onClose: closeDeliveryDay
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
            _push2(`<div class="flex flex-row items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_radio_group, {
              modelValue: formDeliveryDay.day,
              "onUpdate:modelValue": ($event) => formDeliveryDay.day = $event,
              inline: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_radio, {
                    label: "Friday",
                    value: "friday"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_radio, {
                    label: "Saturday",
                    value: "saturday"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_radio, {
                      label: "Friday",
                      value: "friday"
                    }),
                    createVNode(_component_v_radio, {
                      label: "Saturday",
                      value: "saturday"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-row items-center justify-center" }, [
                createVNode(_component_v_radio_group, {
                  modelValue: formDeliveryDay.day,
                  "onUpdate:modelValue": ($event) => formDeliveryDay.day = $event,
                  inline: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_radio, {
                      label: "Friday",
                      value: "friday"
                    }),
                    createVNode(_component_v_radio, {
                      label: "Saturday",
                      value: "saturday"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$7, {
              onClick: saveDeliveryDay,
              class: "me-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(saveButtonText.value)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(saveButtonText.value), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, { onClick: closeDeliveryDay }, {
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
              createVNode(_sfc_main$7, {
                onClick: saveDeliveryDay,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(saveButtonText.value), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$6, { onClick: closeDeliveryDay }, {
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
_sfc_main$1.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DeliveryDayModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props2, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    content: Object,
    plans: Object,
    subscribed_plan: Object,
    add_on_products: Object,
    add_on_variations: Object,
    customization_products: Object,
    premium_subscription_items: Object,
    stripe_key: String,
    next_available_date: String,
    phone: String,
    full_name: String,
    address_1: String,
    address_2: String,
    post_code: String,
    city: String,
    is_subscribed: Boolean,
    renews: Boolean,
    has_valid_postcode: Boolean,
    billing_period_ends: String,
    errors: Object,
    plan_variations: Object,
    premium_subscription_item_uids: Object,
    extra_delivery_fee: Object,
    delivery_day: String,
    can_update_delivery_day: Boolean
  },
  setup(__props) {
    const { mobile } = useDisplay();
    gsap.registerPlugin(ScrollTrigger);
    const props2 = __props;
    onMounted(() => {
      gsap.from(".animate-item", {
        scrollTrigger: {
          trigger: ".animate-item",
          start: "top 60%"
        },
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power2.out"
      });
      gsap.from(".animate-item-2", {
        scrollTrigger: {
          trigger: ".animate-item",
          start: "top 60%"
        },
        opacity: 0,
        y: -30,
        duration: 1,
        delay: 0.25,
        ease: "power2.out"
      });
      gsap.from(".animate-item-3", {
        scrollTrigger: {
          trigger: ".animate-item",
          start: "top 60%"
        },
        opacity: 0,
        y: -30,
        duration: 1,
        delay: 0.5,
        ease: "power2.out"
      });
    });
    const selectedPlan = ref(null);
    const showPlanModal = ref(false);
    const modalTitle = ref("");
    const subscribeForm = reactive({
      plan: null,
      frequency: null,
      delivery_day: null
    });
    let stripe;
    const selectPlan = (plan) => {
      subscribeForm.frequency = null;
      subscribeForm.delivery_day = null;
      modalTitle.value = `Plan ${plan.name}`;
      selectedPlan.value = plan;
      subscribeForm.plan = plan.uid;
      showPlanModal.value = true;
    };
    const resetPlan = () => {
      for (let key in errors) {
        delete errors[key];
      }
      showPlanModal.value = false;
    };
    const loadStripeScript = () => {
      return new Promise((resolve) => {
        if (window.Stripe) {
          resolve();
        } else {
          const script = document.createElement("script");
          script.id = "stripe-js";
          script.src = "https://js.stripe.com/v3/";
          script.onload = resolve;
          document.body.appendChild(script);
        }
      });
    };
    const errors = reactive({});
    const subscribe = async () => {
      try {
        for (let key in errors) {
          delete errors[key];
        }
        const plan_id = selectedPlan.value.id;
        const response = await axios.post(route("subscribe"), subscribeForm);
        const sessionId = response.data.id;
        stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const responseErrors = error.response.data.errors;
          Object.keys(responseErrors).forEach((key) => {
            errors[key] = responseErrors[key];
          });
        } else {
          errors.value = ["An unexpected error occurred. Please try again."];
        }
      }
    };
    const createCustomerPortalSession = async () => {
      try {
        const response = await axios.post(route("stripe.customer-portal"));
        window.location.href = response.data.url;
      } catch (error) {
        console.error("Error creating Customer Portal Session:", error);
      }
    };
    const customPlanProductModal = ref(null);
    const openProductModal = (product) => {
      customPlanProductModal.value.openProduct(product);
    };
    const addressModal = ref(null);
    const postCode = ref("");
    const local_errors = ref({});
    const savePostCode = () => {
      local_errors.value = {};
      router.post(route("save_postcode"), {
        postcode: postCode.value
      }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          subscribeForm.post_code = props2.post_code;
        },
        onError: (error) => {
          local_errors.value = props2.errors;
        }
      });
    };
    const modifyBoxSelection = ref(false);
    const manageAddOns = ref(false);
    const boxSelectionForm = reactive({
      variations: [],
      quantities: {}
    });
    const handleCheckboxChange = (uid) => {
      if (boxSelectionForm.variations.includes(uid)) {
        if (!boxSelectionForm.quantities[uid]) {
          boxSelectionForm.quantities = { ...boxSelectionForm.quantities, [uid]: 1 };
        }
      } else {
        delete boxSelectionForm.quantities[uid];
      }
    };
    const productQuantity = computed(() => {
      return Object.values(boxSelectionForm.quantities).reduce((sum, quantity) => sum + quantity, 0);
    });
    const isActive = (uid) => {
      return Object.prototype.hasOwnProperty.call(boxSelectionForm.quantities, uid);
    };
    const toggleModifyBoxSelection = () => {
      manageAddOns.value = false;
      modifyBoxSelection.value = true;
      boxSelectionForm.variations = Object.keys(props2.premium_subscription_item_uids);
      boxSelectionForm.quantities = { ...props2.premium_subscription_item_uids };
    };
    const toggleManageAddons = () => {
      if (props2.add_on_variations) {
        const list = {};
        Object.values(props2.add_on_variations).forEach((variation) => {
          list[variation.uid] = variation.price;
        });
        variationPrices.value = list;
      }
      modifyBoxSelection.value = false;
      manageAddOns.value = true;
    };
    const toggleAllOff = () => {
      modifyBoxSelection.value = false;
      manageAddOns.value = false;
      boxSelectionForm.variations = [];
      boxSelectionForm.quantities = {};
    };
    const saveBoxSelection = () => {
      if (modifyBoxSelection.value) {
        router.post(route("update_box_selection"), boxSelectionForm, {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (page) => {
            toggleAllOff();
          },
          onError: (error) => {
            local_errors.value = props2.errors;
          }
        });
      }
    };
    function formatNumber(value) {
      const number = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
      return "$" + number;
    }
    const selectedVariations = ref([]);
    const selectedQuantities = ref([]);
    const selectedAmounts = ref([]);
    const selectedAmountsFormatted = ref([]);
    const variationPrices = ref({});
    const subQuantity = (uid) => {
      if (selectedQuantities.value[uid] > 1) {
        selectedQuantities.value = {
          ...selectedQuantities.value,
          [uid]: selectedQuantities.value[uid] - 1
        };
        updateSelectedAmount(uid);
      } else {
        const { [uid]: unusedValue, ...rest } = selectedQuantities.value;
        selectedQuantities.value = rest;
        updateSelectedAmount(uid);
        const { [uid]: unusedAmount, ...remainingAmounts } = selectedAmountsFormatted.value;
        selectedAmountsFormatted.value = remainingAmounts;
        if (selectedVariations.value.includes(uid)) {
          selectedVariations.value = selectedVariations.value.filter((item) => item !== uid);
        }
      }
    };
    function isValidUrl(url) {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    }
    const checkout = () => {
      axios.post(route("add_on_checkout"), {
        addons: selectedQuantities.value
      }).then((response) => {
        const url = response.data.url;
        if (url === "error") {
          console.log("An error occurred");
        } else if (isValidUrl(url)) {
          window.location.href = url;
        } else {
          console.log("Invalid URL");
        }
      }).catch((error) => {
        console.log(error);
        console.error("error");
      });
    };
    const amountsSum = computed(() => {
      return Object.values(selectedAmounts.value).reduce((sum, value) => sum + value, 0);
    });
    const amountsSumFormatted = computed(() => {
      return formatNumber(amountsSum.value);
    });
    const addQuantity = (uid) => {
      selectedQuantities.value = {
        ...selectedQuantities.value,
        [uid]: selectedQuantities.value[uid] ? selectedQuantities.value[uid] + 1 : 1
      };
      if (!selectedVariations.value.includes(uid)) {
        selectedVariations.value.push(uid);
      }
      updateSelectedAmount(uid);
    };
    const plansWrapperClass = computed(() => {
      if (props2.plans.length === 1) {
        return "flex flex-row justify-center max-w-md mx-auto gap-6";
      }
      return "grid grid-cols-1 lg:grid-cols-2 gap-6";
    });
    const featuresWrapperClass = computed(() => {
      if (props2.plans.length === 1) {
        return "grid grid-cols-2 gap-0";
      }
      return "grid grid-cols-1 lg:grid-cols-3 gap-0";
    });
    const updateSelectedAmount = (uid) => {
      selectedAmounts.value[uid] = variationPrices.value[uid] * selectedQuantities.value[uid];
      selectedAmountsFormatted.value[uid] = formatNumber(variationPrices.value[uid] * selectedQuantities.value[uid]);
    };
    watch(selectedVariations, (newVal, oldVal) => {
      const updatedQuantities = { ...selectedQuantities.value };
      const updatedAmounts = { ...selectedAmounts.value };
      const updatedAmountsFormatted = { ...selectedAmountsFormatted.value };
      newVal.forEach((uid) => {
        if (!updatedQuantities.hasOwnProperty(uid)) {
          updatedQuantities[uid] = 1;
        }
        if (!updatedAmounts.hasOwnProperty(uid)) {
          updatedAmounts[uid] = variationPrices.value[uid];
        }
        if (!updatedAmountsFormatted.hasOwnProperty(uid)) {
          updatedAmountsFormatted[uid] = formatNumber(variationPrices.value[uid]);
        }
      });
      oldVal.forEach((uid) => {
        if (!newVal.includes(uid)) {
          delete updatedQuantities[uid];
          delete updatedAmounts[uid];
          delete updatedAmountsFormatted[uid];
        }
      });
      selectedQuantities.value = updatedQuantities;
      selectedAmounts.value = updatedAmounts;
      selectedAmountsFormatted.value = updatedAmountsFormatted;
    }, { deep: true });
    onMounted(async () => {
      await loadStripeScript();
      stripe = window.Stripe(props2.stripe_key);
      await nextTick(() => {
        subscribeForm.phone = props2.phone;
        subscribeForm.full_name = props2.full_name;
        subscribeForm.address_1 = props2.address_1;
        subscribeForm.address_2 = props2.address_2;
        subscribeForm.post_code = props2.post_code;
        subscribeForm.city = props2.city;
        postCode.value = props2.post_code;
      });
    });
    const deliveryDayModal = ref(null);
    const changeDay = () => {
      if (props2.can_update_delivery_day) {
        deliveryDayModal.value.openDeliveryDay(props2.delivery_day);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_img = resolveComponent("v-img");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_progress_circular = resolveComponent("v-progress-circular");
      const _component_v_number_input = resolveComponent("v-number-input");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_btn_toggle = resolveComponent("v-btn-toggle");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Subscription" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$8, { style: { "margin-top": "150px" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-center" data-v-fe4c6ac1${_scopeId2}><div class="text-center" data-v-fe4c6ac1${_scopeId2}><h1 class="text-7xl brand uppercase" data-v-fe4c6ac1${_scopeId2}>${unref(formatTitle)(props2.content.title) ?? ""}</h1>`);
                  if (!props2.has_valid_postcode) {
                    _push3(`<div class="w-full bg-red-lighten-2 mt-5 py-5 rounded-lg" data-v-fe4c6ac1${_scopeId2}><div data-v-fe4c6ac1${_scopeId2}><p data-v-fe4c6ac1${_scopeId2}>We can only deliver to certain postcodes in the Boston area.</p><p data-v-fe4c6ac1${_scopeId2}>Please enter your post code below to start.</p></div><div class="mt-5 max-w-xs mx-auto bg-white p-2" data-v-fe4c6ac1${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_text_field, {
                      onKeyup: savePostCode,
                      class: "text-black text-center",
                      modelValue: postCode.value,
                      "onUpdate:modelValue": ($event) => postCode.value = $event,
                      placeholder: "Your post code",
                      variant: "filled",
                      "hide-details": ""
                    }, {
                      append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_btn, {
                            onClick: savePostCode,
                            class: "pa-0 w-full",
                            variant: "flat"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Save`);
                              } else {
                                return [
                                  createTextVNode("Save")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_btn, {
                              onClick: withModifiers(savePostCode, ["prevent"]),
                              class: "pa-0 w-full",
                              variant: "flat"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Save")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (local_errors.value.postcode) {
                    _push3(`<p class="text-red font-bold mt-3" data-v-fe4c6ac1${_scopeId2}>${ssrInterpolate(local_errors.value.postcode)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (!props2.has_valid_postcode && props2.post_code) {
                    _push3(`<div class="mt-3" data-v-fe4c6ac1${_scopeId2}><p data-v-fe4c6ac1${_scopeId2}>Unfortunately, the post code <strong class="text-red" data-v-fe4c6ac1${_scopeId2}>${ssrInterpolate(props2.post_code)}</strong> is outside of our delivery zone.</p><p data-v-fe4c6ac1${_scopeId2}>Please enter a different post code.</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (props2.is_subscribed) {
                    _push3(`<div class="mt-5 flex flex-row items-center" data-v-fe4c6ac1${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_img, {
                      src: `/images/${props2.subscribed_plan.image}`,
                      width: "150",
                      class: "shrink-0",
                      style: { "margin-top": "-100px" }
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="grow" data-v-fe4c6ac1${_scopeId2}><p class="text-4xl font-semibold" data-v-fe4c6ac1${_scopeId2}>Welcome back, ${ssrInterpolate(_ctx.$page.props.auth.user.name)}</p><p class="text-2xl text-grey mt-5" data-v-fe4c6ac1${_scopeId2}>${ssrInterpolate(`Your subscription ${props2.renews ? "auto-renews" : "expires"} on ${props2.billing_period_ends}`)}</p></div>`);
                    _push3(ssrRenderComponent(_component_v_img, {
                      src: `/images/${props2.subscribed_plan.image}`,
                      width: "150",
                      class: "shrink-0",
                      style: { "margin-top": "-100px" }
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="mt-7 mb-20 pb-5" data-v-fe4c6ac1${_scopeId2}>${props2.content.introduction ?? ""}</div>`);
                  }
                  if (props2.is_subscribed) {
                    _push3(ssrRenderComponent(_component_v_btn, {
                      onClick: createCustomerPortalSession,
                      class: "rounded-pill mt-7",
                      variant: "flat",
                      color: "red-darken-2",
                      size: "large"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Manage subscription`);
                        } else {
                          return [
                            createTextVNode("Manage subscription")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (props2.is_subscribed) {
                    _push3(`<div class="mt-7" data-v-fe4c6ac1${_scopeId2}><p data-v-fe4c6ac1${_scopeId2}>You have chosen <strong class="uppercase" data-v-fe4c6ac1${_scopeId2}>${ssrInterpolate(props2.delivery_day)}</strong> as your delivery day.</p>`);
                    if (props2.can_update_delivery_day) {
                      _push3(`<div class="mt-2" data-v-fe4c6ac1${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_btn, {
                        onClick: changeDay,
                        variant: "text",
                        color: "blue"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Change day`);
                          } else {
                            return [
                              createTextVNode("Change day")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                  if (props2.has_valid_postcode) {
                    _push3(`<div data-v-fe4c6ac1${_scopeId2}>`);
                    if (props2.is_subscribed) {
                      _push3(`<div data-v-fe4c6ac1${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_card, {
                        class: "brand-bg-grey mt-10",
                        rounded: "xl"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div data-v-fe4c6ac1${_scopeId3}><div class="w-full text-center py-10" data-v-fe4c6ac1${_scopeId3}>`);
                            if (!props2.subscribed_plan.has_customization) {
                              _push4(`<p class="text-3xl brand" data-v-fe4c6ac1${_scopeId3}><i data-v-fe4c6ac1${_scopeId3}>Your subscription box</i></p>`);
                            } else if (modifyBoxSelection.value) {
                              _push4(`<p class="text-3xl brand" data-v-fe4c6ac1${_scopeId3}><i data-v-fe4c6ac1${_scopeId3}>Modify Box Selection</i></p>`);
                            } else if (manageAddOns.value) {
                              _push4(`<p class="text-3xl brand" data-v-fe4c6ac1${_scopeId3}><i data-v-fe4c6ac1${_scopeId3}>Add-On Menu</i></p>`);
                            } else {
                              _push4(`<p class="text-3xl brand" data-v-fe4c6ac1${_scopeId3}><i data-v-fe4c6ac1${_scopeId3}>Your Current Box Selection</i></p>`);
                            }
                            _push4(`<p class="mt-2" data-v-fe4c6ac1${_scopeId3}>Updating for ${ssrInterpolate(props2.next_available_date)} delivery</p></div>`);
                            if (modifyBoxSelection.value || !modifyBoxSelection.value && !manageAddOns.value) {
                              _push4(`<div data-v-fe4c6ac1${_scopeId3}><!--[-->`);
                              ssrRenderList(props2.plan_variations, (variation) => {
                                _push4(`<div data-v-fe4c6ac1${_scopeId3}>`);
                                if (modifyBoxSelection.value || !modifyBoxSelection.value && __props.premium_subscription_item_uids.hasOwnProperty(variation.uid)) {
                                  _push4(`<div class="border-t-2 border-white" data-v-fe4c6ac1${_scopeId3}><div class="flex flex-row items-center justify-between w-full" data-v-fe4c6ac1${_scopeId3}><div class="flex flex-row items-center gap-3 px-5 py-2 w-full" data-v-fe4c6ac1${_scopeId3}><div class="shrink-0" data-v-fe4c6ac1${_scopeId3}>`);
                                  if (modifyBoxSelection.value) {
                                    _push4(ssrRenderComponent(_component_v_checkbox, {
                                      "hide-details": "",
                                      value: variation.uid,
                                      modelValue: boxSelectionForm.variations,
                                      "onUpdate:modelValue": ($event) => boxSelectionForm.variations = $event,
                                      disabled: productQuantity.value >= 9 && !isActive(variation.uid),
                                      onChange: ($event) => handleCheckboxChange(variation.uid)
                                    }, null, _parent4, _scopeId3));
                                  } else if (__props.premium_subscription_item_uids.hasOwnProperty(variation.uid)) {
                                    _push4(ssrRenderComponent(_component_v_icon, { class: "mx-2" }, {
                                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                        if (_push5) {
                                          _push5(`mdi-checkbox-marked`);
                                        } else {
                                          return [
                                            createTextVNode("mdi-checkbox-marked")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent4, _scopeId3));
                                  } else {
                                    _push4(`<!---->`);
                                  }
                                  _push4(`</div><div class="shrink-0" data-v-fe4c6ac1${_scopeId3}>`);
                                  _push4(ssrRenderComponent(_component_v_img, {
                                    rounded: "lg",
                                    width: "50px",
                                    "aspect-ratio": "1",
                                    cover: "",
                                    class: "zoom-image shadow-sm",
                                    src: variation.image_url,
                                    alt: ""
                                  }, {
                                    placeholder: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(`<div class="d-flex align-center justify-center fill-height" data-v-fe4c6ac1${_scopeId4}>`);
                                        _push5(ssrRenderComponent(_component_v_progress_circular, {
                                          color: "grey-lighten-4",
                                          indeterminate: ""
                                        }, null, _parent5, _scopeId4));
                                        _push5(`</div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                            createVNode(_component_v_progress_circular, {
                                              color: "grey-lighten-4",
                                              indeterminate: ""
                                            })
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                  _push4(`</div><div class="grow" data-v-fe4c6ac1${_scopeId3}><p data-v-fe4c6ac1${_scopeId3}>${ssrInterpolate(variation.product.name)} (${ssrInterpolate(variation.name)}) `);
                                  if (!modifyBoxSelection.value && __props.premium_subscription_item_uids.hasOwnProperty(variation.uid)) {
                                    _push4(`<span class="text-grey ms-5" data-v-fe4c6ac1${_scopeId3}> x${ssrInterpolate(__props.premium_subscription_item_uids[variation.uid])}</span>`);
                                  } else {
                                    _push4(`<!---->`);
                                  }
                                  _push4(`</p></div><div style="${ssrRenderStyle({ "width": "200px" })}" class="shrink-0" data-v-fe4c6ac1${_scopeId3}>`);
                                  if (boxSelectionForm.variations.includes(variation.uid)) {
                                    _push4(ssrRenderComponent(_component_v_number_input, {
                                      class: "shrink-0",
                                      modelValue: boxSelectionForm.quantities[variation.uid],
                                      "onUpdate:modelValue": ($event) => boxSelectionForm.quantities[variation.uid] = $event,
                                      type: "number",
                                      density: "compact",
                                      variant: "outlined",
                                      "control-variant": "default",
                                      min: 1,
                                      max: 9 - (productQuantity.value - boxSelectionForm.quantities[variation.uid]),
                                      "hide-details": ""
                                    }, null, _parent4, _scopeId3));
                                  } else {
                                    _push4(`<!---->`);
                                  }
                                  _push4(`</div></div></div></div>`);
                                } else if (!modifyBoxSelection.value && !props2.subscribed_plan.has_customization) {
                                  _push4(`<div class="border-t-2 border-white" data-v-fe4c6ac1${_scopeId3}><div class="flex flex-row items-center justify-between w-full" data-v-fe4c6ac1${_scopeId3}><div class="flex flex-row items-center gap-3 px-5 py-2 w-full" data-v-fe4c6ac1${_scopeId3}><div class="shrink-0" data-v-fe4c6ac1${_scopeId3}>`);
                                  _push4(ssrRenderComponent(_component_v_icon, { class: "mx-2" }, {
                                    default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(`mdi-checkbox-marked`);
                                      } else {
                                        return [
                                          createTextVNode("mdi-checkbox-marked")
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                  _push4(`</div><div class="shrink-0" data-v-fe4c6ac1${_scopeId3}>`);
                                  _push4(ssrRenderComponent(_component_v_img, {
                                    rounded: "lg",
                                    width: "50px",
                                    "aspect-ratio": "1",
                                    cover: "",
                                    class: "zoom-image shadow-sm",
                                    src: variation.image_url,
                                    alt: ""
                                  }, {
                                    placeholder: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(`<div class="d-flex align-center justify-center fill-height" data-v-fe4c6ac1${_scopeId4}>`);
                                        _push5(ssrRenderComponent(_component_v_progress_circular, {
                                          color: "grey-lighten-4",
                                          indeterminate: ""
                                        }, null, _parent5, _scopeId4));
                                        _push5(`</div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                            createVNode(_component_v_progress_circular, {
                                              color: "grey-lighten-4",
                                              indeterminate: ""
                                            })
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                  _push4(`</div><div class="grow" data-v-fe4c6ac1${_scopeId3}><p data-v-fe4c6ac1${_scopeId3}>${ssrInterpolate(variation.product.name)} (${ssrInterpolate(variation.name)}) `);
                                  if (!modifyBoxSelection.value && __props.premium_subscription_item_uids.hasOwnProperty(variation.uid)) {
                                    _push4(`<span class="text-grey ms-5" data-v-fe4c6ac1${_scopeId3}> x${ssrInterpolate(__props.premium_subscription_item_uids[variation.uid])}</span>`);
                                  } else {
                                    _push4(`<!---->`);
                                  }
                                  _push4(`</p></div></div></div></div>`);
                                } else {
                                  _push4(`<!---->`);
                                }
                                _push4(`</div>`);
                              });
                              _push4(`<!--]--></div>`);
                            } else if ((manageAddOns.value || !manageAddOns.value && !modifyBoxSelection.value) && Object.keys(props2.add_on_variations).length > 0) {
                              _push4(`<div data-v-fe4c6ac1${_scopeId3}><div class="grid grid-cols-1 lg:grid-cols-5 gap-3 px-3 pb-3" data-v-fe4c6ac1${_scopeId3}><!--[-->`);
                              ssrRenderList(props2.add_on_variations, (variation) => {
                                _push4(`<div data-v-fe4c6ac1${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_v_img, {
                                  gradient: "to top left, rgba(0,0,0,0), rgba(0,0,0,.3)",
                                  "aspect-ratio": "0.6667",
                                  class: "shadow-sm rounded-xl",
                                  cover: "",
                                  src: variation.image_url,
                                  alt: ""
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`<div class="p-4 w-full h-full" data-v-fe4c6ac1${_scopeId4}><div class="relative w-full h-full" data-v-fe4c6ac1${_scopeId4}><p class="absolute top-0 text-5xl text-white" data-v-fe4c6ac1${_scopeId4}>${ssrInterpolate(selectedQuantities.value[variation.uid])}</p><div class="absolute bottom-0 left-0 w-full" data-v-fe4c6ac1${_scopeId4}><div class="w-full flex flex-row justify-between items-center" data-v-fe4c6ac1${_scopeId4}><div data-v-fe4c6ac1${_scopeId4}>`);
                                      if (selectedAmountsFormatted.value[variation.uid] !== void 0) {
                                        _push5(`<p class="text-lg" data-v-fe4c6ac1${_scopeId4}>${ssrInterpolate(selectedAmountsFormatted.value[variation.uid])}</p>`);
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                      _push5(`</div><div class="flex flex-row flex-wrap gap-3" data-v-fe4c6ac1${_scopeId4}><div class="cursor-pointer p-0" data-v-fe4c6ac1${_scopeId4}>`);
                                      _push5(ssrRenderComponent(_component_v_icon, { size: "large" }, {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(`mdi-minus`);
                                          } else {
                                            return [
                                              createTextVNode("mdi-minus")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                      _push5(`</div><div class="cursor-pointer p-0" data-v-fe4c6ac1${_scopeId4}>`);
                                      _push5(ssrRenderComponent(_component_v_icon, { size: "large" }, {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(`mdi-plus`);
                                          } else {
                                            return [
                                              createTextVNode("mdi-plus")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                      _push5(`</div></div></div></div></div></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "p-4 w-full h-full" }, [
                                          createVNode("div", { class: "relative w-full h-full" }, [
                                            createVNode("p", { class: "absolute top-0 text-5xl text-white" }, toDisplayString(selectedQuantities.value[variation.uid]), 1),
                                            createVNode("div", { class: "absolute bottom-0 left-0 w-full" }, [
                                              createVNode("div", { class: "w-full flex flex-row justify-between items-center" }, [
                                                createVNode("div", null, [
                                                  selectedAmountsFormatted.value[variation.uid] !== void 0 ? (openBlock(), createBlock("p", {
                                                    key: 0,
                                                    class: "text-lg"
                                                  }, toDisplayString(selectedAmountsFormatted.value[variation.uid]), 1)) : createCommentVNode("", true)
                                                ]),
                                                createVNode("div", { class: "flex flex-row flex-wrap gap-3" }, [
                                                  createVNode("div", {
                                                    class: "cursor-pointer p-0",
                                                    onClick: withModifiers(($event) => subQuantity(variation.uid), ["prevent"])
                                                  }, [
                                                    createVNode(_component_v_icon, { size: "large" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("mdi-minus")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ], 8, ["onClick"]),
                                                  createVNode("div", {
                                                    class: "cursor-pointer p-0",
                                                    onClick: withModifiers(($event) => addQuantity(variation.uid), ["prevent"])
                                                  }, [
                                                    createVNode(_component_v_icon, { size: "large" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("mdi-plus")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ], 8, ["onClick"])
                                                ])
                                              ])
                                            ])
                                          ])
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(`</div>`);
                              });
                              _push4(`<!--]--></div></div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div>`);
                          } else {
                            return [
                              createVNode("div", null, [
                                createVNode("div", { class: "w-full text-center py-10" }, [
                                  !props2.subscribed_plan.has_customization ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-3xl brand"
                                  }, [
                                    createVNode("i", null, "Your subscription box")
                                  ])) : modifyBoxSelection.value ? (openBlock(), createBlock("p", {
                                    key: 1,
                                    class: "text-3xl brand"
                                  }, [
                                    createVNode("i", null, "Modify Box Selection")
                                  ])) : manageAddOns.value ? (openBlock(), createBlock("p", {
                                    key: 2,
                                    class: "text-3xl brand"
                                  }, [
                                    createVNode("i", null, "Add-On Menu")
                                  ])) : (openBlock(), createBlock("p", {
                                    key: 3,
                                    class: "text-3xl brand"
                                  }, [
                                    createVNode("i", null, "Your Current Box Selection")
                                  ])),
                                  createVNode("p", { class: "mt-2" }, "Updating for " + toDisplayString(props2.next_available_date) + " delivery", 1)
                                ]),
                                modifyBoxSelection.value || !modifyBoxSelection.value && !manageAddOns.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(props2.plan_variations, (variation) => {
                                    return openBlock(), createBlock("div", null, [
                                      modifyBoxSelection.value || !modifyBoxSelection.value && __props.premium_subscription_item_uids.hasOwnProperty(variation.uid) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "border-t-2 border-white"
                                      }, [
                                        createVNode("div", { class: "flex flex-row items-center justify-between w-full" }, [
                                          createVNode("div", { class: "flex flex-row items-center gap-3 px-5 py-2 w-full" }, [
                                            createVNode("div", { class: "shrink-0" }, [
                                              modifyBoxSelection.value ? (openBlock(), createBlock(_component_v_checkbox, {
                                                key: 0,
                                                "hide-details": "",
                                                value: variation.uid,
                                                modelValue: boxSelectionForm.variations,
                                                "onUpdate:modelValue": ($event) => boxSelectionForm.variations = $event,
                                                disabled: productQuantity.value >= 9 && !isActive(variation.uid),
                                                onChange: ($event) => handleCheckboxChange(variation.uid)
                                              }, null, 8, ["value", "modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : __props.premium_subscription_item_uids.hasOwnProperty(variation.uid) ? (openBlock(), createBlock(_component_v_icon, {
                                                key: 1,
                                                class: "mx-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-checkbox-marked")
                                                ]),
                                                _: 1
                                              })) : createCommentVNode("", true)
                                            ]),
                                            createVNode("div", { class: "shrink-0" }, [
                                              createVNode(_component_v_img, {
                                                rounded: "lg",
                                                width: "50px",
                                                "aspect-ratio": "1",
                                                cover: "",
                                                class: "zoom-image shadow-sm",
                                                src: variation.image_url,
                                                alt: ""
                                              }, {
                                                placeholder: withCtx(() => [
                                                  createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                    createVNode(_component_v_progress_circular, {
                                                      color: "grey-lighten-4",
                                                      indeterminate: ""
                                                    })
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["src"])
                                            ]),
                                            createVNode("div", { class: "grow" }, [
                                              createVNode("p", null, [
                                                createTextVNode(toDisplayString(variation.product.name) + " (" + toDisplayString(variation.name) + ") ", 1),
                                                !modifyBoxSelection.value && __props.premium_subscription_item_uids.hasOwnProperty(variation.uid) ? (openBlock(), createBlock("span", {
                                                  key: 0,
                                                  class: "text-grey ms-5"
                                                }, " x" + toDisplayString(__props.premium_subscription_item_uids[variation.uid]), 1)) : createCommentVNode("", true)
                                              ])
                                            ]),
                                            createVNode("div", {
                                              style: { "width": "200px" },
                                              class: "shrink-0"
                                            }, [
                                              boxSelectionForm.variations.includes(variation.uid) ? (openBlock(), createBlock(_component_v_number_input, {
                                                key: 0,
                                                class: "shrink-0",
                                                modelValue: boxSelectionForm.quantities[variation.uid],
                                                "onUpdate:modelValue": ($event) => boxSelectionForm.quantities[variation.uid] = $event,
                                                type: "number",
                                                density: "compact",
                                                variant: "outlined",
                                                "control-variant": "default",
                                                min: 1,
                                                max: 9 - (productQuantity.value - boxSelectionForm.quantities[variation.uid]),
                                                "hide-details": ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])) : createCommentVNode("", true)
                                            ])
                                          ])
                                        ])
                                      ])) : !modifyBoxSelection.value && !props2.subscribed_plan.has_customization ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "border-t-2 border-white"
                                      }, [
                                        createVNode("div", { class: "flex flex-row items-center justify-between w-full" }, [
                                          createVNode("div", { class: "flex flex-row items-center gap-3 px-5 py-2 w-full" }, [
                                            createVNode("div", { class: "shrink-0" }, [
                                              createVNode(_component_v_icon, { class: "mx-2" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-checkbox-marked")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            createVNode("div", { class: "shrink-0" }, [
                                              createVNode(_component_v_img, {
                                                rounded: "lg",
                                                width: "50px",
                                                "aspect-ratio": "1",
                                                cover: "",
                                                class: "zoom-image shadow-sm",
                                                src: variation.image_url,
                                                alt: ""
                                              }, {
                                                placeholder: withCtx(() => [
                                                  createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                    createVNode(_component_v_progress_circular, {
                                                      color: "grey-lighten-4",
                                                      indeterminate: ""
                                                    })
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["src"])
                                            ]),
                                            createVNode("div", { class: "grow" }, [
                                              createVNode("p", null, [
                                                createTextVNode(toDisplayString(variation.product.name) + " (" + toDisplayString(variation.name) + ") ", 1),
                                                !modifyBoxSelection.value && __props.premium_subscription_item_uids.hasOwnProperty(variation.uid) ? (openBlock(), createBlock("span", {
                                                  key: 0,
                                                  class: "text-grey ms-5"
                                                }, " x" + toDisplayString(__props.premium_subscription_item_uids[variation.uid]), 1)) : createCommentVNode("", true)
                                              ])
                                            ])
                                          ])
                                        ])
                                      ])) : createCommentVNode("", true)
                                    ]);
                                  }), 256))
                                ])) : (manageAddOns.value || !manageAddOns.value && !modifyBoxSelection.value) && Object.keys(props2.add_on_variations).length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
                                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-3 px-3 pb-3" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(props2.add_on_variations, (variation) => {
                                      return openBlock(), createBlock("div", null, [
                                        createVNode(_component_v_img, {
                                          gradient: "to top left, rgba(0,0,0,0), rgba(0,0,0,.3)",
                                          "aspect-ratio": "0.6667",
                                          class: "shadow-sm rounded-xl",
                                          cover: "",
                                          src: variation.image_url,
                                          alt: ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "p-4 w-full h-full" }, [
                                              createVNode("div", { class: "relative w-full h-full" }, [
                                                createVNode("p", { class: "absolute top-0 text-5xl text-white" }, toDisplayString(selectedQuantities.value[variation.uid]), 1),
                                                createVNode("div", { class: "absolute bottom-0 left-0 w-full" }, [
                                                  createVNode("div", { class: "w-full flex flex-row justify-between items-center" }, [
                                                    createVNode("div", null, [
                                                      selectedAmountsFormatted.value[variation.uid] !== void 0 ? (openBlock(), createBlock("p", {
                                                        key: 0,
                                                        class: "text-lg"
                                                      }, toDisplayString(selectedAmountsFormatted.value[variation.uid]), 1)) : createCommentVNode("", true)
                                                    ]),
                                                    createVNode("div", { class: "flex flex-row flex-wrap gap-3" }, [
                                                      createVNode("div", {
                                                        class: "cursor-pointer p-0",
                                                        onClick: withModifiers(($event) => subQuantity(variation.uid), ["prevent"])
                                                      }, [
                                                        createVNode(_component_v_icon, { size: "large" }, {
                                                          default: withCtx(() => [
                                                            createTextVNode("mdi-minus")
                                                          ]),
                                                          _: 1
                                                        })
                                                      ], 8, ["onClick"]),
                                                      createVNode("div", {
                                                        class: "cursor-pointer p-0",
                                                        onClick: withModifiers(($event) => addQuantity(variation.uid), ["prevent"])
                                                      }, [
                                                        createVNode(_component_v_icon, { size: "large" }, {
                                                          default: withCtx(() => [
                                                            createTextVNode("mdi-plus")
                                                          ]),
                                                          _: 1
                                                        })
                                                      ], 8, ["onClick"])
                                                    ])
                                                  ])
                                                ])
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1032, ["src"])
                                      ]);
                                    }), 256))
                                  ])
                                ])) : createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      if (props2.subscribed_plan.has_customization) {
                        _push3(`<div data-v-fe4c6ac1${_scopeId2}><div class="max-w-4xl mx-auto mt-5" data-v-fe4c6ac1${_scopeId2}><p class="text-grey text-sm text-center" data-v-fe4c6ac1${_scopeId2}>${props2.content.subscribed_instructions ?? ""}</p></div>`);
                        if (!modifyBoxSelection.value && !manageAddOns.value) {
                          _push3(`<div class="flex flex-row items-center justify-center w-full gap-5 mt-8" data-v-fe4c6ac1${_scopeId2}><div class="button brand-bg rounded-pill px-10 py-3" data-v-fe4c6ac1${_scopeId2}> Modify Box Selection </div>`);
                          if (props2.add_on_products.length > 0) {
                            _push3(`<div class="button rounded-pill px-10 py-3" data-v-fe4c6ac1${_scopeId2}> Add-On Menu </div>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div>`);
                        } else if (modifyBoxSelection.value) {
                          _push3(`<div class="flex flex-row items-center justify-center w-full gap-5 mt-8" data-v-fe4c6ac1${_scopeId2}>`);
                          if (productQuantity.value === 9) {
                            _push3(`<div class="button bg-green rounded-pill px-10 py-3" data-v-fe4c6ac1${_scopeId2}> Save box selection </div>`);
                          } else {
                            _push3(`<div class="button bg-grey rounded-pill px-10 py-3" data-v-fe4c6ac1${_scopeId2}> Save box selection </div>`);
                          }
                          _push3(`<div class="button bg-grey rounded-pill px-10 py-3" data-v-fe4c6ac1${_scopeId2}> Cancel </div></div>`);
                        } else if (manageAddOns.value) {
                          _push3(`<div class="flex flex-row items-center justify-center w-full gap-5 mt-8" data-v-fe4c6ac1${_scopeId2}>`);
                          if (amountsSum.value > 0) {
                            _push3(`<div class="button bg-green rounded-pill px-10 py-3" data-v-fe4c6ac1${_scopeId2}> Add to next delivery for ${ssrInterpolate(amountsSumFormatted.value)}</div>`);
                          } else {
                            _push3(`<div class="button bg-grey rounded-pill px-10 py-3" data-v-fe4c6ac1${_scopeId2}> Add to next delivery </div>`);
                          }
                          _push3(`<div class="button bg-grey rounded-pill px-10 py-3" data-v-fe4c6ac1${_scopeId2}> Cancel </div></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      _push3(`<div data-v-fe4c6ac1${_scopeId2}><div class="${ssrRenderClass(plansWrapperClass.value)}" data-v-fe4c6ac1${_scopeId2}><!--[-->`);
                      ssrRenderList(props2.plans, (plan) => {
                        _push3(`<div class="w-full mt-6 mb-12" data-v-fe4c6ac1${_scopeId2}><div class="rounded-xl" style="${ssrRenderStyle("background:" + (plan.has_customization ? "#f99c19" : "#eaeaea"))}" data-v-fe4c6ac1${_scopeId2}><div data-v-fe4c6ac1${_scopeId2}><div class="p-4" data-v-fe4c6ac1${_scopeId2}><div class="block w-full" data-v-fe4c6ac1${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_v_img, {
                          src: `/images/${plan.image}`,
                          width: "180",
                          class: "mx-auto",
                          style: { "margin-top": "-100px" }
                        }, null, _parent3, _scopeId2));
                        _push3(`</div><div class="my-3" data-v-fe4c6ac1${_scopeId2}><p class="text-3xl brand text-center" data-v-fe4c6ac1${_scopeId2}>${ssrInterpolate(plan.french_name)}</p><p class="text-2xl brand text-center" data-v-fe4c6ac1${_scopeId2}>(${ssrInterpolate(plan.name)} plan)</p></div>`);
                        if (!props2.is_subscribed) {
                          _push3(`<div class="w-full flex flex-row justify-center" data-v-fe4c6ac1${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_v_btn, {
                            disabled: plan.placeholder_count > 0,
                            size: unref(mobile) ? "large" : "default",
                            onClick: ($event) => selectPlan(plan),
                            class: "rounded-pill"
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`Start Plan`);
                              } else {
                                return [
                                  createTextVNode("Start Plan")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                          _push3(`</div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (props2.is_subscribed && props2.subscribed_plan.has_customization) {
                          _push3(`<div class="flex mt-5 w-full justify-center" data-v-fe4c6ac1${_scopeId2}><p data-v-fe4c6ac1${_scopeId2}>You will be able to edit the item list until the wednesday before each delivery</p></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div><div class="p-4" data-v-fe4c6ac1${_scopeId2}><div class="flex flex-col gap-0" data-v-fe4c6ac1${_scopeId2}>`);
                        if (!plan.has_customization) {
                          _push3(ssrRenderComponent(PlanProducts, { plan }, null, _parent3, _scopeId2));
                        } else {
                          _push3(ssrRenderComponent(PlanProducts, {
                            onOpen: openProductModal,
                            items: props2.premium_subscription_items,
                            plan,
                            selectable: true
                          }, null, _parent3, _scopeId2));
                        }
                        _push3(`<!--[-->`);
                        ssrRenderList(plan.placeholder_count, (placeholder) => {
                          _push3(ssrRenderComponent(PlanProducts, {
                            onOpen: openProductModal,
                            plan,
                            placeholder: true,
                            image_url: "/images/products/default.jpg"
                          }, null, _parent3, _scopeId2));
                        });
                        _push3(`<!--]--></div></div></div></div>`);
                        {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      });
                      _push3(`<!--]--></div></div>`);
                    }
                    if (!props2.is_subscribed) {
                      _push3(`<div class="py-10" data-v-fe4c6ac1${_scopeId2}>`);
                      if (props2.plans.length === 2) {
                        _push3(`<div data-v-fe4c6ac1${_scopeId2}><p class="text-5xl text-center brand" data-v-fe4c6ac1${_scopeId2}><!--[-->`);
                        ssrRenderList(props2.plans, (plan, index) => {
                          _push3(`<span data-v-fe4c6ac1${_scopeId2}><span style="${ssrRenderStyle(`color: ${plan.has_customization ? "#f99c19" : "#000000"}`)}" data-v-fe4c6ac1${_scopeId2}>${ssrInterpolate(plan.name)}</span>`);
                          if (index === 0) {
                            _push3(`<span data-v-fe4c6ac1${_scopeId2}> vs </span>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</span>`);
                        });
                        _push3(`<!--]--></p></div>`);
                      } else if (props2.plans.length === 1) {
                        _push3(`<div data-v-fe4c6ac1${_scopeId2}><p class="text-5xl text-center brand" data-v-fe4c6ac1${_scopeId2}>${unref(formatTitle)(props2.content.box_title) ?? ""}</p></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="rounded-5xl overflow-hidden mt-10" data-v-fe4c6ac1${_scopeId2}><div class="${ssrRenderClass(featuresWrapperClass.value)}" data-v-fe4c6ac1${_scopeId2}><div data-v-fe4c6ac1${_scopeId2}><div class="row-light-grey px-7 py-0" data-v-fe4c6ac1${_scopeId2}><div class="flex items-center" style="${ssrRenderStyle({ "height": "120px" })}" data-v-fe4c6ac1${_scopeId2}>`);
                      _push3(ssrRenderComponent(_sfc_main$9, null, null, _parent3, _scopeId2));
                      _push3(`</div></div><div class="row-dark-grey px-7 py-3 flex flex-row items-center" data-v-fe4c6ac1${_scopeId2}> Price </div><div class="row-light-grey px-7 py-3 flex flex-row items-center" data-v-fe4c6ac1${_scopeId2}> Frequency </div><div class="row-dark-grey px-7 py-3 flex flex-row items-center" data-v-fe4c6ac1${_scopeId2}> Delivery </div><div class="row-light-grey px-7 py-3 flex flex-row items-center" data-v-fe4c6ac1${_scopeId2}> Custom boxes </div><div class="row-dark-grey px-7 py-3 flex flex-row items-center" data-v-fe4c6ac1${_scopeId2}> Customization </div><div class="row-light-grey px-7 py-3 flex flex-row items-center" data-v-fe4c6ac1${_scopeId2}> Secret menu (add-ons) </div><div class="row-dark-grey px-7 py-3 flex flex-row items-center" data-v-fe4c6ac1${_scopeId2}> Private events </div></div><!--[-->`);
                      ssrRenderList(props2.plans, (plan, index) => {
                        _push3(`<div class="text-center" data-v-fe4c6ac1${_scopeId2}><div class="row-light-grey relative" data-v-fe4c6ac1${_scopeId2}><div class="row-dark-grey absolute bottom-0 left-0 z-0 w-full" style="${ssrRenderStyle({ "height": "200px" })}" data-v-fe4c6ac1${_scopeId2}></div><div class="${ssrRenderClass([plan.has_customization ? "rounded-5xl overflow-hidden" : "", "relative z-10"])}" data-v-fe4c6ac1${_scopeId2}><div class="${ssrRenderClass([`${plan.has_customization ? "row-light-amber text-white" : "row-light-grey"}`, "px-5 py-0"])}" data-v-fe4c6ac1${_scopeId2}><div class="flex justify-center items-center" style="${ssrRenderStyle({ "height": "120px" })}" data-v-fe4c6ac1${_scopeId2}>`);
                        if (props2.plans.length === 2) {
                          _push3(`<p class="text-3xl" data-v-fe4c6ac1${_scopeId2}>${ssrInterpolate(plan.name)}</p>`);
                        } else {
                          _push3(`<p class="text-3xl" data-v-fe4c6ac1${_scopeId2}>Features</p>`);
                        }
                        _push3(`</div></div><div class="${ssrRenderClass([`${plan.has_customization ? "row-dark-amber text-white" : "row-dark-grey"}`, "px-5 py-3 flex flex-row items-center justify-center"])}" data-v-fe4c6ac1${_scopeId2}> Starts at ${ssrInterpolate(plan.price_monthly_string)}/month </div><div class="${ssrRenderClass([`${plan.has_customization ? "row-light-amber text-white" : "row-light-grey"}`, "px-5 py-3 flex flex-row items-center justify-center"])}" data-v-fe4c6ac1${_scopeId2}> monthly/bi-weekly/weekly </div><div class="${ssrRenderClass([`${plan.has_customization ? "row-dark-amber text-white" : "row-dark-grey"}`, "px-5 py-3 flex flex-row items-center justify-center"])}" data-v-fe4c6ac1${_scopeId2}>`);
                        if (plan.has_delivery) {
                          _push3(ssrRenderComponent(_component_v_icon, {
                            color: plan.has_customization ? "white" : "#f99c19"
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`mdi-check-circle`);
                              } else {
                                return [
                                  createTextVNode("mdi-check-circle")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        } else {
                          _push3(ssrRenderComponent(_component_v_icon, { color: "grey" }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`mdi-close`);
                              } else {
                                return [
                                  createTextVNode("mdi-close")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        }
                        _push3(`</div><div class="${ssrRenderClass([`${plan.has_customization ? "row-light-amber text-white" : "row-light-grey"}`, "px-5 py-3 flex flex-row items-center justify-center"])}" data-v-fe4c6ac1${_scopeId2}>`);
                        if (plan.has_custom_boxes) {
                          _push3(ssrRenderComponent(_component_v_icon, {
                            color: plan.has_customization ? "white" : "#f99c19"
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`mdi-check-circle`);
                              } else {
                                return [
                                  createTextVNode("mdi-check-circle")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        } else {
                          _push3(ssrRenderComponent(_component_v_icon, { color: "grey" }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`mdi-close`);
                              } else {
                                return [
                                  createTextVNode("mdi-close")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        }
                        _push3(`</div><div class="${ssrRenderClass([`${plan.has_customization ? "row-dark-amber text-white" : "row-dark-grey"}`, "px-5 py-3 flex flex-row items-center justify-center"])}" data-v-fe4c6ac1${_scopeId2}>`);
                        if (plan.has_customization) {
                          _push3(ssrRenderComponent(_component_v_icon, {
                            color: plan.has_customization ? "white" : "#f99c19"
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`mdi-check-circle`);
                              } else {
                                return [
                                  createTextVNode("mdi-check-circle")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        } else {
                          _push3(ssrRenderComponent(_component_v_icon, { color: "grey" }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`mdi-close`);
                              } else {
                                return [
                                  createTextVNode("mdi-close")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        }
                        _push3(`</div><div class="${ssrRenderClass([`${plan.has_customization ? "row-light-amber text-white" : "row-light-grey"}`, "px-5 py-3 flex flex-row items-center justify-center"])}" data-v-fe4c6ac1${_scopeId2}>`);
                        if (plan.has_add_ons) {
                          _push3(ssrRenderComponent(_component_v_icon, {
                            color: plan.has_customization ? "white" : "#f99c19"
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`mdi-check-circle`);
                              } else {
                                return [
                                  createTextVNode("mdi-check-circle")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        } else {
                          _push3(ssrRenderComponent(_component_v_icon, { color: "grey" }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`mdi-close`);
                              } else {
                                return [
                                  createTextVNode("mdi-close")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        }
                        _push3(`</div><div class="${ssrRenderClass([`${plan.has_customization ? "row-dark-amber text-white" : "row-dark-grey"}`, "px-5 py-3 flex flex-row items-center justify-center"])}" data-v-fe4c6ac1${_scopeId2}>`);
                        if (plan.has_private_events) {
                          _push3(ssrRenderComponent(_component_v_icon, {
                            color: plan.has_customization ? "white" : "#f99c19"
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`mdi-check-circle`);
                              } else {
                                return [
                                  createTextVNode("mdi-check-circle")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        } else {
                          _push3(ssrRenderComponent(_component_v_icon, { color: "grey" }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`mdi-close`);
                              } else {
                                return [
                                  createTextVNode("mdi-close")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        }
                        _push3(`</div></div></div></div>`);
                      });
                      _push3(`<!--]--></div></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (!props2.is_subscribed) {
                      _push3(`<div class="mt-15" data-v-fe4c6ac1${_scopeId2}><div data-v-fe4c6ac1${_scopeId2}><div class="grid grid-cols-1 lg:grid-cols-3 gap-3" data-v-fe4c6ac1${_scopeId2}><!--[-->`);
                      ssrRenderList(3, (i) => {
                        _push3(`<div class="row-light-grey p-7 rounded-5xl animate-item" data-v-fe4c6ac1${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_v_icon, {
                          style: { "font-size": "50px" },
                          class: "brand-color"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(props2.content[`feature_${i}_icon`])}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(props2.content[`feature_${i}_icon`]), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`<p class="text-3xl mt-7" data-v-fe4c6ac1${_scopeId2}>${ssrInterpolate(props2.content[`feature_${i}_title`])}</p><p class="mt-3 text-grey-darken-1" data-v-fe4c6ac1${_scopeId2}>${unref(formatEmphasis)(props2.content[`feature_${i}_content`]) ?? ""}</p></div>`);
                      });
                      _push3(`<!--]--></div></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("h1", {
                          class: "text-7xl brand uppercase",
                          innerHTML: unref(formatTitle)(props2.content.title)
                        }, null, 8, ["innerHTML"]),
                        !props2.has_valid_postcode ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-full bg-red-lighten-2 mt-5 py-5 rounded-lg"
                        }, [
                          createVNode("div", null, [
                            createVNode("p", null, "We can only deliver to certain postcodes in the Boston area."),
                            createVNode("p", null, "Please enter your post code below to start.")
                          ]),
                          createVNode("div", { class: "mt-5 max-w-xs mx-auto bg-white p-2" }, [
                            createVNode(_component_v_text_field, {
                              onKeyup: withKeys(savePostCode, ["enter"]),
                              class: "text-black text-center",
                              modelValue: postCode.value,
                              "onUpdate:modelValue": ($event) => postCode.value = $event,
                              placeholder: "Your post code",
                              variant: "filled",
                              "hide-details": ""
                            }, {
                              append: withCtx(() => [
                                createVNode(_component_v_btn, {
                                  onClick: withModifiers(savePostCode, ["prevent"]),
                                  class: "pa-0 w-full",
                                  variant: "flat"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Save")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ])) : createCommentVNode("", true),
                        local_errors.value.postcode ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-red font-bold mt-3"
                        }, toDisplayString(local_errors.value.postcode), 1)) : createCommentVNode("", true),
                        !props2.has_valid_postcode && props2.post_code ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "mt-3"
                        }, [
                          createVNode("p", null, [
                            createTextVNode("Unfortunately, the post code "),
                            createVNode("strong", { class: "text-red" }, toDisplayString(props2.post_code), 1),
                            createTextVNode(" is outside of our delivery zone.")
                          ]),
                          createVNode("p", null, "Please enter a different post code.")
                        ])) : createCommentVNode("", true),
                        props2.is_subscribed ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "mt-5 flex flex-row items-center"
                        }, [
                          createVNode(_component_v_img, {
                            src: `/images/${props2.subscribed_plan.image}`,
                            width: "150",
                            class: "shrink-0",
                            style: { "margin-top": "-100px" }
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "grow" }, [
                            createVNode("p", { class: "text-4xl font-semibold" }, "Welcome back, " + toDisplayString(_ctx.$page.props.auth.user.name), 1),
                            createVNode("p", { class: "text-2xl text-grey mt-5" }, toDisplayString(`Your subscription ${props2.renews ? "auto-renews" : "expires"} on ${props2.billing_period_ends}`), 1)
                          ]),
                          createVNode(_component_v_img, {
                            src: `/images/${props2.subscribed_plan.image}`,
                            width: "150",
                            class: "shrink-0",
                            style: { "margin-top": "-100px" }
                          }, null, 8, ["src"])
                        ])) : (openBlock(), createBlock("div", {
                          key: 4,
                          class: "mt-7 mb-20 pb-5",
                          innerHTML: props2.content.introduction
                        }, null, 8, ["innerHTML"])),
                        props2.is_subscribed ? (openBlock(), createBlock(_component_v_btn, {
                          key: 5,
                          onClick: createCustomerPortalSession,
                          class: "rounded-pill mt-7",
                          variant: "flat",
                          color: "red-darken-2",
                          size: "large"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Manage subscription")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        props2.is_subscribed ? (openBlock(), createBlock("div", {
                          key: 6,
                          class: "mt-7"
                        }, [
                          createVNode("p", null, [
                            createTextVNode("You have chosen "),
                            createVNode("strong", { class: "uppercase" }, toDisplayString(props2.delivery_day), 1),
                            createTextVNode(" as your delivery day.")
                          ]),
                          props2.can_update_delivery_day ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2"
                          }, [
                            createVNode(_component_v_btn, {
                              onClick: withModifiers(changeDay, ["prevent"]),
                              variant: "text",
                              color: "blue"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Change day")
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    props2.has_valid_postcode ? (openBlock(), createBlock("div", { key: 0 }, [
                      props2.is_subscribed ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(_component_v_card, {
                          class: "brand-bg-grey mt-10",
                          rounded: "xl"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode("div", { class: "w-full text-center py-10" }, [
                                !props2.subscribed_plan.has_customization ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-3xl brand"
                                }, [
                                  createVNode("i", null, "Your subscription box")
                                ])) : modifyBoxSelection.value ? (openBlock(), createBlock("p", {
                                  key: 1,
                                  class: "text-3xl brand"
                                }, [
                                  createVNode("i", null, "Modify Box Selection")
                                ])) : manageAddOns.value ? (openBlock(), createBlock("p", {
                                  key: 2,
                                  class: "text-3xl brand"
                                }, [
                                  createVNode("i", null, "Add-On Menu")
                                ])) : (openBlock(), createBlock("p", {
                                  key: 3,
                                  class: "text-3xl brand"
                                }, [
                                  createVNode("i", null, "Your Current Box Selection")
                                ])),
                                createVNode("p", { class: "mt-2" }, "Updating for " + toDisplayString(props2.next_available_date) + " delivery", 1)
                              ]),
                              modifyBoxSelection.value || !modifyBoxSelection.value && !manageAddOns.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(props2.plan_variations, (variation) => {
                                  return openBlock(), createBlock("div", null, [
                                    modifyBoxSelection.value || !modifyBoxSelection.value && __props.premium_subscription_item_uids.hasOwnProperty(variation.uid) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "border-t-2 border-white"
                                    }, [
                                      createVNode("div", { class: "flex flex-row items-center justify-between w-full" }, [
                                        createVNode("div", { class: "flex flex-row items-center gap-3 px-5 py-2 w-full" }, [
                                          createVNode("div", { class: "shrink-0" }, [
                                            modifyBoxSelection.value ? (openBlock(), createBlock(_component_v_checkbox, {
                                              key: 0,
                                              "hide-details": "",
                                              value: variation.uid,
                                              modelValue: boxSelectionForm.variations,
                                              "onUpdate:modelValue": ($event) => boxSelectionForm.variations = $event,
                                              disabled: productQuantity.value >= 9 && !isActive(variation.uid),
                                              onChange: ($event) => handleCheckboxChange(variation.uid)
                                            }, null, 8, ["value", "modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : __props.premium_subscription_item_uids.hasOwnProperty(variation.uid) ? (openBlock(), createBlock(_component_v_icon, {
                                              key: 1,
                                              class: "mx-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-checkbox-marked")
                                              ]),
                                              _: 1
                                            })) : createCommentVNode("", true)
                                          ]),
                                          createVNode("div", { class: "shrink-0" }, [
                                            createVNode(_component_v_img, {
                                              rounded: "lg",
                                              width: "50px",
                                              "aspect-ratio": "1",
                                              cover: "",
                                              class: "zoom-image shadow-sm",
                                              src: variation.image_url,
                                              alt: ""
                                            }, {
                                              placeholder: withCtx(() => [
                                                createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                  createVNode(_component_v_progress_circular, {
                                                    color: "grey-lighten-4",
                                                    indeterminate: ""
                                                  })
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["src"])
                                          ]),
                                          createVNode("div", { class: "grow" }, [
                                            createVNode("p", null, [
                                              createTextVNode(toDisplayString(variation.product.name) + " (" + toDisplayString(variation.name) + ") ", 1),
                                              !modifyBoxSelection.value && __props.premium_subscription_item_uids.hasOwnProperty(variation.uid) ? (openBlock(), createBlock("span", {
                                                key: 0,
                                                class: "text-grey ms-5"
                                              }, " x" + toDisplayString(__props.premium_subscription_item_uids[variation.uid]), 1)) : createCommentVNode("", true)
                                            ])
                                          ]),
                                          createVNode("div", {
                                            style: { "width": "200px" },
                                            class: "shrink-0"
                                          }, [
                                            boxSelectionForm.variations.includes(variation.uid) ? (openBlock(), createBlock(_component_v_number_input, {
                                              key: 0,
                                              class: "shrink-0",
                                              modelValue: boxSelectionForm.quantities[variation.uid],
                                              "onUpdate:modelValue": ($event) => boxSelectionForm.quantities[variation.uid] = $event,
                                              type: "number",
                                              density: "compact",
                                              variant: "outlined",
                                              "control-variant": "default",
                                              min: 1,
                                              max: 9 - (productQuantity.value - boxSelectionForm.quantities[variation.uid]),
                                              "hide-details": ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])) : createCommentVNode("", true)
                                          ])
                                        ])
                                      ])
                                    ])) : !modifyBoxSelection.value && !props2.subscribed_plan.has_customization ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "border-t-2 border-white"
                                    }, [
                                      createVNode("div", { class: "flex flex-row items-center justify-between w-full" }, [
                                        createVNode("div", { class: "flex flex-row items-center gap-3 px-5 py-2 w-full" }, [
                                          createVNode("div", { class: "shrink-0" }, [
                                            createVNode(_component_v_icon, { class: "mx-2" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-checkbox-marked")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          createVNode("div", { class: "shrink-0" }, [
                                            createVNode(_component_v_img, {
                                              rounded: "lg",
                                              width: "50px",
                                              "aspect-ratio": "1",
                                              cover: "",
                                              class: "zoom-image shadow-sm",
                                              src: variation.image_url,
                                              alt: ""
                                            }, {
                                              placeholder: withCtx(() => [
                                                createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                  createVNode(_component_v_progress_circular, {
                                                    color: "grey-lighten-4",
                                                    indeterminate: ""
                                                  })
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["src"])
                                          ]),
                                          createVNode("div", { class: "grow" }, [
                                            createVNode("p", null, [
                                              createTextVNode(toDisplayString(variation.product.name) + " (" + toDisplayString(variation.name) + ") ", 1),
                                              !modifyBoxSelection.value && __props.premium_subscription_item_uids.hasOwnProperty(variation.uid) ? (openBlock(), createBlock("span", {
                                                key: 0,
                                                class: "text-grey ms-5"
                                              }, " x" + toDisplayString(__props.premium_subscription_item_uids[variation.uid]), 1)) : createCommentVNode("", true)
                                            ])
                                          ])
                                        ])
                                      ])
                                    ])) : createCommentVNode("", true)
                                  ]);
                                }), 256))
                              ])) : (manageAddOns.value || !manageAddOns.value && !modifyBoxSelection.value) && Object.keys(props2.add_on_variations).length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-3 px-3 pb-3" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(props2.add_on_variations, (variation) => {
                                    return openBlock(), createBlock("div", null, [
                                      createVNode(_component_v_img, {
                                        gradient: "to top left, rgba(0,0,0,0), rgba(0,0,0,.3)",
                                        "aspect-ratio": "0.6667",
                                        class: "shadow-sm rounded-xl",
                                        cover: "",
                                        src: variation.image_url,
                                        alt: ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "p-4 w-full h-full" }, [
                                            createVNode("div", { class: "relative w-full h-full" }, [
                                              createVNode("p", { class: "absolute top-0 text-5xl text-white" }, toDisplayString(selectedQuantities.value[variation.uid]), 1),
                                              createVNode("div", { class: "absolute bottom-0 left-0 w-full" }, [
                                                createVNode("div", { class: "w-full flex flex-row justify-between items-center" }, [
                                                  createVNode("div", null, [
                                                    selectedAmountsFormatted.value[variation.uid] !== void 0 ? (openBlock(), createBlock("p", {
                                                      key: 0,
                                                      class: "text-lg"
                                                    }, toDisplayString(selectedAmountsFormatted.value[variation.uid]), 1)) : createCommentVNode("", true)
                                                  ]),
                                                  createVNode("div", { class: "flex flex-row flex-wrap gap-3" }, [
                                                    createVNode("div", {
                                                      class: "cursor-pointer p-0",
                                                      onClick: withModifiers(($event) => subQuantity(variation.uid), ["prevent"])
                                                    }, [
                                                      createVNode(_component_v_icon, { size: "large" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("mdi-minus")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ], 8, ["onClick"]),
                                                    createVNode("div", {
                                                      class: "cursor-pointer p-0",
                                                      onClick: withModifiers(($event) => addQuantity(variation.uid), ["prevent"])
                                                    }, [
                                                      createVNode(_component_v_icon, { size: "large" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("mdi-plus")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ], 8, ["onClick"])
                                                  ])
                                                ])
                                              ])
                                            ])
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["src"])
                                    ]);
                                  }), 256))
                                ])
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        props2.subscribed_plan.has_customization ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("div", { class: "max-w-4xl mx-auto mt-5" }, [
                            createVNode("p", {
                              class: "text-grey text-sm text-center",
                              innerHTML: props2.content.subscribed_instructions
                            }, null, 8, ["innerHTML"])
                          ]),
                          !modifyBoxSelection.value && !manageAddOns.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-row items-center justify-center w-full gap-5 mt-8"
                          }, [
                            createVNode("div", {
                              onClick: withModifiers(toggleModifyBoxSelection, ["prevent"]),
                              class: "button brand-bg rounded-pill px-10 py-3"
                            }, " Modify Box Selection "),
                            props2.add_on_products.length > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              onClick: withModifiers(toggleManageAddons, ["prevent"]),
                              class: "button rounded-pill px-10 py-3"
                            }, " Add-On Menu ")) : createCommentVNode("", true)
                          ])) : modifyBoxSelection.value ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex flex-row items-center justify-center w-full gap-5 mt-8"
                          }, [
                            productQuantity.value === 9 ? (openBlock(), createBlock("div", {
                              key: 0,
                              onClick: withModifiers(saveBoxSelection, ["prevent"]),
                              class: "button bg-green rounded-pill px-10 py-3"
                            }, " Save box selection ")) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "button bg-grey rounded-pill px-10 py-3"
                            }, " Save box selection ")),
                            createVNode("div", {
                              onClick: withModifiers(toggleAllOff, ["prevent"]),
                              class: "button bg-grey rounded-pill px-10 py-3"
                            }, " Cancel ")
                          ])) : manageAddOns.value ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "flex flex-row items-center justify-center w-full gap-5 mt-8"
                          }, [
                            amountsSum.value > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              onClick: withModifiers(checkout, ["prevent"]),
                              class: "button bg-green rounded-pill px-10 py-3"
                            }, " Add to next delivery for " + toDisplayString(amountsSumFormatted.value), 1)) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "button bg-grey rounded-pill px-10 py-3"
                            }, " Add to next delivery ")),
                            createVNode("div", {
                              onClick: withModifiers(toggleAllOff, ["prevent"]),
                              class: "button bg-grey rounded-pill px-10 py-3"
                            }, " Cancel ")
                          ])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("div", { class: plansWrapperClass.value }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props2.plans, (plan) => {
                            return openBlock(), createBlock("div", { class: "w-full mt-6 mb-12" }, [
                              createVNode("div", {
                                class: "rounded-xl",
                                style: "background:" + (plan.has_customization ? "#f99c19" : "#eaeaea")
                              }, [
                                createVNode("div", null, [
                                  createVNode("div", { class: "p-4" }, [
                                    createVNode("div", { class: "block w-full" }, [
                                      createVNode(_component_v_img, {
                                        src: `/images/${plan.image}`,
                                        width: "180",
                                        class: "mx-auto",
                                        style: { "margin-top": "-100px" }
                                      }, null, 8, ["src"])
                                    ]),
                                    createVNode("div", { class: "my-3" }, [
                                      createVNode("p", { class: "text-3xl brand text-center" }, toDisplayString(plan.french_name), 1),
                                      createVNode("p", { class: "text-2xl brand text-center" }, "(" + toDisplayString(plan.name) + " plan)", 1)
                                    ]),
                                    !props2.is_subscribed ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "w-full flex flex-row justify-center"
                                    }, [
                                      createVNode(_component_v_btn, {
                                        disabled: plan.placeholder_count > 0,
                                        size: unref(mobile) ? "large" : "default",
                                        onClick: withModifiers(($event) => selectPlan(plan), ["prevent"]),
                                        class: "rounded-pill"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Start Plan")
                                        ]),
                                        _: 2
                                      }, 1032, ["disabled", "size", "onClick"])
                                    ])) : createCommentVNode("", true),
                                    props2.is_subscribed && props2.subscribed_plan.has_customization ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex mt-5 w-full justify-center"
                                    }, [
                                      createVNode("p", null, "You will be able to edit the item list until the wednesday before each delivery")
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "p-4" }, [
                                    createVNode("div", { class: "flex flex-col gap-0" }, [
                                      !plan.has_customization ? (openBlock(), createBlock(PlanProducts, {
                                        key: 0,
                                        plan
                                      }, null, 8, ["plan"])) : (openBlock(), createBlock(PlanProducts, {
                                        key: 1,
                                        onOpen: openProductModal,
                                        items: props2.premium_subscription_items,
                                        plan,
                                        selectable: true
                                      }, null, 8, ["items", "plan"])),
                                      (openBlock(true), createBlock(Fragment, null, renderList(plan.placeholder_count, (placeholder) => {
                                        return openBlock(), createBlock(PlanProducts, {
                                          onOpen: openProductModal,
                                          plan,
                                          placeholder: true,
                                          image_url: "/images/products/default.jpg"
                                        }, null, 8, ["plan"]);
                                      }), 256))
                                    ])
                                  ])
                                ])
                              ], 4),
                              createCommentVNode("", true)
                            ]);
                          }), 256))
                        ], 2)
                      ])),
                      !props2.is_subscribed ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "py-10"
                      }, [
                        props2.plans.length === 2 ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("p", { class: "text-5xl text-center brand" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(props2.plans, (plan, index) => {
                              return openBlock(), createBlock("span", null, [
                                createVNode("span", {
                                  style: `color: ${plan.has_customization ? "#f99c19" : "#000000"}`
                                }, toDisplayString(plan.name), 5),
                                index === 0 ? (openBlock(), createBlock("span", { key: 0 }, " vs ")) : createCommentVNode("", true)
                              ]);
                            }), 256))
                          ])
                        ])) : props2.plans.length === 1 ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("p", {
                            class: "text-5xl text-center brand",
                            innerHTML: unref(formatTitle)(props2.content.box_title)
                          }, null, 8, ["innerHTML"])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "rounded-5xl overflow-hidden mt-10" }, [
                          createVNode("div", { class: featuresWrapperClass.value }, [
                            createVNode("div", null, [
                              createVNode("div", { class: "row-light-grey px-7 py-0" }, [
                                createVNode("div", {
                                  class: "flex items-center",
                                  style: { "height": "120px" }
                                }, [
                                  createVNode(_sfc_main$9)
                                ])
                              ]),
                              createVNode("div", { class: "row-dark-grey px-7 py-3 flex flex-row items-center" }, " Price "),
                              createVNode("div", { class: "row-light-grey px-7 py-3 flex flex-row items-center" }, " Frequency "),
                              createVNode("div", { class: "row-dark-grey px-7 py-3 flex flex-row items-center" }, " Delivery "),
                              createVNode("div", { class: "row-light-grey px-7 py-3 flex flex-row items-center" }, " Custom boxes "),
                              createVNode("div", { class: "row-dark-grey px-7 py-3 flex flex-row items-center" }, " Customization "),
                              createVNode("div", { class: "row-light-grey px-7 py-3 flex flex-row items-center" }, " Secret menu (add-ons) "),
                              createVNode("div", { class: "row-dark-grey px-7 py-3 flex flex-row items-center" }, " Private events ")
                            ]),
                            (openBlock(true), createBlock(Fragment, null, renderList(props2.plans, (plan, index) => {
                              return openBlock(), createBlock("div", { class: "text-center" }, [
                                createVNode("div", { class: "row-light-grey relative" }, [
                                  createVNode("div", {
                                    class: "row-dark-grey absolute bottom-0 left-0 z-0 w-full",
                                    style: { "height": "200px" }
                                  }),
                                  createVNode("div", {
                                    class: ["relative z-10", plan.has_customization ? "rounded-5xl overflow-hidden" : ""]
                                  }, [
                                    createVNode("div", {
                                      class: ["px-5 py-0", `${plan.has_customization ? "row-light-amber text-white" : "row-light-grey"}`]
                                    }, [
                                      createVNode("div", {
                                        class: "flex justify-center items-center",
                                        style: { "height": "120px" }
                                      }, [
                                        props2.plans.length === 2 ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "text-3xl"
                                        }, toDisplayString(plan.name), 1)) : (openBlock(), createBlock("p", {
                                          key: 1,
                                          class: "text-3xl"
                                        }, "Features"))
                                      ])
                                    ], 2),
                                    createVNode("div", {
                                      class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-dark-amber text-white" : "row-dark-grey"}`]
                                    }, " Starts at " + toDisplayString(plan.price_monthly_string) + "/month ", 3),
                                    createVNode("div", {
                                      class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-light-amber text-white" : "row-light-grey"}`]
                                    }, " monthly/bi-weekly/weekly ", 2),
                                    createVNode("div", {
                                      class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-dark-amber text-white" : "row-dark-grey"}`]
                                    }, [
                                      plan.has_delivery ? (openBlock(), createBlock(_component_v_icon, {
                                        key: 0,
                                        color: plan.has_customization ? "white" : "#f99c19"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-check-circle")
                                        ]),
                                        _: 2
                                      }, 1032, ["color"])) : (openBlock(), createBlock(_component_v_icon, {
                                        key: 1,
                                        color: "grey"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-close")
                                        ]),
                                        _: 1
                                      }))
                                    ], 2),
                                    createVNode("div", {
                                      class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-light-amber text-white" : "row-light-grey"}`]
                                    }, [
                                      plan.has_custom_boxes ? (openBlock(), createBlock(_component_v_icon, {
                                        key: 0,
                                        color: plan.has_customization ? "white" : "#f99c19"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-check-circle")
                                        ]),
                                        _: 2
                                      }, 1032, ["color"])) : (openBlock(), createBlock(_component_v_icon, {
                                        key: 1,
                                        color: "grey"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-close")
                                        ]),
                                        _: 1
                                      }))
                                    ], 2),
                                    createVNode("div", {
                                      class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-dark-amber text-white" : "row-dark-grey"}`]
                                    }, [
                                      plan.has_customization ? (openBlock(), createBlock(_component_v_icon, {
                                        key: 0,
                                        color: plan.has_customization ? "white" : "#f99c19"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-check-circle")
                                        ]),
                                        _: 2
                                      }, 1032, ["color"])) : (openBlock(), createBlock(_component_v_icon, {
                                        key: 1,
                                        color: "grey"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-close")
                                        ]),
                                        _: 1
                                      }))
                                    ], 2),
                                    createVNode("div", {
                                      class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-light-amber text-white" : "row-light-grey"}`]
                                    }, [
                                      plan.has_add_ons ? (openBlock(), createBlock(_component_v_icon, {
                                        key: 0,
                                        color: plan.has_customization ? "white" : "#f99c19"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-check-circle")
                                        ]),
                                        _: 2
                                      }, 1032, ["color"])) : (openBlock(), createBlock(_component_v_icon, {
                                        key: 1,
                                        color: "grey"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-close")
                                        ]),
                                        _: 1
                                      }))
                                    ], 2),
                                    createVNode("div", {
                                      class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-dark-amber text-white" : "row-dark-grey"}`]
                                    }, [
                                      plan.has_private_events ? (openBlock(), createBlock(_component_v_icon, {
                                        key: 0,
                                        color: plan.has_customization ? "white" : "#f99c19"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-check-circle")
                                        ]),
                                        _: 2
                                      }, 1032, ["color"])) : (openBlock(), createBlock(_component_v_icon, {
                                        key: 1,
                                        color: "grey"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-close")
                                        ]),
                                        _: 1
                                      }))
                                    ], 2)
                                  ], 2)
                                ])
                              ]);
                            }), 256))
                          ], 2)
                        ])
                      ])) : createCommentVNode("", true),
                      !props2.is_subscribed ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "mt-15"
                      }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-3" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                              return createVNode("div", { class: "row-light-grey p-7 rounded-5xl animate-item" }, [
                                createVNode(_component_v_icon, {
                                  style: { "font-size": "50px" },
                                  class: "brand-color"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(props2.content[`feature_${i}_icon`]), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("p", { class: "text-3xl mt-7" }, toDisplayString(props2.content[`feature_${i}_title`]), 1),
                                createVNode("p", {
                                  class: "mt-3 text-grey-darken-1",
                                  innerHTML: unref(formatEmphasis)(props2.content[`feature_${i}_content`])
                                }, null, 8, ["innerHTML"])
                              ]);
                            }), 64))
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(Wrapper, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h1", {
                        class: "text-7xl brand uppercase",
                        innerHTML: unref(formatTitle)(props2.content.title)
                      }, null, 8, ["innerHTML"]),
                      !props2.has_valid_postcode ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "w-full bg-red-lighten-2 mt-5 py-5 rounded-lg"
                      }, [
                        createVNode("div", null, [
                          createVNode("p", null, "We can only deliver to certain postcodes in the Boston area."),
                          createVNode("p", null, "Please enter your post code below to start.")
                        ]),
                        createVNode("div", { class: "mt-5 max-w-xs mx-auto bg-white p-2" }, [
                          createVNode(_component_v_text_field, {
                            onKeyup: withKeys(savePostCode, ["enter"]),
                            class: "text-black text-center",
                            modelValue: postCode.value,
                            "onUpdate:modelValue": ($event) => postCode.value = $event,
                            placeholder: "Your post code",
                            variant: "filled",
                            "hide-details": ""
                          }, {
                            append: withCtx(() => [
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(savePostCode, ["prevent"]),
                                class: "pa-0 w-full",
                                variant: "flat"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Save")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])) : createCommentVNode("", true),
                      local_errors.value.postcode ? (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-red font-bold mt-3"
                      }, toDisplayString(local_errors.value.postcode), 1)) : createCommentVNode("", true),
                      !props2.has_valid_postcode && props2.post_code ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mt-3"
                      }, [
                        createVNode("p", null, [
                          createTextVNode("Unfortunately, the post code "),
                          createVNode("strong", { class: "text-red" }, toDisplayString(props2.post_code), 1),
                          createTextVNode(" is outside of our delivery zone.")
                        ]),
                        createVNode("p", null, "Please enter a different post code.")
                      ])) : createCommentVNode("", true),
                      props2.is_subscribed ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "mt-5 flex flex-row items-center"
                      }, [
                        createVNode(_component_v_img, {
                          src: `/images/${props2.subscribed_plan.image}`,
                          width: "150",
                          class: "shrink-0",
                          style: { "margin-top": "-100px" }
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "grow" }, [
                          createVNode("p", { class: "text-4xl font-semibold" }, "Welcome back, " + toDisplayString(_ctx.$page.props.auth.user.name), 1),
                          createVNode("p", { class: "text-2xl text-grey mt-5" }, toDisplayString(`Your subscription ${props2.renews ? "auto-renews" : "expires"} on ${props2.billing_period_ends}`), 1)
                        ]),
                        createVNode(_component_v_img, {
                          src: `/images/${props2.subscribed_plan.image}`,
                          width: "150",
                          class: "shrink-0",
                          style: { "margin-top": "-100px" }
                        }, null, 8, ["src"])
                      ])) : (openBlock(), createBlock("div", {
                        key: 4,
                        class: "mt-7 mb-20 pb-5",
                        innerHTML: props2.content.introduction
                      }, null, 8, ["innerHTML"])),
                      props2.is_subscribed ? (openBlock(), createBlock(_component_v_btn, {
                        key: 5,
                        onClick: createCustomerPortalSession,
                        class: "rounded-pill mt-7",
                        variant: "flat",
                        color: "red-darken-2",
                        size: "large"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Manage subscription")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      props2.is_subscribed ? (openBlock(), createBlock("div", {
                        key: 6,
                        class: "mt-7"
                      }, [
                        createVNode("p", null, [
                          createTextVNode("You have chosen "),
                          createVNode("strong", { class: "uppercase" }, toDisplayString(props2.delivery_day), 1),
                          createTextVNode(" as your delivery day.")
                        ]),
                        props2.can_update_delivery_day ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2"
                        }, [
                          createVNode(_component_v_btn, {
                            onClick: withModifiers(changeDay, ["prevent"]),
                            variant: "text",
                            color: "blue"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Change day")
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  props2.has_valid_postcode ? (openBlock(), createBlock("div", { key: 0 }, [
                    props2.is_subscribed ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(_component_v_card, {
                        class: "brand-bg-grey mt-10",
                        rounded: "xl"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("div", { class: "w-full text-center py-10" }, [
                              !props2.subscribed_plan.has_customization ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-3xl brand"
                              }, [
                                createVNode("i", null, "Your subscription box")
                              ])) : modifyBoxSelection.value ? (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-3xl brand"
                              }, [
                                createVNode("i", null, "Modify Box Selection")
                              ])) : manageAddOns.value ? (openBlock(), createBlock("p", {
                                key: 2,
                                class: "text-3xl brand"
                              }, [
                                createVNode("i", null, "Add-On Menu")
                              ])) : (openBlock(), createBlock("p", {
                                key: 3,
                                class: "text-3xl brand"
                              }, [
                                createVNode("i", null, "Your Current Box Selection")
                              ])),
                              createVNode("p", { class: "mt-2" }, "Updating for " + toDisplayString(props2.next_available_date) + " delivery", 1)
                            ]),
                            modifyBoxSelection.value || !modifyBoxSelection.value && !manageAddOns.value ? (openBlock(), createBlock("div", { key: 0 }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(props2.plan_variations, (variation) => {
                                return openBlock(), createBlock("div", null, [
                                  modifyBoxSelection.value || !modifyBoxSelection.value && __props.premium_subscription_item_uids.hasOwnProperty(variation.uid) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "border-t-2 border-white"
                                  }, [
                                    createVNode("div", { class: "flex flex-row items-center justify-between w-full" }, [
                                      createVNode("div", { class: "flex flex-row items-center gap-3 px-5 py-2 w-full" }, [
                                        createVNode("div", { class: "shrink-0" }, [
                                          modifyBoxSelection.value ? (openBlock(), createBlock(_component_v_checkbox, {
                                            key: 0,
                                            "hide-details": "",
                                            value: variation.uid,
                                            modelValue: boxSelectionForm.variations,
                                            "onUpdate:modelValue": ($event) => boxSelectionForm.variations = $event,
                                            disabled: productQuantity.value >= 9 && !isActive(variation.uid),
                                            onChange: ($event) => handleCheckboxChange(variation.uid)
                                          }, null, 8, ["value", "modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : __props.premium_subscription_item_uids.hasOwnProperty(variation.uid) ? (openBlock(), createBlock(_component_v_icon, {
                                            key: 1,
                                            class: "mx-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-checkbox-marked")
                                            ]),
                                            _: 1
                                          })) : createCommentVNode("", true)
                                        ]),
                                        createVNode("div", { class: "shrink-0" }, [
                                          createVNode(_component_v_img, {
                                            rounded: "lg",
                                            width: "50px",
                                            "aspect-ratio": "1",
                                            cover: "",
                                            class: "zoom-image shadow-sm",
                                            src: variation.image_url,
                                            alt: ""
                                          }, {
                                            placeholder: withCtx(() => [
                                              createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                createVNode(_component_v_progress_circular, {
                                                  color: "grey-lighten-4",
                                                  indeterminate: ""
                                                })
                                              ])
                                            ]),
                                            _: 2
                                          }, 1032, ["src"])
                                        ]),
                                        createVNode("div", { class: "grow" }, [
                                          createVNode("p", null, [
                                            createTextVNode(toDisplayString(variation.product.name) + " (" + toDisplayString(variation.name) + ") ", 1),
                                            !modifyBoxSelection.value && __props.premium_subscription_item_uids.hasOwnProperty(variation.uid) ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              class: "text-grey ms-5"
                                            }, " x" + toDisplayString(__props.premium_subscription_item_uids[variation.uid]), 1)) : createCommentVNode("", true)
                                          ])
                                        ]),
                                        createVNode("div", {
                                          style: { "width": "200px" },
                                          class: "shrink-0"
                                        }, [
                                          boxSelectionForm.variations.includes(variation.uid) ? (openBlock(), createBlock(_component_v_number_input, {
                                            key: 0,
                                            class: "shrink-0",
                                            modelValue: boxSelectionForm.quantities[variation.uid],
                                            "onUpdate:modelValue": ($event) => boxSelectionForm.quantities[variation.uid] = $event,
                                            type: "number",
                                            density: "compact",
                                            variant: "outlined",
                                            "control-variant": "default",
                                            min: 1,
                                            max: 9 - (productQuantity.value - boxSelectionForm.quantities[variation.uid]),
                                            "hide-details": ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])) : createCommentVNode("", true)
                                        ])
                                      ])
                                    ])
                                  ])) : !modifyBoxSelection.value && !props2.subscribed_plan.has_customization ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "border-t-2 border-white"
                                  }, [
                                    createVNode("div", { class: "flex flex-row items-center justify-between w-full" }, [
                                      createVNode("div", { class: "flex flex-row items-center gap-3 px-5 py-2 w-full" }, [
                                        createVNode("div", { class: "shrink-0" }, [
                                          createVNode(_component_v_icon, { class: "mx-2" }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-checkbox-marked")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        createVNode("div", { class: "shrink-0" }, [
                                          createVNode(_component_v_img, {
                                            rounded: "lg",
                                            width: "50px",
                                            "aspect-ratio": "1",
                                            cover: "",
                                            class: "zoom-image shadow-sm",
                                            src: variation.image_url,
                                            alt: ""
                                          }, {
                                            placeholder: withCtx(() => [
                                              createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                                                createVNode(_component_v_progress_circular, {
                                                  color: "grey-lighten-4",
                                                  indeterminate: ""
                                                })
                                              ])
                                            ]),
                                            _: 2
                                          }, 1032, ["src"])
                                        ]),
                                        createVNode("div", { class: "grow" }, [
                                          createVNode("p", null, [
                                            createTextVNode(toDisplayString(variation.product.name) + " (" + toDisplayString(variation.name) + ") ", 1),
                                            !modifyBoxSelection.value && __props.premium_subscription_item_uids.hasOwnProperty(variation.uid) ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              class: "text-grey ms-5"
                                            }, " x" + toDisplayString(__props.premium_subscription_item_uids[variation.uid]), 1)) : createCommentVNode("", true)
                                          ])
                                        ])
                                      ])
                                    ])
                                  ])) : createCommentVNode("", true)
                                ]);
                              }), 256))
                            ])) : (manageAddOns.value || !manageAddOns.value && !modifyBoxSelection.value) && Object.keys(props2.add_on_variations).length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-3 px-3 pb-3" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(props2.add_on_variations, (variation) => {
                                  return openBlock(), createBlock("div", null, [
                                    createVNode(_component_v_img, {
                                      gradient: "to top left, rgba(0,0,0,0), rgba(0,0,0,.3)",
                                      "aspect-ratio": "0.6667",
                                      class: "shadow-sm rounded-xl",
                                      cover: "",
                                      src: variation.image_url,
                                      alt: ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "p-4 w-full h-full" }, [
                                          createVNode("div", { class: "relative w-full h-full" }, [
                                            createVNode("p", { class: "absolute top-0 text-5xl text-white" }, toDisplayString(selectedQuantities.value[variation.uid]), 1),
                                            createVNode("div", { class: "absolute bottom-0 left-0 w-full" }, [
                                              createVNode("div", { class: "w-full flex flex-row justify-between items-center" }, [
                                                createVNode("div", null, [
                                                  selectedAmountsFormatted.value[variation.uid] !== void 0 ? (openBlock(), createBlock("p", {
                                                    key: 0,
                                                    class: "text-lg"
                                                  }, toDisplayString(selectedAmountsFormatted.value[variation.uid]), 1)) : createCommentVNode("", true)
                                                ]),
                                                createVNode("div", { class: "flex flex-row flex-wrap gap-3" }, [
                                                  createVNode("div", {
                                                    class: "cursor-pointer p-0",
                                                    onClick: withModifiers(($event) => subQuantity(variation.uid), ["prevent"])
                                                  }, [
                                                    createVNode(_component_v_icon, { size: "large" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("mdi-minus")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ], 8, ["onClick"]),
                                                  createVNode("div", {
                                                    class: "cursor-pointer p-0",
                                                    onClick: withModifiers(($event) => addQuantity(variation.uid), ["prevent"])
                                                  }, [
                                                    createVNode(_component_v_icon, { size: "large" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("mdi-plus")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ], 8, ["onClick"])
                                                ])
                                              ])
                                            ])
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["src"])
                                  ]);
                                }), 256))
                              ])
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1024),
                      props2.subscribed_plan.has_customization ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("div", { class: "max-w-4xl mx-auto mt-5" }, [
                          createVNode("p", {
                            class: "text-grey text-sm text-center",
                            innerHTML: props2.content.subscribed_instructions
                          }, null, 8, ["innerHTML"])
                        ]),
                        !modifyBoxSelection.value && !manageAddOns.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex flex-row items-center justify-center w-full gap-5 mt-8"
                        }, [
                          createVNode("div", {
                            onClick: withModifiers(toggleModifyBoxSelection, ["prevent"]),
                            class: "button brand-bg rounded-pill px-10 py-3"
                          }, " Modify Box Selection "),
                          props2.add_on_products.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            onClick: withModifiers(toggleManageAddons, ["prevent"]),
                            class: "button rounded-pill px-10 py-3"
                          }, " Add-On Menu ")) : createCommentVNode("", true)
                        ])) : modifyBoxSelection.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex flex-row items-center justify-center w-full gap-5 mt-8"
                        }, [
                          productQuantity.value === 9 ? (openBlock(), createBlock("div", {
                            key: 0,
                            onClick: withModifiers(saveBoxSelection, ["prevent"]),
                            class: "button bg-green rounded-pill px-10 py-3"
                          }, " Save box selection ")) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "button bg-grey rounded-pill px-10 py-3"
                          }, " Save box selection ")),
                          createVNode("div", {
                            onClick: withModifiers(toggleAllOff, ["prevent"]),
                            class: "button bg-grey rounded-pill px-10 py-3"
                          }, " Cancel ")
                        ])) : manageAddOns.value ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "flex flex-row items-center justify-center w-full gap-5 mt-8"
                        }, [
                          amountsSum.value > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            onClick: withModifiers(checkout, ["prevent"]),
                            class: "button bg-green rounded-pill px-10 py-3"
                          }, " Add to next delivery for " + toDisplayString(amountsSumFormatted.value), 1)) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "button bg-grey rounded-pill px-10 py-3"
                          }, " Add to next delivery ")),
                          createVNode("div", {
                            onClick: withModifiers(toggleAllOff, ["prevent"]),
                            class: "button bg-grey rounded-pill px-10 py-3"
                          }, " Cancel ")
                        ])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("div", { class: plansWrapperClass.value }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(props2.plans, (plan) => {
                          return openBlock(), createBlock("div", { class: "w-full mt-6 mb-12" }, [
                            createVNode("div", {
                              class: "rounded-xl",
                              style: "background:" + (plan.has_customization ? "#f99c19" : "#eaeaea")
                            }, [
                              createVNode("div", null, [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode("div", { class: "block w-full" }, [
                                    createVNode(_component_v_img, {
                                      src: `/images/${plan.image}`,
                                      width: "180",
                                      class: "mx-auto",
                                      style: { "margin-top": "-100px" }
                                    }, null, 8, ["src"])
                                  ]),
                                  createVNode("div", { class: "my-3" }, [
                                    createVNode("p", { class: "text-3xl brand text-center" }, toDisplayString(plan.french_name), 1),
                                    createVNode("p", { class: "text-2xl brand text-center" }, "(" + toDisplayString(plan.name) + " plan)", 1)
                                  ]),
                                  !props2.is_subscribed ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "w-full flex flex-row justify-center"
                                  }, [
                                    createVNode(_component_v_btn, {
                                      disabled: plan.placeholder_count > 0,
                                      size: unref(mobile) ? "large" : "default",
                                      onClick: withModifiers(($event) => selectPlan(plan), ["prevent"]),
                                      class: "rounded-pill"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Start Plan")
                                      ]),
                                      _: 2
                                    }, 1032, ["disabled", "size", "onClick"])
                                  ])) : createCommentVNode("", true),
                                  props2.is_subscribed && props2.subscribed_plan.has_customization ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex mt-5 w-full justify-center"
                                  }, [
                                    createVNode("p", null, "You will be able to edit the item list until the wednesday before each delivery")
                                  ])) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "p-4" }, [
                                  createVNode("div", { class: "flex flex-col gap-0" }, [
                                    !plan.has_customization ? (openBlock(), createBlock(PlanProducts, {
                                      key: 0,
                                      plan
                                    }, null, 8, ["plan"])) : (openBlock(), createBlock(PlanProducts, {
                                      key: 1,
                                      onOpen: openProductModal,
                                      items: props2.premium_subscription_items,
                                      plan,
                                      selectable: true
                                    }, null, 8, ["items", "plan"])),
                                    (openBlock(true), createBlock(Fragment, null, renderList(plan.placeholder_count, (placeholder) => {
                                      return openBlock(), createBlock(PlanProducts, {
                                        onOpen: openProductModal,
                                        plan,
                                        placeholder: true,
                                        image_url: "/images/products/default.jpg"
                                      }, null, 8, ["plan"]);
                                    }), 256))
                                  ])
                                ])
                              ])
                            ], 4),
                            createCommentVNode("", true)
                          ]);
                        }), 256))
                      ], 2)
                    ])),
                    !props2.is_subscribed ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "py-10"
                    }, [
                      props2.plans.length === 2 ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("p", { class: "text-5xl text-center brand" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props2.plans, (plan, index) => {
                            return openBlock(), createBlock("span", null, [
                              createVNode("span", {
                                style: `color: ${plan.has_customization ? "#f99c19" : "#000000"}`
                              }, toDisplayString(plan.name), 5),
                              index === 0 ? (openBlock(), createBlock("span", { key: 0 }, " vs ")) : createCommentVNode("", true)
                            ]);
                          }), 256))
                        ])
                      ])) : props2.plans.length === 1 ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("p", {
                          class: "text-5xl text-center brand",
                          innerHTML: unref(formatTitle)(props2.content.box_title)
                        }, null, 8, ["innerHTML"])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "rounded-5xl overflow-hidden mt-10" }, [
                        createVNode("div", { class: featuresWrapperClass.value }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "row-light-grey px-7 py-0" }, [
                              createVNode("div", {
                                class: "flex items-center",
                                style: { "height": "120px" }
                              }, [
                                createVNode(_sfc_main$9)
                              ])
                            ]),
                            createVNode("div", { class: "row-dark-grey px-7 py-3 flex flex-row items-center" }, " Price "),
                            createVNode("div", { class: "row-light-grey px-7 py-3 flex flex-row items-center" }, " Frequency "),
                            createVNode("div", { class: "row-dark-grey px-7 py-3 flex flex-row items-center" }, " Delivery "),
                            createVNode("div", { class: "row-light-grey px-7 py-3 flex flex-row items-center" }, " Custom boxes "),
                            createVNode("div", { class: "row-dark-grey px-7 py-3 flex flex-row items-center" }, " Customization "),
                            createVNode("div", { class: "row-light-grey px-7 py-3 flex flex-row items-center" }, " Secret menu (add-ons) "),
                            createVNode("div", { class: "row-dark-grey px-7 py-3 flex flex-row items-center" }, " Private events ")
                          ]),
                          (openBlock(true), createBlock(Fragment, null, renderList(props2.plans, (plan, index) => {
                            return openBlock(), createBlock("div", { class: "text-center" }, [
                              createVNode("div", { class: "row-light-grey relative" }, [
                                createVNode("div", {
                                  class: "row-dark-grey absolute bottom-0 left-0 z-0 w-full",
                                  style: { "height": "200px" }
                                }),
                                createVNode("div", {
                                  class: ["relative z-10", plan.has_customization ? "rounded-5xl overflow-hidden" : ""]
                                }, [
                                  createVNode("div", {
                                    class: ["px-5 py-0", `${plan.has_customization ? "row-light-amber text-white" : "row-light-grey"}`]
                                  }, [
                                    createVNode("div", {
                                      class: "flex justify-center items-center",
                                      style: { "height": "120px" }
                                    }, [
                                      props2.plans.length === 2 ? (openBlock(), createBlock("p", {
                                        key: 0,
                                        class: "text-3xl"
                                      }, toDisplayString(plan.name), 1)) : (openBlock(), createBlock("p", {
                                        key: 1,
                                        class: "text-3xl"
                                      }, "Features"))
                                    ])
                                  ], 2),
                                  createVNode("div", {
                                    class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-dark-amber text-white" : "row-dark-grey"}`]
                                  }, " Starts at " + toDisplayString(plan.price_monthly_string) + "/month ", 3),
                                  createVNode("div", {
                                    class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-light-amber text-white" : "row-light-grey"}`]
                                  }, " monthly/bi-weekly/weekly ", 2),
                                  createVNode("div", {
                                    class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-dark-amber text-white" : "row-dark-grey"}`]
                                  }, [
                                    plan.has_delivery ? (openBlock(), createBlock(_component_v_icon, {
                                      key: 0,
                                      color: plan.has_customization ? "white" : "#f99c19"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-check-circle")
                                      ]),
                                      _: 2
                                    }, 1032, ["color"])) : (openBlock(), createBlock(_component_v_icon, {
                                      key: 1,
                                      color: "grey"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-close")
                                      ]),
                                      _: 1
                                    }))
                                  ], 2),
                                  createVNode("div", {
                                    class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-light-amber text-white" : "row-light-grey"}`]
                                  }, [
                                    plan.has_custom_boxes ? (openBlock(), createBlock(_component_v_icon, {
                                      key: 0,
                                      color: plan.has_customization ? "white" : "#f99c19"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-check-circle")
                                      ]),
                                      _: 2
                                    }, 1032, ["color"])) : (openBlock(), createBlock(_component_v_icon, {
                                      key: 1,
                                      color: "grey"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-close")
                                      ]),
                                      _: 1
                                    }))
                                  ], 2),
                                  createVNode("div", {
                                    class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-dark-amber text-white" : "row-dark-grey"}`]
                                  }, [
                                    plan.has_customization ? (openBlock(), createBlock(_component_v_icon, {
                                      key: 0,
                                      color: plan.has_customization ? "white" : "#f99c19"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-check-circle")
                                      ]),
                                      _: 2
                                    }, 1032, ["color"])) : (openBlock(), createBlock(_component_v_icon, {
                                      key: 1,
                                      color: "grey"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-close")
                                      ]),
                                      _: 1
                                    }))
                                  ], 2),
                                  createVNode("div", {
                                    class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-light-amber text-white" : "row-light-grey"}`]
                                  }, [
                                    plan.has_add_ons ? (openBlock(), createBlock(_component_v_icon, {
                                      key: 0,
                                      color: plan.has_customization ? "white" : "#f99c19"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-check-circle")
                                      ]),
                                      _: 2
                                    }, 1032, ["color"])) : (openBlock(), createBlock(_component_v_icon, {
                                      key: 1,
                                      color: "grey"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-close")
                                      ]),
                                      _: 1
                                    }))
                                  ], 2),
                                  createVNode("div", {
                                    class: ["px-5 py-3 flex flex-row items-center justify-center", `${plan.has_customization ? "row-dark-amber text-white" : "row-dark-grey"}`]
                                  }, [
                                    plan.has_private_events ? (openBlock(), createBlock(_component_v_icon, {
                                      key: 0,
                                      color: plan.has_customization ? "white" : "#f99c19"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-check-circle")
                                      ]),
                                      _: 2
                                    }, 1032, ["color"])) : (openBlock(), createBlock(_component_v_icon, {
                                      key: 1,
                                      color: "grey"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-close")
                                      ]),
                                      _: 1
                                    }))
                                  ], 2)
                                ], 2)
                              ])
                            ]);
                          }), 256))
                        ], 2)
                      ])
                    ])) : createCommentVNode("", true),
                    !props2.is_subscribed ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "mt-15"
                    }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-3" }, [
                          (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                            return createVNode("div", { class: "row-light-grey p-7 rounded-5xl animate-item" }, [
                              createVNode(_component_v_icon, {
                                style: { "font-size": "50px" },
                                class: "brand-color"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(props2.content[`feature_${i}_icon`]), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode("p", { class: "text-3xl mt-7" }, toDisplayString(props2.content[`feature_${i}_title`]), 1),
                              createVNode("p", {
                                class: "mt-3 text-grey-darken-1",
                                innerHTML: unref(formatEmphasis)(props2.content[`feature_${i}_content`])
                              }, null, 8, ["innerHTML"])
                            ]);
                          }), 64))
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        show: showPlanModal.value && !props2.is_subscribed,
        onClose: resetPlan
      }, {
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
            if (selectedPlan.value && !props2.is_subscribed) {
              _push2(`<div data-v-fe4c6ac1${_scopeId}>`);
              if (!selectedPlan.value.has_customization) {
                _push2(ssrRenderComponent(PlanProducts, { plan: selectedPlan.value }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(PlanProducts, {
                  onOpen: openProductModal,
                  items: props2.premium_subscription_items,
                  plan: selectedPlan.value
                }, null, _parent2, _scopeId));
              }
              if (selectedPlan.value.has_customization) {
                _push2(`<div class="flex mt-3 w-full justify-center" data-v-fe4c6ac1${_scopeId}><p data-v-fe4c6ac1${_scopeId}>You will be able to edit the item list until the wednesday before each delivery</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="my-5 text-center" data-v-fe4c6ac1${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_card, {
                color: "grey-lighten-2",
                elevation: "2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_card_item, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<p class="text-xl mb-3" data-v-fe4c6ac1${_scopeId3}>You want a delivery:</p><div class="flex flex-row justify-center" data-v-fe4c6ac1${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_btn_toggle, {
                            modelValue: subscribeForm.frequency,
                            "onUpdate:modelValue": ($event) => subscribeForm.frequency = $event,
                            divided: "",
                            variant: "flat",
                            color: "amber-darken-2"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_v_btn, { value: "monthly" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Once per month <br data-v-fe4c6ac1${_scopeId5}> ${ssrInterpolate(selectedPlan.value.price_monthly_formatted)}/delivery `);
                                    } else {
                                      return [
                                        createTextVNode(" Once per month "),
                                        createVNode("br"),
                                        createTextVNode(" " + toDisplayString(selectedPlan.value.price_monthly_formatted) + "/delivery ", 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_v_btn, { value: "biweekly" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Twice per month <br data-v-fe4c6ac1${_scopeId5}> ${ssrInterpolate(selectedPlan.value.price_biweekly_formatted)}/delivery `);
                                    } else {
                                      return [
                                        createTextVNode(" Twice per month "),
                                        createVNode("br"),
                                        createTextVNode(" " + toDisplayString(selectedPlan.value.price_biweekly_formatted) + "/delivery ", 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_v_btn, { value: "weekly" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Once per week <br data-v-fe4c6ac1${_scopeId5}> ${ssrInterpolate(selectedPlan.value.price_weekly_formatted)}/delivery `);
                                    } else {
                                      return [
                                        createTextVNode(" Once per week "),
                                        createVNode("br"),
                                        createTextVNode(" " + toDisplayString(selectedPlan.value.price_weekly_formatted) + "/delivery ", 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_v_btn, { value: "monthly" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Once per month "),
                                      createVNode("br"),
                                      createTextVNode(" " + toDisplayString(selectedPlan.value.price_monthly_formatted) + "/delivery ", 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_btn, { value: "biweekly" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Twice per month "),
                                      createVNode("br"),
                                      createTextVNode(" " + toDisplayString(selectedPlan.value.price_biweekly_formatted) + "/delivery ", 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_btn, { value: "weekly" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Once per week "),
                                      createVNode("br"),
                                      createTextVNode(" " + toDisplayString(selectedPlan.value.price_weekly_formatted) + "/delivery ", 1)
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div><div class="mt-3" data-v-fe4c6ac1${_scopeId3}>`);
                          if (errors.frequency) {
                            _push4(`<p class="text-red-500 font-bold" data-v-fe4c6ac1${_scopeId3}>${ssrInterpolate(errors.frequency[0])}</p>`);
                          } else {
                            _push4(`<p data-v-fe4c6ac1${_scopeId3}>Select one of the three options</p>`);
                          }
                          _push4(`</div>`);
                          if (props2.extra_delivery_fee.value) {
                            _push4(`<div class="mt-5 text-amber-darken-4" data-v-fe4c6ac1${_scopeId3}><p data-v-fe4c6ac1${_scopeId3}>Your post code (${ssrInterpolate(props2.post_code)}) is an area that is further than our standard delivery route, and requires an additional fee of ${ssrInterpolate(props2.extra_delivery_fee.formatted)} for each delivery.</p></div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createVNode("p", { class: "text-xl mb-3" }, "You want a delivery:"),
                            createVNode("div", { class: "flex flex-row justify-center" }, [
                              createVNode(_component_v_btn_toggle, {
                                modelValue: subscribeForm.frequency,
                                "onUpdate:modelValue": ($event) => subscribeForm.frequency = $event,
                                divided: "",
                                variant: "flat",
                                color: "amber-darken-2"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_btn, { value: "monthly" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Once per month "),
                                      createVNode("br"),
                                      createTextVNode(" " + toDisplayString(selectedPlan.value.price_monthly_formatted) + "/delivery ", 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_btn, { value: "biweekly" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Twice per month "),
                                      createVNode("br"),
                                      createTextVNode(" " + toDisplayString(selectedPlan.value.price_biweekly_formatted) + "/delivery ", 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_btn, { value: "weekly" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Once per week "),
                                      createVNode("br"),
                                      createTextVNode(" " + toDisplayString(selectedPlan.value.price_weekly_formatted) + "/delivery ", 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "mt-3" }, [
                              errors.frequency ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-red-500 font-bold"
                              }, toDisplayString(errors.frequency[0]), 1)) : (openBlock(), createBlock("p", { key: 1 }, "Select one of the three options"))
                            ]),
                            props2.extra_delivery_fee.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-5 text-amber-darken-4"
                            }, [
                              createVNode("p", null, "Your post code (" + toDisplayString(props2.post_code) + ") is an area that is further than our standard delivery route, and requires an additional fee of " + toDisplayString(props2.extra_delivery_fee.formatted) + " for each delivery.", 1)
                            ])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-xl mb-3" }, "You want a delivery:"),
                          createVNode("div", { class: "flex flex-row justify-center" }, [
                            createVNode(_component_v_btn_toggle, {
                              modelValue: subscribeForm.frequency,
                              "onUpdate:modelValue": ($event) => subscribeForm.frequency = $event,
                              divided: "",
                              variant: "flat",
                              color: "amber-darken-2"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_btn, { value: "monthly" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Once per month "),
                                    createVNode("br"),
                                    createTextVNode(" " + toDisplayString(selectedPlan.value.price_monthly_formatted) + "/delivery ", 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_btn, { value: "biweekly" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Twice per month "),
                                    createVNode("br"),
                                    createTextVNode(" " + toDisplayString(selectedPlan.value.price_biweekly_formatted) + "/delivery ", 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_btn, { value: "weekly" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Once per week "),
                                    createVNode("br"),
                                    createTextVNode(" " + toDisplayString(selectedPlan.value.price_weekly_formatted) + "/delivery ", 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "mt-3" }, [
                            errors.frequency ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-red-500 font-bold"
                            }, toDisplayString(errors.frequency[0]), 1)) : (openBlock(), createBlock("p", { key: 1 }, "Select one of the three options"))
                          ]),
                          props2.extra_delivery_fee.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-5 text-amber-darken-4"
                          }, [
                            createVNode("p", null, "Your post code (" + toDisplayString(props2.post_code) + ") is an area that is further than our standard delivery route, and requires an additional fee of " + toDisplayString(props2.extra_delivery_fee.formatted) + " for each delivery.", 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="my-5 text-center" data-v-fe4c6ac1${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_card, {
                color: "grey-lighten-2",
                elevation: "2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_card_item, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<p class="text-xl mb-3" data-v-fe4c6ac1${_scopeId3}>Choose a week day:</p><div class="flex flex-row justify-center" data-v-fe4c6ac1${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_btn_toggle, {
                            modelValue: subscribeForm.delivery_day,
                            "onUpdate:modelValue": ($event) => subscribeForm.delivery_day = $event,
                            divided: "",
                            variant: "flat",
                            color: "amber-darken-2"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_v_btn, { value: "friday" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Friday <br data-v-fe4c6ac1${_scopeId5}>`);
                                    } else {
                                      return [
                                        createTextVNode(" Friday "),
                                        createVNode("br")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_v_btn, { value: "saturday" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Saturday <br data-v-fe4c6ac1${_scopeId5}>`);
                                    } else {
                                      return [
                                        createTextVNode(" Saturday "),
                                        createVNode("br")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_v_btn, { value: "friday" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Friday "),
                                      createVNode("br")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_btn, { value: "saturday" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Saturday "),
                                      createVNode("br")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div><div class="mt-3" data-v-fe4c6ac1${_scopeId3}>`);
                          if (errors.delivery_day) {
                            _push4(`<p class="text-red-500 font-bold" data-v-fe4c6ac1${_scopeId3}>${ssrInterpolate(errors.delivery_day[0])}</p>`);
                          } else {
                            _push4(`<p data-v-fe4c6ac1${_scopeId3}>Select one of the two options</p>`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("p", { class: "text-xl mb-3" }, "Choose a week day:"),
                            createVNode("div", { class: "flex flex-row justify-center" }, [
                              createVNode(_component_v_btn_toggle, {
                                modelValue: subscribeForm.delivery_day,
                                "onUpdate:modelValue": ($event) => subscribeForm.delivery_day = $event,
                                divided: "",
                                variant: "flat",
                                color: "amber-darken-2"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_btn, { value: "friday" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Friday "),
                                      createVNode("br")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_btn, { value: "saturday" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Saturday "),
                                      createVNode("br")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "mt-3" }, [
                              errors.delivery_day ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-red-500 font-bold"
                              }, toDisplayString(errors.delivery_day[0]), 1)) : (openBlock(), createBlock("p", { key: 1 }, "Select one of the two options"))
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-xl mb-3" }, "Choose a week day:"),
                          createVNode("div", { class: "flex flex-row justify-center" }, [
                            createVNode(_component_v_btn_toggle, {
                              modelValue: subscribeForm.delivery_day,
                              "onUpdate:modelValue": ($event) => subscribeForm.delivery_day = $event,
                              divided: "",
                              variant: "flat",
                              color: "amber-darken-2"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_btn, { value: "friday" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Friday "),
                                    createVNode("br")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_btn, { value: "saturday" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Saturday "),
                                    createVNode("br")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "mt-3" }, [
                            errors.delivery_day ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-red-500 font-bold"
                            }, toDisplayString(errors.delivery_day[0]), 1)) : (openBlock(), createBlock("p", { key: 1 }, "Select one of the two options"))
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_v_card, {
                color: "grey-lighten-2",
                elevation: "2",
                class: "mb-5"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_card_item, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-center" data-v-fe4c6ac1${_scopeId3}><p class="text-xl mb-3" data-v-fe4c6ac1${_scopeId3}>Delivery information:</p></div><div class="mb-3" data-v-fe4c6ac1${_scopeId3}><p class="uppercase" data-v-fe4c6ac1${_scopeId3}>full name</p>`);
                          _push4(ssrRenderComponent(_component_v_text_field, {
                            modelValue: subscribeForm.full_name,
                            "onUpdate:modelValue": ($event) => subscribeForm.full_name = $event,
                            "error-messages": errors.full_name
                          }, null, _parent4, _scopeId3));
                          _push4(`</div><div class="mb-3" data-v-fe4c6ac1${_scopeId3}><p class="uppercase" data-v-fe4c6ac1${_scopeId3}>address 1</p>`);
                          _push4(ssrRenderComponent(_component_v_text_field, {
                            modelValue: subscribeForm.address_1,
                            "onUpdate:modelValue": ($event) => subscribeForm.address_1 = $event,
                            "error-messages": errors.address_1
                          }, null, _parent4, _scopeId3));
                          _push4(`</div><div class="mb-3" data-v-fe4c6ac1${_scopeId3}><p class="uppercase" data-v-fe4c6ac1${_scopeId3}>address 2 (optional)</p>`);
                          _push4(ssrRenderComponent(_component_v_text_field, {
                            modelValue: subscribeForm.address_2,
                            "onUpdate:modelValue": ($event) => subscribeForm.address_2 = $event,
                            "error-messages": errors.address_2
                          }, null, _parent4, _scopeId3));
                          _push4(`</div><div class="mb-3" data-v-fe4c6ac1${_scopeId3}><p class="uppercase" data-v-fe4c6ac1${_scopeId3}>post code</p>`);
                          _push4(ssrRenderComponent(_component_v_text_field, {
                            modelValue: subscribeForm.post_code,
                            "onUpdate:modelValue": ($event) => subscribeForm.post_code = $event,
                            "error-messages": errors.post_code
                          }, null, _parent4, _scopeId3));
                          _push4(`</div><div class="mb-3" data-v-fe4c6ac1${_scopeId3}><p class="uppercase" data-v-fe4c6ac1${_scopeId3}>city</p>`);
                          _push4(ssrRenderComponent(_component_v_text_field, {
                            modelValue: subscribeForm.city,
                            "onUpdate:modelValue": ($event) => subscribeForm.city = $event,
                            "error-messages": errors.city
                          }, null, _parent4, _scopeId3));
                          _push4(`</div><div class="mb-3" data-v-fe4c6ac1${_scopeId3}><p class="uppercase" data-v-fe4c6ac1${_scopeId3}>phone number</p>`);
                          _push4(ssrRenderComponent(_component_v_text_field, {
                            modelValue: subscribeForm.phone,
                            "onUpdate:modelValue": ($event) => subscribeForm.phone = $event,
                            "error-messages": errors.phone
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-center" }, [
                              createVNode("p", { class: "text-xl mb-3" }, "Delivery information:")
                            ]),
                            createVNode("div", { class: "mb-3" }, [
                              createVNode("p", { class: "uppercase" }, "full name"),
                              createVNode(_component_v_text_field, {
                                modelValue: subscribeForm.full_name,
                                "onUpdate:modelValue": ($event) => subscribeForm.full_name = $event,
                                "error-messages": errors.full_name
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                            ]),
                            createVNode("div", { class: "mb-3" }, [
                              createVNode("p", { class: "uppercase" }, "address 1"),
                              createVNode(_component_v_text_field, {
                                modelValue: subscribeForm.address_1,
                                "onUpdate:modelValue": ($event) => subscribeForm.address_1 = $event,
                                "error-messages": errors.address_1
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                            ]),
                            createVNode("div", { class: "mb-3" }, [
                              createVNode("p", { class: "uppercase" }, "address 2 (optional)"),
                              createVNode(_component_v_text_field, {
                                modelValue: subscribeForm.address_2,
                                "onUpdate:modelValue": ($event) => subscribeForm.address_2 = $event,
                                "error-messages": errors.address_2
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                            ]),
                            createVNode("div", { class: "mb-3" }, [
                              createVNode("p", { class: "uppercase" }, "post code"),
                              createVNode(_component_v_text_field, {
                                modelValue: subscribeForm.post_code,
                                "onUpdate:modelValue": ($event) => subscribeForm.post_code = $event,
                                "error-messages": errors.post_code
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                            ]),
                            createVNode("div", { class: "mb-3" }, [
                              createVNode("p", { class: "uppercase" }, "city"),
                              createVNode(_component_v_text_field, {
                                modelValue: subscribeForm.city,
                                "onUpdate:modelValue": ($event) => subscribeForm.city = $event,
                                "error-messages": errors.city
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                            ]),
                            createVNode("div", { class: "mb-3" }, [
                              createVNode("p", { class: "uppercase" }, "phone number"),
                              createVNode(_component_v_text_field, {
                                modelValue: subscribeForm.phone,
                                "onUpdate:modelValue": ($event) => subscribeForm.phone = $event,
                                "error-messages": errors.phone
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-center" }, [
                            createVNode("p", { class: "text-xl mb-3" }, "Delivery information:")
                          ]),
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("p", { class: "uppercase" }, "full name"),
                            createVNode(_component_v_text_field, {
                              modelValue: subscribeForm.full_name,
                              "onUpdate:modelValue": ($event) => subscribeForm.full_name = $event,
                              "error-messages": errors.full_name
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ]),
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("p", { class: "uppercase" }, "address 1"),
                            createVNode(_component_v_text_field, {
                              modelValue: subscribeForm.address_1,
                              "onUpdate:modelValue": ($event) => subscribeForm.address_1 = $event,
                              "error-messages": errors.address_1
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ]),
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("p", { class: "uppercase" }, "address 2 (optional)"),
                            createVNode(_component_v_text_field, {
                              modelValue: subscribeForm.address_2,
                              "onUpdate:modelValue": ($event) => subscribeForm.address_2 = $event,
                              "error-messages": errors.address_2
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ]),
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("p", { class: "uppercase" }, "post code"),
                            createVNode(_component_v_text_field, {
                              modelValue: subscribeForm.post_code,
                              "onUpdate:modelValue": ($event) => subscribeForm.post_code = $event,
                              "error-messages": errors.post_code
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ]),
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("p", { class: "uppercase" }, "city"),
                            createVNode(_component_v_text_field, {
                              modelValue: subscribeForm.city,
                              "onUpdate:modelValue": ($event) => subscribeForm.city = $event,
                              "error-messages": errors.city
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ]),
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("p", { class: "uppercase" }, "phone number"),
                            createVNode(_component_v_text_field, {
                              modelValue: subscribeForm.phone,
                              "onUpdate:modelValue": ($event) => subscribeForm.phone = $event,
                              "error-messages": errors.phone
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              selectedPlan.value && !props2.is_subscribed ? (openBlock(), createBlock("div", { key: 0 }, [
                !selectedPlan.value.has_customization ? (openBlock(), createBlock(PlanProducts, {
                  key: 0,
                  plan: selectedPlan.value
                }, null, 8, ["plan"])) : (openBlock(), createBlock(PlanProducts, {
                  key: 1,
                  onOpen: openProductModal,
                  items: props2.premium_subscription_items,
                  plan: selectedPlan.value
                }, null, 8, ["items", "plan"])),
                selectedPlan.value.has_customization ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "flex mt-3 w-full justify-center"
                }, [
                  createVNode("p", null, "You will be able to edit the item list until the wednesday before each delivery")
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "my-5 text-center" }, [
                  createVNode(_component_v_card, {
                    color: "grey-lighten-2",
                    elevation: "2"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-xl mb-3" }, "You want a delivery:"),
                          createVNode("div", { class: "flex flex-row justify-center" }, [
                            createVNode(_component_v_btn_toggle, {
                              modelValue: subscribeForm.frequency,
                              "onUpdate:modelValue": ($event) => subscribeForm.frequency = $event,
                              divided: "",
                              variant: "flat",
                              color: "amber-darken-2"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_btn, { value: "monthly" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Once per month "),
                                    createVNode("br"),
                                    createTextVNode(" " + toDisplayString(selectedPlan.value.price_monthly_formatted) + "/delivery ", 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_btn, { value: "biweekly" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Twice per month "),
                                    createVNode("br"),
                                    createTextVNode(" " + toDisplayString(selectedPlan.value.price_biweekly_formatted) + "/delivery ", 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_btn, { value: "weekly" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Once per week "),
                                    createVNode("br"),
                                    createTextVNode(" " + toDisplayString(selectedPlan.value.price_weekly_formatted) + "/delivery ", 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "mt-3" }, [
                            errors.frequency ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-red-500 font-bold"
                            }, toDisplayString(errors.frequency[0]), 1)) : (openBlock(), createBlock("p", { key: 1 }, "Select one of the three options"))
                          ]),
                          props2.extra_delivery_fee.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-5 text-amber-darken-4"
                          }, [
                            createVNode("p", null, "Your post code (" + toDisplayString(props2.post_code) + ") is an area that is further than our standard delivery route, and requires an additional fee of " + toDisplayString(props2.extra_delivery_fee.formatted) + " for each delivery.", 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "my-5 text-center" }, [
                  createVNode(_component_v_card, {
                    color: "grey-lighten-2",
                    elevation: "2"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-xl mb-3" }, "Choose a week day:"),
                          createVNode("div", { class: "flex flex-row justify-center" }, [
                            createVNode(_component_v_btn_toggle, {
                              modelValue: subscribeForm.delivery_day,
                              "onUpdate:modelValue": ($event) => subscribeForm.delivery_day = $event,
                              divided: "",
                              variant: "flat",
                              color: "amber-darken-2"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_btn, { value: "friday" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Friday "),
                                    createVNode("br")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_btn, { value: "saturday" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Saturday "),
                                    createVNode("br")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "mt-3" }, [
                            errors.delivery_day ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-red-500 font-bold"
                            }, toDisplayString(errors.delivery_day[0]), 1)) : (openBlock(), createBlock("p", { key: 1 }, "Select one of the two options"))
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode(_component_v_card, {
                  color: "grey-lighten-2",
                  elevation: "2",
                  class: "mb-5"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_card_item, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("p", { class: "text-xl mb-3" }, "Delivery information:")
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("p", { class: "uppercase" }, "full name"),
                          createVNode(_component_v_text_field, {
                            modelValue: subscribeForm.full_name,
                            "onUpdate:modelValue": ($event) => subscribeForm.full_name = $event,
                            "error-messages": errors.full_name
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("p", { class: "uppercase" }, "address 1"),
                          createVNode(_component_v_text_field, {
                            modelValue: subscribeForm.address_1,
                            "onUpdate:modelValue": ($event) => subscribeForm.address_1 = $event,
                            "error-messages": errors.address_1
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("p", { class: "uppercase" }, "address 2 (optional)"),
                          createVNode(_component_v_text_field, {
                            modelValue: subscribeForm.address_2,
                            "onUpdate:modelValue": ($event) => subscribeForm.address_2 = $event,
                            "error-messages": errors.address_2
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("p", { class: "uppercase" }, "post code"),
                          createVNode(_component_v_text_field, {
                            modelValue: subscribeForm.post_code,
                            "onUpdate:modelValue": ($event) => subscribeForm.post_code = $event,
                            "error-messages": errors.post_code
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("p", { class: "uppercase" }, "city"),
                          createVNode(_component_v_text_field, {
                            modelValue: subscribeForm.city,
                            "onUpdate:modelValue": ($event) => subscribeForm.city = $event,
                            "error-messages": errors.city
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("p", { class: "uppercase" }, "phone number"),
                          createVNode(_component_v_text_field, {
                            modelValue: subscribeForm.phone,
                            "onUpdate:modelValue": ($event) => subscribeForm.phone = $event,
                            "error-messages": errors.phone
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$7, {
              onClick: subscribe,
              class: "me-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Subscribe`);
                } else {
                  return [
                    createTextVNode("Subscribe")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, { onClick: resetPlan }, {
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
              createVNode(_sfc_main$7, {
                onClick: subscribe,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode("Subscribe")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$6, { onClick: resetPlan }, {
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
      _push(ssrRenderComponent(_sfc_main$3, {
        ref_key: "customPlanProductModal",
        ref: customPlanProductModal,
        products: props2.customization_products
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        ref_key: "addressModal",
        ref: addressModal,
        errors: props2.errors
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        ref_key: "deliveryDayModal",
        ref: deliveryDayModal,
        errors: props2.errors
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Subscriptions/Home.vue");
  return _sfc_setup ? _sfc_setup(props2, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fe4c6ac1"]]);
export {
  Home as default
};
