(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{125:function(t,e,a){},126:function(t,e,a){},152:function(t,e,a){"use strict";a.r(e);var n={};a.r(n),a.d(n,"selectStatus",(function(){return y})),a.d(n,"selectIsInitialized",(function(){return w}));var r={};a.r(r),a.d(r,"setAppStatus",(function(){return S})),a.d(r,"setAppError",(function(){return A}));var s={};a.r(s),a.d(s,"setIsLoggedIn",(function(){return J}));var i={};a.r(i),a.d(i,"selectIsLoggedIn",(function(){return rt}));var c,o,d=a(0),l=a.n(d),u=a(35),f=a.n(u),b=(a(125),function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,216)).then((function(e){var a=e.getCLS,n=e.getFID,r=e.getFCP,s=e.getLCP,i=e.getTTFB;a(t),n(t),r(t),s(t),i(t)}))}),j=(a(126),a(22)),p=a(209),h=a(210),O=a(206),v=a(207),m=a(208),x=a(212),g=a(211),k=a(197),C=a(15),T=a(202),I=a(200),y=function(t){return t.app.status},w=function(t){return t.app.isInitialized},L=a(16),S=Object(L.b)("appActions/setAppStatus"),A=Object(L.b)("appActions/setAppError"),E=a(17),F=a.n(E),P=a(27),z=a(99),R=a.n(z).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"3d91ee0a-a2e5-4c47-9eef-21fe45b3ba2b"}}),D=function(){return R.get("todo-lists")},N=function(t){return R.post("todo-lists",{title:t})},M=function(t,e){return R.put("todo-lists/".concat(t),{title:e})},V=function(t){return R.get("todo-lists/".concat(t,"/tasks"))},B=function(t,e){return R.delete("todo-lists/".concat(t,"/tasks/").concat(e))},H=function(t,e){return R.post("todo-lists/".concat(t,"/tasks"),{title:e})},U=function(t,e,a){return R.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},W=function(t){return R.post("auth/login",t)},Z=function(){return R.get("auth/me")},q=function(){return R.delete("auth/login")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(c||(c={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(o||(o={}));var J=Object(L.b)("authActions/setIsLoggedIn"),K=Object(L.c)("auth/initializeApp",function(){var t=Object(P.a)(F.a.mark((function t(e,a){var n;return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=a.dispatch,t.next=3,Z();case 3:0===t.sent.data.resultCode&&n(J({value:!0}));case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),Y=Object(L.d)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{},extraReducers:function(t){t.addCase(K.fulfilled,(function(t){t.isInitialized=!0})).addCase(A,(function(t,e){t.error=e.payload.error})).addCase(S,(function(t,e){t.status=e.payload.status}))}}),_={initializeApp:K},$=Object(C.a)(Object(C.a)(Object(C.a)({},_),Y.actions),r),G=Y.reducer,Q=a(1),X=$.setAppError,tt=l.a.forwardRef((function(t,e){return Object(Q.jsx)(I.a,Object(C.a)({elevation:6,ref:e,variant:"filled"},t))}));function et(){var t=Object(j.c)((function(t){return t.app.error})),e=Object(j.b)(),a=function(t,a){"clickaway"!==a&&e(X({error:null}))};return Object(Q.jsx)(T.a,{open:null!==t,autoHideDuration:6e3,onClose:a,children:Object(Q.jsx)(tt,{onClose:a,severity:"error",sx:{width:"100%"},children:t})})}var at=a(14),nt=a(105),rt=function(t){return t.auth.isLoggedIn},st=a(64),it=$.setAppStatus,ct=$.setAppError,ot=function(t,e){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return a&&e.dispatch(ct({error:t.messages.length?t.messages[0]:"Some error occurred"})),e.dispatch(it({status:"failed"})),e.rejectWithValue({errors:t.messages,fieldsErrors:t.fieldsErrors})},dt=function(t,e){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return a&&e.dispatch(ct({error:t.message?t.message:"Some error occurred"})),e.dispatch(it({status:"failed"})),e.rejectWithValue({errors:[t.message],fieldsErrors:void 0})},lt=Object(L.c)("auth/login",function(){var t=Object(P.a)(F.a.mark((function t(e,a){var n;return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(S({status:"loading"})),t.prev=1,t.next=4,W(e);case 4:if(0!==(n=t.sent).data.resultCode){t.next=10;break}return a.dispatch(S({status:"succeeded"})),t.abrupt("return");case 10:return t.abrupt("return",ot(n.data,a));case 11:t.next=16;break;case 13:return t.prev=13,t.t0=t.catch(1),t.abrupt("return",dt(t.t0,a));case 16:case"end":return t.stop()}}),t,null,[[1,13]])})));return function(e,a){return t.apply(this,arguments)}}()),ut=Object(L.c)("auth/LogOut",function(){var t=Object(P.a)(F.a.mark((function t(e,a){var n;return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return Object(st.a)(e),a.dispatch(S({status:"loading"})),t.prev=2,t.next=5,q();case 5:if(0!==(n=t.sent).data.resultCode){t.next=11;break}return a.dispatch(S({status:"succeeded"})),t.abrupt("return");case 11:return t.abrupt("return",ot(n.data,a));case 12:t.next=17;break;case 14:return t.prev=14,t.t0=t.catch(2),t.abrupt("return",dt(t.t0,a));case 17:case"end":return t.stop()}}),t,null,[[2,14]])})));return function(e,a){return t.apply(this,arguments)}}()),ft={login:lt,logOut:ut},bt=Object(L.d)({name:"auth",initialState:{isLoggedIn:!1},reducers:{},extraReducers:function(t){t.addCase(lt.fulfilled,(function(t){t.isLoggedIn=!0})),t.addCase(ut.fulfilled,(function(t){t.isLoggedIn=!1})),t.addCase(J,(function(t,e){t.isLoggedIn=e.payload.value}))}}),jt=a(205),pt=a(201),ht=a(204),Ot=a(215),vt=a(214),mt=a(193),xt=a(198),gt=a(104),kt=a(67),Ct=function(){return Object(j.b)()};function Tt(t){var e=Ct();return Object(d.useMemo)((function(){return Object(kt.a)(t,e)}),[])}var It=function(){var t=Object(j.c)(i.selectIsLoggedIn),e=Ct(),a=Tt(yt).login,n=Object(gt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password.length>=20&&t.password.length<3&&(e.password="password should consist 5 or less symbols "),e},onSubmit:function(){var t=Object(P.a)(F.a.mark((function t(r,s){var i,c,o,d;return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e(a(r));case 2:i=t.sent,a.rejected.match(i)&&(null===(c=i.payload)||void 0===c?void 0:c.fieldsErrors)&&(d=null===(o=i.payload)||void 0===o?void 0:o.fieldsErrors[0],s.setFieldError(d.field,d.error)),n.resetForm();case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()});return t?Object(Q.jsx)(at.a,{to:"/"}):(console.log(t),Object(Q.jsx)(jt.a,{container:!0,justifyContent:"center",children:Object(Q.jsx)(jt.a,{item:!0,justifyContent:"center",children:Object(Q.jsx)("form",{onSubmit:n.handleSubmit,children:Object(Q.jsxs)(ht.a,{children:[Object(Q.jsxs)(mt.a,{children:[Object(Q.jsxs)("p",{children:["To log in get registered",Object(Q.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:" here"})]}),Object(Q.jsx)("p",{children:"or use common test account credentials:"}),Object(Q.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(Q.jsx)("p",{children:"Password: free"})]}),Object(Q.jsxs)(vt.a,{children:[Object(Q.jsx)(xt.a,Object(C.a)({label:"Email",margin:"normal",defaultValue:"trotzuk.stanislav@gmail.com"},n.getFieldProps("email"))),n.touched.email&&n.errors.email?Object(Q.jsx)("div",{style:{color:"red"},children:n.errors.email}):null,Object(Q.jsx)(xt.a,Object(C.a)({type:"password",label:"Password",margin:"normal",defaultValue:"resamstas"},n.getFieldProps("password"))),n.touched.password&&n.errors.password?Object(Q.jsx)("div",{style:{color:"red"},children:n.errors.password}):null,Object(Q.jsx)(Ot.a,{label:"Remember me",control:Object(Q.jsx)(pt.a,Object(C.a)({},n.getFieldProps("rememberMe")))}),Object(Q.jsx)(m.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})}))},yt=Object(C.a)(Object(C.a)(Object(C.a)({},s),ft),bt.actions),wt=bt.reducer,Lt=a(213),St=a(13),At=a(195),Et=l.a.memo((function(t){var e=t.addItem,a=t.disabled,n=void 0!==a&&a;console.log("AddItemForm called");var r=Object(d.useState)(""),s=Object(St.a)(r,2),i=s[0],c=s[1],o=Object(d.useState)(null),l=Object(St.a)(o,2),u=l[0],f=l[1],b=function(){""!==i.trim()?(e(i),c("")):f("Title is required")};return Object(Q.jsxs)("div",{children:[Object(Q.jsx)(xt.a,{variant:"outlined",disabled:n,error:!!u,value:i,onChange:function(t){c(t.currentTarget.value)},onKeyPress:function(t){null!==u&&f(null),13===t.charCode&&b()},label:"Title",helperText:u}),Object(Q.jsx)(O.a,{color:"primary",onClick:b,disabled:n,children:Object(Q.jsx)(At.a,{})})]})})),Ft=a(106),Pt=l.a.memo((function(t){console.log("EditableSpan called");var e=Object(d.useState)(!1),a=Object(St.a)(e,2),n=a[0],r=a[1],s=Object(d.useState)(t.value),i=Object(St.a)(s,2),c=i[0],o=i[1];return n?Object(Q.jsx)(xt.a,{value:c,onChange:function(t){o(t.currentTarget.value)},autoFocus:!0,onBlur:function(){r(!1),t.onChange(c)}}):Object(Q.jsx)("span",{onDoubleClick:function(){r(!0),o(t.value)},children:t.value})})),zt=a(196),Rt=l.a.memo((function(t){var e=Object(d.useCallback)((function(){return t.removeTask(t.task.id,t.todolistId)}),[t.task.id,t.todolistId]),a=Object(d.useCallback)((function(e){var a=e.currentTarget.checked;t.changeTaskStatus(t.task.id,a?c.Completed:c.New,t.todolistId)}),[t.task.id,t.todolistId]),n=Object(d.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.todolistId]);return Object(Q.jsxs)("div",{className:t.task.status===c.Completed?"is-done":"",children:[Object(Q.jsx)(pt.a,{checked:t.task.status===c.Completed,color:"primary",onChange:a}),Object(Q.jsx)(Pt,{value:t.task.title,onChange:n}),Object(Q.jsx)(O.a,{onClick:e,children:Object(Q.jsx)(zt.a,{})})]},t.task.id)})),Dt=Object(L.b)("todoListsActions/changeTodolistFilter"),Nt=Object(L.b)("todoListsActions/changeTodolistEntityStatus"),Mt=Object(L.c)("todolists/fetchTodolistsTC",function(){var t=Object(P.a)(F.a.mark((function t(e,a){var n;return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(S({status:"loading"})),t.next=3,D();case 3:return n=t.sent,t.prev=4,a.dispatch(S({status:"succeeded"})),t.abrupt("return",{todoLists:n.data});case 9:return t.prev=9,t.t0=t.catch(4),t.abrupt("return",dt(t.t0,a));case 12:case"end":return t.stop()}}),t,null,[[4,9]])})));return function(e,a){return t.apply(this,arguments)}}()),Vt=Object(L.c)("todolists/removeTodolist",function(){var t=Object(P.a)(F.a.mark((function t(e,a){return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(S({status:"loading"})),a.dispatch(Nt({id:e,status:"loading"})),t.prev=2,a.dispatch(S({status:"succeeded"})),t.abrupt("return",{id:e});case 7:return t.prev=7,t.t0=t.catch(2),t.abrupt("return",dt(t.t0,a));case 10:case"end":return t.stop()}}),t,null,[[2,7]])})));return function(e,a){return t.apply(this,arguments)}}()),Bt=Object(L.c)("todolists/addTodolistTC",function(){var t=Object(P.a)(F.a.mark((function t(e,a){var n;return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(S({status:"loading"})),t.next=3,N(e);case 3:return n=t.sent,t.prev=4,a.dispatch(S({status:"succeeded"})),t.abrupt("return",{todolist:n.data.data.item});case 9:return t.prev=9,t.t0=t.catch(4),t.abrupt("return",dt(t.t0,a));case 12:case"end":return t.stop()}}),t,null,[[4,9]])})));return function(e,a){return t.apply(this,arguments)}}()),Ht=Object(L.c)("todolists/changeTodolistTitleTC",function(){var t=Object(P.a)(F.a.mark((function t(e,a){return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return Object(st.a)(a),t.next=3,M(e.id,e.title);case 3:return t.abrupt("return",{id:e.id,title:e.title});case 4:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),Ut={addTodolist:Bt,changeTodolistTitle:Ht,removeTodolist:Vt,fetchTodoLists:Mt},Wt=Object(L.d)({name:"todoLists",initialState:[],reducers:{},extraReducers:function(t){t.addCase(Mt.fulfilled,(function(t,e){return e.payload.todoLists.map((function(t){return Object(C.a)(Object(C.a)({},t),{},{filter:"all",entityStatus:"idle"})}))})),t.addCase(Vt.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));a>-1&&t.splice(a,1)})),t.addCase(Bt.fulfilled,(function(t,e){t.unshift(Object(C.a)(Object(C.a)({},e.payload.todolist),{},{filter:"all",entityStatus:"idle"}))})),t.addCase(Ht.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].title=e.payload.title})),t.addCase(Nt,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].entityStatus=e.payload.status})),t.addCase(Dt,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].filter=e.payload.filter}))}}),Zt=Object(C.a)(Object(C.a)({},Ut),Wt.actions),qt=Wt.reducer,Jt=Object(L.c)("tasks/fetchTasks",function(){var t=Object(P.a)(F.a.mark((function t(e,a){var n,r;return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(S({status:"loading"})),t.next=3,V(e);case 3:return n=t.sent,r=n.data.items,a.dispatch(S({status:"succeeded"})),t.abrupt("return",{tasks:r,todolistId:e});case 7:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),Kt=Object(L.c)("tasks/removeTask",(function(t){return B(t.todolistId,t.taskId).then((function(){return{taskId:t.taskId,todolistId:t.todolistId}}))})),Yt=Object(L.c)("tasks/addTaskTC",function(){var t=Object(P.a)(F.a.mark((function t(e,a){var n;return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(S({status:"loading"})),t.prev=1,t.next=4,H(e.todolistId,e.title);case 4:if(0!==(n=t.sent).data.resultCode){t.next=10;break}return a.dispatch(S({status:"succeeded"})),t.abrupt("return",n.data.data.item);case 10:return t.abrupt("return",ot(n.data,a));case 11:t.next=16;break;case 13:return t.prev=13,t.t0=t.catch(1),t.abrupt("return",dt(t.t0,a));case 16:case"end":return t.stop()}}),t,null,[[1,13]])})));return function(e,a){return t.apply(this,arguments)}}()),_t=Object(L.c)("tasks/updateTask",function(){var t=Object(P.a)(F.a.mark((function t(e,a){var n,r,s,i;return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=a.getState(),r=n.tasks[e.todolistId].find((function(t){return t.id===e.taskId}))){t.next=5;break}return t.abrupt("return",a.rejectWithValue("task not found in the state"));case 5:return s=Object(C.a)({deadline:r.deadline,description:r.description,priority:r.priority,startDate:r.startDate,title:r.title,status:r.status},e.model),t.next=8,U(e.todolistId,e.taskId,s);case 8:if(i=t.sent,t.prev=9,0!==i.data.resultCode){t.next=14;break}return t.abrupt("return",e);case 14:return t.abrupt("return",ot(i.data,a));case 15:t.next=20;break;case 17:return t.prev=17,t.t0=t.catch(9),t.abrupt("return",dt(t.t0,a));case 20:case"end":return t.stop()}}),t,null,[[9,17]])})));return function(e,a){return t.apply(this,arguments)}}()),$t={fetchTasks:Jt,removeTask:Kt,addTask:Yt,updateTask:_t},Gt=Zt.addTodolist,Qt=Zt.removeTodolist,Xt=Zt.fetchTodoLists,te=Object(L.d)({name:"tasks",initialState:{},reducers:{},extraReducers:function(t){t.addCase(Gt.fulfilled,(function(t,e){t[e.payload.todolist.id]=[]})),t.addCase(Qt.fulfilled,(function(t,e){delete t[e.payload.id]})),t.addCase(Xt.fulfilled,(function(t,e){e.payload.todoLists.forEach((function(e){t[e.id]=[]}))})),t.addCase(_t.fulfilled,(function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));n>-1&&(a[n]=Object(C.a)(Object(C.a)({},a[n]),e.payload.model))})),t.addCase(Jt.fulfilled,(function(t,e){t[e.payload.todolistId]=e.payload.tasks})),t.addCase(Kt.fulfilled,(function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));n>-1&&a.splice(n,1)})),t.addCase(Yt.fulfilled,(function(t,e){t[e.payload.todoListId].unshift(e.payload)}))}}),ee=l.a.memo((function(t){var e=t.demo,a=void 0!==e&&e,n=Object(Ft.a)(t,["demo"]);console.log("Todolist called");var r=Object(j.b)();Object(d.useEffect)((function(){if(!a){var t=Jt(n.todolist.id);r(t)}}),[]);var s=Object(d.useCallback)((function(t){n.addTask(t,n.todolist.id)}),[n.addTask,n.todolist.id]),i=Object(d.useCallback)((function(t){n.changeTodolistTitle(n.todolist.id,t)}),[n.todolist.id,n.changeTodolistTitle]),o=Object(d.useCallback)((function(){return n.changeFilter("all",n.todolist.id)}),[n.todolist.id,n.changeFilter]),l=Object(d.useCallback)((function(){return n.changeFilter("active",n.todolist.id)}),[n.todolist.id,n.changeFilter]),u=Object(d.useCallback)((function(){return n.changeFilter("completed",n.todolist.id)}),[n.todolist.id,n.changeFilter]),f=n.tasks;return"active"===n.todolist.filter&&(f=n.tasks.filter((function(t){return t.status===c.New}))),"completed"===n.todolist.filter&&(f=n.tasks.filter((function(t){return t.status===c.Completed}))),Object(Q.jsxs)("div",{children:[Object(Q.jsxs)("h3",{children:[Object(Q.jsx)(Pt,{value:n.todolist.title,onChange:i}),Object(Q.jsx)(O.a,{onClick:function(){n.removeTodolist(n.todolist.id)},disabled:"loading"===n.todolist.entityStatus,children:Object(Q.jsx)(zt.a,{})})]}),Object(Q.jsx)(Et,{addItem:s,disabled:"loading"===n.todolist.entityStatus}),Object(Q.jsx)("div",{children:f.map((function(t){return Object(Q.jsx)(Rt,{task:t,todolistId:n.todolist.id,removeTask:n.removeTask,changeTaskTitle:n.changeTaskTitle,changeTaskStatus:n.changeTaskStatus},t.id)}))}),Object(Q.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(Q.jsx)(m.a,{variant:"all"===n.todolist.filter?"outlined":"text",onClick:o,color:"inherit",children:"All"}),Object(Q.jsx)(m.a,{variant:"active"===n.todolist.filter?"outlined":"text",onClick:l,color:"primary",children:"Active"}),Object(Q.jsx)(m.a,{variant:"completed"===n.todolist.filter?"outlined":"text",onClick:u,color:"secondary",children:"Completed"})]})]})})),ae=Object(C.a)(Object(C.a)({},$t),te.actions),ne=te.reducer,re=ae.removeTask,se=ae.addTask,ie=ae.updateTask,ce=function(t){var e=t.demo,a=void 0!==e&&e,n=Object(j.c)((function(t){return t.auth.isLoggedIn})),r=Object(j.c)((function(t){return t.todoLists})),s=Object(j.c)((function(t){return t.tasks})),i=Object(j.b)(),c=Zt.addTodolist,o=Zt.removeTodolist,l=Zt.changeTodolistTitle,u=Zt.fetchTodoLists,f=Object(d.useCallback)((function(t,e){var a=re({taskId:t,todolistId:e});i(a)}),[]),b=Object(d.useCallback)((function(t,e){var a=se({title:t,todolistId:e});i(a)}),[]),p=Object(d.useCallback)((function(t,e,a){var n=ie({taskId:t,model:{status:e},todolistId:a});i(n)}),[]),h=Object(d.useCallback)((function(t,e,a){var n=ie({taskId:t,model:{title:e},todolistId:a});i(n)}),[]),O=Object(d.useCallback)((function(t,e){var a=Dt({id:e,filter:t});i(a)}),[]),v=Object(d.useCallback)((function(t){var e=o(t);i(e)}),[]),m=Object(d.useCallback)((function(t,e){var a=l({id:t,title:e});i(a)}),[]),x=Object(d.useCallback)((function(t){var e=c(t);i(e)}),[i]);return Object(d.useEffect)((function(){!a&&n&&i(u())}),[]),n?Object(Q.jsxs)(Q.Fragment,{children:[Object(Q.jsx)(jt.a,{container:!0,style:{padding:"20px"},children:Object(Q.jsx)(Et,{addItem:x})}),Object(Q.jsx)(jt.a,{container:!0,spacing:3,children:r.map((function(t){var e=s[t.id];return Object(Q.jsx)(jt.a,{item:!0,children:Object(Q.jsx)(Lt.a,{style:{padding:"10px"},children:Object(Q.jsx)(ee,{todolist:t,tasks:e,removeTask:f,changeFilter:O,addTask:b,changeTaskStatus:p,removeTodolist:v,changeTaskTitle:h,changeTodolistTitle:m,demo:a})})},t.id)}))})]}):Object(Q.jsx)(at.a,{to:"/login"})},oe=$.initializeApp;var de=function(t){var e=t.demo,a=void 0!==e&&e,r=Object(j.b)(),s=Object(j.c)(n.selectStatus),i=Object(j.c)(n.selectIsInitialized),c=Tt(yt).logOut,o=Object(at.g)();return Object(d.useEffect)((function(){a||r(oe()),i&&o("/")}),[a,r]),i?Object(Q.jsxs)("div",{className:"App",children:[Object(Q.jsx)(et,{}),Object(Q.jsxs)(p.a,{position:"static",children:[Object(Q.jsxs)(h.a,{children:[Object(Q.jsx)(O.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(Q.jsx)(k.a,{})}),Object(Q.jsx)(v.a,{variant:"h6",children:"News"}),i&&Object(Q.jsx)(m.a,{onClick:function(){r(c())},color:"inherit",style:{position:"absolute",top:"50%",transform:"translateY(-50%)",right:"20px",border:"2px solid white"},children:"Log Out"})]}),"loading"===s&&Object(Q.jsx)(g.a,{})]}),Object(Q.jsx)(x.a,{fixed:!0,children:Object(Q.jsxs)(at.d,{children:[Object(Q.jsx)(at.b,{path:"/",element:Object(Q.jsx)(ce,{demo:a})}),Object(Q.jsx)(at.b,{path:"/login",element:Object(Q.jsx)(It,{})})]})})]}):(console.log("preloader app"),Object(Q.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(Q.jsx)(nt.a,{})}))},le=a(103),ue=Object(kt.b)({app:G,auth:wt,todoLists:qt,tasks:ne}),fe=Object(L.a)({reducer:ue,middleware:function(t){return t().prepend(le.a)}});window.store=fe;var be=a(55);f.a.render(Object(Q.jsx)(l.a.StrictMode,{children:Object(Q.jsx)(be.a,{children:Object(Q.jsx)(j.a,{store:fe,children:Object(Q.jsx)(de,{})})})}),document.getElementById("root")),b()}},[[152,1,2]]]);
//# sourceMappingURL=main.413c1456.chunk.js.map