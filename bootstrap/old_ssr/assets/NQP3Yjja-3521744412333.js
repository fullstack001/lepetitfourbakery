import { ref, reactive, computed, onMounted, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { A as AdmLayout } from "./Bmk57_E8-5341323707321.js";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CbbAj4_Z-3325417239741.js";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import "./1tPrXgE0-1751246333532.js";
import "./BT2Gi1aL-2117352433356.js";
import "vuetify";
import "./DKEAH6nn-4333751172235.js";
import "mitt";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./AK26aD-S-7313723521453.js";
import "./C6q4kDV--4257163313235.js";
import "./DsvTyKEu-3355343127127.js";
import "./CeVcRmCk-1453137522733.js";
import "./Cyl_ukyB-3352317127354.js";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    users: Object,
    can_subscribe: Array
  },
  setup(__props) {
    const props = __props;
    const selectedUsers = ref([]);
    const form = reactive({
      subscribers: []
    });
    const savingSubscribers = ref("default");
    const subSaveButtonColor = computed(() => {
      if (savingSubscribers.value === "saving") return "grey";
      if (savingSubscribers.value === "saved") return "green";
      return "black";
    });
    const subSaveButtonText = computed(() => {
      if (savingSubscribers.value === "saving") return "Saving";
      if (savingSubscribers.value === "saved") return "Saved";
      return "Save";
    });
    const saveSubscribers = () => {
      if (savingSubscribers.value === "default") {
        savingSubscribers.value = "saving";
        form.subscribers = selectedUsers.value;
        router.post(route("admin.update_subscribers"), form, {
          onError: (error) => {
            console.log(error);
          },
          onSuccess: (page) => {
            savingSubscribers.value = "saved";
            setTimeout(() => {
              savingSubscribers.value = "default";
            }, 2e3);
          },
          only: [""],
          preserveScroll: true,
          preserveState: true
        });
      }
    };
    onMounted(() => {
      selectedUsers.value = props.users.data.filter((user) => props.can_subscribe.includes(user.uid)).map((user) => user.uid);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_table = resolveComponent("v-table");
      const _component_v_label = resolveComponent("v-label");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      const _component_v_btn = resolveComponent("v-btn");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Users" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mt-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_table, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>Username</th><th${_scopeId2}>Email</th><th class="text-center"${_scopeId2}>Can subscribe</th><th class="text-center"${_scopeId2}>Subscription status</th><th${_scopeId2}></th></tr></thead><tbody${_scopeId2}><!--[-->`);
                  ssrRenderList(props.users.data, (user, index) => {
                    _push3(`<tr${_scopeId2}><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_label, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(user.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(user.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</td><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_label, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(user.email)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(user.email), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</td><td${_scopeId2}><div class="flex justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_checkbox, {
                      modelValue: selectedUsers.value,
                      "onUpdate:modelValue": ($event) => selectedUsers.value = $event,
                      value: user.uid,
                      "hide-details": ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></td><td${_scopeId2}><div class="flex justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_label, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`not subscribed`);
                        } else {
                          return [
                            createTextVNode("not subscribed")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div></td><td class="text-end"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_btn, {
                      color: "grey",
                      size: "small"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Orders`);
                        } else {
                          return [
                            createTextVNode("Orders")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</td></tr>`);
                  });
                  _push3(`<!--]--><tr${_scopeId2}><td${_scopeId2}></td><td${_scopeId2}></td><td${_scopeId2}><div class="flex justify-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_btn, {
                    color: subSaveButtonColor.value,
                    onClick: saveSubscribers,
                    size: "small"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(subSaveButtonText.value)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(subSaveButtonText.value), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></td><td${_scopeId2}></td></tr></tbody>`);
                } else {
                  return [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Username"),
                        createVNode("th", null, "Email"),
                        createVNode("th", { class: "text-center" }, "Can subscribe"),
                        createVNode("th", { class: "text-center" }, "Subscription status"),
                        createVNode("th")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.users.data, (user, index) => {
                        return openBlock(), createBlock("tr", null, [
                          createVNode("td", null, [
                            createVNode(_component_v_label, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(user.name), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createVNode("td", null, [
                            createVNode(_component_v_label, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(user.email), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createVNode("td", null, [
                            createVNode("div", { class: "flex justify-center" }, [
                              createVNode(_component_v_checkbox, {
                                modelValue: selectedUsers.value,
                                "onUpdate:modelValue": ($event) => selectedUsers.value = $event,
                                value: user.uid,
                                "hide-details": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                            ])
                          ]),
                          createVNode("td", null, [
                            createVNode("div", { class: "flex justify-center" }, [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("not subscribed")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("td", { class: "text-end" }, [
                            createVNode(_component_v_btn, {
                              color: "grey",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Orders")
                              ]),
                              _: 1
                            })
                          ])
                        ]);
                      }), 256)),
                      createVNode("tr", null, [
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td", null, [
                          createVNode("div", { class: "flex justify-center" }, [
                            createVNode(_component_v_btn, {
                              color: subSaveButtonColor.value,
                              onClick: withModifiers(saveSubscribers, ["prevent"]),
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(subSaveButtonText.value), 1)
                              ]),
                              _: 1
                            }, 8, ["color"])
                          ])
                        ]),
                        createVNode("td")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              entities: props.users
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mt-3" }, [
                createVNode(_component_v_table, null, {
                  default: withCtx(() => [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Username"),
                        createVNode("th", null, "Email"),
                        createVNode("th", { class: "text-center" }, "Can subscribe"),
                        createVNode("th", { class: "text-center" }, "Subscription status"),
                        createVNode("th")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.users.data, (user, index) => {
                        return openBlock(), createBlock("tr", null, [
                          createVNode("td", null, [
                            createVNode(_component_v_label, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(user.name), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createVNode("td", null, [
                            createVNode(_component_v_label, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(user.email), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createVNode("td", null, [
                            createVNode("div", { class: "flex justify-center" }, [
                              createVNode(_component_v_checkbox, {
                                modelValue: selectedUsers.value,
                                "onUpdate:modelValue": ($event) => selectedUsers.value = $event,
                                value: user.uid,
                                "hide-details": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                            ])
                          ]),
                          createVNode("td", null, [
                            createVNode("div", { class: "flex justify-center" }, [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("not subscribed")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("td", { class: "text-end" }, [
                            createVNode(_component_v_btn, {
                              color: "grey",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Orders")
                              ]),
                              _: 1
                            })
                          ])
                        ]);
                      }), 256)),
                      createVNode("tr", null, [
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td", null, [
                          createVNode("div", { class: "flex justify-center" }, [
                            createVNode(_component_v_btn, {
                              color: subSaveButtonColor.value,
                              onClick: withModifiers(saveSubscribers, ["prevent"]),
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(subSaveButtonText.value), 1)
                              ]),
                              _: 1
                            }, 8, ["color"])
                          ])
                        ]),
                        createVNode("td")
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", null, [
                createVNode(_sfc_main$1, {
                  entities: props.users
                }, null, 8, ["entities"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Users/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
