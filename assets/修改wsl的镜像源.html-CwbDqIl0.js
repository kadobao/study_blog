import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as e,f as t}from"./app-Ceg1XNwD.js";const n={},a=t(`<p>在Windows中通过图形界面来设置WSL中的Ubuntu使用阿里云的镜像源。以下是步骤：</p><h3 id="_1-启动wsl并打开文件资源管理器" tabindex="-1"><a class="header-anchor" href="#_1-启动wsl并打开文件资源管理器"><span>1. 启动WSL并打开文件资源管理器</span></a></h3><ol><li><p><strong>启动WSL</strong>：</p><ul><li>打开你安装的Ubuntu WSL，通过“开始”菜单或者在命令行中输入 <code>wsl</code> 然后回车。</li></ul></li><li><p><strong>导航到APT源文件目录</strong>：</p><ul><li><p>在WSL的终端中输入以下命令，导航到APT源文件所在的目录：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /etc/apt/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul></li><li><p><strong>打开文件资源管理器</strong>：</p><ul><li><p>在WSL终端中输入以下命令，以在Windows文件资源管理器中打开当前目录：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">explorer.exe</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>这会在Windows的文件资源管理器中打开 <code>/etc/apt/</code> 目录。</p></li></ul></li></ol><h3 id="_2-修改-sources-list" tabindex="-1"><a class="header-anchor" href="#_2-修改-sources-list"><span>2. 修改 <code>sources.list</code></span></a></h3><div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" data-title="yml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 默认的阿里云镜像源</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># deb-src http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">## Major bug fix updates produced after the final release of the distribution.</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># deb-src http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu team.</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># deb-src http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">## Uncomment the following two lines to add software from Canonical&#39;s</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">## &#39;partner&#39; repository.</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">## This software is not part of Ubuntu, but is offered by Canonical and the</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">## respective vendors as a service to Ubuntu users.</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># deb http://archive.canonical.com/ubuntu jammy partner</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># deb-src http://archive.canonical.com/ubuntu jammy partner</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">## 安全更新源</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">deb http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># deb-src http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),l=[a];function r(h,d){return e(),s("div",null,l)}const p=i(n,[["render",r],["__file","修改wsl的镜像源.html.vue"]]),u=JSON.parse('{"path":"/acrticle/%E4%B8%80%E4%BA%9B%E9%9A%8F%E6%9C%BA/%E4%BF%AE%E6%94%B9wsl%E7%9A%84%E9%95%9C%E5%83%8F%E6%BA%90.html","title":"修改wsl设置为阿里云的镜像源","lang":"zh-CN","frontmatter":{"title":"修改wsl设置为阿里云的镜像源","icon":null,"order":3,"category":["一些随记"],"tag":["wsl"],"description":"在Windows中通过图形界面来设置WSL中的Ubuntu使用阿里云的镜像源。以下是步骤： 1. 启动WSL并打开文件资源管理器 启动WSL： 打开你安装的Ubuntu WSL，通过“开始”菜单或者在命令行中输入 wsl 然后回车。 导航到APT源文件目录： 在WSL的终端中输入以下命令，导航到APT源文件所在的目录： 打开文件资源管理器： 在WSL终...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/acrticle/%E4%B8%80%E4%BA%9B%E9%9A%8F%E6%9C%BA/%E4%BF%AE%E6%94%B9wsl%E7%9A%84%E9%95%9C%E5%83%8F%E6%BA%90.html"}],["meta",{"property":"og:site_name","content":"个人学习记录博客"}],["meta",{"property":"og:title","content":"修改wsl设置为阿里云的镜像源"}],["meta",{"property":"og:description","content":"在Windows中通过图形界面来设置WSL中的Ubuntu使用阿里云的镜像源。以下是步骤： 1. 启动WSL并打开文件资源管理器 启动WSL： 打开你安装的Ubuntu WSL，通过“开始”菜单或者在命令行中输入 wsl 然后回车。 导航到APT源文件目录： 在WSL的终端中输入以下命令，导航到APT源文件所在的目录： 打开文件资源管理器： 在WSL终..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-26T21:14:50.000Z"}],["meta",{"property":"article:author","content":"Mr.Hope"}],["meta",{"property":"article:tag","content":"wsl"}],["meta",{"property":"article:modified_time","content":"2024-08-26T21:14:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"修改wsl设置为阿里云的镜像源\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-08-26T21:14:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Hope\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":3,"title":"1. 启动WSL并打开文件资源管理器","slug":"_1-启动wsl并打开文件资源管理器","link":"#_1-启动wsl并打开文件资源管理器","children":[]},{"level":3,"title":"2. 修改 sources.list","slug":"_2-修改-sources-list","link":"#_2-修改-sources-list","children":[]}],"git":{"createdTime":1724706890000,"updatedTime":1724706890000,"contributors":[{"name":"cf","email":"toysouth0@gmail.com","commits":1}]},"readingTime":{"minutes":1.2,"words":359},"filePathRelative":"acrticle/一些随机/修改wsl的镜像源.md","localizedDate":"2024年8月26日","excerpt":"<p>在Windows中通过图形界面来设置WSL中的Ubuntu使用阿里云的镜像源。以下是步骤：</p>\\n<h3>1. 启动WSL并打开文件资源管理器</h3>\\n<ol>\\n<li>\\n<p><strong>启动WSL</strong>：</p>\\n<ul>\\n<li>打开你安装的Ubuntu WSL，通过“开始”菜单或者在命令行中输入 <code>wsl</code> 然后回车。</li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>导航到APT源文件目录</strong>：</p>\\n<ul>\\n<li>\\n<p>在WSL的终端中输入以下命令，导航到APT源文件所在的目录：</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"bash\\" data-title=\\"bash\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\">cd</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> /etc/apt/</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div></li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>打开文件资源管理器</strong>：</p>\\n<ul>\\n<li>\\n<p>在WSL终端中输入以下命令，以在Windows文件资源管理器中打开当前目录：</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"bash\\" data-title=\\"bash\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">explorer.exe</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> .</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div></li>\\n<li>\\n<p>这会在Windows的文件资源管理器中打开 <code>/etc/apt/</code> 目录。</p>\\n</li>\\n</ul>\\n</li>\\n</ol>","autoDesc":true}');export{p as comp,u as data};
