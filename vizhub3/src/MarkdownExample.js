const __html = `<p>This is a test of Markdown rendering.</p>
<p>Support for <code>inline code snippets</code> and tables:</p>
<table>
<thead>
<tr>
<th>First Header</th>
<th>Second Header</th>
</tr>
</thead>
<tbody><tr>
<td>Content Cell</td>
<td>Content Cell</td>
</tr>
<tr>
<td>Content Cell</td>
<td>Content Cell</td>
</tr>
</tbody></table>
<pre><code>// You can import API functions like this from D3.js.
import { select } from 'd3';
import { message } from './myMessage';
select('#message').text(message);
</code></pre>
<p>Adding a pipe <code>|</code> in a cell :</p>
<table>
<thead>
<tr>
<th>First Header</th>
<th>Second Header</th>
</tr>
</thead>
<tbody><tr>
<td>Content Cell</td>
<td>Content Cell</td>
</tr>
<tr>
<td>Content Cell</td>
<td>|</td>
</tr>
</tbody></table>
<pre><code>First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  |  \| 
</code></pre>
<p>Left, right and center aligned table</p>
<p>Left aligned Header | Right aligned Header | Center aligned Header
| :--- | ---: | :---:
Content Cell  | Content Cell | Content Cell
Content Cell  | Content Cell | Content Cell</p>
<pre><code>Left aligned Header | Right aligned Header | Center aligned Header
| :--- | ---: | :---:
Content Cell  | Content Cell | Content Cell
Content Cell  | Content Cell | Content Cell
</code></pre>
<p><code>code()</code></p>
<pre><code>Markup :  \`code()\`
</code></pre>
<pre><code className="language-javascript">    var specificLanguage_code = 
    {
        "data": {
            "lookedUpPlatform": 1,
            "query": "Kasabian+Test+Transmission",
            "lookedUpItem": {
                "name": "Test Transmission",
                "artist": "Kasabian",
                "album": "Kasabian",
                "picture": null,
                "link": "http://open.spotify.com/track/5jhJur5n4fasblLSCOcrTp"
            }
        }
    }
</code></pre>
<pre><code>Markup : \`\`\`javascript
         \`\`\`
</code></pre>
<ul>
<li>Bullet list<ul>
<li>Nested bullet<ul>
<li>Sub-nested bullet etc</li>
</ul>
</li>
</ul>
</li>
<li>Bullet list item 2</li>
</ul>
<pre><code> Markup : * Bullet list
              * Nested bullet
                  * Sub-nested bullet etc
          * Bullet list item 2

-OR-

 Markup : - Bullet list
              - Nested bullet
                  - Sub-nested bullet etc
          - Bullet list item 2 
</code></pre>
<ol>
<li>A numbered list<ol>
<li>A nested numbered list</li>
<li>Which is numbered</li>
</ol>
</li>
<li>Which is numbered</li>
</ol>
<pre><code> Markup : 1. A numbered list
              1. A nested numbered list
              2. Which is numbered
          2. Which is numbered
</code></pre>
<ul>
<li><input disabled="" type="checkbox"> An uncompleted task</li>
<li><input checked="" disabled="" type="checkbox"> A completed task</li>
</ul>
<pre><code> Markup : - [ ] An uncompleted task
          - [x] A completed task
</code></pre>
<ul>
<li><input disabled="" type="checkbox"> An uncompleted task<ul>
<li><input disabled="" type="checkbox"> A subtask</li>
</ul>
</li>
</ul>
<pre><code> Markup : - [ ] An uncompleted task
              - [ ] A subtask
</code></pre>
<blockquote>
<p>Blockquote</p>
<blockquote>
<p>Nested blockquote</p>
</blockquote>
</blockquote>
<pre><code>Markup :  &gt; Blockquote
          &gt;&gt; Nested Blockquote
</code></pre>
<p><em>Horizontal line :</em></p>
<hr>
<pre><code>Markup :  - - - -
</code></pre>
<p><em>Image with alt :</em></p>
<p><img src="http://via.placeholder.com/200x150" alt="picture alt" title="Title is optional"></p>
<pre><code>Markup : ![picture alt](http://via.placeholder.com/200x150 "Title is optional")
</code></pre>
<p>Foldable text:</p>
<details>
  <summary>Title 1</summary>
  <p>Content 1 Content 1 Content 1 Content 1 Content 1</p>
</details>
<details>
  <summary>Title 2</summary>
  <p>Content 2 Content 2 Content 2 Content 2 Content 2</p>
</details>

<pre><code>Markup : &lt;details&gt;
           &lt;summary&gt;Title 1&lt;/summary&gt;
           &lt;p&gt;Content 1 Content 1 Content 1 Content 1 Content 1&lt;/p&gt;
         &lt;/details&gt;
</code></pre>
<pre><code className="language-html">&lt;h3&gt;HTML&lt;/h3&gt;
&lt;p&gt; Some HTML code here &lt;/p&gt;
</code></pre>
<p>Link to a specific part of the page:</p>
<p><a target="_blank" href="#TOP">Go To TOP</a></p>
<pre><code>Markup : [text goes here](#section_name)
          section_title&lt;a name="section_name"&gt;&lt;/a&gt;    
</code></pre>
<p>Hotkey:</p>
<p><kbd>⌘F</kbd></p>
<p><kbd>⇧⌘F</kbd></p>
<pre><code>Markup : &lt;kbd&gt;⌘F&lt;/kbd&gt;
</code></pre>
<p>Hotkey list:</p>
<table>
<thead>
<tr>
<th>Key</th>
<th>Symbol</th>
</tr>
</thead>
<tbody><tr>
<td>Option</td>
<td>⌥</td>
</tr>
<tr>
<td>Control</td>
<td>⌃</td>
</tr>
<tr>
<td>Command</td>
<td>⌘</td>
</tr>
<tr>
<td>Shift</td>
<td>⇧</td>
</tr>
<tr>
<td>Caps Lock</td>
<td>⇪</td>
</tr>
<tr>
<td>Tab</td>
<td>⇥</td>
</tr>
<tr>
<td>Esc</td>
<td>⎋</td>
</tr>
<tr>
<td>Power</td>
<td>⌽</td>
</tr>
<tr>
<td>Return</td>
<td>↩</td>
</tr>
<tr>
<td>Delete</td>
<td>⌫</td>
</tr>
<tr>
<td>Up</td>
<td>↑</td>
</tr>
<tr>
<td>Down</td>
<td>↓</td>
</tr>
<tr>
<td>Left</td>
<td>←</td>
</tr>
<tr>
<td>Right</td>
<td>→</td>
</tr>
</tbody></table>
<p>Emoji:</p>
<p>:exclamation: Use emoji icons to enhance text. :+1:  Look up emoji codes at <a target="_blank" href="http://emoji-cheat-sheet.com/">emoji-cheat-sheet.com</a></p>
<pre><code>Markup : Code appears between colons :EMOJICODE:
</code></pre>
`;
export const MarkdownExample = () => (
  <article className="markdown-body" dangerouslySetInnerHTML={{ __html }} />
);
