"use strict";(self.webpackChunkcolor_carts_control_panel=self.webpackChunkcolor_carts_control_panel||[]).push([[278],{4278:(I,p,r)=>{r.r(p),r.d(p,{DashboardHomeComponent:()=>A});var c=r(4004),m=r(4960),i=r(4466),t=r(8256),d=r(8345),u=r(2205),h=r(1596),E=r(2117),D=r(2974),f=r(6199),C=r(1880),v=r(8601),l=r(6895);function g(a,s){if(1&a&&t._UZ(0,"app-products-list",6),2&a){const o=t.oxw();t.Q6J("products$",o.products$)("howManyDisplay",o.productsDetails.productsNumber)}}function M(a,s){if(1&a){const o=t.EpF();t.TgZ(0,"app-updated-form-modal",7),t.NdJ("toastEmitter",function(e){t.CHM(o);const _=t.oxw();return t.KtG(_.setToast(e))}),t.qZA()}}function P(a,s){if(1&a){const o=t.EpF();t.TgZ(0,"app-remove-modal",7),t.NdJ("toastEmitter",function(e){t.CHM(o);const _=t.oxw();return t.KtG(_.setToast(e))}),t.qZA()}}function O(a,s){if(1&a&&(t.TgZ(0,"div",8)(1,"span",9),t._uU(2),t.qZA(),t.TgZ(3,"p",10)(4,"a",11),t._uU(5," Click here "),t.qZA(),t._uU(6," to redirect to login page "),t.qZA()()),2&a){const o=t.oxw();t.xp6(2),t.Oqu(null==o.error?null:o.error.msg)}}function T(a,s){}let A=(()=>{class a{constructor(o,n,e){this.activatedRoute=o,this.createProductService=n,this.toastService=e,this.error=void 0,this.productsDetails={productsNumber:5,selectedIndex:1}}ngOnInit(){this.selectedProduct$=this.createProductService.productDetails$,this.modal$=this.createProductService.modal$,this.products$=this.activatedRoute.data.pipe((0,c.U)(({products:o})=>"status"in o?(this.error={...o},null):(this.productsDetails={...this.productsDetails,productsNumber:Math.ceil(o.length/this.productsDetails.productsNumber)},o)))}onRemoveProduct(){}setToast(o){this.toastService.createComponent(this.toast,o)}onSearch(o){this.products$=this.activatedRoute.data.pipe((0,c.U)(({products:n})=>"all"===o.category.toLowerCase()?n.filter(e=>`${e.name}${e.model}${e.brand}`.includes(o.product)):"all"!==o.category.toLowerCase()?n.filter(e=>e.category.toLowerCase()===o.category)||null:n.filter(e=>`${e.name}${e.model}${e.brand}`.includes(o.product)&&e.category.toLowerCase()===o.category)||null))}}return a.\u0275fac=function(o){return new(o||a)(t.Y36(d.gz),t.Y36(u.a),t.Y36(h.k))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-dashboard-home"]],viewQuery:function(o,n){if(1&o&&t.Gf(m._,7),2&o){let e;t.iGM(e=t.CRH())&&(n.toast=e.first)}},standalone:!0,features:[t.jDz],decls:11,vars:11,consts:[[3,"searcherEmitter"],[3,"products$","howManyDisplay",4,"ngIf","ngIfElse"],[3,"productsNumber"],[3,"toastEmitter",4,"ngIf"],["Error",""],["appToast",""],[3,"products$","howManyDisplay"],[3,"toastEmitter"],[1,"container"],[1,"lead"],[1,""],["routerLink","/",1,"link-primary"]],template:function(o,n){if(1&o&&(t.TgZ(0,"app-searcher",0),t.NdJ("searcherEmitter",function(_){return n.onSearch(_)}),t.qZA(),t.YNc(1,g,1,2,"app-products-list",1),t.ALo(2,"async"),t._UZ(3,"app-pagination",2),t.YNc(4,M,1,0,"app-updated-form-modal",3),t.ALo(5,"async"),t.YNc(6,P,1,0,"app-remove-modal",3),t.ALo(7,"async"),t.YNc(8,O,7,1,"ng-template",null,4,t.W1O),t.YNc(10,T,0,0,"ng-template",5)),2&o){const e=t.MAs(9);t.xp6(1),t.Q6J("ngIf",t.lcZ(2,5,n.products$))("ngIfElse",e),t.xp6(2),t.Q6J("productsNumber",n.productsDetails.productsNumber),t.xp6(1),t.Q6J("ngIf","update"===t.lcZ(5,7,n.modal$)),t.xp6(2),t.Q6J("ngIf","remove"===t.lcZ(7,9,n.modal$))}},dependencies:[i.m,m._,E.o,D.P,f.w,C.s,v.Q,l.O5,d.yS,l.Ov]}),a})()}}]);