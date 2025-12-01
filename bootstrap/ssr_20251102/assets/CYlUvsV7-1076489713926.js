import { ref, reactive, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, withModifiers, withKeys, openBlock, createBlock, Fragment, createCommentVNode, renderList, useSSRContext, onMounted } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { A as AdmLayout } from "./BZf0ki2W-7956103712867.js";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./D2KjorHx-1875739460561.js";
import { _ as _sfc_main$3 } from "./DsvTyKEu-3067955167518.js";
import { _ as _sfc_main$4 } from "./CeVcRmCk-1577655618930.js";
import { _ as _sfc_main$5, a as _sfc_main$6 } from "./Cyl_ukyB-5873697610160.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./1tPrXgE0-4581736670159.js";
import "./C6q4kDV--1536774619085.js";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
const _sfc_main$1 = {
  __name: "TeamMemberModal",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  emits: ["refresh"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const showMemberModal = ref(false);
    const selectedMember = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const emailAddress = ref("");
    const canCreate = ref(false);
    const message = ref("");
    const errors = ref({});
    const formMember = reactive({
      name: "",
      email: "",
      permission: "",
      make_admin: false
    });
    const selectedType = ref("");
    const openMember = (member = null, type) => {
      local_errors.value = {};
      selectedType.value = type;
      resetStatus();
      if (member) {
        modalTitle.value = "Edit team member";
        selectedMember.value = member;
        formMember.name = member.name;
        formMember.email = member.email;
        emailAddress.value = member.email;
      } else {
        if (type === "admin") {
          modalTitle.value = "Create admin";
          saveButtonText.value = "Save admin";
        } else {
          modalTitle.value = "Create team member";
          saveButtonText.value = "Save team member";
        }
        selectedMember.value = null;
        formMember.name = null;
        formMember.make_admin = false;
        emailAddress.value = "";
      }
      showMemberModal.value = true;
    };
    const closeMember = () => {
      showMemberModal.value = false;
      emit("refresh");
    };
    const local_errors = ref({});
    const saveMember = () => {
      let url;
      if (selectedMember.value) {
        url = route("admin.update_team_member", { member: selectedMember.value.uid });
      } else if (selectedType.value === "admin") {
        url = route(`admin.create_admin`);
      } else {
        url = route(`admin.create_team_member`);
      }
      router.post(url, formMember, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          closeMember();
        },
        onError: (error) => {
          errors.value = props.errors;
        }
      });
    };
    const searchUser = () => {
      resetStatus();
      axios.post(route("admin.search_user", { type: selectedType.value }), {
        email: emailAddress.value
      }).then((response) => {
        canCreate.value = response.data.exists === "false";
        message.value = response.data.message;
        formMember.email = emailAddress.value;
      }).catch((error) => {
        var _a, _b, _c;
        if ((_c = (_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.errors) == null ? void 0 : _c.email) {
          errors.value = error.response.data.errors.email;
        } else {
          errors.value = ["An error occurred"];
        }
      });
    };
    const resetStatus = () => {
      formMember.name = "";
      formMember.email = "";
      formMember.make_admin = false;
      canCreate.value = false;
      errors.value = {};
      message.value = "";
    };
    __expose({ openMember });
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_radio_group = resolveComponent("v-radio-group");
      const _component_v_radio = resolveComponent("v-radio");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        show: showMemberModal.value,
        onClose: closeMember
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
            _push2(ssrRenderComponent(_component_v_label, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`E-mail address`);
                } else {
                  return [
                    createTextVNode("E-mail address")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: emailAddress.value,
              "onUpdate:modelValue": ($event) => emailAddress.value = $event,
              onKeydown: [searchUser, resetStatus]
            }, {
              "append-inner": withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_btn, {
                    onClick: searchUser,
                    variant: "plain",
                    "prepend-icon": "mdi-magnify"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Search`);
                      } else {
                        return [
                          createTextVNode("Search")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_btn, {
                      onClick: withModifiers(searchUser, ["prevent"]),
                      variant: "plain",
                      "prepend-icon": "mdi-magnify"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Search")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (canCreate.value) {
              _push2(`<div${_scopeId}>`);
              if (selectedType.value === "team") {
                _push2(`<!--[--><div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_v_label, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Team member name (for admin only)`);
                    } else {
                      return [
                        createTextVNode("Team member name (for admin only)")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_v_text_field, {
                  modelValue: formMember.name,
                  "onUpdate:modelValue": ($event) => formMember.name = $event,
                  "error-messages": local_errors.value.name
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
                _push2(ssrRenderComponent(_component_v_label, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Permission`);
                    } else {
                      return [
                        createTextVNode("Permission")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_v_radio_group, {
                  inline: "",
                  modelValue: formMember.permission,
                  "onUpdate:modelValue": ($event) => formMember.permission = $event,
                  "error-messages": local_errors.value.permission
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_v_radio, {
                        label: "Front",
                        value: "front"
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_v_radio, {
                        label: "Baker",
                        value: "baker"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_v_radio, {
                          label: "Front",
                          value: "front"
                        }),
                        createVNode(_component_v_radio, {
                          label: "Baker",
                          value: "baker"
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<!--]-->`);
              } else if (selectedType.value === "admin") {
                _push2(ssrRenderComponent(_component_v_checkbox, {
                  label: "Make admin",
                  modelValue: formMember.make_admin,
                  "onUpdate:modelValue": ($event) => formMember.make_admin = $event,
                  "true-value": true,
                  "false-value": false
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}><p${_scopeId}>Start by searching the user by email address</p></div>`);
            }
            if (Object.keys(errors.value).length > 0) {
              _push2(`<div${_scopeId}><ul${_scopeId}><!--[-->`);
              ssrRenderList(errors.value, (error, index) => {
                _push2(`<li class="text-red-500"${_scopeId}>${ssrInterpolate(error)}</li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else if (message.value) {
              _push2(`<div${_scopeId}><p${_scopeId}>${ssrInterpolate(message.value)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_v_label, null, {
                default: withCtx(() => [
                  createTextVNode("E-mail address")
                ]),
                _: 1
              }),
              createVNode(_component_v_text_field, {
                modelValue: emailAddress.value,
                "onUpdate:modelValue": ($event) => emailAddress.value = $event,
                onKeydown: [
                  withKeys(searchUser, ["enter"]),
                  resetStatus
                ]
              }, {
                "append-inner": withCtx(() => [
                  createVNode(_component_v_btn, {
                    onClick: withModifiers(searchUser, ["prevent"]),
                    variant: "plain",
                    "prepend-icon": "mdi-magnify"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Search")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              canCreate.value ? (openBlock(), createBlock("div", { key: 0 }, [
                selectedType.value === "team" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("div", null, [
                    createVNode(_component_v_label, null, {
                      default: withCtx(() => [
                        createTextVNode("Team member name (for admin only)")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_text_field, {
                      modelValue: formMember.name,
                      "onUpdate:modelValue": ($event) => formMember.name = $event,
                      "error-messages": local_errors.value.name
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ]),
                  createVNode(_component_v_label, null, {
                    default: withCtx(() => [
                      createTextVNode("Permission")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_radio_group, {
                    inline: "",
                    modelValue: formMember.permission,
                    "onUpdate:modelValue": ($event) => formMember.permission = $event,
                    "error-messages": local_errors.value.permission
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_radio, {
                        label: "Front",
                        value: "front"
                      }),
                      createVNode(_component_v_radio, {
                        label: "Baker",
                        value: "baker"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                ], 64)) : selectedType.value === "admin" ? (openBlock(), createBlock(_component_v_checkbox, {
                  key: 1,
                  label: "Make admin",
                  modelValue: formMember.make_admin,
                  "onUpdate:modelValue": ($event) => formMember.make_admin = $event,
                  "true-value": true,
                  "false-value": false
                }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode("p", null, "Start by searching the user by email address")
              ])),
              Object.keys(errors.value).length > 0 ? (openBlock(), createBlock("div", { key: 2 }, [
                createVNode("ul", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(errors.value, (error, index) => {
                    return openBlock(), createBlock("li", {
                      key: index,
                      class: "text-red-500"
                    }, toDisplayString(error), 1);
                  }), 128))
                ])
              ])) : message.value ? (openBlock(), createBlock("div", { key: 3 }, [
                createVNode("p", null, toDisplayString(message.value), 1)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              onClick: saveMember,
              class: "me-3",
              disabled: !canCreate.value
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
            _push2(ssrRenderComponent(_sfc_main$4, { onClick: closeMember }, {
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
                onClick: saveMember,
                class: "me-3",
                disabled: !canCreate.value
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(saveButtonText.value), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              createVNode(_sfc_main$4, { onClick: closeMember }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TeamMemberModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Members",
  __ssrInlineRender: true,
  props: {
    members: Object,
    admins: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const teamMemberModal = ref(null);
    const local_errors = ref({});
    const updateMember = (member) => {
      const updatedData = {
        name: member.localName,
        permission: member.localPermission
      };
      router.post(route("admin.update_team_member", { member: member.uid }), updatedData, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          refreshData();
        },
        onError: (error) => {
          console.log("error");
        }
      });
    };
    const revokeAdmin = (email) => {
      router.post(route("admin.revoke_admin"), {
        email
      }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          refreshData();
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    onMounted(() => {
      refreshData();
    });
    const refreshData = () => {
      props.members.forEach((member) => {
        member.localName = member.name;
        member.localPermission = member.permission;
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_radio_group = resolveComponent("v-radio-group");
      const _component_v_radio = resolveComponent("v-radio");
      const _component_v_btn = resolveComponent("v-btn");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Team" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$5, { gap: "4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$5, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_card, {
                          color: "grey-lighten-3",
                          rounded: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="p-4"${_scopeId4}><p class="text-2xl"${_scopeId4}>Team</p>`);
                              if (props.members.length > 0) {
                                _push5(`<div${_scopeId4}><p class="mb-5"${_scopeId4}>To remove a team member, enter &quot;remove user&quot; as their name and update</p>`);
                                _push5(ssrRenderComponent(_sfc_main$5, { gap: "3" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(props.members, (member) => {
                                        _push6(ssrRenderComponent(_component_v_card, {
                                          elevation: "2",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_v_card_item, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_sfc_main$5, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`<p class="text-grey-darken-3"${_scopeId8}>${ssrInterpolate(member.user.email)} (${ssrInterpolate(member.user.name)})</p><div class="flex gap-3"${_scopeId8}>`);
                                                          _push9(ssrRenderComponent(_component_v_text_field, {
                                                            modelValue: member.localName,
                                                            "onUpdate:modelValue": ($event) => member.localName = $event,
                                                            "hide-details": ""
                                                          }, null, _parent9, _scopeId8));
                                                          _push9(ssrRenderComponent(_component_v_radio_group, {
                                                            inline: "",
                                                            "hide-details": "",
                                                            modelValue: member.localPermission,
                                                            "onUpdate:modelValue": ($event) => member.localPermission = $event
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(ssrRenderComponent(_component_v_radio, {
                                                                  label: "Front",
                                                                  value: "front"
                                                                }, null, _parent10, _scopeId9));
                                                                _push10(ssrRenderComponent(_component_v_radio, {
                                                                  label: "Baker",
                                                                  value: "baker"
                                                                }, null, _parent10, _scopeId9));
                                                              } else {
                                                                return [
                                                                  createVNode(_component_v_radio, {
                                                                    label: "Front",
                                                                    value: "front"
                                                                  }),
                                                                  createVNode(_component_v_radio, {
                                                                    label: "Baker",
                                                                    value: "baker"
                                                                  })
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                          _push9(ssrRenderComponent(_component_v_btn, {
                                                            onClick: ($event) => updateMember(member)
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`Update`);
                                                              } else {
                                                                return [
                                                                  createTextVNode("Update")
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                          _push9(`</div>`);
                                                        } else {
                                                          return [
                                                            createVNode("p", { class: "text-grey-darken-3" }, toDisplayString(member.user.email) + " (" + toDisplayString(member.user.name) + ")", 1),
                                                            createVNode("div", { class: "flex gap-3" }, [
                                                              createVNode(_component_v_text_field, {
                                                                modelValue: member.localName,
                                                                "onUpdate:modelValue": ($event) => member.localName = $event,
                                                                "hide-details": ""
                                                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                              createVNode(_component_v_radio_group, {
                                                                inline: "",
                                                                "hide-details": "",
                                                                modelValue: member.localPermission,
                                                                "onUpdate:modelValue": ($event) => member.localPermission = $event
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createVNode(_component_v_radio, {
                                                                    label: "Front",
                                                                    value: "front"
                                                                  }),
                                                                  createVNode(_component_v_radio, {
                                                                    label: "Baker",
                                                                    value: "baker"
                                                                  })
                                                                ]),
                                                                _: 2
                                                              }, 1032, ["modelValue", "onUpdate:modelValue"]),
                                                              createVNode(_component_v_btn, {
                                                                onClick: withModifiers(($event) => updateMember(member), ["prevent"])
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode("Update")
                                                                ]),
                                                                _: 2
                                                              }, 1032, ["onClick"])
                                                            ])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_sfc_main$5, null, {
                                                        default: withCtx(() => [
                                                          createVNode("p", { class: "text-grey-darken-3" }, toDisplayString(member.user.email) + " (" + toDisplayString(member.user.name) + ")", 1),
                                                          createVNode("div", { class: "flex gap-3" }, [
                                                            createVNode(_component_v_text_field, {
                                                              modelValue: member.localName,
                                                              "onUpdate:modelValue": ($event) => member.localName = $event,
                                                              "hide-details": ""
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                            createVNode(_component_v_radio_group, {
                                                              inline: "",
                                                              "hide-details": "",
                                                              modelValue: member.localPermission,
                                                              "onUpdate:modelValue": ($event) => member.localPermission = $event
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(_component_v_radio, {
                                                                  label: "Front",
                                                                  value: "front"
                                                                }),
                                                                createVNode(_component_v_radio, {
                                                                  label: "Baker",
                                                                  value: "baker"
                                                                })
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["modelValue", "onUpdate:modelValue"]),
                                                            createVNode(_component_v_btn, {
                                                              onClick: withModifiers(($event) => updateMember(member), ["prevent"])
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode("Update")
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["onClick"])
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_v_card_item, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_sfc_main$5, null, {
                                                      default: withCtx(() => [
                                                        createVNode("p", { class: "text-grey-darken-3" }, toDisplayString(member.user.email) + " (" + toDisplayString(member.user.name) + ")", 1),
                                                        createVNode("div", { class: "flex gap-3" }, [
                                                          createVNode(_component_v_text_field, {
                                                            modelValue: member.localName,
                                                            "onUpdate:modelValue": ($event) => member.localName = $event,
                                                            "hide-details": ""
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                          createVNode(_component_v_radio_group, {
                                                            inline: "",
                                                            "hide-details": "",
                                                            modelValue: member.localPermission,
                                                            "onUpdate:modelValue": ($event) => member.localPermission = $event
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(_component_v_radio, {
                                                                label: "Front",
                                                                value: "front"
                                                              }),
                                                              createVNode(_component_v_radio, {
                                                                label: "Baker",
                                                                value: "baker"
                                                              })
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["modelValue", "onUpdate:modelValue"]),
                                                          createVNode(_component_v_btn, {
                                                            onClick: withModifiers(($event) => updateMember(member), ["prevent"])
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode("Update")
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["onClick"])
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
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(props.members, (member) => {
                                          return openBlock(), createBlock(_component_v_card, {
                                            elevation: "2",
                                            rounded: "lg"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_card_item, null, {
                                                default: withCtx(() => [
                                                  createVNode(_sfc_main$5, null, {
                                                    default: withCtx(() => [
                                                      createVNode("p", { class: "text-grey-darken-3" }, toDisplayString(member.user.email) + " (" + toDisplayString(member.user.name) + ")", 1),
                                                      createVNode("div", { class: "flex gap-3" }, [
                                                        createVNode(_component_v_text_field, {
                                                          modelValue: member.localName,
                                                          "onUpdate:modelValue": ($event) => member.localName = $event,
                                                          "hide-details": ""
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                        createVNode(_component_v_radio_group, {
                                                          inline: "",
                                                          "hide-details": "",
                                                          modelValue: member.localPermission,
                                                          "onUpdate:modelValue": ($event) => member.localPermission = $event
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(_component_v_radio, {
                                                              label: "Front",
                                                              value: "front"
                                                            }),
                                                            createVNode(_component_v_radio, {
                                                              label: "Baker",
                                                              value: "baker"
                                                            })
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["modelValue", "onUpdate:modelValue"]),
                                                        createVNode(_component_v_btn, {
                                                          onClick: withModifiers(($event) => updateMember(member), ["prevent"])
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode("Update")
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["onClick"])
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
                                        }), 256))
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                _push5(`<div${_scopeId4}><p${_scopeId4}>The team doesn&#39;t have any members yet.</p></div>`);
                              }
                              _push5(`<div class="mt-5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_v_btn, {
                                onClick: ($event) => teamMemberModal.value.openMember(null, "team")
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Add team member`);
                                  } else {
                                    return [
                                      createTextVNode("Add team member")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode("p", { class: "text-2xl" }, "Team"),
                                  props.members.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                                    createVNode("p", { class: "mb-5" }, 'To remove a team member, enter "remove user" as their name and update'),
                                    createVNode(_sfc_main$5, { gap: "3" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(props.members, (member) => {
                                          return openBlock(), createBlock(_component_v_card, {
                                            elevation: "2",
                                            rounded: "lg"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_card_item, null, {
                                                default: withCtx(() => [
                                                  createVNode(_sfc_main$5, null, {
                                                    default: withCtx(() => [
                                                      createVNode("p", { class: "text-grey-darken-3" }, toDisplayString(member.user.email) + " (" + toDisplayString(member.user.name) + ")", 1),
                                                      createVNode("div", { class: "flex gap-3" }, [
                                                        createVNode(_component_v_text_field, {
                                                          modelValue: member.localName,
                                                          "onUpdate:modelValue": ($event) => member.localName = $event,
                                                          "hide-details": ""
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                        createVNode(_component_v_radio_group, {
                                                          inline: "",
                                                          "hide-details": "",
                                                          modelValue: member.localPermission,
                                                          "onUpdate:modelValue": ($event) => member.localPermission = $event
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(_component_v_radio, {
                                                              label: "Front",
                                                              value: "front"
                                                            }),
                                                            createVNode(_component_v_radio, {
                                                              label: "Baker",
                                                              value: "baker"
                                                            })
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["modelValue", "onUpdate:modelValue"]),
                                                        createVNode(_component_v_btn, {
                                                          onClick: withModifiers(($event) => updateMember(member), ["prevent"])
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode("Update")
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["onClick"])
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
                                        }), 256))
                                      ]),
                                      _: 1
                                    })
                                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                    createVNode("p", null, "The team doesn't have any members yet.")
                                  ])),
                                  createVNode("div", { class: "mt-5" }, [
                                    createVNode(_component_v_btn, {
                                      onClick: withModifiers(($event) => teamMemberModal.value.openMember(null, "team"), ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Add team member")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode("p", { class: "text-2xl" }, "Team"),
                                props.members.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode("p", { class: "mb-5" }, 'To remove a team member, enter "remove user" as their name and update'),
                                  createVNode(_sfc_main$5, { gap: "3" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(props.members, (member) => {
                                        return openBlock(), createBlock(_component_v_card, {
                                          elevation: "2",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_card_item, null, {
                                              default: withCtx(() => [
                                                createVNode(_sfc_main$5, null, {
                                                  default: withCtx(() => [
                                                    createVNode("p", { class: "text-grey-darken-3" }, toDisplayString(member.user.email) + " (" + toDisplayString(member.user.name) + ")", 1),
                                                    createVNode("div", { class: "flex gap-3" }, [
                                                      createVNode(_component_v_text_field, {
                                                        modelValue: member.localName,
                                                        "onUpdate:modelValue": ($event) => member.localName = $event,
                                                        "hide-details": ""
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                      createVNode(_component_v_radio_group, {
                                                        inline: "",
                                                        "hide-details": "",
                                                        modelValue: member.localPermission,
                                                        "onUpdate:modelValue": ($event) => member.localPermission = $event
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_v_radio, {
                                                            label: "Front",
                                                            value: "front"
                                                          }),
                                                          createVNode(_component_v_radio, {
                                                            label: "Baker",
                                                            value: "baker"
                                                          })
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["modelValue", "onUpdate:modelValue"]),
                                                      createVNode(_component_v_btn, {
                                                        onClick: withModifiers(($event) => updateMember(member), ["prevent"])
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Update")
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["onClick"])
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
                                      }), 256))
                                    ]),
                                    _: 1
                                  })
                                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                  createVNode("p", null, "The team doesn't have any members yet.")
                                ])),
                                createVNode("div", { class: "mt-5" }, [
                                  createVNode(_component_v_btn, {
                                    onClick: withModifiers(($event) => teamMemberModal.value.openMember(null, "team"), ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Add team member")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_card, {
                          color: "grey-lighten-3",
                          rounded: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="p-4"${_scopeId4}><p class="text-2xl"${_scopeId4}>Admins</p>`);
                              _push5(ssrRenderComponent(_sfc_main$5, { gap: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(props.admins, (admin) => {
                                      _push6(ssrRenderComponent(_component_v_card, {
                                        color: "white",
                                        elevation: "2",
                                        rounded: "lg"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="p-4"${_scopeId6}>`);
                                            _push7(ssrRenderComponent(_sfc_main$6, {
                                              center: true,
                                              justify: "between"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<p${_scopeId7}>${ssrInterpolate(admin.email)} (${ssrInterpolate(admin.name)})</p>`);
                                                  if (admin.can_be_removed) {
                                                    _push8(`<div${_scopeId7}>`);
                                                    _push8(ssrRenderComponent(_component_v_btn, {
                                                      onClick: ($event) => revokeAdmin(admin.email),
                                                      size: "small",
                                                      variant: "outlined",
                                                      color: "red"
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`Revoke admin permission`);
                                                        } else {
                                                          return [
                                                            createTextVNode("Revoke admin permission")
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(`</div>`);
                                                  } else {
                                                    _push8(`<!---->`);
                                                  }
                                                } else {
                                                  return [
                                                    createVNode("p", null, toDisplayString(admin.email) + " (" + toDisplayString(admin.name) + ")", 1),
                                                    admin.can_be_removed ? (openBlock(), createBlock("div", { key: 0 }, [
                                                      createVNode(_component_v_btn, {
                                                        onClick: withModifiers(($event) => revokeAdmin(admin.email), ["prevent"]),
                                                        size: "small",
                                                        variant: "outlined",
                                                        color: "red"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Revoke admin permission")
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["onClick"])
                                                    ])) : createCommentVNode("", true)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`</div>`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "p-4" }, [
                                                createVNode(_sfc_main$6, {
                                                  center: true,
                                                  justify: "between"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("p", null, toDisplayString(admin.email) + " (" + toDisplayString(admin.name) + ")", 1),
                                                    admin.can_be_removed ? (openBlock(), createBlock("div", { key: 0 }, [
                                                      createVNode(_component_v_btn, {
                                                        onClick: withModifiers(($event) => revokeAdmin(admin.email), ["prevent"]),
                                                        size: "small",
                                                        variant: "outlined",
                                                        color: "red"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Revoke admin permission")
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["onClick"])
                                                    ])) : createCommentVNode("", true)
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(props.admins, (admin) => {
                                        return openBlock(), createBlock(_component_v_card, {
                                          color: "white",
                                          elevation: "2",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "p-4" }, [
                                              createVNode(_sfc_main$6, {
                                                center: true,
                                                justify: "between"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("p", null, toDisplayString(admin.email) + " (" + toDisplayString(admin.name) + ")", 1),
                                                  admin.can_be_removed ? (openBlock(), createBlock("div", { key: 0 }, [
                                                    createVNode(_component_v_btn, {
                                                      onClick: withModifiers(($event) => revokeAdmin(admin.email), ["prevent"]),
                                                      size: "small",
                                                      variant: "outlined",
                                                      color: "red"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Revoke admin permission")
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick"])
                                                  ])) : createCommentVNode("", true)
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
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="mt-5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_v_btn, {
                                onClick: ($event) => teamMemberModal.value.openMember(null, "admin")
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Add Admin`);
                                  } else {
                                    return [
                                      createTextVNode("Add Admin")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode("p", { class: "text-2xl" }, "Admins"),
                                  createVNode(_sfc_main$5, { gap: "3" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(props.admins, (admin) => {
                                        return openBlock(), createBlock(_component_v_card, {
                                          color: "white",
                                          elevation: "2",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "p-4" }, [
                                              createVNode(_sfc_main$6, {
                                                center: true,
                                                justify: "between"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("p", null, toDisplayString(admin.email) + " (" + toDisplayString(admin.name) + ")", 1),
                                                  admin.can_be_removed ? (openBlock(), createBlock("div", { key: 0 }, [
                                                    createVNode(_component_v_btn, {
                                                      onClick: withModifiers(($event) => revokeAdmin(admin.email), ["prevent"]),
                                                      size: "small",
                                                      variant: "outlined",
                                                      color: "red"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Revoke admin permission")
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick"])
                                                  ])) : createCommentVNode("", true)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 256))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "mt-5" }, [
                                    createVNode(_component_v_btn, {
                                      onClick: withModifiers(($event) => teamMemberModal.value.openMember(null, "admin"), ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Add Admin")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode("p", { class: "text-2xl" }, "Admins"),
                                createVNode(_sfc_main$5, { gap: "3" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(props.admins, (admin) => {
                                      return openBlock(), createBlock(_component_v_card, {
                                        color: "white",
                                        elevation: "2",
                                        rounded: "lg"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "p-4" }, [
                                            createVNode(_sfc_main$6, {
                                              center: true,
                                              justify: "between"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("p", null, toDisplayString(admin.email) + " (" + toDisplayString(admin.name) + ")", 1),
                                                admin.can_be_removed ? (openBlock(), createBlock("div", { key: 0 }, [
                                                  createVNode(_component_v_btn, {
                                                    onClick: withModifiers(($event) => revokeAdmin(admin.email), ["prevent"]),
                                                    size: "small",
                                                    variant: "outlined",
                                                    color: "red"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Revoke admin permission")
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"])
                                                ])) : createCommentVNode("", true)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 256))
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt-5" }, [
                                  createVNode(_component_v_btn, {
                                    onClick: withModifiers(($event) => teamMemberModal.value.openMember(null, "admin"), ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Add Admin")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ])
                              ])
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
                    createVNode(_sfc_main$5, null, {
                      default: withCtx(() => [
                        createVNode(_component_v_card, {
                          color: "grey-lighten-3",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "p-4" }, [
                              createVNode("p", { class: "text-2xl" }, "Team"),
                              props.members.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("p", { class: "mb-5" }, 'To remove a team member, enter "remove user" as their name and update'),
                                createVNode(_sfc_main$5, { gap: "3" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(props.members, (member) => {
                                      return openBlock(), createBlock(_component_v_card, {
                                        elevation: "2",
                                        rounded: "lg"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_card_item, null, {
                                            default: withCtx(() => [
                                              createVNode(_sfc_main$5, null, {
                                                default: withCtx(() => [
                                                  createVNode("p", { class: "text-grey-darken-3" }, toDisplayString(member.user.email) + " (" + toDisplayString(member.user.name) + ")", 1),
                                                  createVNode("div", { class: "flex gap-3" }, [
                                                    createVNode(_component_v_text_field, {
                                                      modelValue: member.localName,
                                                      "onUpdate:modelValue": ($event) => member.localName = $event,
                                                      "hide-details": ""
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                    createVNode(_component_v_radio_group, {
                                                      inline: "",
                                                      "hide-details": "",
                                                      modelValue: member.localPermission,
                                                      "onUpdate:modelValue": ($event) => member.localPermission = $event
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_v_radio, {
                                                          label: "Front",
                                                          value: "front"
                                                        }),
                                                        createVNode(_component_v_radio, {
                                                          label: "Baker",
                                                          value: "baker"
                                                        })
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["modelValue", "onUpdate:modelValue"]),
                                                    createVNode(_component_v_btn, {
                                                      onClick: withModifiers(($event) => updateMember(member), ["prevent"])
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Update")
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick"])
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
                                    }), 256))
                                  ]),
                                  _: 1
                                })
                              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("p", null, "The team doesn't have any members yet.")
                              ])),
                              createVNode("div", { class: "mt-5" }, [
                                createVNode(_component_v_btn, {
                                  onClick: withModifiers(($event) => teamMemberModal.value.openMember(null, "team"), ["prevent"])
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Add team member")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$5, null, {
                      default: withCtx(() => [
                        createVNode(_component_v_card, {
                          color: "grey-lighten-3",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "p-4" }, [
                              createVNode("p", { class: "text-2xl" }, "Admins"),
                              createVNode(_sfc_main$5, { gap: "3" }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(props.admins, (admin) => {
                                    return openBlock(), createBlock(_component_v_card, {
                                      color: "white",
                                      elevation: "2",
                                      rounded: "lg"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "p-4" }, [
                                          createVNode(_sfc_main$6, {
                                            center: true,
                                            justify: "between"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("p", null, toDisplayString(admin.email) + " (" + toDisplayString(admin.name) + ")", 1),
                                              admin.can_be_removed ? (openBlock(), createBlock("div", { key: 0 }, [
                                                createVNode(_component_v_btn, {
                                                  onClick: withModifiers(($event) => revokeAdmin(admin.email), ["prevent"]),
                                                  size: "small",
                                                  variant: "outlined",
                                                  color: "red"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Revoke admin permission")
                                                  ]),
                                                  _: 2
                                                }, 1032, ["onClick"])
                                              ])) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 256))
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "mt-5" }, [
                                createVNode(_component_v_btn, {
                                  onClick: withModifiers(($event) => teamMemberModal.value.openMember(null, "admin"), ["prevent"])
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Add Admin")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ])
                            ])
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
              errors: props.errors,
              ref_key: "teamMemberModal",
              ref: teamMemberModal,
              onRefresh: refreshData
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$5, { gap: "4" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$5, null, {
                    default: withCtx(() => [
                      createVNode(_component_v_card, {
                        color: "grey-lighten-3",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-4" }, [
                            createVNode("p", { class: "text-2xl" }, "Team"),
                            props.members.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "mb-5" }, 'To remove a team member, enter "remove user" as their name and update'),
                              createVNode(_sfc_main$5, { gap: "3" }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(props.members, (member) => {
                                    return openBlock(), createBlock(_component_v_card, {
                                      elevation: "2",
                                      rounded: "lg"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_card_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_sfc_main$5, null, {
                                              default: withCtx(() => [
                                                createVNode("p", { class: "text-grey-darken-3" }, toDisplayString(member.user.email) + " (" + toDisplayString(member.user.name) + ")", 1),
                                                createVNode("div", { class: "flex gap-3" }, [
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: member.localName,
                                                    "onUpdate:modelValue": ($event) => member.localName = $event,
                                                    "hide-details": ""
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                  createVNode(_component_v_radio_group, {
                                                    inline: "",
                                                    "hide-details": "",
                                                    modelValue: member.localPermission,
                                                    "onUpdate:modelValue": ($event) => member.localPermission = $event
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_v_radio, {
                                                        label: "Front",
                                                        value: "front"
                                                      }),
                                                      createVNode(_component_v_radio, {
                                                        label: "Baker",
                                                        value: "baker"
                                                      })
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["modelValue", "onUpdate:modelValue"]),
                                                  createVNode(_component_v_btn, {
                                                    onClick: withModifiers(($event) => updateMember(member), ["prevent"])
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Update")
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"])
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
                                  }), 256))
                                ]),
                                _: 1
                              })
                            ])) : (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("p", null, "The team doesn't have any members yet.")
                            ])),
                            createVNode("div", { class: "mt-5" }, [
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(($event) => teamMemberModal.value.openMember(null, "team"), ["prevent"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Add team member")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$5, null, {
                    default: withCtx(() => [
                      createVNode(_component_v_card, {
                        color: "grey-lighten-3",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-4" }, [
                            createVNode("p", { class: "text-2xl" }, "Admins"),
                            createVNode(_sfc_main$5, { gap: "3" }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(props.admins, (admin) => {
                                  return openBlock(), createBlock(_component_v_card, {
                                    color: "white",
                                    elevation: "2",
                                    rounded: "lg"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "p-4" }, [
                                        createVNode(_sfc_main$6, {
                                          center: true,
                                          justify: "between"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("p", null, toDisplayString(admin.email) + " (" + toDisplayString(admin.name) + ")", 1),
                                            admin.can_be_removed ? (openBlock(), createBlock("div", { key: 0 }, [
                                              createVNode(_component_v_btn, {
                                                onClick: withModifiers(($event) => revokeAdmin(admin.email), ["prevent"]),
                                                size: "small",
                                                variant: "outlined",
                                                color: "red"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Revoke admin permission")
                                                ]),
                                                _: 2
                                              }, 1032, ["onClick"])
                                            ])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 256))
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "mt-5" }, [
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(($event) => teamMemberModal.value.openMember(null, "admin"), ["prevent"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Add Admin")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_sfc_main$1, {
                errors: props.errors,
                ref_key: "teamMemberModal",
                ref: teamMemberModal,
                onRefresh: refreshData
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Team/Members.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
