(this.webpackJsonpLamisPlus=this.webpackJsonpLamisPlus||[]).push([[0],{533:function(e,t,a){},534:function(e,t,a){},630:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),c=a(21),i=a.n(c),o=a(41),s=a(34),l=(a(358),a(533),a(534),a(535),a(11)),d=a(10),b=a(5),j=a(444),u=a(678),O=a(691),f=a(677),h=a(115),p=a(363),g=a(332),x=a(167),m=a(38),v=a(270),y=a(633),w=a(634),S=a(667),R=a(446),C=a(666),P=a(485),B=a(78),N=a.n(B),A=new URLSearchParams(window.location.search).get("jwt"),_="/api/v1/",k=a(663),T=a(664),z=a(690),D=a(665),F=a(373),L=a(445),I=a(492),M=a.n(I),E=a(692),U=a(668),H=(a(554),a(7)),W=Object(j.a)((function(e){return{root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper,"& > * + *":{marginTop:e.spacing(2)}}}}));function V(e){var t=W(),a=Object(r.useState)([]),c=Object(l.a)(a,2),i=c[0],o=c[1],d=Object(r.useState)(!1),b=Object(l.a)(d,2),j=b[0],u=b[1],O=Object(r.useState)({facilities:[]}),f=Object(l.a)(O,2),h=f[0],p=(f[1],Object(r.useState)(!1)),g=Object(l.a)(p,2),B=g[0],I=g[1],V=n.a.useState([]),G=Object(l.a)(V,2),q=G[0],J=G[1],Y=Object(r.useState)(null),K=Object(l.a)(Y,2),Q=(K[0],K[1]),X=Object(r.useState)(!1),Z=Object(l.a)(X,2),$=Z[0],ee=Z[1];function te(){return(te=Object(v.a)(Object(x.a)().mark((function e(){return Object(x.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:N.a.get("".concat(_,"account"),{headers:{Authorization:"Bearer ".concat(A)}}).then((function(e){Q(e.data),o(e.data.applicationUserOrganisationUnits)})).catch((function(e){}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(r.useEffect)((function(){!function(){te.apply(this,arguments)}()}),[]);var ae=function(e){return function(){var t=q.indexOf(e),a=Object(m.a)(q);-1===t?a.push(e):a.splice(t,1),J(a)}},re=function(e){I(!B)};return Object(H.jsxs)("div",{children:[Object(H.jsx)(s.a,{autoClose:3e3,hideProgressBar:!0}),Object(H.jsx)(k.a,{children:Object(H.jsxs)(T.a,{children:[q.length>=1?Object(H.jsx)(H.Fragment,{children:Object(H.jsxs)(L.a,{color:"primary",variant:"contained",className:" float-right mr-1",size:"large",hidden:j,onClick:function(){return function(){u(!0),ee(!0);var t="";q.forEach((function(e){var a=e.organisationUnitId;t="facilityIds="+a})),h.facilities=t,N.a.get("".concat(_,"ndr/generate?").concat(t,"&isInitial=").concat(B),{headers:{Authorization:"Bearer ".concat(A)}}).then((function(t){window.setTimeout((function(){s.b.success(" Generating NDR Successful!"),ee(!1),e.setValue(1)}),5e3)})).catch((function(e){if(ee(!1),u(!1),s.b.error(" Something went wrong! Please contact administrator."),e.response&&e.response.data){var t=e.response.data.apierror&&""!==e.response.data.apierror.message?e.response.data.apierror.message:"Something went wrong, please try again";s.b.error(t)}else s.b.error("Something went wrong. Please try again...")}))}()},children:[Object(H.jsx)(F.a,{})," \xa0\xa0",Object(H.jsx)("span",{style:{textTransform:"capitalize"},children:" Generate Messages"})]})}):Object(H.jsx)(H.Fragment,{children:Object(H.jsxs)(L.a,{color:"primary",variant:"contained",className:" float-right mr-1",size:"large",disabled:"true",children:[Object(H.jsx)(F.a,{})," \xa0\xa0",Object(H.jsx)("span",{style:{textTransform:"capitalize"},children:" Generate Messages "})]})}),Object(H.jsxs)(H.Fragment,{children:[Object(H.jsx)("br",{})," ",Object(H.jsx)("br",{}),Object(H.jsxs)(z.a,{severity:"info",children:[Object(H.jsx)(D.a,{children:"Info"}),"Please check the Facilities you want"]}),Object(H.jsx)("br",{}),Object(H.jsxs)("label",{children:[Object(H.jsx)("input",{type:"radio",name:"status",checked:!1===B,onChange:re}),Object(H.jsx)("b",{children:" Updated"})]}),"   ","   ",Object(H.jsxs)("label",{children:[Object(H.jsx)("input",{type:"radio",name:"status",checked:!0===B,onChange:re}),Object(H.jsx)("b",{children:" Initial"})]}),Object(H.jsx)("br",{}),Object(H.jsxs)(y.a,{dense:!0,className:t.root,children:[Object(H.jsx)("br",{}),i.map((function(e){var t="checkbox-list-secondary-label-".concat(e.id);return Object(H.jsxs)(w.a,{button:!0,children:[Object(H.jsx)(C.a,{children:Object(H.jsx)(M.a,{})}),Object(H.jsx)(R.a,{id:t,primary:"".concat(e.organisationUnitName)}),Object(H.jsx)(S.a,{children:Object(H.jsx)(P.a,{edge:"end",onChange:ae(e),checked:-1!==q.indexOf(e),inputProps:{"aria-labelledby":t}})})]},e.id)}))]})]})]})}),Object(H.jsx)(E.a,{isOpen:$,toggle:function(){return ee(!$)},backdrop:!1,fade:!0,style:{marginTop:"250px"},size:"lg",children:Object(H.jsx)(U.a,{children:Object(H.jsx)("h2",{children:"Generating NDR File. Please wait..."})})})]})}var G=a(226),q=a.n(G),J=a(500),Y=a.n(J),K=a(499),Q=a.n(K),X=a(296),Z=a(496),$=a.n(Z),ee=(a(476),a(689)),te=a(693),ae=a(688),re=a(504),ne=a(285),ce=a.n(ne),ie=a(293),oe=a.n(ie),se=a(286),le=a.n(se),de=a(291),be=a.n(de),je=a(194),ue=a.n(je),Oe=a(193),fe=a.n(Oe),he=a(233),pe=a.n(he),ge=a(234),xe=a.n(ge),me=a(288),ve=a.n(me),ye=a(289),we=a.n(ye),Se=a(290),Re=a.n(Se),Ce=a(294),Pe=a.n(Ce),Be=a(287),Ne=a.n(Be),Ae=a(292),_e=a.n(Ae),ke=a(295),Te=a.n(ke),ze=a(497),De=a.n(ze),Fe={Add:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(ce.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Check:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(le.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Clear:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(fe.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Delete:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(pe.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),DetailPanel:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(ue.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Edit:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(xe.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Export:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(Ne.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Filter:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(ve.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),FirstPage:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(we.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),LastPage:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(Re.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),NextPage:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(ue.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),PreviousPage:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(be.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),ResetSearch:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(fe.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Search:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(_e.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),SortArrow:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(oe.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),ThirdStateCheck:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(Pe.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),ViewColumn:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(Te.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))}))},Le=Object(j.a)((function(e){return{root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper,"& > * + *":{marginTop:e.spacing(2)}}}}));function Ie(){Le();var e=Object(r.useState)([]),t=Object(l.a)(e,2),a=t[0],n=t[1],c=Object(r.useState)(""),i=Object(l.a)(c,2),o=i[0],d=(i[1],Object(r.useState)(!1)),b=Object(l.a)(d,2),j=b[0],u=b[1],O=function(){return u(!j)};Object(r.useEffect)((function(){!function(){f.apply(this,arguments)}()}),[]);function f(){return(f=Object(v.a)(Object(x.a)().mark((function e(){return Object(x.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:N.a.get("".concat(_,"ndr/files"),{headers:{Authorization:"Bearer ".concat(A)}}).then((function(e){n(e.data)})).catch((function(e){}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(H.jsxs)("div",{children:[Object(H.jsx)(s.a,{autoClose:3e3,hideProgressBar:!0}),Object(H.jsx)(L.a,{variant:"contained",color:"primary",className:" float-right",startIcon:Object(H.jsx)(X.a,{size:"10"}),style:{backgroundColor:"#014d88"},href:"https://ndr.phis3project.org.ng/Identity/Account/Login?ReturnUrl=%2F",target:"_blank",children:Object(H.jsx)("span",{children:" NDR Portal"})}),Object(H.jsx)("br",{}),Object(H.jsx)("br",{}),Object(H.jsx)(q.a,{icons:Fe,title:"List of Files Generated",columns:[{title:"Facility Name",field:"name",filtering:!1},{title:"Number of Files Generated",field:"files",filtering:!1},{title:"File Name",field:"fileName",filtering:!1},{title:"Date Last Generated",field:"date",type:"date",filtering:!1},{title:"NDR Upload Status",field:"ndrStatus",type:"date",filtering:!1},{title:"Action",field:"actions",filtering:!1}],isLoading:o,data:a.map((function(e){return{name:e.facility,files:e.files,fileName:e.fileName,date:De()(e.lastModified).format("LLLL"),ndrStatus:Object(H.jsx)(re.a,{now:"60",variant:(t=e.files,t<=0?"info":"success"),label:"60%"}),actions:Object(H.jsx)("div",{children:Object(H.jsx)(ee.a.Menu,{position:"right",children:Object(H.jsx)(ee.a.Item,{children:Object(H.jsx)(te.a,{style:{backgroundColor:"rgb(153,46,98)"},primary:!0,children:Object(H.jsx)(ae.a,{item:!0,text:"Action",children:Object(H.jsxs)(ae.a.Menu,{style:{marginTop:"10px"},children:[Object(H.jsxs)(ae.a.Item,{onClick:function(){return t=e.fileName,void N.a.delete("".concat(_,"ndr/download/").concat(t),{headers:{Authorization:"Bearer ".concat(A)},responseType:"blob"}).then((function(e){var a=e.data,r=new Blob([a],{type:"application/octet-stream"});$.a.saveAs(r,"".concat(t,".zip"))})).catch((function(e){}));var t},children:[Object(H.jsx)(Q.a,{color:"primary"})," Download File"]}),Object(H.jsxs)(ae.a.Item,{onClick:function(){return function(e){u(!0);var t={id:e};N.a.POST("".concat(_,"ndr-emr/ndr-auto-pusher?id=").concat(e),t,{headers:{Authorization:"Bearer ".concat(A)}}).then((function(e){window.setTimeout((function(){s.b.success(" Generating NDR Successful!"),u(!1)}),5e3)})).catch((function(e){if(u(!1),s.b.error(" Something went wrong!"),e.response&&e.response.data){var t=e.response.data.apierror&&""!==e.response.data.apierror.message?e.response.data.apierror.message:"Something went wrong, please try again";s.b.error(t)}else s.b.error("Something went wrong. Please try again...")}))}(e.id)},children:[Object(H.jsx)(Y.a,{color:"primary"})," Upload To NDR"]})]})})})})})})};var t})),options:{pageSizeOptions:[5,10,50,100,150,500],headerStyle:{backgroundColor:"#014d88",color:"#fff",margin:"auto"},filtering:!0,searchFieldStyle:{width:"300%",margingLeft:"250px"},exportButton:!1,searchFieldAlignment:"left"}}),Object(H.jsx)(E.a,{isOpen:j,toggle:O,backdrop:!1,fade:!0,style:{marginTop:"250px"},size:"lg",children:Object(H.jsx)(U.a,{children:Object(H.jsx)("h1",{children:"Uploading File To NDR. Please wait..."})})})]})}var Me=a(687),Ee=a(16),Ue=a(679),He=a(680),We=a(681),Ve=a(682),Ge=a(683),qe=a(684),Je=a(685),Ye=a(686),Ke=Object(j.a)((function(e){return{card:{margin:e.spacing(20),display:"flex",flexDirection:"column",alignItems:"center"},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)},cardBottom:{marginBottom:20},Select:{height:45,width:350},button:{margin:e.spacing(1)},root:{"& > *":{margin:e.spacing(1)}},input:{display:"none"},error:{color:"#f85032",fontSize:"11px"},success:{color:"#4BB543 ",fontSize:"11px"}}})),Qe=function(e){var t,a=Ke(),n=""!==e.setUpDetail?e.setUpDetail:{username:"",password:""},c=Object(r.useState)(n),i=Object(l.a)(c,2),o=i[0],b=i[1],j=Object(r.useState)(!1),u=Object(l.a)(j,2),O=u[0],f=u[1],h=Object(r.useState)({}),p=Object(l.a)(h,2),g=p[0],x=p[1],m=function(e){b(Object(d.a)(Object(d.a)({},o),{},Object(Ee.a)({},e.target.name,e.target.value)))};return Object(H.jsx)("div",{children:Object(H.jsx)(E.a,(t={isOpen:e.showModal,toggle:e.toggleModal,className:e.className,size:"lg",backdrop:!1},Object(Ee.a)(t,"backdrop","static"),Object(Ee.a)(t,"children",Object(H.jsxs)(Ue.a,{children:[Object(H.jsx)(He.a,{toggle:e.toggleModal,children:"NDR Setup"}),Object(H.jsx)(U.a,{children:Object(H.jsx)(k.a,{children:Object(H.jsxs)(T.a,{children:[Object(H.jsxs)(We.a,{children:[Object(H.jsx)(Ve.a,{md:12,children:Object(H.jsxs)(Ge.a,{children:[Object(H.jsx)(qe.a,{children:"Username "}),Object(H.jsx)(Je.a,{type:"text",name:"username",id:"username",value:o.username,onChange:m,required:!0}),""!==g.username?Object(H.jsx)("span",{className:a.error,children:g.username}):""]})}),Object(H.jsx)(Ve.a,{md:12,children:Object(H.jsxs)(Ge.a,{children:[Object(H.jsx)(qe.a,{children:"Password "}),Object(H.jsx)(Je.a,{type:"password",name:"password",id:"password",value:o.password,onChange:m,required:!0}),""!==g.password?Object(H.jsx)("span",{className:a.error,children:g.password}):""]})})]}),O?Object(H.jsx)(Ye.a,{}):"",Object(H.jsx)("br",{}),Object(H.jsx)(L.a,{type:"submit",variant:"contained",color:"primary",onClick:function(t){t.preventDefault(),function(){var e=Object(d.a)({},g);return e.username=o.username?"":"Username is required",e.password=o.password?"":"Password is required",x(Object(d.a)({},e)),Object.values(e).every((function(e){return""===e}))}()&&(f(!0),""!==e.setUpDetail?N.a.put("".concat(_,"ndr-emr/auto-push-configuration"),o,{headers:{Authorization:"Bearer ".concat(A)}}).then((function(t){f(!1),e.NdrSetup(),s.b.success("NDR Setup Successful"),e.toggleModal()})).catch((function(e){if(f(!1),e.response&&e.response.data){var t=e.response.data.apierror&&""!==e.response.data.apierror.message?e.response.data.apierror.message:"Something went wrong, please try again";s.b.error(t,{position:s.b.POSITION.BOTTOM_CENTER})}else s.b.error("Something went wrong. Please try again...",{position:s.b.POSITION.BOTTOM_CENTER})})):N.a.post("".concat(_,"ndr-emr/auto-push-configuration"),o,{headers:{Authorization:"Bearer ".concat(A)}}).then((function(t){f(!1),e.NdrSetup(),s.b.success("NDR Setup Successful"),e.toggleModal()})).catch((function(e){if(f(!1),e.response&&e.response.data){var t=e.response.data.apierror&&""!==e.response.data.apierror.message?e.response.data.apierror.message:"Something went wrong, please try again";s.b.error(t,{position:s.b.POSITION.BOTTOM_CENTER})}else s.b.error("Something went wrong. Please try again...",{position:s.b.POSITION.BOTTOM_CENTER})})))},children:Object(H.jsx)("span",{style:{textTransform:"capitalize "},children:"Connect & Save"})})]})})})]})),t))})},Xe={Add:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(ce.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Check:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(le.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Clear:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(fe.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Delete:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(pe.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),DetailPanel:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(ue.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Edit:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(xe.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Export:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(Ne.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Filter:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(ve.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),FirstPage:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(we.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),LastPage:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(Re.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),NextPage:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(ue.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),PreviousPage:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(be.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),ResetSearch:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(fe.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),Search:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(_e.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),SortArrow:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(oe.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),ThirdStateCheck:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(Pe.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))})),ViewColumn:Object(r.forwardRef)((function(e,t){return Object(H.jsx)(Te.a,Object(d.a)(Object(d.a)({},e),{},{ref:t}))}))};function Ze(){var e=Object(r.useState)(""),t=Object(l.a)(e,2),a=t[0],c=t[1],i=Object(r.useState)(),o=Object(l.a)(i,2),d=o[0],b=o[1],j=Object(r.useState)(!1),u=Object(l.a)(j,2),O=u[0],f=u[1],h=Object(r.useState)(!1),p=Object(l.a)(h,2),g=p[0],x=p[1],m=function(){return x(!g)},v=n.a.useState(!1),y=Object(l.a)(v,2),w=y[0],S=y[1];Object(r.useEffect)((function(){R()}),[]);var R=function(){N.a.get("".concat(_,"ndr-emr/auto-push-configuration-viewer"),{headers:{Authorization:"Bearer ".concat(A)}}).then((function(e){""!==e.data&&null!==e.data?b(e.data):b()})).catch((function(e){}))},C=function(e){S(!w),c(e)};return console.log(a),Object(H.jsxs)("div",{children:[Object(H.jsx)(s.a,{autoClose:3e3,hideProgressBar:!0}),Object(H.jsx)(L.a,{variant:"contained",color:"primary",className:" float-right",startIcon:Object(H.jsx)(X.a,{size:"10"}),style:{backgroundColor:"#014d88"},onClick:C,children:Object(H.jsx)("span",{children:" NDR Setup"})}),Object(H.jsx)("br",{}),Object(H.jsx)("br",{}),Object(H.jsx)(q.a,{icons:Xe,title:"NDR Setup Detail",columns:[{title:"Username",field:"username",filtering:!1},{title:"Password",field:"password",filtering:!1},{title:"Action",field:"actions",filtering:!1}],data:d&&[d].map((function(e){return{username:e.username,password:e.password,actions:Object(H.jsx)("div",{children:Object(H.jsx)(ee.a.Menu,{position:"right",children:Object(H.jsx)(ee.a.Item,{children:Object(H.jsx)(te.a,{style:{backgroundColor:"rgb(153,46,98)"},primary:!0,children:Object(H.jsx)(ae.a,{item:!0,text:"Action",children:Object(H.jsxs)(ae.a.Menu,{style:{marginTop:"10px"},children:[Object(H.jsxs)(ae.a.Item,{onClick:function(){return C(e)},children:[Object(H.jsx)(xe.a,{color:"primary"})," Edit"]}),Object(H.jsxs)(ae.a.Item,{onClick:function(){return e.id,void x(!g)},children:[Object(H.jsx)(pe.a,{color:"primary"})," Delete"]})]})})})})})})}})),options:{pageSizeOptions:[5],headerStyle:{backgroundColor:"#014d88",color:"#fff",margin:"auto"},filtering:!0,searchFieldStyle:{width:"200%",margingLeft:"250px"},exportButton:!1,searchFieldAlignment:"left"}}),Object(H.jsxs)(Me.a,{show:g,toggle:m,className:"fade",size:"md","aria-labelledby":"contained-modal-title-vcenter",centered:!0,backdrop:"static",children:[Object(H.jsx)(Me.a.Header,{children:Object(H.jsx)(Me.a.Title,{id:"contained-modal-title-vcenter",children:"Notification!"})}),Object(H.jsx)(Me.a.Body,{children:Object(H.jsx)("h4",{children:"Are you Sure you want to delete the record ?"})}),Object(H.jsxs)(Me.a.Footer,{children:[Object(H.jsx)(L.a,{onClick:function(){return f(!0),void N.a.delete("".concat(_,"ndr-emr/auto-push-configuration-deleter"),{headers:{Authorization:"Bearer ".concat(A)}}).then((function(e){s.b.success(" Record Deleted Successful!"),R(),m(),f(!1)})).catch((function(e){f(!1),x(!g)}))},style:{backgroundColor:"red",color:"#fff"},disabled:O,children:!1===O?"Yes":"Deleting..."}),Object(H.jsx)(L.a,{onClick:m,style:{backgroundColor:"#014d88",color:"#fff"},disabled:O,children:"No"})]})]}),Object(H.jsx)(Qe,{toggleModal:function(){return S(!w)},showModal:w,NdrSetup:R,setUpDetail:a})]})}var $e=["children","value","index"];function et(e){var t=e.children,a=e.value,r=e.index,n=Object(b.a)(e,$e);return Object(H.jsx)(h.a,Object(d.a)(Object(d.a)({component:"div",role:"tabpanel",hidden:a!==r,id:"scrollable-force-tabpanel-".concat(r),"aria-labelledby":"scrollable-force-tab-".concat(r)},n),{},{children:a===r&&Object(H.jsx)(p.a,{p:5,children:t})}))}function tt(e){return{id:"scrollable-force-tab-".concat(e),"aria-controls":"scrollable-force-tabpanel-".concat(e)}}var at=Object(j.a)((function(e){return{root2:{flexGrow:1,width:"100%",backgroundColor:e.palette.background.paper,margin:e.spacing(7),bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:12},pos:{fontSize:11},cardContent:{padding:2},cardroot:{margin:e.spacing(1),height:"250px !important"}},alertmsge:{marginTop:e.spacing(2)},rootaccordia:{width:"100%"},accordiaheading:{fontSize:e.typography.pxToRem(15),fontWeight:e.typography.fontWeightRegular},allergiesroot:{display:"flex",justifyContent:"center",flexWrap:"wrap","& > *":{margin:e.spacing(.5)}},checkboxroot:{display:"flex"},formControl:{margin:e.spacing(3)},root:{"& .MuiTextField-root":{margin:e.spacing(1),width:200}},formroot:{"& .MuiTextField-root":{margin:e.spacing(1),width:200}},heading:{fontSize:e.typography.pxToRem(15)},secondaryHeading:{fontSize:e.typography.pxToRem(15),color:e.palette.text.secondary},icon:{verticalAlign:"bottom",height:20,width:20},details:{alignItems:"center"},column:{flexBasis:"33.33%"},helper:{borderLeft:"2px solid ".concat(e.palette.divider),padding:e.spacing(1,2)},link:{color:e.palette.primary.main,textDecoration:"none","&:hover":{textDecoration:"underline"}},inforoot:{width:"95%",margin:20,backgroundColor:"#eee"}}})),rt=function(e){var t=at(),a=Object(r.useState)(0),n=Object(l.a)(a,2),c=n[0],i=n[1];!function(e,t){var a=t,r=new RegExp("[?&]"+e+"=([^&#]*)","i").exec(a);r&&r[1]}("tab",e.location);Object(r.useEffect)((function(){}),[c]);return Object(H.jsxs)("div",{className:t.root,children:[Object(H.jsx)("div",{className:t.inforoot}),Object(H.jsxs)(u.a,{position:"static",style:{backgroundColor:"#014d88"},children:[Object(H.jsxs)(O.a,{value:c,onChange:function(e,t){i(t)},variant:"scrollable",scrollButtons:"on",indicatorColor:"secondary",textColor:"inherit","aria-label":"scrollable force tabs example",children:[Object(H.jsx)(f.a,Object(d.a)({className:t.title,label:"Generate Messages ",icon:Object(H.jsx)(g.b,{})},tt(0))),Object(H.jsx)(f.a,Object(d.a)({className:t.title,label:"Download Files",icon:Object(H.jsx)(g.a,{})},tt(1))),Object(H.jsx)(f.a,Object(d.a)({className:t.title,label:"NDR COnfiguration",icon:Object(H.jsx)(g.a,{})},tt(2)))]}),Object(H.jsx)("div",{})]}),Object(H.jsx)(et,{value:c,setValue:i,index:0,children:Object(H.jsx)(V,{value:c,setValue:i})}),Object(H.jsx)(et,{value:c,setValue:i,index:1,children:Object(H.jsx)(Ie,{value:c,setValue:i})}),Object(H.jsx)(et,{value:c,setValue:i,index:2,children:Object(H.jsx)(Ze,{value:c,setValue:i})})]})};function nt(){return Object(H.jsx)(o.a,{children:Object(H.jsxs)("div",{children:[Object(H.jsx)(s.a,{}),Object(H.jsx)(o.d,{children:Object(H.jsx)(o.b,{path:"/",children:Object(H.jsx)(rt,{})})})]})})}var ct=a(371),it=function(e){e&&e instanceof Function&&a.e(6).then(a.bind(null,864)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),r(e),n(e),c(e),i(e)}))},ot=a(502),st="ltr",lt=[{typography:"poppins",version:"light",layout:"vertical",headerBg:"color_1",navheaderBg:"color_1",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"full",direction:st},{typography:"poppins",version:"light",layout:"vertical",primary:"color_5",headerBg:"color_5",navheaderBg:"color_1",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",direction:st},{typography:"poppins",version:"light",layout:"vertical",navheaderBg:"color_11",headerBg:"color_1",sidebarBg:"color_11",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_11",direction:st},{typography:"poppins",version:"dark",layout:"vertical",headerBg:"color_3",navheaderBg:"color_3",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_1",direction:st},{typography:"poppins",version:"light",layout:"vertical",navheaderBg:"color_15",headerBg:"color_1",sidebarStyle:"full",sidebarBg:"color_1",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_15",direction:st},{typography:"poppins",version:"light",layout:"horizontal",navheaderBg:"color_1",headerBg:"color_1",sidebarBg:"color_9",sidebarStyle:"modern",sidebarPosition:"static",headerPosition:"fixed",containerLayout:"wide",primary:"color_9",direction:st}],dt=Object(r.createContext)(),bt=function(e){var t=Object(r.useState)({value:"full",label:"Full"}),a=Object(l.a)(t,2),n=a[0],c=a[1],i=Object(r.useState)({value:"fixed",label:"Fixed"}),o=Object(l.a)(i,2),s=o[0],d=o[1],b=Object(r.useState)({value:"fixed",label:"Fixed"}),j=Object(l.a)(b,2),u=j[0],O=j[1],f=Object(r.useState)({value:"vertical",label:"Vertical"}),h=Object(l.a)(f,2),p=h[0],g=h[1],x=Object(r.useState)({value:"ltr",label:"LTR"}),m=Object(l.a)(x,2),v=m[0],y=m[1],w=Object(r.useState)("color_1"),S=Object(l.a)(w,2),R=S[0],C=S[1],P=Object(r.useState)("color_1"),B=Object(l.a)(P,2),N=B[0],A=B[1],_=Object(r.useState)("color_1"),k=Object(l.a)(_,2),T=k[0],z=k[1],D=Object(r.useState)("color_1"),F=Object(l.a)(D,2),L=F[0],I=F[1],M=Object(r.useState)(!1),E=Object(l.a)(M,2),U=E[0],W=E[1],V=Object(r.useState)(!1),G=Object(l.a)(V,2),q=G[0],J=G[1],Y=Object(r.useState)({value:"light",label:"Light"}),K=Object(l.a)(Y,2),Q=K[0],X=K[1],Z=Object(r.useState)({value:"wide-boxed",label:"Wide Boxed"}),$=Object(l.a)(Z,2),ee=$[0],te=$[1],ae=document.querySelector("body"),re=Object(r.useState)(0),ne=Object(l.a)(re,2),ce=ne[0],ie=ne[1],oe=Object(r.useState)(0),se=Object(l.a)(oe,2),le=se[0],de=se[1],be=function(e){C(e),ae.setAttribute("data-primary",e)},je=function(e){A(e),ae.setAttribute("data-nav-headerbg",e)},ue=function(e){z(e),ae.setAttribute("data-headerbg",e)},Oe=function(e){I(e),ae.setAttribute("data-sibebarbg",e)},fe=function(e){d(e),ae.setAttribute("data-sidebar-position",e.value)},he=function(e){y(e),ae.setAttribute("direction",e.value);var t=document.querySelector("html");t.setAttribute("dir",e.value),t.className=e.value},pe=function(e){"horizontal"===e.value&&"overlay"===n.value?(g(e),ae.setAttribute("data-layout",e.value),c({value:"full",label:"Full"}),ae.setAttribute("data-sidebar-style","full")):(g(e),ae.setAttribute("data-layout",e.value))},ge=function(e){"horizontal"===p.value&&"overlay"===e.value?alert("Sorry! Overlay is not possible in Horizontal layout."):(c(e),W("icon-hover"===e.value?"_i-hover":""),ae.setAttribute("data-sidebar-style",e.value))},xe=function(e){O(e),ae.setAttribute("data-header-position",e.value)},me=function(e){ae.setAttribute("data-theme-version",e.value),X(e)},ve=function(e){te(e),ae.setAttribute("data-container",e.value),"boxed"===e.value&&ge({value:"overlay",label:"Overlay"})};return Object(r.useEffect)((function(){var e=document.querySelector("body");e.setAttribute("data-typography","poppins"),e.setAttribute("data-theme-version","light"),e.setAttribute("data-layout","vertical"),e.setAttribute("data-primary","color_1"),e.setAttribute("data-nav-headerbg","color_1"),e.setAttribute("data-headerbg","color_1"),e.setAttribute("data-sidebar-style","overlay"),e.setAttribute("data-sibebarbg","color_1"),e.setAttribute("data-primary","color_1"),e.setAttribute("data-sidebar-position","fixed"),e.setAttribute("data-header-position","fixed"),e.setAttribute("data-container","wide"),e.setAttribute("direction","ltr");var t=function(){ie(window.innerWidth),de(window.innerHeight),window.innerWidth>=768&&window.innerWidth<1024?e.setAttribute("data-sidebar-style","mini"):window.innerWidth<=768?e.setAttribute("data-sidebar-style","overlay"):e.setAttribute("data-sidebar-style","full")};return t(),window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}}),[]),Object(H.jsx)(dt.Provider,{value:{body:ae,sideBarOption:[{value:"compact",label:"Compact"},{value:"full",label:"Full"},{value:"mini",label:"Mini"},{value:"modern",label:"Modern"},{value:"overlay",label:"Overlay"},{value:"icon-hover",label:"Icon-hover"}],layoutOption:[{value:"vertical",label:"Vertical"},{value:"horizontal",label:"Horizontal"}],backgroundOption:[{value:"light",label:"Light"},{value:"dark",label:"Dark"}],sidebarposition:s,headerPositions:[{value:"fixed",label:"Fixed"},{value:"static",label:"Static"}],containerPosition:[{value:"wide-boxed",label:"Wide Boxed"},{value:"boxed",label:"Boxed"},{value:"wide",label:"Wide"}],directionPosition:[{value:"ltr",label:"LTR"},{value:"rtl",label:"RTL"}],fontFamily:[{value:"poppins",label:"Poppins"},{value:"roboto",label:"Roboto"},{value:"cairo",label:"Cairo"},{value:"opensans",label:"Open Sans"},{value:"HelveticaNeue",label:"HelveticaNeue"}],primaryColor:R,navigationHader:N,windowWidth:ce,windowHeight:le,changePrimaryColor:be,changeNavigationHader:je,changeSideBarStyle:ge,sideBarStyle:n,changeSideBarPostion:fe,sidebarpositions:[{value:"fixed",label:"Fixed"},{value:"static",label:"Static"}],changeHeaderPostion:xe,headerposition:u,changeSideBarLayout:pe,sidebarLayout:p,changeDirectionLayout:he,changeContainerPosition:ve,direction:v,colors:["color_1","color_2","color_3","color_4","color_5","color_6","color_7","color_8","color_9","color_10","color_11","color_12","color_13","color_14","color_15"],haderColor:T,chnageHaderColor:ue,chnageSidebarColor:Oe,sidebarColor:L,iconHover:U,menuToggle:q,openMenuToggle:function(){"overly"===n.value?J(!0):J(!1)},changeBackground:me,background:Q,containerPosition_:ee,setDemoTheme:function(e,t){var a={},r=lt[e];ae.setAttribute("data-typography",r.typography),a.value=r.version,me(a),a.value=r.layout,pe(a),be(r.primary),je(r.navheaderBg),ue(r.headerBg),a.value=r.sidebarStyle,ge(a),Oe(r.sidebarBg),a.value=r.sidebarPosition,fe(a),a.value=r.headerPosition,xe(a),a.value=r.containerLayout,ve(a),a.value=t,he(a)}},children:e.children})};i.a.render(Object(H.jsx)(n.a.StrictMode,{children:Object(H.jsx)(ot.a,{children:Object(H.jsx)(ct.a,{basename:"/",children:Object(H.jsx)(bt,{children:Object(H.jsx)(nt,{})})})})}),document.getElementById("root")),it()}},[[630,1,2]]]);
//# sourceMappingURL=main.80c97cc9.chunk.js.map