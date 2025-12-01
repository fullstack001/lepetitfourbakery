import { resolveComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { A as AdmLayout } from "./BZf0ki2W-7956103712867.js";
import "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./koZmu1d6-1739686778130.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./1tPrXgE0-4581736670159.js";
import "./BQTBzxda-1835617976051.js";
import "vuetify";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./BPBs_0V9-9736651018597.js";
import "./C6q4kDV--1536774619085.js";
import "./DsvTyKEu-3067955167518.js";
import "./CeVcRmCk-1577655618930.js";
import "./Cyl_ukyB-5873697610160.js";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    payments: Object
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_table = resolveComponent("v-table");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Payments" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_table, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>Order</th><th${_scopeId2}>Amount</th><th${_scopeId2}>Captured</th><th${_scopeId2}>Card</th></tr></thead><tbody${_scopeId2}><!--[-->`);
                  ssrRenderList(props.payments.data, (payment) => {
                    _push3(`<tr${_scopeId2}><td${_scopeId2}>`);
                    if (payment.orders.length) {
                      _push3(`<!--[-->`);
                      ssrRenderList(payment.orders, (order) => {
                        _push3(`<p${_scopeId2}>${ssrInterpolate(order.number)}</p>`);
                      });
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<p${_scopeId2}>-</p>`);
                    }
                    _push3(`</td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(payment.amount_display)}</p></td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(payment.amount_captured_display)}</p></td><td${_scopeId2}><p${_scopeId2}>...${ssrInterpolate(payment.card_last_4)}</p></td></tr>`);
                  });
                  _push3(`<!--]--></tbody>`);
                } else {
                  return [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Order"),
                        createVNode("th", null, "Amount"),
                        createVNode("th", null, "Captured"),
                        createVNode("th", null, "Card")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.payments.data, (payment) => {
                        return openBlock(), createBlock("tr", null, [
                          createVNode("td", null, [
                            payment.orders.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(payment.orders, (order) => {
                              return openBlock(), createBlock("p", null, toDisplayString(order.number), 1);
                            }), 256)) : (openBlock(), createBlock("p", { key: 1 }, "-"))
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(payment.amount_display), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(payment.amount_captured_display), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, "..." + toDisplayString(payment.card_last_4), 1)
                          ])
                        ]);
                      }), 256))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              entities: props.payments
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_v_table, null, {
                default: withCtx(() => [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Order"),
                      createVNode("th", null, "Amount"),
                      createVNode("th", null, "Captured"),
                      createVNode("th", null, "Card")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.payments.data, (payment) => {
                      return openBlock(), createBlock("tr", null, [
                        createVNode("td", null, [
                          payment.orders.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(payment.orders, (order) => {
                            return openBlock(), createBlock("p", null, toDisplayString(order.number), 1);
                          }), 256)) : (openBlock(), createBlock("p", { key: 1 }, "-"))
                        ]),
                        createVNode("td", null, [
                          createVNode("p", null, toDisplayString(payment.amount_display), 1)
                        ]),
                        createVNode("td", null, [
                          createVNode("p", null, toDisplayString(payment.amount_captured_display), 1)
                        ]),
                        createVNode("td", null, [
                          createVNode("p", null, "..." + toDisplayString(payment.card_last_4), 1)
                        ])
                      ]);
                    }), 256))
                  ])
                ]),
                _: 1
              }),
              createVNode("div", null, [
                createVNode(_sfc_main$1, {
                  entities: props.payments
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Payments/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
