import { computed, unref, mergeProps, withCtx, renderSlot, useSSRContext, ref, resolveComponent, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, Fragment, renderList, withModifiers } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { A as AppLayout } from "./BT2Gi1aL-2117352433356.js";
import { Link, Head } from "@inertiajs/vue3";
import { W as Wrapper } from "./CbcLIE-O-3135473238126.js";
import { _ as _sfc_main$3 } from "./o7gowRKQ-2312437163135.js";
import { _ as _sfc_main$2 } from "./CznY329j-2334615712833.js";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import { f as formatTitle } from "./DEmmWHtk-3413287365321.js";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import "vuetify";
import "./DKEAH6nn-4333751172235.js";
import "mitt";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./1tPrXgE0-1751246333532.js";
import "./AK26aD-S-7313723521453.js";
import "./C6q4kDV--4257163313235.js";
import "./DsvTyKEu-3355343127127.js";
import "./CeVcRmCk-1453137522733.js";
import "./Cyl_ukyB-3352317127354.js";
import "./BFeg_3wS-5313717233245.js";
const _sfc_main$1 = {
  __name: "NavButton",
  __ssrInlineRender: true,
  props: {
    href: String,
    active: Boolean,
    color: { type: String, default: "black" }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => {
      return `rounded-pill bg-${props.color} p-6 py-2 text-lg px-lg-5 py-lg-2 text-lg-lg`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: classes.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    content: Object,
    products: Object,
    meta_description: { type: String, default: "" },
    is_production: { type: Boolean, default: false }
  },
  setup(__props) {
    gsap.registerPlugin(ScrollToPlugin);
    const props = __props;
    const productModal = ref(null);
    const personSelected = ref("valerie");
    const getPersonColor = (name) => {
      return name === personSelected.value ? "bg-black" : "bg-white";
    };
    const teamSection = ref(null);
    const selectPerson = (name) => {
      personSelected.value = name;
      setTimeout(() => {
        gsap.to(window, {
          scrollTo: {
            y: teamSection.value.offsetTop - 100,
            autoKill: false
          },
          duration: 1,
          ease: "power2.out"
        });
      }, 500);
    };
    const originsOpen = ref(false);
    const toggleOrigins = () => {
      originsOpen.value = !originsOpen.value;
    };
    const teamOpen = ref(false);
    const toggleTeam = () => {
      teamOpen.value = !teamOpen.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_img = resolveComponent("v-img");
      const _component_v_carousel = resolveComponent("v-carousel");
      const _component_v_carousel_item = resolveComponent("v-carousel-item");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_progress_circular = resolveComponent("v-progress-circular");
      const _component_v_chip = resolveComponent("v-chip");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_icon = resolveComponent("v-icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Home</title>`);
            if (props.meta_description) {
              _push2(`<meta name="description"${ssrRenderAttr("content", props.meta_description)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta name="robots"${ssrRenderAttr("content", props.is_production ?? false ? "index, follow" : "noindex, nofollow")}${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Home"),
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
      _push(`<div class="relative z-0 2xl:h-[92vh] overflow-hidden" style="${ssrRenderStyle({ "background": "#ece8e5" })}"><div class="relative z-10 h-full"><div class="block lg:hidden h-full relative z-30">`);
      _push(ssrRenderComponent(_component_v_img, {
        "aspect-ratio": "0.5",
        color: "grey",
        class: "align-top text-center relative pt-[126px] pb-[126px]",
        src: `/images/content/${props.content.hero_background_image_mobile}`,
        cover: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="m-0 lg:me-20 my-20 relative flex flex-col justify-center mt-[240px] px-20" style="${ssrRenderStyle({ "height": "40%" })}"${_scopeId}><h1 class="text-4xl 2xl:text-6xl mb-5 uppercase text-black"${_scopeId}>${props.content.hero_title ?? ""}</h1><p class="text-lg md:text-2xl text-black"${_scopeId}>${props.content.hero_introduction ?? ""}</p><div class="mt-8"${_scopeId}><div class="flex flex-row flex-wrap justify-center items-center gap-2 w-full"${_scopeId}><!--[-->`);
            ssrRenderList(2, (i) => {
              _push2(`<div class="mb-5"${_scopeId}>`);
              if (props.content[`hero_button_${i}_active`] == 1) {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  color: "black",
                  href: props.content[`hero_button_${i}_url`]
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(props.content[`hero_button_${i}_text`])}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(props.content[`hero_button_${i}_text`]), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  color: "grey",
                  disabled: "",
                  href: "#"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(props.content[`hero_button_${i}_text`])}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(props.content[`hero_button_${i}_text`]), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "m-0 lg:me-20 my-20 relative flex flex-col justify-center mt-[240px] px-20",
                style: { "height": "40%" }
              }, [
                createVNode("h1", {
                  class: "text-4xl 2xl:text-6xl mb-5 uppercase text-black",
                  innerHTML: props.content.hero_title
                }, null, 8, ["innerHTML"]),
                createVNode("p", {
                  class: "text-lg md:text-2xl text-black",
                  innerHTML: props.content.hero_introduction
                }, null, 8, ["innerHTML"]),
                createVNode("div", { class: "mt-8" }, [
                  createVNode("div", { class: "flex flex-row flex-wrap justify-center items-center gap-2 w-full" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(2, (i) => {
                      return createVNode("div", { class: "mb-5" }, [
                        props.content[`hero_button_${i}_active`] == 1 ? (openBlock(), createBlock(_sfc_main$1, {
                          key: 0,
                          color: "black",
                          href: props.content[`hero_button_${i}_url`]
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(props.content[`hero_button_${i}_text`]), 1)
                          ]),
                          _: 2
                        }, 1032, ["href"])) : (openBlock(), createBlock(_sfc_main$1, {
                          key: 1,
                          color: "grey",
                          disabled: "",
                          href: "#"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(props.content[`hero_button_${i}_text`]), 1)
                          ]),
                          _: 2
                        }, 1024))
                      ]);
                    }), 64))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden lg:flex h-full relative z-30">`);
      _push(ssrRenderComponent(_component_v_img, {
        "aspect-ratio": "2",
        color: "grey",
        class: "align-center text-center py-20",
        src: `/images/content/${props.content.hero_background_image_desktop}`,
        cover: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 lg:grid-cols-7 gap-3"${_scopeId}><div class="col-span-3 hidden lg:flex"${_scopeId}></div><div class="flex h-full items-center col-span-4"${_scopeId}><div class="max-w-3xl mx-auto m-0 lg:me-20 my-20"${_scopeId}><h1 class="text-4xl 2xl:text-6xl mb-5 uppercase text-black text-start"${_scopeId}>${props.content.hero_title ?? ""}</h1><p class="text-lg md:text-2xl text-black text-start"${_scopeId}>${props.content.hero_introduction ?? ""}</p><div class="mt-8"${_scopeId}><div class="flex flex-row flex-wrap items-center gap-2 w-full"${_scopeId}><!--[-->`);
            ssrRenderList(2, (i) => {
              _push2(`<div class="mb-5"${_scopeId}>`);
              if (props.content[`hero_button_${i}_active`] == 1) {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  color: "black",
                  href: props.content[`hero_button_${i}_url`]
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(props.content[`hero_button_${i}_text`])}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(props.content[`hero_button_${i}_text`]), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  color: "grey",
                  disabled: "",
                  href: "#"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(props.content[`hero_button_${i}_text`])}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(props.content[`hero_button_${i}_text`]), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-7 gap-3" }, [
                createVNode("div", { class: "col-span-3 hidden lg:flex" }),
                createVNode("div", { class: "flex h-full items-center col-span-4" }, [
                  createVNode("div", { class: "max-w-3xl mx-auto m-0 lg:me-20 my-20" }, [
                    createVNode("h1", {
                      class: "text-4xl 2xl:text-6xl mb-5 uppercase text-black text-start",
                      innerHTML: props.content.hero_title
                    }, null, 8, ["innerHTML"]),
                    createVNode("p", {
                      class: "text-lg md:text-2xl text-black text-start",
                      innerHTML: props.content.hero_introduction
                    }, null, 8, ["innerHTML"]),
                    createVNode("div", { class: "mt-8" }, [
                      createVNode("div", { class: "flex flex-row flex-wrap items-center gap-2 w-full" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(2, (i) => {
                          return createVNode("div", { class: "mb-5" }, [
                            props.content[`hero_button_${i}_active`] == 1 ? (openBlock(), createBlock(_sfc_main$1, {
                              key: 0,
                              color: "black",
                              href: props.content[`hero_button_${i}_url`]
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(props.content[`hero_button_${i}_text`]), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])) : (openBlock(), createBlock(_sfc_main$1, {
                              key: 1,
                              color: "grey",
                              disabled: "",
                              href: "#"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(props.content[`hero_button_${i}_text`]), 1)
                              ]),
                              _: 2
                            }, 1024))
                          ]);
                        }), 64))
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if (props.products.length > 0) {
        _push(ssrRenderComponent(_sfc_main$2, { style: { "margin-top": "120px" } }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex justify-center mx-10"${_scopeId}><div class="text-center"${_scopeId}><h2 class="text-5xl mb-2 uppercase"${_scopeId}>${unref(formatTitle)(props.content.sneak_peek_title) ?? ""}</h2></div></div><div class="block xl:hidden px-2 py-20 xl:p-20"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_carousel, {
                height: "auto",
                "show-arrows": false,
                "hide-delimiters": "",
                cycle: false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (props.products.length > 0) {
                      _push3(ssrRenderComponent(_component_v_carousel_item, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div${_scopeId3}><div class="grid grid-cols-2 gap-0"${_scopeId3}><!--[-->`);
                            ssrRenderList(props.products.slice(0, 2), (product, index) => {
                              _push4(`<div class="p-2"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_v_card, {
                                onClick: ($event) => productModal.value.openProduct(product),
                                rounded: "0",
                                class: "card"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`<div class="overflow-hidden rounded-xl"${_scopeId4}>`);
                                    _push5(ssrRenderComponent(_component_v_img, {
                                      "aspect-ratio": "0.6667",
                                      class: "zoom-image shadow-sm",
                                      src: product.image_url,
                                      alt: ""
                                    }, {
                                      placeholder: withCtx((_5, _push6, _parent6, _scopeId5) => {
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
                                    _push5(`</div><div class="p-2 xl:p-5"${_scopeId4}><div${_scopeId4}><div class="grid grid-cols-1 lg:grid-cols-6 gap-3"${_scopeId4}><div class="col-span-6 xl:col-span-4"${_scopeId4}><p class="text-base xl:text-2xl uppercase brand bold"${_scopeId4}>${ssrInterpolate(product.name)}</p><p class="hidden xl:block mt-2"${_scopeId4}>${ssrInterpolate(product.description)}</p></div><div class="flex xl:justify-end col-span-6 xl:col-span-2"${_scopeId4}><p class="text-base xl:text-xl font-serif"${_scopeId4}>${ssrInterpolate(product.price_string)}</p></div></div>`);
                                    if (product.weekend_only) {
                                      _push5(`<div${_scopeId4}>`);
                                      _push5(ssrRenderComponent(_component_v_chip, {
                                        color: "black",
                                        variant: "outlined",
                                        size: "x-small"
                                      }, {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(`Week-end only`);
                                          } else {
                                            return [
                                              createTextVNode("Week-end only")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                      _push5(`</div>`);
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    _push5(`</div></div>`);
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
                              }, _parent4, _scopeId3));
                              _push4(`</div>`);
                            });
                            _push4(`<!--]--></div></div>`);
                          } else {
                            return [
                              createVNode("div", null, [
                                createVNode("div", { class: "grid grid-cols-2 gap-0" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(props.products.slice(0, 2), (product, index) => {
                                    return openBlock(), createBlock("div", { class: "p-2" }, [
                                      createVNode(_component_v_card, {
                                        onClick: withModifiers(($event) => productModal.value.openProduct(product), ["prevent"]),
                                        rounded: "0",
                                        class: "card"
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
                                    ]);
                                  }), 256))
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (props.products.length > 2) {
                      _push3(ssrRenderComponent(_component_v_carousel_item, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div${_scopeId3}><div class="grid grid-cols-2 gap-0"${_scopeId3}><!--[-->`);
                            ssrRenderList(props.products.slice(2, 4), (product, index) => {
                              _push4(`<div class="p-2"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_v_card, {
                                onClick: ($event) => productModal.value.openProduct(product),
                                rounded: "0",
                                class: "card"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`<div class="overflow-hidden rounded-xl"${_scopeId4}>`);
                                    _push5(ssrRenderComponent(_component_v_img, {
                                      "aspect-ratio": "0.6667",
                                      class: "zoom-image shadow-sm",
                                      src: product.image_url,
                                      alt: ""
                                    }, {
                                      placeholder: withCtx((_5, _push6, _parent6, _scopeId5) => {
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
                                    _push5(`</div><div class="p-2 xl:p-5"${_scopeId4}><div${_scopeId4}><div class="grid grid-cols-1 lg:grid-cols-6 gap-3"${_scopeId4}><div class="col-span-6 xl:col-span-4"${_scopeId4}><p class="text-base xl:text-2xl uppercase brand bold"${_scopeId4}>${ssrInterpolate(product.name)}</p><p class="hidden xl:block mt-2"${_scopeId4}>${ssrInterpolate(product.description)}</p></div><div class="flex xl:justify-end col-span-6 xl:col-span-2"${_scopeId4}><p class="text-base xl:text-xl font-serif"${_scopeId4}>${ssrInterpolate(product.price_string)}</p></div></div>`);
                                    if (product.weekend_only) {
                                      _push5(`<div${_scopeId4}>`);
                                      _push5(ssrRenderComponent(_component_v_chip, {
                                        color: "black",
                                        variant: "outlined",
                                        size: "x-small"
                                      }, {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(`Week-end only`);
                                          } else {
                                            return [
                                              createTextVNode("Week-end only")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                      _push5(`</div>`);
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    _push5(`</div></div>`);
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
                              }, _parent4, _scopeId3));
                              _push4(`</div>`);
                            });
                            _push4(`<!--]--></div></div>`);
                          } else {
                            return [
                              createVNode("div", null, [
                                createVNode("div", { class: "grid grid-cols-2 gap-0" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(props.products.slice(2, 4), (product, index) => {
                                    return openBlock(), createBlock("div", { class: "p-2" }, [
                                      createVNode(_component_v_card, {
                                        onClick: withModifiers(($event) => productModal.value.openProduct(product), ["prevent"]),
                                        rounded: "0",
                                        class: "card"
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
                                    ]);
                                  }), 256))
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      props.products.length > 0 ? (openBlock(), createBlock(_component_v_carousel_item, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("div", { class: "grid grid-cols-2 gap-0" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(props.products.slice(0, 2), (product, index) => {
                                return openBlock(), createBlock("div", { class: "p-2" }, [
                                  createVNode(_component_v_card, {
                                    onClick: withModifiers(($event) => productModal.value.openProduct(product), ["prevent"]),
                                    rounded: "0",
                                    class: "card"
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
                                ]);
                              }), 256))
                            ])
                          ])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      props.products.length > 2 ? (openBlock(), createBlock(_component_v_carousel_item, { key: 1 }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("div", { class: "grid grid-cols-2 gap-0" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(props.products.slice(2, 4), (product, index) => {
                                return openBlock(), createBlock("div", { class: "p-2" }, [
                                  createVNode(_component_v_card, {
                                    onClick: withModifiers(($event) => productModal.value.openProduct(product), ["prevent"]),
                                    rounded: "0",
                                    class: "card"
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
                                ]);
                              }), 256))
                            ])
                          ])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="hidden xl:block px-2 py-20 xl:p-20"${_scopeId}><div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-0"${_scopeId}><!--[-->`);
              ssrRenderList(props.products, (product) => {
                _push2(`<div class="p-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_v_card, {
                  onClick: ($event) => productModal.value.openProduct(product),
                  rounded: "0",
                  class: "card"
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
              {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", { class: "flex justify-center mx-10" }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("h2", {
                      class: "text-5xl mb-2 uppercase",
                      innerHTML: unref(formatTitle)(props.content.sneak_peek_title)
                    }, null, 8, ["innerHTML"])
                  ])
                ]),
                createVNode("div", { class: "block xl:hidden px-2 py-20 xl:p-20" }, [
                  createVNode(_component_v_carousel, {
                    height: "auto",
                    "show-arrows": false,
                    "hide-delimiters": "",
                    cycle: false
                  }, {
                    default: withCtx(() => [
                      props.products.length > 0 ? (openBlock(), createBlock(_component_v_carousel_item, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("div", { class: "grid grid-cols-2 gap-0" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(props.products.slice(0, 2), (product, index) => {
                                return openBlock(), createBlock("div", { class: "p-2" }, [
                                  createVNode(_component_v_card, {
                                    onClick: withModifiers(($event) => productModal.value.openProduct(product), ["prevent"]),
                                    rounded: "0",
                                    class: "card"
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
                                ]);
                              }), 256))
                            ])
                          ])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      props.products.length > 2 ? (openBlock(), createBlock(_component_v_carousel_item, { key: 1 }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("div", { class: "grid grid-cols-2 gap-0" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(props.products.slice(2, 4), (product, index) => {
                                return openBlock(), createBlock("div", { class: "p-2" }, [
                                  createVNode(_component_v_card, {
                                    onClick: withModifiers(($event) => productModal.value.openProduct(product), ["prevent"]),
                                    rounded: "0",
                                    class: "card"
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
                                ]);
                              }), 256))
                            ])
                          ])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "hidden xl:block px-2 py-20 xl:p-20" }, [
                  createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-0" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.products, (product) => {
                      return openBlock(), createBlock("div", { class: "p-2" }, [
                        createVNode(_component_v_card, {
                          onClick: withModifiers(($event) => productModal.value.openProduct(product), ["prevent"]),
                          rounded: "0",
                          class: "card"
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
                      ]);
                    }), 256))
                  ])
                ]),
                createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="mt-20"${_scopeId2}><div${_scopeId2}><div class="max-w-7xl mx-auto m-5 p-0 py-6 lg:px-10"${_scopeId2}><div class="grid grid-cols-1 lg:grid-cols-2 rounded-5xl overflow-hidden"${_scopeId2}><div class="brand-bg-grey"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_img, {
                    src: `/images/content/${props.content.origins_image}`,
                    class: "w-full h-full rounded-5xl",
                    alt: props.content.origins_title,
                    cover: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center brand-bg-grey p-5 lg:px-10 lg:py-10"${_scopeId2}><div${_scopeId2}><h2 class="text-3xl mb-7 brand uppercase"${_scopeId2}><i${_scopeId2}>${ssrInterpolate(props.content.origins_title)}</i></h2><div${_scopeId2}><p${_scopeId2}><span${_scopeId2}>${props.content.origins_content_1 ?? ""}</span> <span class="${ssrRenderClass(`${originsOpen.value ? "inline" : "hidden lg:inline"}`)}"${_scopeId2}>${props.content.origins_content_2 ?? ""}</span></p><div class="mt-5 block lg:hidden"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_btn, {
                    class: "text-none",
                    variant: "outlined",
                    size: "small",
                    onClick: toggleOrigins
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(originsOpen.value ? "Close" : "Read")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(originsOpen.value ? "Close" : "Read"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div></div></div></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "mt-20" }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "max-w-7xl mx-auto m-5 p-0 py-6 lg:px-10" }, [
                          createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 rounded-5xl overflow-hidden" }, [
                            createVNode("div", { class: "brand-bg-grey" }, [
                              createVNode(_component_v_img, {
                                src: `/images/content/${props.content.origins_image}`,
                                class: "w-full h-full rounded-5xl",
                                alt: props.content.origins_title,
                                cover: ""
                              }, null, 8, ["src", "alt"])
                            ]),
                            createVNode("div", { class: "flex items-center brand-bg-grey p-5 lg:px-10 lg:py-10" }, [
                              createVNode("div", null, [
                                createVNode("h2", { class: "text-3xl mb-7 brand uppercase" }, [
                                  createVNode("i", null, toDisplayString(props.content.origins_title), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", null, [
                                    createVNode("span", {
                                      innerHTML: props.content.origins_content_1
                                    }, null, 8, ["innerHTML"]),
                                    createTextVNode(),
                                    createVNode("span", {
                                      class: `${originsOpen.value ? "inline" : "hidden lg:inline"}`,
                                      innerHTML: props.content.origins_content_2
                                    }, null, 10, ["innerHTML"])
                                  ]),
                                  createVNode("div", { class: "mt-5 block lg:hidden" }, [
                                    createVNode(_component_v_btn, {
                                      class: "text-none",
                                      variant: "outlined",
                                      size: "small",
                                      onClick: withModifiers(toggleOrigins, ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(originsOpen.value ? "Close" : "Read"), 1)
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ])
                            ])
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
              createVNode(Wrapper, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "mt-20" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "max-w-7xl mx-auto m-5 p-0 py-6 lg:px-10" }, [
                        createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 rounded-5xl overflow-hidden" }, [
                          createVNode("div", { class: "brand-bg-grey" }, [
                            createVNode(_component_v_img, {
                              src: `/images/content/${props.content.origins_image}`,
                              class: "w-full h-full rounded-5xl",
                              alt: props.content.origins_title,
                              cover: ""
                            }, null, 8, ["src", "alt"])
                          ]),
                          createVNode("div", { class: "flex items-center brand-bg-grey p-5 lg:px-10 lg:py-10" }, [
                            createVNode("div", null, [
                              createVNode("h2", { class: "text-3xl mb-7 brand uppercase" }, [
                                createVNode("i", null, toDisplayString(props.content.origins_title), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("p", null, [
                                  createVNode("span", {
                                    innerHTML: props.content.origins_content_1
                                  }, null, 8, ["innerHTML"]),
                                  createTextVNode(),
                                  createVNode("span", {
                                    class: `${originsOpen.value ? "inline" : "hidden lg:inline"}`,
                                    innerHTML: props.content.origins_content_2
                                  }, null, 10, ["innerHTML"])
                                ]),
                                createVNode("div", { class: "mt-5 block lg:hidden" }, [
                                  createVNode(_component_v_btn, {
                                    class: "text-none",
                                    variant: "outlined",
                                    size: "small",
                                    onClick: withModifiers(toggleOrigins, ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(originsOpen.value ? "Close" : "Read"), 1)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ])
                          ])
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
      _push(ssrRenderComponent(_sfc_main$2, { wrapper: "section" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, { wrapper: "section" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-5 mb-10" id="team-section"${_scopeId2}><div class="grid grid-cols-1 lg:grid-cols-5 gap-3"${_scopeId2}><div class="lg:col-span-2"${_scopeId2}>`);
                  if (personSelected.value === "valerie") {
                    _push3(`<p class="text-2xl"${_scopeId2}><strong class="text-3xl"${_scopeId2}>${ssrInterpolate(props.content.team_1_name)}</strong>,<br${_scopeId2}><span class="brand"${_scopeId2}>${ssrInterpolate(props.content.team_1_title)}</span></p>`);
                  } else if (personSelected.value === "romain") {
                    _push3(`<p class="text-2xl"${_scopeId2}><strong class="text-3xl"${_scopeId2}>${ssrInterpolate(props.content.team_2_name)}</strong>,<br${_scopeId2}><span class="brand"${_scopeId2}>${ssrInterpolate(props.content.team_2_title)}</span></p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  if (personSelected.value === "valerie") {
                    _push3(`<div class="lg:col-span-3"${_scopeId2}><p class="text-xl"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_icon, {
                      size: "large",
                      style: { "margin-top": "-20px" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-format-quote-open`);
                        } else {
                          return [
                            createTextVNode("mdi-format-quote-open")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`${ssrInterpolate(props.content.team_1_quote)}`);
                    _push3(ssrRenderComponent(_component_v_icon, {
                      size: "large",
                      style: { "margin-bottom": "-20px" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-format-quote-close`);
                        } else {
                          return [
                            createTextVNode("mdi-format-quote-close")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</p><p class="text-end mt-5 me-2"${_scopeId2}><i${_scopeId2}><strong${_scopeId2}>${ssrInterpolate(props.content.team_1_quote_source)}</strong> - ${ssrInterpolate(props.content.team_1_quote_date)}</i></p></div>`);
                  } else if (personSelected.value === "romain") {
                    _push3(`<div class="lg:col-span-3"${_scopeId2}><p class="text-xl"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_icon, {
                      size: "large",
                      style: { "margin-top": "-20px" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-format-quote-open`);
                        } else {
                          return [
                            createTextVNode("mdi-format-quote-open")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`${ssrInterpolate(props.content.team_2_quote)}`);
                    _push3(ssrRenderComponent(_component_v_icon, {
                      size: "large",
                      style: { "margin-bottom": "-20px" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-format-quote-close`);
                        } else {
                          return [
                            createTextVNode("mdi-format-quote-close")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</p><p class="text-end mt-5 me-2"${_scopeId2}><i${_scopeId2}><strong${_scopeId2}>${ssrInterpolate(props.content.team_2_quote_source)}</strong> - ${ssrInterpolate(props.content.team_2_quote_date)}</i></p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="rounded-5xl overflow-hidden"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_img, {
                    "aspect-ratio": "1.6667",
                    src: personSelected.value === "romain" ? `/images/content/${props.content.team_2_photo}` : `/images/content/${props.content.team_1_photo}`,
                    style: { "background": "transparent", "filter": "grayscale(100%)" }
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
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="p-10 text-lg brand-bg-grey"${_scopeId2}>`);
                  if (personSelected.value === "valerie") {
                    _push3(`<div${_scopeId2}><p class="mb-6"${_scopeId2}>${props.content.team_1_content_1 ?? ""}</p><p class="${ssrRenderClass(`my-6 ${teamOpen.value ? "block" : "hidden lg:block"}`)}"${_scopeId2}>${props.content.team_1_content_2 ?? ""}</p><div class="mt-2 block lg:hidden"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_btn, {
                      class: "text-none",
                      variant: "outlined",
                      size: "small",
                      onClick: toggleTeam
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(teamOpen.value ? "Close" : "Read")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(teamOpen.value ? "Close" : "Read"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else if (personSelected.value === "romain") {
                    _push3(`<div${_scopeId2}><p class="mb-6"${_scopeId2}>${props.content.team_2_content_1 ?? ""}</p><p class="${ssrRenderClass(`my-6 ${teamOpen.value ? "block" : "hidden lg:block"}`)}"${_scopeId2}>${props.content.team_2_content_2 ?? ""}</p><div class="mt-2 block lg:hidden"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_btn, {
                      class: "text-none",
                      variant: "outlined",
                      size: "small",
                      onClick: toggleTeam
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(teamOpen.value ? "Close" : "Read")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(teamOpen.value ? "Close" : "Read"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="flex flex-row mt-10"${_scopeId2}><div class="flex flex-row bg-white rounded-pill mx-auto gap-3 px-3 py-2"${_scopeId2}><div class="${ssrRenderClass([getPersonColor("valerie"), "cursor-pointer rounded-pill p-7 py-3 text-xl px-lg-7 py-lg-2 text-lg-lg"])}"${_scopeId2}>Valérie</div><div class="${ssrRenderClass([getPersonColor("romain"), "cursor-pointer rounded-pill p-7 py-3 text-xl px-lg-7 py-lg-2 text-lg-lg"])}"${_scopeId2}>Romain</div></div></div></div></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "px-5 mb-10",
                      id: "team-section",
                      ref_key: "teamSection",
                      ref: teamSection
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-3" }, [
                        createVNode("div", { class: "lg:col-span-2" }, [
                          personSelected.value === "valerie" ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-2xl"
                          }, [
                            createVNode("strong", { class: "text-3xl" }, toDisplayString(props.content.team_1_name), 1),
                            createTextVNode(","),
                            createVNode("br"),
                            createVNode("span", { class: "brand" }, toDisplayString(props.content.team_1_title), 1)
                          ])) : personSelected.value === "romain" ? (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-2xl"
                          }, [
                            createVNode("strong", { class: "text-3xl" }, toDisplayString(props.content.team_2_name), 1),
                            createTextVNode(","),
                            createVNode("br"),
                            createVNode("span", { class: "brand" }, toDisplayString(props.content.team_2_title), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        personSelected.value === "valerie" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "lg:col-span-3"
                        }, [
                          createVNode("p", { class: "text-xl" }, [
                            createVNode(_component_v_icon, {
                              size: "large",
                              style: { "margin-top": "-20px" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-format-quote-open")
                              ]),
                              _: 1
                            }),
                            createTextVNode(toDisplayString(props.content.team_1_quote), 1),
                            createVNode(_component_v_icon, {
                              size: "large",
                              style: { "margin-bottom": "-20px" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-format-quote-close")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("p", { class: "text-end mt-5 me-2" }, [
                            createVNode("i", null, [
                              createVNode("strong", null, toDisplayString(props.content.team_1_quote_source), 1),
                              createTextVNode(" - " + toDisplayString(props.content.team_1_quote_date), 1)
                            ])
                          ])
                        ])) : personSelected.value === "romain" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "lg:col-span-3"
                        }, [
                          createVNode("p", { class: "text-xl" }, [
                            createVNode(_component_v_icon, {
                              size: "large",
                              style: { "margin-top": "-20px" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-format-quote-open")
                              ]),
                              _: 1
                            }),
                            createTextVNode(toDisplayString(props.content.team_2_quote), 1),
                            createVNode(_component_v_icon, {
                              size: "large",
                              style: { "margin-bottom": "-20px" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-format-quote-close")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("p", { class: "text-end mt-5 me-2" }, [
                            createVNode("i", null, [
                              createVNode("strong", null, toDisplayString(props.content.team_2_quote_source), 1),
                              createTextVNode(" - " + toDisplayString(props.content.team_2_quote_date), 1)
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ], 512),
                    createVNode("div", { class: "rounded-5xl overflow-hidden" }, [
                      createVNode(_component_v_img, {
                        "aspect-ratio": "1.6667",
                        src: personSelected.value === "romain" ? `/images/content/${props.content.team_2_photo}` : `/images/content/${props.content.team_1_photo}`,
                        style: { "background": "transparent", "filter": "grayscale(100%)" }
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
                      }, 8, ["src"]),
                      createVNode("div", { class: "p-10 text-lg brand-bg-grey" }, [
                        personSelected.value === "valerie" ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("p", {
                            class: "mb-6",
                            innerHTML: props.content.team_1_content_1
                          }, null, 8, ["innerHTML"]),
                          createVNode("p", {
                            class: `my-6 ${teamOpen.value ? "block" : "hidden lg:block"}`,
                            innerHTML: props.content.team_1_content_2
                          }, null, 10, ["innerHTML"]),
                          createVNode("div", { class: "mt-2 block lg:hidden" }, [
                            createVNode(_component_v_btn, {
                              class: "text-none",
                              variant: "outlined",
                              size: "small",
                              onClick: withModifiers(toggleTeam, ["prevent"])
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(teamOpen.value ? "Close" : "Read"), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ])) : personSelected.value === "romain" ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("p", {
                            class: "mb-6",
                            innerHTML: props.content.team_2_content_1
                          }, null, 8, ["innerHTML"]),
                          createVNode("p", {
                            class: `my-6 ${teamOpen.value ? "block" : "hidden lg:block"}`,
                            innerHTML: props.content.team_2_content_2
                          }, null, 10, ["innerHTML"]),
                          createVNode("div", { class: "mt-2 block lg:hidden" }, [
                            createVNode(_component_v_btn, {
                              class: "text-none",
                              variant: "outlined",
                              size: "small",
                              onClick: withModifiers(toggleTeam, ["prevent"])
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(teamOpen.value ? "Close" : "Read"), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex flex-row mt-10" }, [
                          createVNode("div", { class: "flex flex-row bg-white rounded-pill mx-auto gap-3 px-3 py-2" }, [
                            createVNode("div", {
                              onClick: withModifiers(($event) => selectPerson("valerie"), ["prevent"]),
                              class: ["cursor-pointer rounded-pill p-7 py-3 text-xl px-lg-7 py-lg-2 text-lg-lg", getPersonColor("valerie")]
                            }, "Valérie", 10, ["onClick"]),
                            createVNode("div", {
                              onClick: withModifiers(($event) => selectPerson("romain"), ["prevent"]),
                              class: ["cursor-pointer rounded-pill p-7 py-3 text-xl px-lg-7 py-lg-2 text-lg-lg", getPersonColor("romain")]
                            }, "Romain", 10, ["onClick"])
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
              createVNode(Wrapper, { wrapper: "section" }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: "px-5 mb-10",
                    id: "team-section",
                    ref_key: "teamSection",
                    ref: teamSection
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-3" }, [
                      createVNode("div", { class: "lg:col-span-2" }, [
                        personSelected.value === "valerie" ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-2xl"
                        }, [
                          createVNode("strong", { class: "text-3xl" }, toDisplayString(props.content.team_1_name), 1),
                          createTextVNode(","),
                          createVNode("br"),
                          createVNode("span", { class: "brand" }, toDisplayString(props.content.team_1_title), 1)
                        ])) : personSelected.value === "romain" ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-2xl"
                        }, [
                          createVNode("strong", { class: "text-3xl" }, toDisplayString(props.content.team_2_name), 1),
                          createTextVNode(","),
                          createVNode("br"),
                          createVNode("span", { class: "brand" }, toDisplayString(props.content.team_2_title), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      personSelected.value === "valerie" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "lg:col-span-3"
                      }, [
                        createVNode("p", { class: "text-xl" }, [
                          createVNode(_component_v_icon, {
                            size: "large",
                            style: { "margin-top": "-20px" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-format-quote-open")
                            ]),
                            _: 1
                          }),
                          createTextVNode(toDisplayString(props.content.team_1_quote), 1),
                          createVNode(_component_v_icon, {
                            size: "large",
                            style: { "margin-bottom": "-20px" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-format-quote-close")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("p", { class: "text-end mt-5 me-2" }, [
                          createVNode("i", null, [
                            createVNode("strong", null, toDisplayString(props.content.team_1_quote_source), 1),
                            createTextVNode(" - " + toDisplayString(props.content.team_1_quote_date), 1)
                          ])
                        ])
                      ])) : personSelected.value === "romain" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "lg:col-span-3"
                      }, [
                        createVNode("p", { class: "text-xl" }, [
                          createVNode(_component_v_icon, {
                            size: "large",
                            style: { "margin-top": "-20px" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-format-quote-open")
                            ]),
                            _: 1
                          }),
                          createTextVNode(toDisplayString(props.content.team_2_quote), 1),
                          createVNode(_component_v_icon, {
                            size: "large",
                            style: { "margin-bottom": "-20px" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-format-quote-close")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("p", { class: "text-end mt-5 me-2" }, [
                          createVNode("i", null, [
                            createVNode("strong", null, toDisplayString(props.content.team_2_quote_source), 1),
                            createTextVNode(" - " + toDisplayString(props.content.team_2_quote_date), 1)
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ], 512),
                  createVNode("div", { class: "rounded-5xl overflow-hidden" }, [
                    createVNode(_component_v_img, {
                      "aspect-ratio": "1.6667",
                      src: personSelected.value === "romain" ? `/images/content/${props.content.team_2_photo}` : `/images/content/${props.content.team_1_photo}`,
                      style: { "background": "transparent", "filter": "grayscale(100%)" }
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
                    }, 8, ["src"]),
                    createVNode("div", { class: "p-10 text-lg brand-bg-grey" }, [
                      personSelected.value === "valerie" ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("p", {
                          class: "mb-6",
                          innerHTML: props.content.team_1_content_1
                        }, null, 8, ["innerHTML"]),
                        createVNode("p", {
                          class: `my-6 ${teamOpen.value ? "block" : "hidden lg:block"}`,
                          innerHTML: props.content.team_1_content_2
                        }, null, 10, ["innerHTML"]),
                        createVNode("div", { class: "mt-2 block lg:hidden" }, [
                          createVNode(_component_v_btn, {
                            class: "text-none",
                            variant: "outlined",
                            size: "small",
                            onClick: withModifiers(toggleTeam, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(teamOpen.value ? "Close" : "Read"), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])) : personSelected.value === "romain" ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("p", {
                          class: "mb-6",
                          innerHTML: props.content.team_2_content_1
                        }, null, 8, ["innerHTML"]),
                        createVNode("p", {
                          class: `my-6 ${teamOpen.value ? "block" : "hidden lg:block"}`,
                          innerHTML: props.content.team_2_content_2
                        }, null, 10, ["innerHTML"]),
                        createVNode("div", { class: "mt-2 block lg:hidden" }, [
                          createVNode(_component_v_btn, {
                            class: "text-none",
                            variant: "outlined",
                            size: "small",
                            onClick: withModifiers(toggleTeam, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(teamOpen.value ? "Close" : "Read"), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex flex-row mt-10" }, [
                        createVNode("div", { class: "flex flex-row bg-white rounded-pill mx-auto gap-3 px-3 py-2" }, [
                          createVNode("div", {
                            onClick: withModifiers(($event) => selectPerson("valerie"), ["prevent"]),
                            class: ["cursor-pointer rounded-pill p-7 py-3 text-xl px-lg-7 py-lg-2 text-lg-lg", getPersonColor("valerie")]
                          }, "Valérie", 10, ["onClick"]),
                          createVNode("div", {
                            onClick: withModifiers(($event) => selectPerson("romain"), ["prevent"]),
                            class: ["cursor-pointer rounded-pill p-7 py-3 text-xl px-lg-7 py-lg-2 text-lg-lg", getPersonColor("romain")]
                          }, "Romain", 10, ["onClick"])
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
      _push(ssrRenderComponent(_sfc_main$2, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><div${_scopeId2}><div class="max-w-7xl mx-auto py-0 px-4 sm:px-6 lg:px-8 text-center"${_scopeId2}><h2 class="text-5xl uppercase brand"${_scopeId2}>${unref(formatTitle)(props.content.tour_title) ?? ""}</h2><div class="grid grid-cols-1 lg:grid-cols-2 gap-10 text-start mt-15"${_scopeId2}><!--[-->`);
                  ssrRenderList(2, (i) => {
                    _push3(`<div class="flex flex-col rounded-5xl overflow-hidden"${_scopeId2}><div class="shrink-0"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_img, {
                      class: "w-full",
                      "aspect-ratio": "1.5",
                      src: `/images/content/${props.content[`tour_${i}_image`]}`,
                      cover: ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="px-8 py-10 brand-bg-grey grow flex flex-col justify-between"${_scopeId2}><div${_scopeId2}><h2 class="text-3xl mb-4 brand bold"${_scopeId2}><i${_scopeId2}>${ssrInterpolate(props.content[`tour_${i}_title`])}</i></h2><p class="text-grey-darken-2"${_scopeId2}>${props.content[`tour_${i}_introduction`] ?? ""}</p></div><div class="mt-10 navigation"${_scopeId2}>`);
                    if (props.content[`tour_${i}_button_active`] == 1) {
                      _push3(ssrRenderComponent(_sfc_main$1, {
                        href: props.content[`tour_${i}_button_link`]
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="me-10"${_scopeId3}>${ssrInterpolate(props.content[`tour_${i}_button_text`])}</span>`);
                            _push4(ssrRenderComponent(_component_v_icon, { size: "small" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`mdi-arrow-right`);
                                } else {
                                  return [
                                    createTextVNode("mdi-arrow-right")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode("span", { class: "me-10" }, toDisplayString(props.content[`tour_${i}_button_text`]), 1),
                              createVNode(_component_v_icon, { size: "small" }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-arrow-right")
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(_sfc_main$1, {
                        href: "#",
                        color: "grey"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="me-10"${_scopeId3}>${ssrInterpolate(props.content[`tour_${i}_button_text`])}</span>`);
                            _push4(ssrRenderComponent(_component_v_icon, { size: "small" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`mdi-arrow-right`);
                                } else {
                                  return [
                                    createTextVNode("mdi-arrow-right")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode("span", { class: "me-10" }, toDisplayString(props.content[`tour_${i}_button_text`]), 1),
                              createVNode(_component_v_icon, { size: "small" }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-arrow-right")
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    }
                    _push3(`</div></div></div>`);
                  });
                  _push3(`<!--]--></div></div></div></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("div", null, [
                        createVNode("div", { class: "max-w-7xl mx-auto py-0 px-4 sm:px-6 lg:px-8 text-center" }, [
                          createVNode("h2", {
                            class: "text-5xl uppercase brand",
                            innerHTML: unref(formatTitle)(props.content.tour_title)
                          }, null, 8, ["innerHTML"]),
                          createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-10 text-start mt-15" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(2, (i) => {
                              return createVNode("div", { class: "flex flex-col rounded-5xl overflow-hidden" }, [
                                createVNode("div", { class: "shrink-0" }, [
                                  createVNode(_component_v_img, {
                                    class: "w-full",
                                    "aspect-ratio": "1.5",
                                    src: `/images/content/${props.content[`tour_${i}_image`]}`,
                                    cover: ""
                                  }, null, 8, ["src"])
                                ]),
                                createVNode("div", { class: "px-8 py-10 brand-bg-grey grow flex flex-col justify-between" }, [
                                  createVNode("div", null, [
                                    createVNode("h2", { class: "text-3xl mb-4 brand bold" }, [
                                      createVNode("i", null, toDisplayString(props.content[`tour_${i}_title`]), 1)
                                    ]),
                                    createVNode("p", {
                                      class: "text-grey-darken-2",
                                      innerHTML: props.content[`tour_${i}_introduction`]
                                    }, null, 8, ["innerHTML"])
                                  ]),
                                  createVNode("div", { class: "mt-10 navigation" }, [
                                    props.content[`tour_${i}_button_active`] == 1 ? (openBlock(), createBlock(_sfc_main$1, {
                                      key: 0,
                                      href: props.content[`tour_${i}_button_link`]
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "me-10" }, toDisplayString(props.content[`tour_${i}_button_text`]), 1),
                                        createVNode(_component_v_icon, { size: "small" }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-arrow-right")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])) : (openBlock(), createBlock(_sfc_main$1, {
                                      key: 1,
                                      href: "#",
                                      color: "grey"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "me-10" }, toDisplayString(props.content[`tour_${i}_button_text`]), 1),
                                        createVNode(_component_v_icon, { size: "small" }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-arrow-right")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 2
                                    }, 1024))
                                  ])
                                ])
                              ]);
                            }), 64))
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
              createVNode(Wrapper, null, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("div", null, [
                      createVNode("div", { class: "max-w-7xl mx-auto py-0 px-4 sm:px-6 lg:px-8 text-center" }, [
                        createVNode("h2", {
                          class: "text-5xl uppercase brand",
                          innerHTML: unref(formatTitle)(props.content.tour_title)
                        }, null, 8, ["innerHTML"]),
                        createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-10 text-start mt-15" }, [
                          (openBlock(), createBlock(Fragment, null, renderList(2, (i) => {
                            return createVNode("div", { class: "flex flex-col rounded-5xl overflow-hidden" }, [
                              createVNode("div", { class: "shrink-0" }, [
                                createVNode(_component_v_img, {
                                  class: "w-full",
                                  "aspect-ratio": "1.5",
                                  src: `/images/content/${props.content[`tour_${i}_image`]}`,
                                  cover: ""
                                }, null, 8, ["src"])
                              ]),
                              createVNode("div", { class: "px-8 py-10 brand-bg-grey grow flex flex-col justify-between" }, [
                                createVNode("div", null, [
                                  createVNode("h2", { class: "text-3xl mb-4 brand bold" }, [
                                    createVNode("i", null, toDisplayString(props.content[`tour_${i}_title`]), 1)
                                  ]),
                                  createVNode("p", {
                                    class: "text-grey-darken-2",
                                    innerHTML: props.content[`tour_${i}_introduction`]
                                  }, null, 8, ["innerHTML"])
                                ]),
                                createVNode("div", { class: "mt-10 navigation" }, [
                                  props.content[`tour_${i}_button_active`] == 1 ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    href: props.content[`tour_${i}_button_link`]
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "me-10" }, toDisplayString(props.content[`tour_${i}_button_text`]), 1),
                                      createVNode(_component_v_icon, { size: "small" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-arrow-right")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])) : (openBlock(), createBlock(_sfc_main$1, {
                                    key: 1,
                                    href: "#",
                                    color: "grey"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "me-10" }, toDisplayString(props.content[`tour_${i}_button_text`]), 1),
                                      createVNode(_component_v_icon, { size: "small" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-arrow-right")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1024))
                                ])
                              ])
                            ]);
                          }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
