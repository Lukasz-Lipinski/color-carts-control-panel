"use strict";(self.webpackChunkcolor_carts_control_panel=self.webpackChunkcolor_carts_control_panel||[]).push([[988],{4988:(N,l,i)=>{i.r(l),i.d(l,{CreateProductComponent:()=>I});var p=i(4466),d=i(4960),g=i(4351),f=i(9646),e=i(8256),m=i(2205),C=i(1637),t=i(433),s=i(6895);function h(n,a){if(1&n&&(e.TgZ(0,"label",14)(1,"span",15),e._uU(2),e.ALo(3,"uppercase"),e.qZA(),e._UZ(4,"input",16),e.qZA()),2&n){const o=a.$implicit,r=e.oxw();e.xp6(2),e.Oqu(e.lcZ(3,3,o.label)),e.xp6(2),e.Q6J("ngClass",r.checkIfValid(o.name)?"is-valid":"is-invalid")("formControlName",o.name)}}function v(n,a){if(1&n&&(e.TgZ(0,"option",17),e._uU(1),e.ALo(2,"uppercase"),e.qZA()),2&n){const o=a.$implicit,r=a.index;e.Q6J("value",o.mainCategory)("selected",0===r),e.xp6(1),e.hij(" ",e.lcZ(2,3,o.mainCategory)," ")}}function P(n,a){if(1&n&&(e.TgZ(0,"option",18),e._uU(1),e.ALo(2,"uppercase"),e.qZA()),2&n){const o=a.$implicit;e.Q6J("value",o),e.xp6(1),e.hij(" ",e.lcZ(2,2,o)," ")}}let b=(()=>{class n{constructor(o){this.createProductService=o,this.newProductEmitter=new e.vpe}ngOnInit(){this.fields=this.createProductService.getFields(),this.categories=this.createProductService.getCategories(),this.subcategories=this.categories[0].subcategories,this.createProductForm=new t.cw({name:new t.NI("",{nonNullable:!0,validators:[t.kI.required]}),model:new t.NI("",{nonNullable:!0,validators:[t.kI.required]}),brand:new t.NI("",{nonNullable:!0,validators:[t.kI.required]}),ean:new t.NI(0,{nonNullable:!0,validators:[t.kI.required,t.kI.pattern(/^\d+$/),t.kI.min(1e3)]}),price:new t.NI(0,{nonNullable:!0,validators:[t.kI.required,t.kI.pattern(/^[0-9]*(\.[0-9]{0,2})?$/),t.kI.min(1)]}),amount:new t.NI(0,{nonNullable:!0,validators:[t.kI.required,t.kI.pattern(/^\d+$/),t.kI.min(1)]}),category:new t.NI(this.categories[0].mainCategory,{nonNullable:!0,validators:[t.kI.required]}),subcategory:new t.NI(this.subcategories[0],{nonNullable:!0,validators:[t.kI.required]}),description:new t.NI("",{nonNullable:!0,validators:[t.kI.required,t.kI.maxLength(400)]})})}checkIfValid(o){return this.createProductForm.controls[o]&&this.createProductForm.controls[o].valid}isDisabled(){return this.createProductForm.invalid}onSetIndex(o){this.subcategories=this.categories[o.target.options.selectedIndex].subcategories,this.createProductForm.controls.subcategory.setValue(this.subcategories[0])}onSubmit(){let o={name:"",brand:"",ean:0,price:0,amount:0,category:"",subcategory:"",description:"",model:""};for(let[r,c]of Object.entries(this.createProductForm.controls))Object.defineProperty(o,r,{value:parseFloat(c.value)?parseFloat(c.value):c.value});this.newProductEmitter.emit(o),this.createProductForm.reset()}}return n.\u0275fac=function(o){return new(o||n)(e.Y36(m.a))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-create-product-form"]],outputs:{newProductEmitter:"newProductEmitter"},decls:20,vars:7,consts:[[1,"container-fluid","d-flex","flex-column","shadow","border","p-5","customWidth","rounded",3,"formGroup","ngSubmit"],[1,"text-center","h3","pb-4"],["class","input-group flex-nowrap mb-3",4,"ngFor","ngForOf"],[1,"input-group"],[1,"input-group-text"],["formControlName","category",1,"form-select",3,"change"],[3,"value","selected",4,"ngFor","ngForOf"],["formControlName","subcategory",1,"form-select"],[3,"value",4,"ngFor","ngForOf"],[1,"py-3"],[1,"h4","text-center"],["formControlName","description","rows","10",1,"form-control",3,"ngClass"],[1,"py-3","d-flex","justify-content-center"],["type","submit",1,"btn",3,"ngClass","disabled"],[1,"input-group","flex-nowrap","mb-3"],[1,"input-group-text","labelWidth"],["type","string",1,"form-control",3,"ngClass","formControlName"],[3,"value","selected"],[3,"value"]],template:function(o,r){1&o&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return r.onSubmit()}),e.TgZ(1,"h3",1),e._uU(2," Product Details "),e.qZA(),e.YNc(3,h,5,5,"label",2),e.TgZ(4,"div",3)(5,"span",4),e._uU(6,"Category"),e.qZA(),e.TgZ(7,"select",5),e.NdJ("change",function(u){return r.onSetIndex(u)}),e.YNc(8,v,3,5,"option",6),e.qZA(),e.TgZ(9,"span",4),e._uU(10,"Subcategory"),e.qZA(),e.TgZ(11,"select",7),e.YNc(12,P,3,4,"option",8),e.qZA()(),e.TgZ(13,"div",9)(14,"h4",10),e._uU(15,"Description"),e.qZA(),e._UZ(16,"textarea",11),e.qZA(),e.TgZ(17,"div",12)(18,"button",13),e._uU(19," Add product "),e.qZA()()()),2&o&&(e.Q6J("formGroup",r.createProductForm),e.xp6(3),e.Q6J("ngForOf",r.fields),e.xp6(5),e.Q6J("ngForOf",r.categories),e.xp6(4),e.Q6J("ngForOf",r.subcategories),e.xp6(4),e.Q6J("ngClass",r.checkIfValid("description")?"is-valid":"is-invalid"),e.xp6(2),e.Q6J("ngClass",r.isDisabled()?"btn-outline-danger":"btn-outline-success")("disabled",r.isDisabled()))},dependencies:[s.mk,s.sg,t._Y,t.YN,t.Kr,t.Fj,t.EJ,t.JJ,t.JL,t.sg,t.u,s.gd],styles:[".customWidth[_ngcontent-%COMP%]{max-width:40rem;min-width:35rem}.labelWidth[_ngcontent-%COMP%]{width:9rem}textarea[_ngcontent-%COMP%]{resize:none}"],changeDetection:0}),n})();function F(n,a){}let I=(()=>{class n{constructor(o,r){this.createProductService=o,this.toastService=r}ngOnInit(){}onDispatchProductToBackend(o){this.createProductService.dispatchProductToBackend(o).pipe((0,g.b)(r=>(this.toastService.createComponent(this.toast,r),(0,f.of)(r)))).subscribe()}}return n.\u0275fac=function(o){return new(o||n)(e.Y36(m.a),e.Y36(C.k))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-create-product"]],viewQuery:function(o,r){if(1&o&&e.Gf(d._,7),2&o){let c;e.iGM(c=e.CRH())&&(r.toast=c.first)}},standalone:!0,features:[e.jDz],decls:2,vars:0,consts:[[3,"newProductEmitter"],["appToast",""]],template:function(o,r){1&o&&(e.TgZ(0,"app-create-product-form",0),e.NdJ("newProductEmitter",function(u){return r.onDispatchProductToBackend(u)}),e.qZA(),e.YNc(1,F,0,0,"ng-template",1))},dependencies:[p.m,b,d._]}),n})()}}]);