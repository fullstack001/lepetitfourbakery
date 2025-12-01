import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { A as AppLayout } from "./BT2Gi1aL-2117352433356.js";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CznY329j-2334615712833.js";
import { W as Wrapper } from "./CbcLIE-O-3135473238126.js";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
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
  __name: "Error",
  __ssrInlineRender: true,
  props: {},
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Error" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        wrapper: "section",
        background: "#f3c7a8"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, { wrapper: "section" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-full p-20 text-center" style="${ssrRenderStyle({ "color": "#692222" })}"${_scopeId2}><div class="py-20"${_scopeId2}><p class="text-3xl font-bold mb-4"${_scopeId2}>An error occurred</p><p class="text-xl"${_scopeId2}>Please try again later or contact Support if you need assistance.</p></div></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "w-full p-20 text-center",
                      style: { "color": "#692222" }
                    }, [
                      createVNode("div", { class: "py-20" }, [
                        createVNode("p", { class: "text-3xl font-bold mb-4" }, "An error occurred"),
                        createVNode("p", { class: "text-xl" }, "Please try again later or contact Support if you need assistance.")
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
                    class: "w-full p-20 text-center",
                    style: { "color": "#692222" }
                  }, [
                    createVNode("div", { class: "py-20" }, [
                      createVNode("p", { class: "text-3xl font-bold mb-4" }, "An error occurred"),
                      createVNode("p", { class: "text-xl" }, "Please try again later or contact Support if you need assistance.")
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Checkout/Error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
