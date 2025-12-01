import { ref, reactive, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext, withModifiers, createCommentVNode } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { A as AdmLayout } from "./BZf0ki2W-7956103712867.js";
import { _ as _sfc_main$2 } from "./D2KjorHx-1875739460561.js";
import { _ as _sfc_main$3 } from "./DsvTyKEu-3067955167518.js";
import { _ as _sfc_main$4 } from "./CeVcRmCk-1577655618930.js";
import { router } from "@inertiajs/vue3";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./1tPrXgE0-4581736670159.js";
import "./C6q4kDV--1536774619085.js";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
const _sfc_main$1 = {
  __name: "ClosedDateModal",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  setup(__props, { expose: __expose }) {
    const showClosedDateModal = ref(false);
    const selectedClosedDate = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const props = __props;
    const formClosedDate = reactive({});
    const selectedDates = ref([]);
    const openClosedDate = () => {
      local_errors2.value = {};
      selectedDates.value = [];
      modalTitle.value = "Add closed date";
      selectedClosedDate.value = null;
      formClosedDate.dates = [];
      formClosedDate.reason = "";
      saveButtonText.value = "Save closed date";
      showClosedDateModal.value = true;
    };
    const closeClosedDate = () => {
      showClosedDateModal.value = false;
      selectedClosedDate.value = null;
    };
    const local_errors2 = ref({});
    const saveClosedDate = () => {
      local_errors2.value = {};
      const url = route(`admin.create_closed_date`);
      router.post(url, formClosedDate, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          closeClosedDate();
        },
        onError: (error) => {
          local_errors2.value = props.errors;
        }
      });
    };
    __expose({ openClosedDate });
    function updateDates() {
      local_errors2.value = {};
      formClosedDate.dates = selectedDates.value.map(
        (date) => new Date(date).toLocaleDateString("en-US").replace(/\//g, ".")
      );
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_date_picker = resolveComponent("v-date-picker");
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        maxWidth: "3xl",
        show: showClosedDateModal.value,
        onClose: closeClosedDate
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
            _push2(`<div class="flex flex-col gap-5"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Reason for closing (internal) - Optional`);
                } else {
                  return [
                    createTextVNode("Reason for closing (internal) - Optional")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: formClosedDate.reason,
              "onUpdate:modelValue": ($event) => formClosedDate.reason = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 lg:grid-cols-2 gap-10"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_date_picker, {
              color: "black",
              header: "Select dates",
              modelValue: selectedDates.value,
              "onUpdate:modelValue": [($event) => selectedDates.value = $event, updateDates],
              multiple: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Dates selected`);
                } else {
                  return [
                    createTextVNode("Dates selected")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (formClosedDate.dates.length) {
              _push2(`<div class="flex flex-col gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(formClosedDate.dates, (date) => {
                _push2(`<div${_scopeId}><p class="text-2xl text-black"${_scopeId}>${ssrInterpolate(date)}</p></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div${_scopeId}><p${_scopeId}>No date selected.</p></div>`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-5" }, [
                createVNode("div", null, [
                  createVNode(_component_v_label, null, {
                    default: withCtx(() => [
                      createTextVNode("Reason for closing (internal) - Optional")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_text_field, {
                    modelValue: formClosedDate.reason,
                    "onUpdate:modelValue": ($event) => formClosedDate.reason = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-10" }, [
                  createVNode("div", null, [
                    createVNode(_component_v_date_picker, {
                      color: "black",
                      header: "Select dates",
                      modelValue: selectedDates.value,
                      "onUpdate:modelValue": [($event) => selectedDates.value = $event, updateDates],
                      multiple: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode(_component_v_label, null, {
                      default: withCtx(() => [
                        createTextVNode("Dates selected")
                      ]),
                      _: 1
                    }),
                    formClosedDate.dates.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col gap-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(formClosedDate.dates, (date) => {
                        return openBlock(), createBlock("div", null, [
                          createVNode("p", { class: "text-2xl text-black" }, toDisplayString(date), 1)
                        ]);
                      }), 256))
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("p", null, "No date selected.")
                    ]))
                  ])
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              onClick: saveClosedDate,
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
            _push2(ssrRenderComponent(_sfc_main$4, { onClick: closeClosedDate }, {
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
                onClick: saveClosedDate,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(saveButtonText.value), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$4, { onClick: closeClosedDate }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ClosedDateModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    closed_dates: Object,
    earlier_dates_exist: Boolean,
    earlier_dates_displayed: Boolean,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    reactive({
      dates: "",
      reason: ""
    });
    const closedDateModal = ref(null);
    const deleteClosedDate = (closed_date) => {
      router.post(route("admin.delete_closed_date", { closed_date: closed_date.uid }), {}, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_table = resolveComponent("v-table");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Closed dates" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-3"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => closedDateModal.value.openClosedDate(),
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Add closed date`);
                } else {
                  return [
                    createTextVNode("Add closed date")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (props.closed_dates.length) {
              _push2(`<div${_scopeId}><div class="grid grid-cols-1 xl:grid-cols-2 py-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_table, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}><strong${_scopeId2}>Date</strong></th><th colspan="2"${_scopeId2}><strong${_scopeId2}>Reason</strong></th><th${_scopeId2}></th></tr></thead><tbody${_scopeId2}><!--[-->`);
                    ssrRenderList(props.closed_dates, (closed_date) => {
                      _push3(`<tr${_scopeId2}><td${_scopeId2}>${ssrInterpolate(closed_date.date_formatted)}</td><td colspan="2"${_scopeId2}>${ssrInterpolate(closed_date.reason ?? "-")}</td><td${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_btn, {
                        onClick: ($event) => deleteClosedDate(closed_date),
                        size: "small",
                        variant: "text",
                        color: "red"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Delete`);
                          } else {
                            return [
                              createTextVNode("Delete")
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
                          createVNode("th", null, [
                            createVNode("strong", null, "Date")
                          ]),
                          createVNode("th", { colspan: "2" }, [
                            createVNode("strong", null, "Reason")
                          ]),
                          createVNode("th")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(props.closed_dates, (closed_date) => {
                          return openBlock(), createBlock("tr", null, [
                            createVNode("td", null, toDisplayString(closed_date.date_formatted), 1),
                            createVNode("td", { colspan: "2" }, toDisplayString(closed_date.reason ?? "-"), 1),
                            createVNode("td", null, [
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(($event) => deleteClosedDate(closed_date), ["prevent"]),
                                size: "small",
                                variant: "text",
                                color: "red"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Delete")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])
                          ]);
                        }), 256))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (props.earlier_dates_exist || props.earlier_dates_displayed) {
                _push2(`<div class="w-full block mt-5"${_scopeId}>`);
                if (props.earlier_dates_exist) {
                  _push2(ssrRenderComponent(_component_v_btn, {
                    size: "small",
                    onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.closed_dates", { "scope": "all" }))
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`Show all dates`);
                      } else {
                        return [
                          createTextVNode("Show all dates")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (props.earlier_dates_displayed) {
                  _push2(ssrRenderComponent(_component_v_btn, {
                    size: "small",
                    onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.closed_dates"))
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`Only show current dates`);
                      } else {
                        return [
                          createTextVNode("Only show current dates")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}><p${_scopeId}>You haven&#39;t added any closed dates yet.</p></div>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "closedDateModal",
              ref: closedDateModal,
              errors: props.errors
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-3" }, [
                createVNode("div", null, [
                  createVNode(_component_v_btn, {
                    onClick: withModifiers(($event) => closedDateModal.value.openClosedDate(), ["prevent"]),
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Add closed date")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                props.closed_dates.length ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("div", { class: "grid grid-cols-1 xl:grid-cols-2 py-1" }, [
                    createVNode(_component_v_table, null, {
                      default: withCtx(() => [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", null, [
                              createVNode("strong", null, "Date")
                            ]),
                            createVNode("th", { colspan: "2" }, [
                              createVNode("strong", null, "Reason")
                            ]),
                            createVNode("th")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props.closed_dates, (closed_date) => {
                            return openBlock(), createBlock("tr", null, [
                              createVNode("td", null, toDisplayString(closed_date.date_formatted), 1),
                              createVNode("td", { colspan: "2" }, toDisplayString(closed_date.reason ?? "-"), 1),
                              createVNode("td", null, [
                                createVNode(_component_v_btn, {
                                  onClick: withModifiers(($event) => deleteClosedDate(closed_date), ["prevent"]),
                                  size: "small",
                                  variant: "text",
                                  color: "red"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Delete")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ])
                            ]);
                          }), 256))
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  props.earlier_dates_exist || props.earlier_dates_displayed ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "w-full block mt-5"
                  }, [
                    props.earlier_dates_exist ? (openBlock(), createBlock(_component_v_btn, {
                      key: 0,
                      size: "small",
                      onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.closed_dates", { "scope": "all" })), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Show all dates")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true),
                    props.earlier_dates_displayed ? (openBlock(), createBlock(_component_v_btn, {
                      key: 1,
                      size: "small",
                      onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.closed_dates")), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Only show current dates")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("p", null, "You haven't added any closed dates yet.")
                ]))
              ]),
              createVNode(_sfc_main$1, {
                ref_key: "closedDateModal",
                ref: closedDateModal,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/ClosedDates/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
