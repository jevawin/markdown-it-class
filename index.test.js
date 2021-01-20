const MarkdownIt = require('markdown-it')
const MarkdownItClass = require('./index.js')
const attrs = require('markdown-it-attrs')

describe('markdown-it-class', () => {
  it('adds a class to corresponding tags', () => {
    const mapping = {
        h1: 'title',
        h2: 'subtitle'
      },
      mdtxt = '# Hello\n## World'
    htmltxt =
      '<h1 class="title">Hello</h1>\n<h2 class="subtitle">World</h2>'

    const md = new MarkdownIt()
    md.use(MarkdownItClass, mapping)

    expect(md.render(mdtxt).trim()).toBe(htmltxt)
  })

  it('adds classes to corresponding tags', () => {
    const mapping = {
        h1: ['title', 'is-4'],
        h2: ['subtitle', 'is-6']
      },
      mdtxt = '# Hello\n## World'
    htmltxt =
      '<h1 class="title is-4">Hello</h1>\n<h2 class="subtitle is-6">World</h2>'

    const md = new MarkdownIt()
    md.use(MarkdownItClass, mapping)

    expect(md.render(mdtxt).trim()).toBe(htmltxt)
  })

  it('adds classes to em tags', () => {
    const mapping = {
        em: 'tag',
      },
      mdtxt = '# There are three buttons, *red* *green* and *blue*.'
    htmltxt =
      '<h1>There are three buttons, <em class="tag">red</em> <em class="tag">green</em> and <em class="tag">blue</em>.</h1>'

    const md = new MarkdownIt()
    md.use(MarkdownItClass, mapping)

    expect(md.render(mdtxt).trim()).toBe(htmltxt)
  })

  it('adds classes to code spans', () => {
    const mapping = {
        code: 'tag',
      },
      mdtxt = '# There are three languages, `python` `JavaScript` and `C`.'
    htmltxt =
      '<h1>There are three languages, <code class="tag">python</code> <code class="tag">JavaScript</code> and <code class="tag">C</code>.</h1>'

    const md = new MarkdownIt()
    md.use(MarkdownItClass, mapping)

    expect(md.render(mdtxt).trim()).toBe(htmltxt)
  })

  it('adds classes to code blocks', () => {
    const mapping = {
        code: 'tag',
      },
      mdtxt = '# Hello World Example, ```javascript console.log(\'Hello World\'); ```.'
    htmltxt =
      '<h1>Hello World Example, <code class=\"tag\">javascript console.log(\'Hello World\');</code>.</h1>'

    const md = new MarkdownIt()
    md.use(MarkdownItClass, mapping)

    expect(md.render(mdtxt).trim()).toBe(htmltxt)
  })
  
  it("adds classes to code fences", () => {
    const mapping = {
        code: "tag",
      },
      mdtxt =
        "```\
          javascript console.log('Hello World');\
        ```";
    htmltxt =
      "<pre>\
        <code class=\"tag\">\
          javascript console.log('Hello World');\
        </code>\
      </pre>";

    const md = new MarkdownIt();
    md.use(MarkdownItClass, mapping);

    expect(md.render(mdtxt).trim()).toBe(htmltxt);
  });
    
  it('adds classes to img tags', () => {
    const mapping = {
        img: 'tag',
      },
      mdtxt = '![alt text](http://placehold.it/720x480.jpg)'
    htmltxt =
      '<p><img src="http://placehold.it/720x480.jpg" alt="alt text" class="tag"></p>'

    const md = new MarkdownIt()
    md.use(MarkdownItClass, mapping)

    expect(md.render(mdtxt).trim()).toBe(htmltxt)
  })

  it('works with markdown-it-attrs', () => {
    const mapping = {
        h1: ['is-4', 'is-black'],
        h2: 'is-6'
      },
      mdtxt = '# Hello {.title}\n## World {.subtitle .is-dark}'
    htmltxt =
      '<h1 class="title is-4 is-black">Hello</h1>\n<h2 class="subtitle is-dark is-6">World</h2>'

    const md = new MarkdownIt()
    md.use(MarkdownItClass, mapping)
    md.use(attrs)

    expect(md.render(mdtxt).trim()).toBe(htmltxt)
  })
})
