import { ref, computed, onMounted, resolveComponent, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createTextVNode, withModifiers, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { A as AppLayout } from "./BT2Gi1aL-2117352433356.js";
import { Head } from "@inertiajs/vue3";
import { W as Wrapper } from "./CbcLIE-O-3135473238126.js";
import { _ as _sfc_main$2 } from "./CznY329j-2334615712833.js";
import { _ as _sfc_main$1 } from "./BGTMc6Vz-1731362423358.js";
import { _ as _sfc_main$3 } from "./o7gowRKQ-2312437163135.js";
import Isotope from "isotope-layout";
import { useDisplay } from "vuetify";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import "./DKEAH6nn-4333751172235.js";
import "mitt";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./1tPrXgE0-1751246333532.js";
import "./AK26aD-S-7313723521453.js";
import "./C6q4kDV--4257163313235.js";
import "./DsvTyKEu-3355343127127.js";
import "./CeVcRmCk-1453137522733.js";
import "./Cyl_ukyB-3352317127354.js";
import "./BFeg_3wS-5313717233245.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "Menu",
  __ssrInlineRender: true,
  props: {
    content: Object,
    filters: Object,
    products: Object,
    event_menu_category: { type: Object, default: "" },
    meta_description: { type: String, default: "" },
    is_production: { type: Boolean, default: false }
  },
  setup(__props) {
    const { mobile } = useDisplay();
    const props = __props;
    const productModal = ref(null);
    const selectedCategory = ref(null);
    const isotopeInstance = ref(null);
    const grid = ref(null);
    const selectCategory = (category) => {
      selectedCategory.value = category;
      const filterValue = category ? `.${category}` : "*";
      isotopeInstance.value.arrange({ filter: filterValue });
    };
    computed(() => {
      if (selectedCategory.value === null) {
        return props.products;
      }
      return props.products.filter((product) => product.category === selectedCategory.value);
    });
    onMounted(() => {
      props.products.forEach((product) => {
        product.categoryClass = product.categories.map((category) => category.slug).join(" ");
      });
      isotopeInstance.value = new Isotope(grid.value, {
        itemSelector: ".card",
        layoutMode: "fitRows"
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_img = resolveComponent("v-img");
      const _component_v_progress_circular = resolveComponent("v-progress-circular");
      const _component_v_chip = resolveComponent("v-chip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Events menu: ${ssrInterpolate(props.event_menu_category.name)}</title>`);
            if (props.meta_description) {
              _push2(`<meta name="description"${ssrRenderAttr("content", props.meta_description)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta name="robots"${ssrRenderAttr("content", props.is_production ?? false ? "index, follow" : "noindex, nofollow")}${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Events menu: " + toDisplayString(props.event_menu_category.name), 1),
              props.meta_description ? (openBlock(), createBlock("meta", {
                key: 0,
                name: "description",
                content: props.meta_description
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                name: "robots",
                content: props.is_production ?? false ? "index, follow" : "noindex, nofollow"
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Wrapper, { style: { "margin-top": "150px" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, {
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="${ssrRenderClass(props.event_menu_category ? "text-4xl" : "")}"${_scopeId2}>${props.content.introduction ?? ""}</p>`);
                } else {
                  return [
                    createVNode("p", {
                      class: props.event_menu_category ? "text-4xl" : "",
                      innerHTML: props.content.introduction
                    }, null, 10, ["innerHTML"])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-center"${_scopeId2}><div class="text-center"${_scopeId2}><h1 class="${ssrRenderClass([props.event_menu_category ? "text-5xl" : "text-6xl", "brand uppercase"])}"${_scopeId2}>${props.content.title ?? ""}</h1></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("h1", {
                          class: ["brand uppercase", props.event_menu_category ? "text-5xl" : "text-6xl"],
                          innerHTML: props.content.title
                        }, null, 10, ["innerHTML"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, null, {
                description: withCtx(() => [
                  createVNode("p", {
                    class: props.event_menu_category ? "text-4xl" : "",
                    innerHTML: props.content.introduction
                  }, null, 10, ["innerHTML"])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h1", {
                        class: ["brand uppercase", props.event_menu_category ? "text-5xl" : "text-6xl"],
                        innerHTML: props.content.title
                      }, null, 10, ["innerHTML"])
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
      _push(ssrRenderComponent(_sfc_main$2, { wrapper: "section" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!props.event_menu_category) {
              _push2(`<div class="flex justify-center"${_scopeId}><div class="flex flex-col gap-3 items-center lg:flex-row mx-20 my-10"${_scopeId}><div class="block"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_btn, {
                rounded: "xl",
                size: unref(mobile) ? "large" : "default",
                onClick: ($event) => selectCategory(null),
                variant: selectedCategory.value === null ? "flat" : "outlined"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`All categories`);
                  } else {
                    return [
                      createTextVNode("All categories")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="flex flex-row flex-wrap gap-3 justify-center items-center"${_scopeId}><!--[-->`);
              ssrRenderList(__props.filters, (category) => {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_v_btn, {
                  rounded: "xl",
                  size: unref(mobile) ? "large" : "default",
                  onClick: ($event) => selectCategory(category.slug),
                  variant: selectedCategory.value === category.slug ? "flat" : "outlined"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(category.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(category.name), 1)
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
            _push2(`<div class="px-2 py-10 xl:p-20"${_scopeId}><div class="block relative p-0"${_scopeId}><!--[-->`);
            ssrRenderList(__props.products, (product, index) => {
              _push2(`<div class="${ssrRenderClass([product.categoryClass, "card w-[50%] sm:w-[50%] lg:w-[25%] p-2"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_card, {
                onClick: ($event) => productModal.value.openProduct(product),
                color: "black",
                variant: "text",
                class: "relative"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="overflow-hidden rounded-xl"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_img, {
                      "aspect-ratio": "0.6667",
                      class: "zoom-image shadow-sm",
                      src: product.image_url,
                      alt: ""
                    }, {
                      placeholder: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="d-flex align-center justify-center fill-height"${_scopeId3}>`);
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
                    _push3(`</div><div class="p-2 xl:p-5"${_scopeId2}><div${_scopeId2}><div class="grid grid-cols-1 lg:grid-cols-6 gap-3"${_scopeId2}><div class="col-span-6 xl:col-span-4"${_scopeId2}><p class="text-base xl:text-2xl uppercase brand bold"${_scopeId2}>${ssrInterpolate(product.name)}</p><p class="hidden xl:block mt-2"${_scopeId2}>${ssrInterpolate(product.description)}</p></div><div class="flex xl:justify-end col-span-6 xl:col-span-2"${_scopeId2}><p class="text-base xl:text-xl font-serif"${_scopeId2}>${ssrInterpolate(product.price_string)}</p></div></div>`);
                    if (product.weekend_only) {
                      _push3(`<div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_chip, {
                        color: "black",
                        variant: "outlined",
                        size: "x-small"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Week-end only`);
                          } else {
                            return [
                              createTextVNode("Week-end only")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "overflow-hidden rounded-xl" }, [
                        createVNode(_component_v_img, {
                          "aspect-ratio": "0.6667",
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
                      createVNode("div", { class: "p-2 xl:p-5" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-6 gap-3" }, [
                            createVNode("div", { class: "col-span-6 xl:col-span-4" }, [
                              createVNode("p", { class: "text-base xl:text-2xl uppercase brand bold" }, toDisplayString(product.name), 1),
                              createVNode("p", { class: "hidden xl:block mt-2" }, toDisplayString(product.description), 1)
                            ]),
                            createVNode("div", { class: "flex xl:justify-end col-span-6 xl:col-span-2" }, [
                              createVNode("p", { class: "text-base xl:text-xl font-serif" }, toDisplayString(product.price_string), 1)
                            ])
                          ]),
                          product.weekend_only ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(_component_v_chip, {
                              color: "black",
                              variant: "outlined",
                              size: "x-small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Week-end only")
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              !props.event_menu_category ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex justify-center"
              }, [
                createVNode("div", { class: "flex flex-col gap-3 items-center lg:flex-row mx-20 my-10" }, [
                  createVNode("div", { class: "block" }, [
                    createVNode(_component_v_btn, {
                      rounded: "xl",
                      size: unref(mobile) ? "large" : "default",
                      onClick: withModifiers(($event) => selectCategory(null), ["prevent"]),
                      variant: selectedCategory.value === null ? "flat" : "outlined"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("All categories")
                      ]),
                      _: 1
                    }, 8, ["size", "onClick", "variant"])
                  ]),
                  createVNode("div", { class: "flex flex-row flex-wrap gap-3 justify-center items-center" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.filters, (category) => {
                      return openBlock(), createBlock("div", {
                        key: category.uid
                      }, [
                        createVNode(_component_v_btn, {
                          rounded: "xl",
                          size: unref(mobile) ? "large" : "default",
                          onClick: withModifiers(($event) => selectCategory(category.slug), ["prevent"]),
                          variant: selectedCategory.value === category.slug ? "flat" : "outlined"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(category.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["size", "onClick", "variant"])
                      ]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "px-2 py-10 xl:p-20" }, [
                createVNode("div", {
                  ref_key: "grid",
                  ref: grid,
                  class: "block relative p-0"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.products, (product, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: [product.categoryClass, "card w-[50%] sm:w-[50%] lg:w-[25%] p-2"]
                    }, [
                      createVNode(_component_v_card, {
                        onClick: withModifiers(($event) => productModal.value.openProduct(product), ["prevent"]),
                        color: "black",
                        variant: "text",
                        class: "relative"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "overflow-hidden rounded-xl" }, [
                            createVNode(_component_v_img, {
                              "aspect-ratio": "0.6667",
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
                          createVNode("div", { class: "p-2 xl:p-5" }, [
                            createVNode("div", null, [
                              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-6 gap-3" }, [
                                createVNode("div", { class: "col-span-6 xl:col-span-4" }, [
                                  createVNode("p", { class: "text-base xl:text-2xl uppercase brand bold" }, toDisplayString(product.name), 1),
                                  createVNode("p", { class: "hidden xl:block mt-2" }, toDisplayString(product.description), 1)
                                ]),
                                createVNode("div", { class: "flex xl:justify-end col-span-6 xl:col-span-2" }, [
                                  createVNode("p", { class: "text-base xl:text-xl font-serif" }, toDisplayString(product.price_string), 1)
                                ])
                              ]),
                              product.weekend_only ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode(_component_v_chip, {
                                  color: "black",
                                  variant: "outlined",
                                  size: "x-small"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Week-end only")
                                  ]),
                                  _: 1
                                })
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ], 2);
                  }), 128))
                ], 512)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        ref_key: "productModal",
        ref: productModal
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Menu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
