import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,d as l}from"./app-BV8bltOC.js";const e={},i=l(`<p>登录页面需要需要登录表单，登录表单里面需要账号和密码输入框，和登录按钮，还需要表单验证规则和提示成功或者失败的弹窗。</p><hr><h3 id="讲解简单的vue3登录界面" tabindex="-1"><a class="header-anchor" href="#讲解简单的vue3登录界面"><span>讲解简单的vue3登录界面</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;login-container&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- el-card 是 Element Plus 提供的一个卡片组件，通常用于展示内容块或信息面板。el-card 组件的主要作用是将内容以卡片的形式展示，具有视觉上的分离感，适合用来展示数据、列表、表单等内容。 --&gt;</span></span>
<span class="line"><span>    &lt;el-card class=&quot;login-card&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;!-- 在 Vue 和 Element Plus 中，\`&lt;template&gt;\` 标签通常用于 **具名插槽** (named slots)，用于自定义组件内部某些特定部分的内容。这里的 \`template #header\` 是 Element Plus 中的一个 **具名插槽**，用于自定义 \`el-card\` 组件的头部内容。 --&gt;</span></span>
<span class="line"><span>      &lt;template #header&gt;</span></span>
<span class="line"><span>        &lt;h2&gt;登录&lt;/h2&gt;</span></span>
<span class="line"><span>      &lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;!-- 组件里面有v-bind和v-model绑定，一个是单向的，一个是双向的。</span></span>
<span class="line"><span>      ref 用在普通 DOM 标签上，获取的是 DOM 节点；ref 用在组件标签上，获取的是组件实例对象。 --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;!-- el-form 是表单的整体容器，负责管理整个表单的数据绑定、验证规则和提交等功能。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>      常用属性：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      model：用于绑定表单数据的对象，所有的 el-form-item 将从这里获取具体字段的数据。</span></span>
<span class="line"><span>      rules：表单验证规则，通常是一个对象，包含每个表单字段的验证规则。</span></span>
<span class="line"><span>      validate：提供方法手动触发表单验证。</span></span>
<span class="line"><span>      label-position：标签的位置，决定 el-form-item 中的标签显示位置（如 left、right、top）。 --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;el-form ref=&quot;loginFormRef&quot; :rules=&quot;rules&quot; :model=&quot;loginForm&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- el-form-item 是表单中的一个具体表单项，它负责包装单个输入组件（如 el-input）并提供验证、标签显示等功能。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        prop：表示与 el-form 的 model 对象中的哪个字段相关联，通常用于验证和数据绑定。</span></span>
<span class="line"><span>        label：为当前表单项设置标签名。</span></span>
<span class="line"><span>        rules：单独为此表单项定义验证规则（可覆盖 el-form 中定义的全局规则）。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        prop=&quot;username&quot; 使得当前的 el-form-item 与 el-form 上定义的验证规则（rules）绑定在一起。这样当 el-form 验证表单时，会根据 prop=&quot;username&quot; 找到对应的验证规则，并对当前输入框中的内容进行验证。 --&gt;</span></span>
<span class="line"><span>        &lt;el-form-item prop=&quot;username&quot;&gt;</span></span>
<span class="line"><span>          &lt;el-input v-model=&quot;loginForm.username&quot; placeholder=&quot;用户名&quot;&gt;&lt;/el-input&gt;</span></span>
<span class="line"><span>        &lt;/el-form-item&gt;</span></span>
<span class="line"><span>        &lt;el-form-item prop=&quot;password&quot;&gt;</span></span>
<span class="line"><span>          &lt;el-input v-model=&quot;loginForm.password&quot; type=&quot;password&quot; placeholder=&quot;密码&quot; show-password&gt;&lt;/el-input&gt;</span></span>
<span class="line"><span>        &lt;/el-form-item&gt;</span></span>
<span class="line"><span>        &lt;el-form-item&gt;</span></span>
<span class="line"><span>          &lt;el-button type=&quot;primary&quot; @click=&quot;handleLogin&quot; :loading=&quot;loading&quot;&gt;登录&lt;/el-button&gt;</span></span>
<span class="line"><span>        &lt;/el-form-item&gt;</span></span>
<span class="line"><span>      &lt;/el-form&gt;</span></span>
<span class="line"><span>    &lt;/el-card&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&quot;ts&quot; setup&gt;</span></span>
<span class="line"><span>import { ref, reactive } from &#39;vue&#39;</span></span>
<span class="line"><span>import { useRouter } from &#39;vue-router&#39;</span></span>
<span class="line"><span>import { ElMessage, ElForm } from &#39;element-plus&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 路由对象，用于页面跳转</span></span>
<span class="line"><span>const router = useRouter()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 按钮加载状态</span></span>
<span class="line"><span>const loading = ref(false)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 表单引用，用于获取表单实例</span></span>
<span class="line"><span>const loginFormRef = ref&lt;InstanceType&lt;typeof ElForm&gt; | null&gt;(null)  // 类型断言，表明 loginFormRef 是 ElForm 的实例或 null</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 表单数据模型，使用 reactive 创建响应式数据</span></span>
<span class="line"><span>const loginForm = reactive({</span></span>
<span class="line"><span>  username: &#39;&#39;,  // 用户名字段</span></span>
<span class="line"><span>  password: &#39;&#39;   // 密码字段</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 登录处理函数</span></span>
<span class="line"><span>const handleLogin = () =&gt; {</span></span>
<span class="line"><span>  // 确保 loginFormRef 不为 null</span></span>
<span class="line"><span>  if (loginFormRef.value) {</span></span>
<span class="line"><span>    // 调用表单的 validate 方法进行验证，\`loginFormRef\` 是通过 \`ref()\` 创建的，它是一个响应式的引用对象，\`loginFormRef.value\` 才是指向实际的 \`el-form\` 组件实例（也就是 \`ElForm\` 实例）。</span></span>
<span class="line"><span>    loginFormRef.value.validate((valid: boolean) =&gt; {</span></span>
<span class="line"><span>      if (!valid) {</span></span>
<span class="line"><span>        // 如果验证失败，显示错误信息</span></span>
<span class="line"><span>        ElMessage.error(&#39;请填写完整的表单&#39;)</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      loading.value = true  // 开始加载状态</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 模拟登录请求（这里使用 setTimeout 模拟异步请求）</span></span>
<span class="line"><span>      setTimeout(() =&gt; {</span></span>
<span class="line"><span>        // 检查用户名和密码是否正确</span></span>
<span class="line"><span>        if (loginForm.username === &#39;admin&#39; &amp;&amp; loginForm.password === &#39;password&#39;) {</span></span>
<span class="line"><span>          // 将登录状态存储在 localStorage 中</span></span>
<span class="line"><span>          localStorage.setItem(&#39;isLoggedIn&#39;, &#39;true&#39;)</span></span>
<span class="line"><span>          // 跳转到首页</span></span>
<span class="line"><span>          router.push(&#39;/&#39;)</span></span>
<span class="line"><span>          // 显示登录成功提示弹窗</span></span>
<span class="line"><span>          ElMessage.success(&#39;登录成功&#39;)</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>          // 如果用户名或密码错误，显示错误提示弹窗</span></span>
<span class="line"><span>          ElMessage.error(&#39;用户名或密码错误&#39;)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        loading.value = false  // 请求结束，取消加载状态</span></span>
<span class="line"><span>      }, 1000)</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// validate 方法的执行流程：</span></span>
<span class="line"><span>// 当你调用 loginFormRef.value.validate() 时，它会根据你在 rules 属性中定义的规则（rules 对象）逐个验证每个表单项。</span></span>
<span class="line"><span>// 验证完成后，validate 方法会调用回调函数，并传入一个 valid 参数。</span></span>
<span class="line"><span>// 如果所有表单项都符合规则，valid 会是 true。</span></span>
<span class="line"><span>// 如果有任何表单项不符合规则，valid 会是 false。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 表单验证规则</span></span>
<span class="line"><span>const rules = {</span></span>
<span class="line"><span>  username: [</span></span>
<span class="line"><span>    { required: true, message: &#39;用户名不能为空&#39;, trigger: &#39;blur&#39; }  // 用户名必填，并且在失去焦点时验证</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  password: [</span></span>
<span class="line"><span>    { required: true, message: &#39;密码不能为空&#39;, trigger: &#39;blur&#39; }  // 密码必填，并且在失去焦点时验证</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  &lt;style scoped&gt;</span></span>
<span class="line"><span>  .login-container {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    justify-content: center;</span></span>
<span class="line"><span>    align-items: center;</span></span>
<span class="line"><span>    height: 100vh;</span></span>
<span class="line"><span>    background-color: #f0f2f5;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  .login-card {</span></span>
<span class="line"><span>    width: 350px;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  &lt;/style&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>组件里面有v-bind和v-model绑定，一个是单向的，一个是双向的。</p><p>ref 用在普通 DOM 标签上，获取的是 DOM 节点；ref 用在组件标签上，获取的是组件实例对象。</p><p>el-form 是表单的整体容器，负责管理整个表单的数据绑定、验证规则和提交等功能。</p><p>常用属性：</p><p>model：用于绑定表单数据的对象，所有的 el-form-item 将从这里获取具体字段的数据。 rules：表单验证规则，通常是一个对象，包含每个表单字段的验证规则。 validate：提供方法手动触发表单验证。 label-position：标签的位置，决定 el-form-item 中的标签显示位置（如 left、right、top）。</p><p>validate 方法的执行流程： 当你调用 loginFormRef.value.validate() 时，它会根据你在 rules 属性中定义的规则（rules 对象）逐个验证每个表单项。 验证完成后，validate 方法会调用回调函数，并传入一个 valid 参数。 如果所有表单项都符合规则，valid 会是 true。 如果有任何表单项不符合规则，valid 会是 false。</p><p>el-form-item 是表单中的一个具体表单项，它负责包装单个输入组件（如 el-input）并提供验证、标签显示等功能。</p><p>prop：表示与 el-form 的 model 对象中的哪个字段相关联，通常用于验证和数据绑定。 label：为当前表单项设置标签名。 rules：单独为此表单项定义验证规则（可覆盖 el-form 中定义的全局规则）。</p><p>prop=&quot;username&quot; 使得当前的 el-form-item 与 el-form 上定义的验证规则（rules）绑定在一起。这样当 el-form 验证表单时，会根据 prop=&quot;username&quot; 找到对应的验证规则，并对当前输入框中的内容进行验证。</p><p>为什么是 <code>loginFormRef.value.validate</code> 而不是 <code>loginFormRef.validate</code>？</p><ol><li><strong><code>ref</code> 创建的引用对象：</strong><ul><li><code>loginFormRef</code> 是通过 <code>ref()</code> 创建的，它是一个响应式的引用对象，包含一个 <code>.value</code> 属性。</li><li><code>loginFormRef.value</code> 指向实际的 <code>el-form</code> 组件实例（也就是 <code>ElForm</code> 实例），你想要操作的是这个实例上的方法（例如 <code>validate</code>）。</li><li>因此，<code>loginFormRef.value</code> 才是真正的 <code>el-form</code> 组件实例，而 <code>loginFormRef</code> 只是一个包装器对象，提供响应式访问。</li></ul></li></ol><p>弹窗：<code>ElMessage.success(&#39;登录成功&#39;)</code></p><p>在 Vue 和 Element Plus 中，<code>&lt;template&gt;</code> 标签通常用于 <strong>具名插槽</strong> (named slots)，用于自定义组件内部某些特定部分的内容。这里的 <code>template #header</code> 是 Element Plus 中的一个 <strong>具名插槽</strong>，用于自定义 <code>el-card</code> 组件的头部内容。</p><p><code>rules</code> 是定义在 <code>Element Plus</code> 中的<strong>表单验证规则</strong>。</p>`,18),p=[i];function d(c,r){return a(),n("div",null,p)}const m=s(e,[["render",d],["__file","讲解简单的vue3登录界面.html.vue"]]),u=JSON.parse(`{"path":"/acrticle/vue%E5%AD%A6%E4%B9%A0/%E8%AE%B2%E8%A7%A3%E7%AE%80%E5%8D%95%E7%9A%84vue3%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2.html","title":"讲解简单的vue3登录界面","lang":"zh-CN","frontmatter":{"title":"讲解简单的vue3登录界面","icon":null,"order":null,"category":["vue3学习"],"tag":["vue3学习"],"description":"登录页面需要需要登录表单，登录表单里面需要账号和密码输入框，和登录按钮，还需要表单验证规则和提示成功或者失败的弹窗。 讲解简单的vue3登录界面 组件里面有v-bind和v-model绑定，一个是单向的，一个是双向的。 ref 用在普通 DOM 标签上，获取的是 DOM 节点；ref 用在组件标签上，获取的是组件实例对象。 el-form 是表单的整体...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/acrticle/vue%E5%AD%A6%E4%B9%A0/%E8%AE%B2%E8%A7%A3%E7%AE%80%E5%8D%95%E7%9A%84vue3%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2.html"}],["meta",{"property":"og:site_name","content":"个人学习记录博客"}],["meta",{"property":"og:title","content":"讲解简单的vue3登录界面"}],["meta",{"property":"og:description","content":"登录页面需要需要登录表单，登录表单里面需要账号和密码输入框，和登录按钮，还需要表单验证规则和提示成功或者失败的弹窗。 讲解简单的vue3登录界面 组件里面有v-bind和v-model绑定，一个是单向的，一个是双向的。 ref 用在普通 DOM 标签上，获取的是 DOM 节点；ref 用在组件标签上，获取的是组件实例对象。 el-form 是表单的整体..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-16T15:19:16.000Z"}],["meta",{"property":"article:author","content":"Mr.Hope"}],["meta",{"property":"article:tag","content":"vue3学习"}],["meta",{"property":"article:modified_time","content":"2024-10-16T15:19:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"讲解简单的vue3登录界面\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-16T15:19:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Hope\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":3,"title":"讲解简单的vue3登录界面","slug":"讲解简单的vue3登录界面","link":"#讲解简单的vue3登录界面","children":[]}],"git":{"createdTime":1729091956000,"updatedTime":1729091956000,"contributors":[{"name":"cf","email":"toysouth0@gmail.com","commits":1}]},"readingTime":{"minutes":6.25,"words":1876},"filePathRelative":"acrticle/vue学习/讲解简单的vue3登录界面.md","localizedDate":"2024年10月16日","excerpt":"<p>登录页面需要需要登录表单，登录表单里面需要账号和密码输入框，和登录按钮，还需要表单验证规则和提示成功或者失败的弹窗。</p>\\n<hr>\\n<h3>讲解简单的vue3登录界面</h3>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>&lt;template&gt;</span></span>\\n<span class=\\"line\\"><span>  &lt;div class=\\"login-container\\"&gt;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>    &lt;!-- el-card 是 Element Plus 提供的一个卡片组件，通常用于展示内容块或信息面板。el-card 组件的主要作用是将内容以卡片的形式展示，具有视觉上的分离感，适合用来展示数据、列表、表单等内容。 --&gt;</span></span>\\n<span class=\\"line\\"><span>    &lt;el-card class=\\"login-card\\"&gt;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>      &lt;!-- 在 Vue 和 Element Plus 中，\`&lt;template&gt;\` 标签通常用于 **具名插槽** (named slots)，用于自定义组件内部某些特定部分的内容。这里的 \`template #header\` 是 Element Plus 中的一个 **具名插槽**，用于自定义 \`el-card\` 组件的头部内容。 --&gt;</span></span>\\n<span class=\\"line\\"><span>      &lt;template #header&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;h2&gt;登录&lt;/h2&gt;</span></span>\\n<span class=\\"line\\"><span>      &lt;/template&gt;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>      &lt;!-- 组件里面有v-bind和v-model绑定，一个是单向的，一个是双向的。</span></span>\\n<span class=\\"line\\"><span>      ref 用在普通 DOM 标签上，获取的是 DOM 节点；ref 用在组件标签上，获取的是组件实例对象。 --&gt;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>      &lt;!-- el-form 是表单的整体容器，负责管理整个表单的数据绑定、验证规则和提交等功能。</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>      常用属性：</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>      model：用于绑定表单数据的对象，所有的 el-form-item 将从这里获取具体字段的数据。</span></span>\\n<span class=\\"line\\"><span>      rules：表单验证规则，通常是一个对象，包含每个表单字段的验证规则。</span></span>\\n<span class=\\"line\\"><span>      validate：提供方法手动触发表单验证。</span></span>\\n<span class=\\"line\\"><span>      label-position：标签的位置，决定 el-form-item 中的标签显示位置（如 left、right、top）。 --&gt;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>      &lt;el-form ref=\\"loginFormRef\\" :rules=\\"rules\\" :model=\\"loginForm\\"&gt;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>        &lt;!-- el-form-item 是表单中的一个具体表单项，它负责包装单个输入组件（如 el-input）并提供验证、标签显示等功能。</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>        prop：表示与 el-form 的 model 对象中的哪个字段相关联，通常用于验证和数据绑定。</span></span>\\n<span class=\\"line\\"><span>        label：为当前表单项设置标签名。</span></span>\\n<span class=\\"line\\"><span>        rules：单独为此表单项定义验证规则（可覆盖 el-form 中定义的全局规则）。</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>        prop=\\"username\\" 使得当前的 el-form-item 与 el-form 上定义的验证规则（rules）绑定在一起。这样当 el-form 验证表单时，会根据 prop=\\"username\\" 找到对应的验证规则，并对当前输入框中的内容进行验证。 --&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;el-form-item prop=\\"username\\"&gt;</span></span>\\n<span class=\\"line\\"><span>          &lt;el-input v-model=\\"loginForm.username\\" placeholder=\\"用户名\\"&gt;&lt;/el-input&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;/el-form-item&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;el-form-item prop=\\"password\\"&gt;</span></span>\\n<span class=\\"line\\"><span>          &lt;el-input v-model=\\"loginForm.password\\" type=\\"password\\" placeholder=\\"密码\\" show-password&gt;&lt;/el-input&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;/el-form-item&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;el-form-item&gt;</span></span>\\n<span class=\\"line\\"><span>          &lt;el-button type=\\"primary\\" @click=\\"handleLogin\\" :loading=\\"loading\\"&gt;登录&lt;/el-button&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;/el-form-item&gt;</span></span>\\n<span class=\\"line\\"><span>      &lt;/el-form&gt;</span></span>\\n<span class=\\"line\\"><span>    &lt;/el-card&gt;</span></span>\\n<span class=\\"line\\"><span>  &lt;/div&gt;</span></span>\\n<span class=\\"line\\"><span>&lt;/template&gt;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>&lt;script lang=\\"ts\\" setup&gt;</span></span>\\n<span class=\\"line\\"><span>import { ref, reactive } from 'vue'</span></span>\\n<span class=\\"line\\"><span>import { useRouter } from 'vue-router'</span></span>\\n<span class=\\"line\\"><span>import { ElMessage, ElForm } from 'element-plus'</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>// 路由对象，用于页面跳转</span></span>\\n<span class=\\"line\\"><span>const router = useRouter()</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>// 按钮加载状态</span></span>\\n<span class=\\"line\\"><span>const loading = ref(false)</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>// 表单引用，用于获取表单实例</span></span>\\n<span class=\\"line\\"><span>const loginFormRef = ref&lt;InstanceType&lt;typeof ElForm&gt; | null&gt;(null)  // 类型断言，表明 loginFormRef 是 ElForm 的实例或 null</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>// 表单数据模型，使用 reactive 创建响应式数据</span></span>\\n<span class=\\"line\\"><span>const loginForm = reactive({</span></span>\\n<span class=\\"line\\"><span>  username: '',  // 用户名字段</span></span>\\n<span class=\\"line\\"><span>  password: ''   // 密码字段</span></span>\\n<span class=\\"line\\"><span>})</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>// 登录处理函数</span></span>\\n<span class=\\"line\\"><span>const handleLogin = () =&gt; {</span></span>\\n<span class=\\"line\\"><span>  // 确保 loginFormRef 不为 null</span></span>\\n<span class=\\"line\\"><span>  if (loginFormRef.value) {</span></span>\\n<span class=\\"line\\"><span>    // 调用表单的 validate 方法进行验证，\`loginFormRef\` 是通过 \`ref()\` 创建的，它是一个响应式的引用对象，\`loginFormRef.value\` 才是指向实际的 \`el-form\` 组件实例（也就是 \`ElForm\` 实例）。</span></span>\\n<span class=\\"line\\"><span>    loginFormRef.value.validate((valid: boolean) =&gt; {</span></span>\\n<span class=\\"line\\"><span>      if (!valid) {</span></span>\\n<span class=\\"line\\"><span>        // 如果验证失败，显示错误信息</span></span>\\n<span class=\\"line\\"><span>        ElMessage.error('请填写完整的表单')</span></span>\\n<span class=\\"line\\"><span>        return</span></span>\\n<span class=\\"line\\"><span>      }</span></span>\\n<span class=\\"line\\"><span>      </span></span>\\n<span class=\\"line\\"><span>      loading.value = true  // 开始加载状态</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>      // 模拟登录请求（这里使用 setTimeout 模拟异步请求）</span></span>\\n<span class=\\"line\\"><span>      setTimeout(() =&gt; {</span></span>\\n<span class=\\"line\\"><span>        // 检查用户名和密码是否正确</span></span>\\n<span class=\\"line\\"><span>        if (loginForm.username === 'admin' &amp;&amp; loginForm.password === 'password') {</span></span>\\n<span class=\\"line\\"><span>          // 将登录状态存储在 localStorage 中</span></span>\\n<span class=\\"line\\"><span>          localStorage.setItem('isLoggedIn', 'true')</span></span>\\n<span class=\\"line\\"><span>          // 跳转到首页</span></span>\\n<span class=\\"line\\"><span>          router.push('/')</span></span>\\n<span class=\\"line\\"><span>          // 显示登录成功提示弹窗</span></span>\\n<span class=\\"line\\"><span>          ElMessage.success('登录成功')</span></span>\\n<span class=\\"line\\"><span>        } else {</span></span>\\n<span class=\\"line\\"><span>          // 如果用户名或密码错误，显示错误提示弹窗</span></span>\\n<span class=\\"line\\"><span>          ElMessage.error('用户名或密码错误')</span></span>\\n<span class=\\"line\\"><span>        }</span></span>\\n<span class=\\"line\\"><span>        loading.value = false  // 请求结束，取消加载状态</span></span>\\n<span class=\\"line\\"><span>      }, 1000)</span></span>\\n<span class=\\"line\\"><span>    })</span></span>\\n<span class=\\"line\\"><span>  }</span></span>\\n<span class=\\"line\\"><span>}</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>// validate 方法的执行流程：</span></span>\\n<span class=\\"line\\"><span>// 当你调用 loginFormRef.value.validate() 时，它会根据你在 rules 属性中定义的规则（rules 对象）逐个验证每个表单项。</span></span>\\n<span class=\\"line\\"><span>// 验证完成后，validate 方法会调用回调函数，并传入一个 valid 参数。</span></span>\\n<span class=\\"line\\"><span>// 如果所有表单项都符合规则，valid 会是 true。</span></span>\\n<span class=\\"line\\"><span>// 如果有任何表单项不符合规则，valid 会是 false。</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>// 表单验证规则</span></span>\\n<span class=\\"line\\"><span>const rules = {</span></span>\\n<span class=\\"line\\"><span>  username: [</span></span>\\n<span class=\\"line\\"><span>    { required: true, message: '用户名不能为空', trigger: 'blur' }  // 用户名必填，并且在失去焦点时验证</span></span>\\n<span class=\\"line\\"><span>  ],</span></span>\\n<span class=\\"line\\"><span>  password: [</span></span>\\n<span class=\\"line\\"><span>    { required: true, message: '密码不能为空', trigger: 'blur' }  // 密码必填，并且在失去焦点时验证</span></span>\\n<span class=\\"line\\"><span>  ]</span></span>\\n<span class=\\"line\\"><span>}</span></span>\\n<span class=\\"line\\"><span>&lt;/script&gt;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>  </span></span>\\n<span class=\\"line\\"><span>  &lt;style scoped&gt;</span></span>\\n<span class=\\"line\\"><span>  .login-container {</span></span>\\n<span class=\\"line\\"><span>    display: flex;</span></span>\\n<span class=\\"line\\"><span>    justify-content: center;</span></span>\\n<span class=\\"line\\"><span>    align-items: center;</span></span>\\n<span class=\\"line\\"><span>    height: 100vh;</span></span>\\n<span class=\\"line\\"><span>    background-color: #f0f2f5;</span></span>\\n<span class=\\"line\\"><span>  }</span></span>\\n<span class=\\"line\\"><span>  .login-card {</span></span>\\n<span class=\\"line\\"><span>    width: 350px;</span></span>\\n<span class=\\"line\\"><span>  }</span></span>\\n<span class=\\"line\\"><span>  &lt;/style&gt;</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{m as comp,u as data};
