webpackJsonp([9],{"2AnY":function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=r("Dd8w"),d=r.n(t),A=r("NYxO"),a={name:"user",data:function(){return{}},computed:d()({},Object(A.b)(["userInfo"]),{totalDetail:function(){return this.userInfo.addressInfo.cityVal+" "+this.userInfo.addressInfo.detail}}),mounted:function(){},methods:{editAddress:function(){this.$router.push({path:"/page/address"})}},filters:{formatMoney:function(e){return"￥"+e}}},s={render:function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("div",{staticClass:"user"},[r("div",{staticClass:"user-header"},[r("img",{staticClass:"avatar",attrs:{src:e.userInfo.avatarUrl,alt:""}}),e._v(" "),r("span",{staticClass:"nickname"},[e._v(e._s(e.userInfo.mobile))])]),e._v(" "),r("div",{staticClass:"user-address",on:{click:function(n){e.editAddress()}}},[this.userInfo.addressInfo?r("div",{staticClass:"address-info"},[e._m(0,!1,!1),e._v(" "),r("div",{staticClass:"address-main"},[r("div",{staticClass:"text-row"},[e._v("\n                    "+e._s(e.userInfo.addressInfo.name)+"\n                ")]),e._v(" "),r("div",{staticClass:"text-row"},[e._v("\n                    "+e._s(e.userInfo.addressInfo.mobile)+"\n                ")]),e._v(" "),r("div",{staticClass:"text-row"},[e._v("\n                    "+e._s(e.totalDetail)+"\n                ")])])]):r("div",{staticClass:"add-new-address"},[r("i",{staticClass:"icon-add"},[e._v("+")]),e._v(" "),r("span",[e._v("添加地址")])])]),e._v(" "),r("div",{staticClass:"user-order"},[r("h5",{staticClass:"order-title"},[e._v("我的订单")]),e._v(" "),e.userInfo.orderInfo.length>0?r("div",{staticClass:"order-list"},e._l(e.userInfo.orderInfo,function(n,t){return r("div",{key:t,staticClass:"order-item"},[r("div",{staticClass:"order-header"},[e._v("\n                    订单编号:\n                    "),r("span",{staticClass:"order-no"},[e._v(e._s(n.order_no))])]),e._v(" "),r("div",{staticClass:"order-main"},[r("div",{staticClass:"item-left"},[r("img",{attrs:{src:n.snap_img}})]),e._v(" "),r("div",{staticClass:"item-middle"},[r("div",[e._v(e._s(n.snap_name))]),e._v(" "),r("div",[e._v(e._s(n.total_count)+"件商品")])]),e._v(" "),r("div",{staticClass:"item-right"},[1==n.status?r("p",{staticClass:"order-status-txt unpay"},[e._v("待付款")]):2==n.status?r("p",{staticClass:"order-status-txt payed"},[e._v("已付款")]):3==n.status?r("p",{staticClass:"order-status-txt done"},[e._v("已发货")]):e._e()])]),e._v(" "),1==n.status?r("div",{staticClass:"order-footer"},[r("span",[e._v("实付:"+e._s(e._f("formatMoney")(n.total_price)))]),e._v(" "),r("button",{staticClass:"pay"},[e._v("付款")])]):e._e()])})):r("div",{staticClass:"no-data"},[e._v("\n            您还没有订单哦~\n        ")])])])},staticRenderFns:[function(){var e=this.$createElement,n=this._self._c||e;return n("h5",{staticClass:"address-title"},[this._v("地址管理\n                "),n("i",{staticClass:"icon-arrow"})])}]},o=r("VU/8")(a,s,!1,function(e){r("zXXM")},"data-v-78f1f9d8",null);n.default=o.exports},K1xf:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA8klEQVRYR+2UvW0DMQxG+QEawGO4c7KBN/AI9vUicpvkDLF3soFHyAa26yzh/i5gQCAGDggQ/RS5hmpF8Xt8EgRaeGHhfHIAN+AG3IAbKDIQY7wCuKSUupKvO8b4RkQbEXnO1ZcCDABeVPUoIv1fTS0cwL6k1voUAVjhozERdSklm/DXYmaDe1XVdxE55KavAshBMLMFnmrCqwHsADOfiWg3N9Ea3gTQ9/1qmqYPABuD+NFsk99E5KlE+7ym+A3MD80hVNW2biGE7TAM938BsBCDGMfxE8BXCGHdEt50BbUT5uqbriDXtGbfAdyAG3ADbuAb3ZFhIdRf3icAAAAASUVORK5CYII="},b49K:function(e,n,r){(e.exports=r("FZ+f")(!0)).push([e.i,"\n.user[data-v-78f1f9d8] {\n  background-color: #ededed;\n}\n.user .user-header[data-v-78f1f9d8] {\n  background-color: #ab956d;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 15px;\n  font-size: 14px;\n}\n.user .user-header .avatar[data-v-78f1f9d8] {\n  height: 50px;\n  width: 50px;\n  border-radius: 50px;\n}\n.user .user-header .nickname[data-v-78f1f9d8] {\n  margin-left: 10px;\n}\n.user .user-address[data-v-78f1f9d8] {\n  background-color: #fff;\n}\n.user .user-address .add-new-address[data-v-78f1f9d8] {\n  padding: 10px 0;\n  width: 100%;\n  color: #989898;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-size: 14px;\n}\n.user .user-address .add-new-address .icon-add[data-v-78f1f9d8] {\n  font-style: normal;\n  margin-right: 5px;\n}\n.user .user-address .address-info .address-title[data-v-78f1f9d8] {\n  font-weight: normal;\n  padding: 10px 0;\n  color: #999999;\n  text-align: center;\n  border-bottom: 1px solid #ededed;\n  font-size: 14px;\n  background-color: #fff;\n  position: relative;\n}\n.user .user-address .address-info .address-title .icon-arrow[data-v-78f1f9d8] {\n  position: absolute;\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n  height: 24px;\n  width: 24px;\n  right: 5px;\n  top: 10px;\n  background: url("+r("K1xf")+") no-repeat;\n  background-size: 100% 100%;\n  display: block;\n}\n.user .user-address .address-info .address-main .text-row[data-v-78f1f9d8] {\n  padding: 10px 15px 10px 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #e9e9e9;\n  margin-left: 15px;\n  height: 45px;\n  font-size: 14px;\n  color: #7c7c7c;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.user .user-address .address-info .address-main .text-row[data-v-78f1f9d8]:last-child {\n  border-bottom: none;\n}\n.user .user-order[data-v-78f1f9d8] {\n  margin-top: 10px;\n}\n.user .user-order .order-title[data-v-78f1f9d8] {\n  font-weight: normal;\n  padding: 10px 0;\n  color: #999999;\n  text-align: center;\n  border-bottom: 1px solid #ededed;\n  font-size: 14px;\n  background-color: #fff;\n  position: relative;\n}\n.user .user-order .order-item[data-v-78f1f9d8] {\n  margin-bottom: 10px;\n  color: #777777;\n  background-color: #fff;\n  font-size: 14px;\n}\n.user .user-order .order-item[data-v-78f1f9d8]:last-child {\n  margin-bottom: 0;\n}\n.user .user-order .order-item .order-header[data-v-78f1f9d8] {\n  margin-left: 15px;\n  border-bottom: 1px solid #ededed;\n  padding: 10px 0;\n}\n.user .user-order .order-item .order-header .order-no[data-v-78f1f9d8] {\n  margin-left: 5px;\n}\n.user .user-order .order-item .order-main[data-v-78f1f9d8] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 75px;\n  color: #6d6d6d;\n  padding: 10px 15px;\n}\n.user .user-order .order-item .order-main .item-left[data-v-78f1f9d8] {\n  -ms-flex-preferred-size: 75px;\n      flex-basis: 75px;\n  height: 100%;\n  background-color: #f5f6f5;\n  border-radius: 2px;\n}\n.user .user-order .order-item .order-main .item-left img[data-v-78f1f9d8] {\n  height: 100%;\n  width: 100%;\n}\n.user .user-order .order-item .order-main .item-middle[data-v-78f1f9d8] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin-left: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.user .user-order .order-item .order-main .item-middle div[data-v-78f1f9d8] {\n  margin: 5px 0;\n}\n.user .user-order .order-item .order-main .item-right[data-v-78f1f9d8] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-preferred-size: 60px;\n      flex-basis: 60px;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  color: #b42f2d;\n}\n.user .user-order .order-item .order-footer[data-v-78f1f9d8] {\n  margin-left: 15px;\n  border-top: 1px solid #ededed;\n  height: 45px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #2f2f2f;\n}\n.user .user-order .order-item .order-footer .pay[data-v-78f1f9d8] {\n  width: 85px;\n  height: 30px;\n  margin-right: 15px;\n  background-color: #b42f2d;\n  border-radius: 2px;\n  color: #fff;\n  text-align: center;\n  line-height: 30px;\n  border: none;\n  outline: none;\n}\n.user .user-order .order-item .order-footer .pay[data-v-78f1f9d8]:active {\n  background-color: #9a211f;\n}\n.user .user-order .no-data[data-v-78f1f9d8] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 40px;\n  font-size: 13px;\n  color: #ccc;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  background: #fff;\n}\n","",{version:3,sources:["C:/Users/Administrator/GitHub/pretty-vendor/src/pages/user/user.vue"],names:[],mappings:"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",file:"user.vue",sourcesContent:["\n.user[data-v-78f1f9d8] {\n  background-color: #ededed;\n}\n.user .user-header[data-v-78f1f9d8] {\n  background-color: #ab956d;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 15px;\n  font-size: 14px;\n}\n.user .user-header .avatar[data-v-78f1f9d8] {\n  height: 50px;\n  width: 50px;\n  border-radius: 50px;\n}\n.user .user-header .nickname[data-v-78f1f9d8] {\n  margin-left: 10px;\n}\n.user .user-address[data-v-78f1f9d8] {\n  background-color: #fff;\n}\n.user .user-address .add-new-address[data-v-78f1f9d8] {\n  padding: 10px 0;\n  width: 100%;\n  color: #989898;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-size: 14px;\n}\n.user .user-address .add-new-address .icon-add[data-v-78f1f9d8] {\n  font-style: normal;\n  margin-right: 5px;\n}\n.user .user-address .address-info .address-title[data-v-78f1f9d8] {\n  font-weight: normal;\n  padding: 10px 0;\n  color: #999999;\n  text-align: center;\n  border-bottom: 1px solid #ededed;\n  font-size: 14px;\n  background-color: #fff;\n  position: relative;\n}\n.user .user-address .address-info .address-title .icon-arrow[data-v-78f1f9d8] {\n  position: absolute;\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n  height: 24px;\n  width: 24px;\n  right: 5px;\n  top: 10px;\n  background: url(~@/assets/icon/arrow@right.png) no-repeat;\n  background-size: 100% 100%;\n  display: block;\n}\n.user .user-address .address-info .address-main .text-row[data-v-78f1f9d8] {\n  padding: 10px 15px 10px 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #e9e9e9;\n  margin-left: 15px;\n  height: 45px;\n  font-size: 14px;\n  color: #7c7c7c;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.user .user-address .address-info .address-main .text-row[data-v-78f1f9d8]:last-child {\n  border-bottom: none;\n}\n.user .user-order[data-v-78f1f9d8] {\n  margin-top: 10px;\n}\n.user .user-order .order-title[data-v-78f1f9d8] {\n  font-weight: normal;\n  padding: 10px 0;\n  color: #999999;\n  text-align: center;\n  border-bottom: 1px solid #ededed;\n  font-size: 14px;\n  background-color: #fff;\n  position: relative;\n}\n.user .user-order .order-item[data-v-78f1f9d8] {\n  margin-bottom: 10px;\n  color: #777777;\n  background-color: #fff;\n  font-size: 14px;\n}\n.user .user-order .order-item[data-v-78f1f9d8]:last-child {\n  margin-bottom: 0;\n}\n.user .user-order .order-item .order-header[data-v-78f1f9d8] {\n  margin-left: 15px;\n  border-bottom: 1px solid #ededed;\n  padding: 10px 0;\n}\n.user .user-order .order-item .order-header .order-no[data-v-78f1f9d8] {\n  margin-left: 5px;\n}\n.user .user-order .order-item .order-main[data-v-78f1f9d8] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 75px;\n  color: #6d6d6d;\n  padding: 10px 15px;\n}\n.user .user-order .order-item .order-main .item-left[data-v-78f1f9d8] {\n  -ms-flex-preferred-size: 75px;\n      flex-basis: 75px;\n  height: 100%;\n  background-color: #f5f6f5;\n  border-radius: 2px;\n}\n.user .user-order .order-item .order-main .item-left img[data-v-78f1f9d8] {\n  height: 100%;\n  width: 100%;\n}\n.user .user-order .order-item .order-main .item-middle[data-v-78f1f9d8] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin-left: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.user .user-order .order-item .order-main .item-middle div[data-v-78f1f9d8] {\n  margin: 5px 0;\n}\n.user .user-order .order-item .order-main .item-right[data-v-78f1f9d8] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-preferred-size: 60px;\n      flex-basis: 60px;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  color: #b42f2d;\n}\n.user .user-order .order-item .order-footer[data-v-78f1f9d8] {\n  margin-left: 15px;\n  border-top: 1px solid #ededed;\n  height: 45px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #2f2f2f;\n}\n.user .user-order .order-item .order-footer .pay[data-v-78f1f9d8] {\n  width: 85px;\n  height: 30px;\n  margin-right: 15px;\n  background-color: #b42f2d;\n  border-radius: 2px;\n  color: #fff;\n  text-align: center;\n  line-height: 30px;\n  border: none;\n  outline: none;\n}\n.user .user-order .order-item .order-footer .pay[data-v-78f1f9d8]:active {\n  background-color: #9a211f;\n}\n.user .user-order .no-data[data-v-78f1f9d8] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 40px;\n  font-size: 13px;\n  color: #ccc;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  background: #fff;\n}\n"],sourceRoot:""}])},zXXM:function(e,n,r){var t=r("b49K");"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);r("rjj0")("38ad5245",t,!0)}});
//# sourceMappingURL=9.5fc4a24794495ba86cad.js.map