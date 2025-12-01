import { ref, reactive, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext, openBlock, createBlock, Fragment, renderList, withModifiers } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { A as AdmLayout } from "./BZf0ki2W-7956103712867.js";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./D2KjorHx-1875739460561.js";
import { _ as _sfc_main$3 } from "./DsvTyKEu-3067955167518.js";
import { _ as _sfc_main$4 } from "./CeVcRmCk-1577655618930.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./1tPrXgE0-4581736670159.js";
import "./C6q4kDV--1536774619085.js";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
const _sfc_main$1 = {
  __name: "PostCodeModal",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  setup(__props, { expose: __expose }) {
    const showPostCodeModal = ref(false);
    const selectedPostCode = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const props = __props;
    const formPostCode = reactive({
      post_code: "",
      extra_fee: 0,
      active: 1
    });
    const openPostCode = (post_code = null) => {
      local_errors.value = {};
      if (post_code) {
        modalTitle.value = "Edit post code";
        selectedPostCode.value = post_code;
        formPostCode.post_code = post_code.post_code;
        formPostCode.extra_fee = post_code.extra_fee;
        formPostCode.active = post_code.active ? 1 : 0;
      } else {
        modalTitle.value = "Create post code";
        selectedPostCode.value = null;
        formPostCode.post_code = "";
        formPostCode.extra_fee = 0;
        formPostCode.active = 1;
      }
      saveButtonText.value = "Save post code";
      showPostCodeModal.value = true;
    };
    const closePostCode = () => {
      showPostCodeModal.value = false;
      selectedPostCode.value = null;
    };
    const local_errors = ref({});
    const savePostCode = () => {
      let url;
      if (selectedPostCode.value) {
        url = route("admin.update_post_code", { post_code: selectedPostCode.value.uid });
      } else {
        url = route(`admin.create_post_code`);
      }
      router.post(url, formPostCode, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          closePostCode();
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    __expose({ openPostCode });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_switch = resolveComponent("v-switch");
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        show: showPostCodeModal.value,
        onClose: closePostCode
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
            _push2(`<div class="flex flex-col gap-3"${_scopeId}><div${_scopeId}>`);
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
              modelValue: formPostCode.post_code,
              "onUpdate:modelValue": ($event) => formPostCode.post_code = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Extra fee (per delivery)`);
                } else {
                  return [
                    createTextVNode("Extra fee (per delivery)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: formPostCode.extra_fee,
              "onUpdate:modelValue": ($event) => formPostCode.extra_fee = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Active`);
                } else {
                  return [
                    createTextVNode("Active")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_switch, {
              modelValue: formPostCode.active,
              "onUpdate:modelValue": ($event) => formPostCode.active = $event,
              color: "green",
              "true-value": 1,
              "false-value": 0,
              inset: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-3" }, [
                createVNode("div", null, [
                  createVNode(_component_v_label, null, {
                    default: withCtx(() => [
                      createTextVNode("Post code")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_text_field, {
                    modelValue: formPostCode.post_code,
                    "onUpdate:modelValue": ($event) => formPostCode.post_code = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", null, [
                  createVNode(_component_v_label, null, {
                    default: withCtx(() => [
                      createTextVNode("Extra fee (per delivery)")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_text_field, {
                    modelValue: formPostCode.extra_fee,
                    "onUpdate:modelValue": ($event) => formPostCode.extra_fee = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", null, [
                  createVNode(_component_v_label, null, {
                    default: withCtx(() => [
                      createTextVNode("Active")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_switch, {
                    modelValue: formPostCode.active,
                    "onUpdate:modelValue": ($event) => formPostCode.active = $event,
                    color: "green",
                    "true-value": 1,
                    "false-value": 0,
                    inset: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              onClick: savePostCode,
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
            _push2(ssrRenderComponent(_sfc_main$4, { onClick: closePostCode }, {
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
              createVNode(_sfc_main$3, {
                onClick: savePostCode,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(saveButtonText.value), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$4, { onClick: closePostCode }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PostCodeModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    post_codes: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const postCodeModal = ref(null);
    const openPostCode = (post_code) => {
      postCodeModal.value.openPostCode(post_code);
    };
    const getColorClass = (post_code) => {
      return post_code.active ? "text-black" : "text-red";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_table = resolveComponent("v-table");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Post codes" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-3"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => openPostCode(null),
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create post code`);
                } else {
                  return [
                    createTextVNode("Create post code")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 xl:grid-cols-2 py-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_table, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>Post code</th><th${_scopeId2}>Extra fee</th><th${_scopeId2}></th></tr></thead><tbody${_scopeId2}><!--[-->`);
                  ssrRenderList(props.post_codes, (post_code) => {
                    _push3(`<tr${_scopeId2}><td class="${ssrRenderClass(`font-bold ${getColorClass(post_code)}`)}"${_scopeId2}>${ssrInterpolate(post_code.post_code)}</td><td class="${ssrRenderClass(`${getColorClass(post_code)}`)}"${_scopeId2}>${ssrInterpolate(post_code.extra_fee_formatted)}</td><td class="${ssrRenderClass(`text-end ${getColorClass(post_code)}`)}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_btn, {
                      onClick: ($event) => openPostCode(post_code),
                      size: "small"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Edit`);
                        } else {
                          return [
                            createTextVNode("Edit")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</td></tr>`);
                  });
                  _push3(`<!--]--></tbody>`);
                } else {
                  return [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Post code"),
                        createVNode("th", null, "Extra fee"),
                        createVNode("th")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.post_codes, (post_code) => {
                        return openBlock(), createBlock("tr", null, [
                          createVNode("td", {
                            class: `font-bold ${getColorClass(post_code)}`
                          }, toDisplayString(post_code.post_code), 3),
                          createVNode("td", {
                            class: `${getColorClass(post_code)}`
                          }, toDisplayString(post_code.extra_fee_formatted), 3),
                          createVNode("td", {
                            class: `text-end ${getColorClass(post_code)}`
                          }, [
                            createVNode(_component_v_btn, {
                              onClick: withModifiers(($event) => openPostCode(post_code), ["prevent"]),
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Edit")
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ], 2)
                        ]);
                      }), 256))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "postCodeModal",
              ref: postCodeModal,
              errors: props.errors
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-3" }, [
                createVNode("div", null, [
                  createVNode(_component_v_btn, {
                    onClick: withModifiers(($event) => openPostCode(null), ["prevent"]),
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Create post code")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                createVNode("div", { class: "grid grid-cols-1 xl:grid-cols-2 py-1" }, [
                  createVNode(_component_v_table, null, {
                    default: withCtx(() => [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Post code"),
                          createVNode("th", null, "Extra fee"),
                          createVNode("th")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(props.post_codes, (post_code) => {
                          return openBlock(), createBlock("tr", null, [
                            createVNode("td", {
                              class: `font-bold ${getColorClass(post_code)}`
                            }, toDisplayString(post_code.post_code), 3),
                            createVNode("td", {
                              class: `${getColorClass(post_code)}`
                            }, toDisplayString(post_code.extra_fee_formatted), 3),
                            createVNode("td", {
                              class: `text-end ${getColorClass(post_code)}`
                            }, [
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(($event) => openPostCode(post_code), ["prevent"]),
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Edit")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ], 2)
                          ]);
                        }), 256))
                      ])
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode(_sfc_main$1, {
                ref_key: "postCodeModal",
                ref: postCodeModal,
                errors: props.errors
              }, null, 8, ["errors"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/PostCodes/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
