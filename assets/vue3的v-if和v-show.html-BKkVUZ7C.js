import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,d as n}from"./app-3ODZfz1q.js";const l={},e=n(`<p><code>v-if</code> 控制元素是否渲染到 DOM中。 <code>v-show</code> 通过 CSS 控制元素是否可见，但不影响其在 DOM 中的存在。</p><hr><h3 id="vue-3-项目讲解-v-if-和-v-show" tabindex="-1"><a class="header-anchor" href="#vue-3-项目讲解-v-if-和-v-show"><span>Vue 3 项目讲解：<code>v-if</code> 和 <code>v-show</code></span></a></h3><p>在这个示例项目中，我们会通过简单的 Vue 3 代码，展示如何使用 <code>v-if</code> 和 <code>v-show</code> 控制元素的显示与隐藏。</p><h3 id="_1-创建-vue-3-项目" tabindex="-1"><a class="header-anchor" href="#_1-创建-vue-3-项目"><span>1. 创建 Vue 3 项目</span></a></h3><p>我们将使用 Vite 创建一个 Vue 3 项目。</p><h4 id="项目创建命令" tabindex="-1"><a class="header-anchor" href="#项目创建命令"><span>项目创建命令：</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 创建项目</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> init</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> vite@latest</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> vue3-v-if-v-show-demo</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --template</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> vue-ts</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 进入项目目录</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> vue3-v-if-v-show-demo</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 安装依赖</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 启动开发服务器</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> dev</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-项目结构" tabindex="-1"><a class="header-anchor" href="#_2-项目结构"><span>2. 项目结构</span></a></h3><p>执行完上述命令后，项目结构大致如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>vue3-v-if-v-show-demo/</span></span>
<span class="line"><span>├── node_modules/</span></span>
<span class="line"><span>├── public/</span></span>
<span class="line"><span>├── src/</span></span>
<span class="line"><span>│   ├── assets/</span></span>
<span class="line"><span>│   ├── components/</span></span>
<span class="line"><span>│   ├── App.vue        # 主应用文件</span></span>
<span class="line"><span>│   ├── main.ts        # 项目入口文件</span></span>
<span class="line"><span>│   └── vite-env.d.ts</span></span>
<span class="line"><span>├── index.html         # 项目模板</span></span>
<span class="line"><span>├── package.json</span></span>
<span class="line"><span>├── tsconfig.json</span></span>
<span class="line"><span>└── vite.config.ts     # Vite 配置文件</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们会在 <code>App.vue</code> 文件中编写 <code>v-if</code> 和 <code>v-show</code> 的示例。</p><h3 id="_3-修改-app-vue-文件" tabindex="-1"><a class="header-anchor" href="#_3-修改-app-vue-文件"><span>3. 修改 <code>App.vue</code> 文件</span></a></h3><div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" data-title="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> lang</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;ts&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">ref</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">// 创建两个响应式变量用于控制元素显示和隐藏</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> showIf</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> ref</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">false</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">// 控制 v-if</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> showShow</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> ref</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">false</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">// 控制 v-show</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">// 切换函数</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> toggleIf</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> () </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">  showIf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> !</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">showIf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">value</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> toggleShow</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> () </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">  showShow</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> !</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">showShow</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">value</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;container&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">h1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;Vue 3 中 v-if 和 v-show 示例&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">h1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    &lt;!-- v-if 示例 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">button</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> @</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">click</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">toggleIf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;切换 v-if&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">button</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">p</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> v-if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">showIf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;这是 v-if 控制的段落&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">p</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    &lt;!-- v-show 示例 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">button</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> @</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">click</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">toggleShow</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;切换 v-show&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">button</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">p</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> v-show</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">showShow</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;这是 v-show 控制的段落&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">p</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">style</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> scoped</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">.container</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  text-align: </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66;">center</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  padding: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">20</span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;">px</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">button</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  margin-bottom: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">10</span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;">px</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">style</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-代码讲解" tabindex="-1"><a class="header-anchor" href="#_4-代码讲解"><span>4. 代码讲解</span></a></h3><ul><li><p><strong><code>v-if</code></strong>：</p><ul><li>当 <code>showIf</code> 为 <code>true</code> 时，段落 <code>&lt;p&gt;</code> 会被渲染到 DOM 中。如果 <code>showIf</code> 为 <code>false</code>，该段落将<strong>完全从 DOM 中移除</strong>。</li></ul></li><li><p><strong><code>v-show</code></strong>：</p><ul><li>当 <code>showShow</code> 为 <code>true</code> 时，段落 <code>&lt;p&gt;</code> 会通过 CSS <code>display: block</code> 显示出来。如果 <code>showShow</code> 为 <code>false</code>，段落不会被移除，但会被设置为 <code>display: none</code>，即仍然存在于 DOM 中但不可见。</li></ul></li><li><p><strong>切换逻辑</strong>：</p><ul><li>通过点击不同的按钮，可以分别切换 <code>v-if</code> 和 <code>v-show</code> 的状态，并观察它们在页面上控制元素显示与隐藏的效果。</li></ul></li></ul><h3 id="_5-启动项目" tabindex="-1"><a class="header-anchor" href="#_5-启动项目"><span>5. 启动项目</span></a></h3><p>运行以下命令启动项目：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> dev</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>然后打开浏览器，访问项目地址（通常是 <code>http://localhost:5173/</code>），你会看到两个按钮和两个段落。点击按钮可以分别切换 <code>v-if</code> 和 <code>v-show</code> 控制的段落。</p><h3 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结"><span>6. 总结</span></a></h3><ul><li><strong><code>v-if</code></strong>：当条件为 <code>false</code> 时，元素会从 DOM 中移除。当条件为 <code>true</code> 时，元素会被重新渲染。</li><li><strong><code>v-show</code></strong>：元素始终存在于 DOM 中，只是通过 CSS <code>display</code> 属性控制可见性。</li></ul><p>这两者的主要区别在于：<code>v-if</code> 适合频繁显示和移除元素，<code>v-show</code> 适合频繁显示和隐藏元素（不重新渲染 DOM）。</p>`,23),h=[e];function t(p,k){return a(),i("div",null,h)}const c=s(l,[["render",t],["__file","vue3的v-if和v-show.html.vue"]]),o=JSON.parse('{"path":"/acrticle/vue%E5%AD%A6%E4%B9%A0/vue3%E7%9A%84v-if%E5%92%8Cv-show.html","title":"vue3的v-if和v-show","lang":"zh-CN","frontmatter":{"title":"vue3的v-if和v-show","icon":null,"order":null,"category":["vue学习"],"tag":["vue学习"],"description":"v-if 控制元素是否渲染到 DOM中。 v-show 通过 CSS 控制元素是否可见，但不影响其在 DOM 中的存在。 Vue 3 项目讲解：v-if 和 v-show 在这个示例项目中，我们会通过简单的 Vue 3 代码，展示如何使用 v-if 和 v-show 控制元素的显示与隐藏。 1. 创建 Vue 3 项目 我们将使用 Vite 创建一个 ...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/acrticle/vue%E5%AD%A6%E4%B9%A0/vue3%E7%9A%84v-if%E5%92%8Cv-show.html"}],["meta",{"property":"og:site_name","content":"个人学习记录博客"}],["meta",{"property":"og:title","content":"vue3的v-if和v-show"}],["meta",{"property":"og:description","content":"v-if 控制元素是否渲染到 DOM中。 v-show 通过 CSS 控制元素是否可见，但不影响其在 DOM 中的存在。 Vue 3 项目讲解：v-if 和 v-show 在这个示例项目中，我们会通过简单的 Vue 3 代码，展示如何使用 v-if 和 v-show 控制元素的显示与隐藏。 1. 创建 Vue 3 项目 我们将使用 Vite 创建一个 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-14T03:54:00.000Z"}],["meta",{"property":"article:author","content":"Mr.Hope"}],["meta",{"property":"article:tag","content":"vue学习"}],["meta",{"property":"article:modified_time","content":"2024-10-14T03:54:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue3的v-if和v-show\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-14T03:54:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Hope\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":3,"title":"Vue 3 项目讲解：v-if 和 v-show","slug":"vue-3-项目讲解-v-if-和-v-show","link":"#vue-3-项目讲解-v-if-和-v-show","children":[]},{"level":3,"title":"1. 创建 Vue 3 项目","slug":"_1-创建-vue-3-项目","link":"#_1-创建-vue-3-项目","children":[]},{"level":3,"title":"2. 项目结构","slug":"_2-项目结构","link":"#_2-项目结构","children":[]},{"level":3,"title":"3. 修改 App.vue 文件","slug":"_3-修改-app-vue-文件","link":"#_3-修改-app-vue-文件","children":[]},{"level":3,"title":"4. 代码讲解","slug":"_4-代码讲解","link":"#_4-代码讲解","children":[]},{"level":3,"title":"5. 启动项目","slug":"_5-启动项目","link":"#_5-启动项目","children":[]},{"level":3,"title":"6. 总结","slug":"_6-总结","link":"#_6-总结","children":[]}],"git":{"createdTime":1728874054000,"updatedTime":1728878040000,"contributors":[{"name":"cf","email":"toysouth0@gmail.com","commits":2}]},"readingTime":{"minutes":2.4,"words":721},"filePathRelative":"acrticle/vue学习/vue3的v-if和v-show.md","localizedDate":"2024年10月14日","excerpt":"<p><code>v-if</code> 控制元素是否渲染到 DOM中。\\n<code>v-show</code> 通过 CSS 控制元素是否可见，但不影响其在 DOM 中的存在。</p>\\n<hr>\\n<h3>Vue 3 项目讲解：<code>v-if</code> 和 <code>v-show</code></h3>\\n<p>在这个示例项目中，我们会通过简单的 Vue 3 代码，展示如何使用 <code>v-if</code> 和 <code>v-show</code> 控制元素的显示与隐藏。</p>\\n<h3>1. 创建 Vue 3 项目</h3>\\n<p>我们将使用 Vite 创建一个 Vue 3 项目。</p>","autoDesc":true}');export{c as comp,o as data};
