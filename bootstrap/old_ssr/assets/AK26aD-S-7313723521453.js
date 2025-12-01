import { ref, watchEffect, resolveComponent, withCtx, createVNode, renderSlot, useSSRContext, reactive, computed, mergeProps, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withModifiers } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import "./C6q4kDV--4257163313235.js";
import "./DsvTyKEu-3355343127127.js";
import "./CeVcRmCk-1453137522733.js";
import "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./Cyl_ukyB-3352317127354.js";
const _sfc_main$1 = {
  __name: "ScreenModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const close = () => {
      emit("close");
    };
    const showModal = ref(false);
    watchEffect(() => {
      showModal.value = props.show;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_dialog = resolveComponent("v-dialog");
      const _component_v_card = resolveComponent("v-card");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_v_dialog, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        closeable: props.closeable,
        onAfterLeave: close,
        class: `max-w-${props.maxWidth}`,
        scrollable: "",
        "data-lenis-prevent": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_card, { rounded: "lg" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><div class="text-sm text-gray-600"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "content", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("div", { class: "text-sm text-gray-600" }, [
                        renderSlot(_ctx.$slots, "content")
                      ])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_card, { rounded: "lg" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("div", { class: "text-sm text-gray-600" }, [
                      renderSlot(_ctx.$slots, "content")
                    ])
                  ])
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ScreenModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "LandingModal",
  __ssrInlineRender: true,
  props: {
    details: Object
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const localDetails = ref({});
    const showLandingModal = ref(false);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref("");
    const subscribed = ref("");
    reactive({});
    const openLanding = () => {
      localDetails.value = { ...props.details };
      subscribed.value = "";
      showLandingModal.value = true;
    };
    const closeLanding = () => {
      axios.post(route("dismiss_landing_modal"), {}).then((response) => {
        showLandingModal.value = false;
      }).catch((error) => {
        console.error("error");
      });
    };
    const getButtonColor = computed(() => {
      if (subscribed.value) {
        if (subscribed.value === "success") {
          return "success";
        } else {
          return "error";
        }
      } else {
        return "#f99c19";
      }
    });
    __expose({ openLanding });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_img = resolveComponent("v-img");
      const _component_v_card = resolveComponent("v-card");
      resolveComponent("v-text-field");
      const _component_v_btn = resolveComponent("v-btn");
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        show: showLandingModal.value,
        onClose: closeLanding,
        maxWidth: "6xl"
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (localDetails.value) {
              _push2(ssrRenderComponent(_component_v_img, {
                src: `/storage/assets/images/landing/${localDetails.value.image}`,
                "aspect-ratio": "2",
                color: "black",
                cover: "",
                gradient: `to bottom, rgba(0,0,0,${localDetails.value.opacity}), rgba(0,0,0,${localDetails.value.opacity})`,
                class: "text-white align-center text-center p-10"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$2, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (localDetails.value.title_top) {
                            _push4(`<p class="text-4xl"${_scopeId3}>${localDetails.value.title_top_formatted ?? ""}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (localDetails.value.content_top) {
                            _push4(`<p class="text-xl py-2"${_scopeId3}>${localDetails.value.content_top_formatted ?? ""}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (localDetails.value.title_bottom) {
                            _push4(`<p class="text-4xl"${_scopeId3}>${localDetails.value.title_bottom_formatted ?? ""}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (localDetails.value.content_bottom) {
                            _push4(`<p class="text-xl"${_scopeId3}>${localDetails.value.content_bottom_formatted ?? ""}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (localDetails.value.show_newsletter_form) {
                            _push4(`<div class="max-w-lg w-full my-3 mx-auto"${_scopeId3}><div${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_v_card, {
                              style: { "background": "rgba(0,0,0,0.7)" },
                              rounded: "lg"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="px-7 py-3"${_scopeId4}><p class="text-white text-lg my-2"${_scopeId4}>${ssrInterpolate(_ctx.$page.props.lmt)}</p>`);
                                  {
                                    _push5(`<div class="my-2"${_scopeId4}>`);
                                    _push5(ssrRenderComponent(_component_v_btn, {
                                      href: "https://www.toasttab.com/le-petit-four-bakery-380-washington-street/marketing-signup",
                                      color: getButtonColor.value,
                                      target: "_blank"
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`Subscribe`);
                                        } else {
                                          return [
                                            createTextVNode("Subscribe")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent5, _scopeId4));
                                    _push5(`</div>`);
                                  }
                                  _push5(`</div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "px-7 py-3" }, [
                                      createVNode("p", { class: "text-white text-lg my-2" }, toDisplayString(_ctx.$page.props.lmt), 1),
                                      (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "my-2"
                                      }, [
                                        createVNode(_component_v_btn, {
                                          href: "https://www.toasttab.com/le-petit-four-bakery-380-washington-street/marketing-signup",
                                          color: getButtonColor.value,
                                          target: "_blank"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Subscribe")
                                          ]),
                                          _: 1
                                        }, 8, ["color"])
                                      ]))
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(`</div></div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<div class="mt-5"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_btn, {
                            onClick: closeLanding,
                            color: "white",
                            size: "small",
                            "prepend-icon": "mdi-close"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Dismiss`);
                              } else {
                                return [
                                  createTextVNode("Dismiss")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            localDetails.value.title_top ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-4xl",
                              innerHTML: localDetails.value.title_top_formatted
                            }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                            localDetails.value.content_top ? (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-xl py-2",
                              innerHTML: localDetails.value.content_top_formatted
                            }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                            localDetails.value.title_bottom ? (openBlock(), createBlock("p", {
                              key: 2,
                              class: "text-4xl",
                              innerHTML: localDetails.value.title_bottom_formatted
                            }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                            localDetails.value.content_bottom ? (openBlock(), createBlock("p", {
                              key: 3,
                              class: "text-xl",
                              innerHTML: localDetails.value.content_bottom_formatted
                            }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                            localDetails.value.show_newsletter_form ? (openBlock(), createBlock("div", {
                              key: 4,
                              class: "max-w-lg w-full my-3 mx-auto"
                            }, [
                              createVNode("div", null, [
                                createVNode(_component_v_card, {
                                  style: { "background": "rgba(0,0,0,0.7)" },
                                  rounded: "lg"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "px-7 py-3" }, [
                                      createVNode("p", { class: "text-white text-lg my-2" }, toDisplayString(_ctx.$page.props.lmt), 1),
                                      (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "my-2"
                                      }, [
                                        createVNode(_component_v_btn, {
                                          href: "https://www.toasttab.com/le-petit-four-bakery-380-washington-street/marketing-signup",
                                          color: getButtonColor.value,
                                          target: "_blank"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Subscribe")
                                          ]),
                                          _: 1
                                        }, 8, ["color"])
                                      ]))
                                    ])
                                  ]),
                                  _: 1
                                })
                              ])
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "mt-5" }, [
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(closeLanding, ["prevent"]),
                                color: "white",
                                size: "small",
                                "prepend-icon": "mdi-close"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Dismiss")
                                ]),
                                _: 1
                              })
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$2, null, {
                        default: withCtx(() => [
                          localDetails.value.title_top ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-4xl",
                            innerHTML: localDetails.value.title_top_formatted
                          }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                          localDetails.value.content_top ? (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-xl py-2",
                            innerHTML: localDetails.value.content_top_formatted
                          }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                          localDetails.value.title_bottom ? (openBlock(), createBlock("p", {
                            key: 2,
                            class: "text-4xl",
                            innerHTML: localDetails.value.title_bottom_formatted
                          }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                          localDetails.value.content_bottom ? (openBlock(), createBlock("p", {
                            key: 3,
                            class: "text-xl",
                            innerHTML: localDetails.value.content_bottom_formatted
                          }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                          localDetails.value.show_newsletter_form ? (openBlock(), createBlock("div", {
                            key: 4,
                            class: "max-w-lg w-full my-3 mx-auto"
                          }, [
                            createVNode("div", null, [
                              createVNode(_component_v_card, {
                                style: { "background": "rgba(0,0,0,0.7)" },
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "px-7 py-3" }, [
                                    createVNode("p", { class: "text-white text-lg my-2" }, toDisplayString(_ctx.$page.props.lmt), 1),
                                    (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "my-2"
                                    }, [
                                      createVNode(_component_v_btn, {
                                        href: "https://www.toasttab.com/le-petit-four-bakery-380-washington-street/marketing-signup",
                                        color: getButtonColor.value,
                                        target: "_blank"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Subscribe")
                                        ]),
                                        _: 1
                                      }, 8, ["color"])
                                    ]))
                                  ])
                                ]),
                                _: 1
                              })
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "mt-5" }, [
                            createVNode(_component_v_btn, {
                              onClick: withModifiers(closeLanding, ["prevent"]),
                              color: "white",
                              size: "small",
                              "prepend-icon": "mdi-close"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Dismiss")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              localDetails.value ? (openBlock(), createBlock(_component_v_img, {
                key: 0,
                src: `/storage/assets/images/landing/${localDetails.value.image}`,
                "aspect-ratio": "2",
                color: "black",
                cover: "",
                gradient: `to bottom, rgba(0,0,0,${localDetails.value.opacity}), rgba(0,0,0,${localDetails.value.opacity})`,
                class: "text-white align-center text-center p-10"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2, null, {
                    default: withCtx(() => [
                      localDetails.value.title_top ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-4xl",
                        innerHTML: localDetails.value.title_top_formatted
                      }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                      localDetails.value.content_top ? (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xl py-2",
                        innerHTML: localDetails.value.content_top_formatted
                      }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                      localDetails.value.title_bottom ? (openBlock(), createBlock("p", {
                        key: 2,
                        class: "text-4xl",
                        innerHTML: localDetails.value.title_bottom_formatted
                      }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                      localDetails.value.content_bottom ? (openBlock(), createBlock("p", {
                        key: 3,
                        class: "text-xl",
                        innerHTML: localDetails.value.content_bottom_formatted
                      }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                      localDetails.value.show_newsletter_form ? (openBlock(), createBlock("div", {
                        key: 4,
                        class: "max-w-lg w-full my-3 mx-auto"
                      }, [
                        createVNode("div", null, [
                          createVNode(_component_v_card, {
                            style: { "background": "rgba(0,0,0,0.7)" },
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "px-7 py-3" }, [
                                createVNode("p", { class: "text-white text-lg my-2" }, toDisplayString(_ctx.$page.props.lmt), 1),
                                (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "my-2"
                                }, [
                                  createVNode(_component_v_btn, {
                                    href: "https://www.toasttab.com/le-petit-four-bakery-380-washington-street/marketing-signup",
                                    color: getButtonColor.value,
                                    target: "_blank"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Subscribe")
                                    ]),
                                    _: 1
                                  }, 8, ["color"])
                                ]))
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "mt-5" }, [
                        createVNode(_component_v_btn, {
                          onClick: withModifiers(closeLanding, ["prevent"]),
                          color: "white",
                          size: "small",
                          "prepend-icon": "mdi-close"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Dismiss")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["src", "gradient"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LandingModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
