import { ref, computed, reactive, resolveComponent, unref, withCtx, createVNode, toDisplayString, createTextVNode, withModifiers, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { A as AppLayout } from "./BT2Gi1aL-2117352433356.js";
import { Head } from "@inertiajs/vue3";
import { W as Wrapper } from "./CbcLIE-O-3135473238126.js";
import { _ as _sfc_main$1 } from "./BGTMc6Vz-1731362423358.js";
import "./CznY329j-2334615712833.js";
import { _ as _sfc_main$2 } from "./kZV6a-x4-2437327355113.js";
import "./BW6cC8iL-1754723312335.js";
import "vuetify";
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
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "GiftCards",
  __ssrInlineRender: true,
  props: {},
  setup(__props) {
    ref(true);
    const selectedAmount = ref(20);
    const amount = ref(20);
    ref("");
    const selectAmount = (value) => {
      typedAmount.value = "";
      selectedAmount.value = value;
      amount.value = value;
    };
    const typedAmount = ref("");
    const enteredEmail = ref("");
    ref("");
    const recipientEmail = ref("");
    const selectedRecipientEmail = computed(() => {
      const email = recipientEmail.value;
      const isValid = email.includes("@") && email.includes(".") && email.indexOf("@") > 0 && email.indexOf(".") - email.indexOf("@") > 2 && email.length - email.indexOf(".") > 2;
      return isValid ? email : "janedoe@example.com";
    });
    function isValidUrl(url) {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    }
    const typeAmount = (event) => {
      if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
        return;
      }
      let value = typedAmount.value.replace(/[^0-9]/g, "").replace(/^0+/, "");
      value = isNaN(value) || !value ? 20 : value;
      value = value > 1e3 || value < 10 ? 20 : value;
      selectedAmount.value = value;
      amount.value = value;
      if (value.length > 0 || isNaN(typedAmount.value)) {
        typedAmount.value = value;
      }
    };
    const formattedAmount = computed(() => {
      return Number(selectedAmount.value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    });
    const errors = reactive({});
    const isOrdering = ref(false);
    const checkout = () => {
      isOrdering.value = true;
      Object.keys(errors).forEach((key) => delete errors[key]);
      axios.post(route("gift_card_checkout"), {
        recipient: recipientEmail.value,
        email: enteredEmail.value,
        amount: amount.value
      }).then((response) => {
        const url = response.data.url;
        if (url === "error") {
          isOrdering.value = false;
          console.log("An error occurred");
        } else if (isValidUrl(url)) {
          window.location.href = url;
        } else {
          isOrdering.value = false;
          console.log("Invalid URL");
        }
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const responseErrors = error.response.data.errors;
          Object.keys(responseErrors).forEach((key) => {
            errors[key] = responseErrors[key];
          });
        } else {
          errors.value = ["An unexpected error occurred. Please try again."];
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_img = resolveComponent("v-img");
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_btn = resolveComponent("v-btn");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Gift cards" }, null, _parent));
      _push(ssrRenderComponent(Wrapper, { style: { "margin-top": "150px" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, {
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="max-w-3xl mx-auto"${_scopeId2}> Welcome to our Gift Card page! Whether you&#39;re looking for the perfect present or want to give the gift of choice, our gift cards make it easy. Choose the amount, personalize your message, and send it instantly—ideal for any occasion! </div>`);
                } else {
                  return [
                    createVNode("div", { class: "max-w-3xl mx-auto" }, " Welcome to our Gift Card page! Whether you're looking for the perfect present or want to give the gift of choice, our gift cards make it easy. Choose the amount, personalize your message, and send it instantly—ideal for any occasion! ")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-center"${_scopeId2}><div class="text-center"${_scopeId2}><h1 class="text-6xl brand uppercase"${_scopeId2}>Gift cards</h1></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("h1", { class: "text-6xl brand uppercase" }, "Gift cards")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mt-20 mb-10"${_scopeId}><div class="max-w-xl mx-auto rounded-xl overflow-hidden shadow-xl"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_img, {
              gradient: "to top left, rgba(255,255,255,0), rgba(255,255,255,.4)",
              "aspect-ratio": "1.7",
              color: "#f99c19"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-full h-full flex flex-col justify-between p-10"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, null, null, _parent3, _scopeId2));
                  _push3(`<p class="text-lg lg:text-3xl w-full"${_scopeId2}>XXXX XXXX XXXX XXXX</p><p class="text-md lg:text-2xl w-full"${_scopeId2}>To: ${ssrInterpolate(selectedRecipientEmail.value)}</p><p class="text-3xl lg:text-8xl w-full text-right"${_scopeId2}>$${ssrInterpolate(selectedAmount.value)}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-full h-full flex flex-col justify-between p-10" }, [
                      createVNode(_sfc_main$2),
                      createVNode("p", { class: "text-lg lg:text-3xl w-full" }, "XXXX XXXX XXXX XXXX"),
                      createVNode("p", { class: "text-md lg:text-2xl w-full" }, "To: " + toDisplayString(selectedRecipientEmail.value), 1),
                      createVNode("p", { class: "text-3xl lg:text-8xl w-full text-right" }, "$" + toDisplayString(selectedAmount.value), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="max-w-sm mx-auto mb-10"${_scopeId}><div class="flex flex-row justify-center mt-0"${_scopeId}><div class="w-full"${_scopeId}><div class="w-full text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, { class: "mb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Recipient&#39;s email address`);
                } else {
                  return [
                    createTextVNode("Recipient's email address")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: recipientEmail.value,
              "onUpdate:modelValue": ($event) => recipientEmail.value = $event,
              "error-messages": errors.recipient
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="flex flex-row justify-center items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => selectAmount(10),
              style: { "height": "40px" },
              size: "large",
              variant: selectedAmount.value === 10 ? "flat" : "outlined"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`10`);
                } else {
                  return [
                    createTextVNode("10")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => selectAmount(20),
              style: { "height": "40px" },
              size: "large",
              variant: selectedAmount.value === 20 ? "flat" : "outlined"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`20`);
                } else {
                  return [
                    createTextVNode("20")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => selectAmount(50),
              style: { "height": "40px" },
              size: "large",
              variant: selectedAmount.value === 50 ? "flat" : "outlined"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`50`);
                } else {
                  return [
                    createTextVNode("50")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => selectAmount(100),
              style: { "height": "40px" },
              size: "large",
              variant: selectedAmount.value === 100 ? "flat" : "outlined"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`100`);
                } else {
                  return [
                    createTextVNode("100")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div style="${ssrRenderStyle({ "width": "160px", "height": "40px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_text_field, {
              onKeyup: ($event) => typeAmount($event),
              modelValue: typedAmount.value,
              "onUpdate:modelValue": ($event) => typedAmount.value = $event,
              density: "compact",
              label: "Custom amount",
              style: { "width": "100% !important", "height": "100% !important" },
              "hide-details": ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="max-w-sm mx-auto"${_scopeId}><div class="flex flex-row justify-center mt-10"${_scopeId}><p class="text-2xl"${_scopeId}>Total: $${ssrInterpolate(formattedAmount.value)}</p></div>`);
            if (!_ctx.$page.props.auth.user) {
              _push2(`<div class="flex flex-row justify-center mt-10"${_scopeId}><div class="w-full"${_scopeId}><div class="w-full text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_label, { class: "mb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Your email address`);
                  } else {
                    return [
                      createTextVNode("Your email address")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_v_text_field, {
                modelValue: enteredEmail.value,
                "onUpdate:modelValue": ($event) => enteredEmail.value = $event,
                "error-messages": errors.email,
                hint: "Your e-mail address is necessary to check out as a guest",
                "persistent-hint": ""
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex flex-row justify-center mt-10"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_btn, {
              disabled: isOrdering.value,
              class: "rounded-pill",
              onClick: checkout
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(isOrdering.value ? "Processing" : "Place order")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(isOrdering.value ? "Processing" : "Place order"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(_sfc_main$1, null, {
                description: withCtx(() => [
                  createVNode("div", { class: "max-w-3xl mx-auto" }, " Welcome to our Gift Card page! Whether you're looking for the perfect present or want to give the gift of choice, our gift cards make it easy. Choose the amount, personalize your message, and send it instantly—ideal for any occasion! ")
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h1", { class: "text-6xl brand uppercase" }, "Gift cards")
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("div", { class: "mt-20 mb-10" }, [
                createVNode("div", { class: "max-w-xl mx-auto rounded-xl overflow-hidden shadow-xl" }, [
                  createVNode(_component_v_img, {
                    gradient: "to top left, rgba(255,255,255,0), rgba(255,255,255,.4)",
                    "aspect-ratio": "1.7",
                    color: "#f99c19"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-full h-full flex flex-col justify-between p-10" }, [
                        createVNode(_sfc_main$2),
                        createVNode("p", { class: "text-lg lg:text-3xl w-full" }, "XXXX XXXX XXXX XXXX"),
                        createVNode("p", { class: "text-md lg:text-2xl w-full" }, "To: " + toDisplayString(selectedRecipientEmail.value), 1),
                        createVNode("p", { class: "text-3xl lg:text-8xl w-full text-right" }, "$" + toDisplayString(selectedAmount.value), 1)
                      ])
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode("div", { class: "max-w-sm mx-auto mb-10" }, [
                createVNode("div", { class: "flex flex-row justify-center mt-0" }, [
                  createVNode("div", { class: "w-full" }, [
                    createVNode("div", { class: "w-full text-center" }, [
                      createVNode(_component_v_label, { class: "mb-2" }, {
                        default: withCtx(() => [
                          createTextVNode("Recipient's email address")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_text_field, {
                        modelValue: recipientEmail.value,
                        "onUpdate:modelValue": ($event) => recipientEmail.value = $event,
                        "error-messages": errors.recipient
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "flex flex-row justify-center items-center gap-3" }, [
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => selectAmount(10), ["prevent"]),
                  style: { "height": "40px" },
                  size: "large",
                  variant: selectedAmount.value === 10 ? "flat" : "outlined"
                }, {
                  default: withCtx(() => [
                    createTextVNode("10")
                  ]),
                  _: 1
                }, 8, ["onClick", "variant"]),
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => selectAmount(20), ["prevent"]),
                  style: { "height": "40px" },
                  size: "large",
                  variant: selectedAmount.value === 20 ? "flat" : "outlined"
                }, {
                  default: withCtx(() => [
                    createTextVNode("20")
                  ]),
                  _: 1
                }, 8, ["onClick", "variant"]),
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => selectAmount(50), ["prevent"]),
                  style: { "height": "40px" },
                  size: "large",
                  variant: selectedAmount.value === 50 ? "flat" : "outlined"
                }, {
                  default: withCtx(() => [
                    createTextVNode("50")
                  ]),
                  _: 1
                }, 8, ["onClick", "variant"]),
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => selectAmount(100), ["prevent"]),
                  style: { "height": "40px" },
                  size: "large",
                  variant: selectedAmount.value === 100 ? "flat" : "outlined"
                }, {
                  default: withCtx(() => [
                    createTextVNode("100")
                  ]),
                  _: 1
                }, 8, ["onClick", "variant"]),
                createVNode("div", { style: { "width": "160px", "height": "40px" } }, [
                  createVNode(_component_v_text_field, {
                    onKeyup: ($event) => typeAmount($event),
                    modelValue: typedAmount.value,
                    "onUpdate:modelValue": ($event) => typedAmount.value = $event,
                    density: "compact",
                    label: "Custom amount",
                    style: { "width": "100% !important", "height": "100% !important" },
                    "hide-details": ""
                  }, null, 8, ["onKeyup", "modelValue", "onUpdate:modelValue"])
                ])
              ]),
              createVNode("div", { class: "max-w-sm mx-auto" }, [
                createVNode("div", { class: "flex flex-row justify-center mt-10" }, [
                  createVNode("p", { class: "text-2xl" }, "Total: $" + toDisplayString(formattedAmount.value), 1)
                ]),
                !_ctx.$page.props.auth.user ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex flex-row justify-center mt-10"
                }, [
                  createVNode("div", { class: "w-full" }, [
                    createVNode("div", { class: "w-full text-center" }, [
                      createVNode(_component_v_label, { class: "mb-2" }, {
                        default: withCtx(() => [
                          createTextVNode("Your email address")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_text_field, {
                        modelValue: enteredEmail.value,
                        "onUpdate:modelValue": ($event) => enteredEmail.value = $event,
                        "error-messages": errors.email,
                        hint: "Your e-mail address is necessary to check out as a guest",
                        "persistent-hint": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex flex-row justify-center mt-10" }, [
                  createVNode(_component_v_btn, {
                    disabled: isOrdering.value,
                    class: "rounded-pill",
                    onClick: withModifiers(checkout, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(isOrdering.value ? "Processing" : "Place order"), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/GiftCards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
