import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as t,d as s}from"./app-3ODZfz1q.js";const n={},a=s(`<p>[details=&quot;省流&quot;] 当 v-if 和 v-for 同时存在于一个元素上的时候，v-if 会首先被执行。 [/details]</p><hr><p>同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显；为了解决这个问题，一般的推荐做法是尽量将 v-if 移到父级元素上，避免同时使用 v-if 和 v-for 。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;!-- 推荐的做法，将 v-if 移到父级 --&gt;</span></span>
<span class="line"><span>  &lt;ul v-if=&quot;shouldRenderList&quot;&gt;</span></span>
<span class="line"><span>    &lt;li v-for=&quot;item in items&quot; :key=&quot;item.id&quot;&gt;</span></span>
<span class="line"><span>      {{ item.name }}</span></span>
<span class="line"><span>    &lt;/li&gt;</span></span>
<span class="line"><span>  &lt;/ul&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>注： vue2和vue3的答案完全相反： 在vue2中，v-for的优先级高于v-if； 在vue3中，v-if的优先级高于v-for。</p>`,6),l=[a];function r(p,o){return t(),i("div",null,l)}const c=e(n,[["render",r],["__file","vue3的v-if与v-for的优先级.html.vue"]]),m=JSON.parse('{"path":"/acrticle/vue%E5%AD%A6%E4%B9%A0/vue3%E7%9A%84v-if%E4%B8%8Ev-for%E7%9A%84%E4%BC%98%E5%85%88%E7%BA%A7.html","title":"vue3的v-if与v-for的优先级","lang":"zh-CN","frontmatter":{"title":"vue3的v-if与v-for的优先级","icon":null,"order":null,"category":["vue学习"],"tag":["vue学习"],"description":"[details=\\"省流\\"] 当 v-if 和 v-for 同时存在于一个元素上的时候，v-if 会首先被执行。 [/details] 同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显；为了解决这个问题，一般的推荐做法是尽量将 v-if 移到父级元素上，避免同时使用 v-if 和 v-for 。 注： vue2和vue3的答案...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/acrticle/vue%E5%AD%A6%E4%B9%A0/vue3%E7%9A%84v-if%E4%B8%8Ev-for%E7%9A%84%E4%BC%98%E5%85%88%E7%BA%A7.html"}],["meta",{"property":"og:site_name","content":"个人学习记录博客"}],["meta",{"property":"og:title","content":"vue3的v-if与v-for的优先级"}],["meta",{"property":"og:description","content":"[details=\\"省流\\"] 当 v-if 和 v-for 同时存在于一个元素上的时候，v-if 会首先被执行。 [/details] 同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显；为了解决这个问题，一般的推荐做法是尽量将 v-if 移到父级元素上，避免同时使用 v-if 和 v-for 。 注： vue2和vue3的答案..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-14T03:54:00.000Z"}],["meta",{"property":"article:author","content":"Mr.Hope"}],["meta",{"property":"article:tag","content":"vue学习"}],["meta",{"property":"article:modified_time","content":"2024-10-14T03:54:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue3的v-if与v-for的优先级\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-14T03:54:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Hope\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[],"git":{"createdTime":1728874054000,"updatedTime":1728878040000,"contributors":[{"name":"cf","email":"toysouth0@gmail.com","commits":2}]},"readingTime":{"minutes":0.62,"words":185},"filePathRelative":"acrticle/vue学习/vue3的v-if与v-for的优先级.md","localizedDate":"2024年10月14日","excerpt":"<p>[details=\\"省流\\"]\\n当 v-if 和 v-for 同时存在于一个元素上的时候，v-if 会首先被执行。\\n[/details]</p>\\n<hr>\\n<p>同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显；为了解决这个问题，一般的推荐做法是尽量将 v-if 移到父级元素上，避免同时使用 v-if 和 v-for 。</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>&lt;template&gt;</span></span>\\n<span class=\\"line\\"><span>  &lt;!-- 推荐的做法，将 v-if 移到父级 --&gt;</span></span>\\n<span class=\\"line\\"><span>  &lt;ul v-if=\\"shouldRenderList\\"&gt;</span></span>\\n<span class=\\"line\\"><span>    &lt;li v-for=\\"item in items\\" :key=\\"item.id\\"&gt;</span></span>\\n<span class=\\"line\\"><span>      {{ item.name }}</span></span>\\n<span class=\\"line\\"><span>    &lt;/li&gt;</span></span>\\n<span class=\\"line\\"><span>  &lt;/ul&gt;</span></span>\\n<span class=\\"line\\"><span>&lt;/template&gt;</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{c as comp,m as data};
