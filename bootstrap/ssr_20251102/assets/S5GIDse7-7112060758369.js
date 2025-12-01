import { ref, reactive, onMounted, nextTick, resolveComponent, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, withModifiers, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { A as AppLayout } from "./BQTBzxda-1835617976051.js";
import { Head, router } from "@inertiajs/vue3";
import { W as Wrapper } from "./CKjt-vIU-6617638167690.js";
import { _ as _sfc_main$1 } from "./BGTMc6Vz-1916666776038.js";
import { useDisplay } from "vuetify";
import { f as formatTitle } from "./DEmmWHtk-6761739876106.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./1tPrXgE0-4581736670159.js";
import "./BPBs_0V9-9736651018597.js";
import "./C6q4kDV--1536774619085.js";
import "./DsvTyKEu-3067955167518.js";
import "./CeVcRmCk-1577655618930.js";
import "./Cyl_ukyB-5873697610160.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "Contact",
  __ssrInlineRender: true,
  props: {
    content: Object,
    errors: Object,
    meta_description: { type: String, default: "" },
    is_production: { type: Boolean, default: false }
  },
  setup(__props) {
    useDisplay();
    const props = __props;
    const subjectOptions = ref([
      "Choose",
      "Order for a company",
      "Quote request for an event",
      "Potential partnership",
      "Press-related",
      "Order-related",
      "Job application"
    ]);
    ref("Choose");
    const form = reactive({});
    const resetForm = () => {
      form.name = "";
      form.email = "";
      form.phone = "";
      form.subject = "Choose";
      form.message = "";
    };
    const local_errors = ref({});
    onMounted(() => {
      nextTick(() => {
        resetForm();
      });
    });
    const sendButtonClass = ref("bg-black");
    const sendButtonText = ref("Send message");
    const updateSendButton = (action = "reset") => {
      if (action === "processing") {
        sendButtonClass.value = "bg-black";
        sendButtonText.value = "Sending...";
      } else if (action === "success") {
        sendButtonClass.value = "bg-green";
        sendButtonText.value = "Message sent!";
      } else if (action === "error") {
        sendButtonClass.value = "bg-red";
        sendButtonText.value = "Error";
      } else {
        sendButtonClass.value = "bg-black";
        sendButtonText.value = "Send message";
      }
    };
    const sendMessage = () => {
      local_errors.value = {};
      updateSendButton("processing");
      router.post(route("send_message"), form, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          updateSendButton("success");
          setTimeout(() => {
            updateSendButton();
            resetForm();
          }, 3e3);
        },
        onError: (error) => {
          local_errors.value = props.errors;
          updateSendButton("error");
          setTimeout(() => {
            updateSendButton();
          }, 3e3);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_select = resolveComponent("v-select");
      const _component_v_textarea = resolveComponent("v-textarea");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Contact Us</title>`);
            if (props.meta_description) {
              _push2(`<meta name="description"${ssrRenderAttr("content", props.meta_description)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta name="robots"${ssrRenderAttr("content", props.is_production ?? false ? "index, follow" : "noindex, nofollow")}${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Contact Us"),
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
                  _push3(`<p${_scopeId2}>${props.content.introduction ?? ""}</p>`);
                } else {
                  return [
                    createVNode("p", {
                      innerHTML: props.content.introduction
                    }, null, 8, ["innerHTML"])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-center"${_scopeId2}><div class="text-center"${_scopeId2}><h1 class="text-6xl brand uppercase"${_scopeId2}>${unref(formatTitle)(props.content.title) ?? ""}</h1></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("h1", {
                          class: "text-6xl brand uppercase",
                          innerHTML: unref(formatTitle)(props.content.title)
                        }, null, 8, ["innerHTML"])
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
                    innerHTML: props.content.introduction
                  }, null, 8, ["innerHTML"])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h1", {
                        class: "text-6xl brand uppercase",
                        innerHTML: unref(formatTitle)(props.content.title)
                      }, null, 8, ["innerHTML"])
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
      _push(ssrRenderComponent(Wrapper, { maxWidth: "max-w-2xl" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-5xl overflow-hidden"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_card, { color: "grey-lighten-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-10 pt-10 pb-5"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_label, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_text_field, {
                    variant: "filled",
                    color: "white",
                    modelValue: form.name,
                    "onUpdate:modelValue": ($event) => form.name = $event,
                    "error-messages": local_errors.value.name
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_label, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email`);
                      } else {
                        return [
                          createTextVNode("Email")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_text_field, {
                    variant: "filled",
                    color: "white",
                    modelValue: form.email,
                    "onUpdate:modelValue": ($event) => form.email = $event,
                    "error-messages": local_errors.value.email
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_label, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Phone`);
                      } else {
                        return [
                          createTextVNode("Phone")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_text_field, {
                    variant: "filled",
                    color: "white",
                    modelValue: form.phone,
                    "onUpdate:modelValue": ($event) => form.phone = $event,
                    "error-messages": local_errors.value.phone
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_label, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Subject`);
                      } else {
                        return [
                          createTextVNode("Subject")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_select, {
                    variant: "filled",
                    "bg-color": "white",
                    modelValue: form.subject,
                    "onUpdate:modelValue": ($event) => form.subject = $event,
                    items: subjectOptions.value,
                    "error-messages": local_errors.value.subject
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_label, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Message`);
                      } else {
                        return [
                          createTextVNode("Message")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_textarea, {
                    variant: "filled",
                    "bg-color": "white",
                    modelValue: form.message,
                    "onUpdate:modelValue": ($event) => form.message = $event,
                    "error-messages": local_errors.value.message
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "px-10 pt-10 pb-5" }, [
                      createVNode("div", null, [
                        createVNode(_component_v_label, null, {
                          default: withCtx(() => [
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_text_field, {
                          variant: "filled",
                          color: "white",
                          modelValue: form.name,
                          "onUpdate:modelValue": ($event) => form.name = $event,
                          "error-messages": local_errors.value.name
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_v_label, null, {
                          default: withCtx(() => [
                            createTextVNode("Email")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_text_field, {
                          variant: "filled",
                          color: "white",
                          modelValue: form.email,
                          "onUpdate:modelValue": ($event) => form.email = $event,
                          "error-messages": local_errors.value.email
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
                          variant: "filled",
                          color: "white",
                          modelValue: form.phone,
                          "onUpdate:modelValue": ($event) => form.phone = $event,
                          "error-messages": local_errors.value.phone
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_v_label, null, {
                          default: withCtx(() => [
                            createTextVNode("Subject")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_select, {
                          variant: "filled",
                          "bg-color": "white",
                          modelValue: form.subject,
                          "onUpdate:modelValue": ($event) => form.subject = $event,
                          items: subjectOptions.value,
                          "error-messages": local_errors.value.subject
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_v_label, null, {
                          default: withCtx(() => [
                            createTextVNode("Message")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_textarea, {
                          variant: "filled",
                          "bg-color": "white",
                          modelValue: form.message,
                          "onUpdate:modelValue": ($event) => form.message = $event,
                          "error-messages": local_errors.value.message
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="text-center mt-7"${_scopeId}><div class="${ssrRenderClass([sendButtonClass.value, "cursor-pointer inline-block rounded-pill p-7 py-3 text-xl px-lg-5 py-lg-2 text-lg-lg"])}"${_scopeId}>${ssrInterpolate(sendButtonText.value)}</div></div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-5xl overflow-hidden" }, [
                createVNode(_component_v_card, { color: "grey-lighten-3" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "px-10 pt-10 pb-5" }, [
                      createVNode("div", null, [
                        createVNode(_component_v_label, null, {
                          default: withCtx(() => [
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_text_field, {
                          variant: "filled",
                          color: "white",
                          modelValue: form.name,
                          "onUpdate:modelValue": ($event) => form.name = $event,
                          "error-messages": local_errors.value.name
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_v_label, null, {
                          default: withCtx(() => [
                            createTextVNode("Email")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_text_field, {
                          variant: "filled",
                          color: "white",
                          modelValue: form.email,
                          "onUpdate:modelValue": ($event) => form.email = $event,
                          "error-messages": local_errors.value.email
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
                          variant: "filled",
                          color: "white",
                          modelValue: form.phone,
                          "onUpdate:modelValue": ($event) => form.phone = $event,
                          "error-messages": local_errors.value.phone
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_v_label, null, {
                          default: withCtx(() => [
                            createTextVNode("Subject")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_select, {
                          variant: "filled",
                          "bg-color": "white",
                          modelValue: form.subject,
                          "onUpdate:modelValue": ($event) => form.subject = $event,
                          items: subjectOptions.value,
                          "error-messages": local_errors.value.subject
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_v_label, null, {
                          default: withCtx(() => [
                            createTextVNode("Message")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_textarea, {
                          variant: "filled",
                          "bg-color": "white",
                          modelValue: form.message,
                          "onUpdate:modelValue": ($event) => form.message = $event,
                          "error-messages": local_errors.value.message
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "text-center mt-7" }, [
                createVNode("div", {
                  onClick: withModifiers(sendMessage, ["prevent"]),
                  class: ["cursor-pointer inline-block rounded-pill p-7 py-3 text-xl px-lg-5 py-lg-2 text-lg-lg", sendButtonClass.value]
                }, toDisplayString(sendButtonText.value), 3)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
