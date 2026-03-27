const fs = require('fs');

const sourceHtml = fs.readFileSync('../Html Template1/index.html', 'utf8');
const viteHtml = fs.readFileSync('./index.html', 'utf8');

// Function to convert HTML to JSX
function htmlToJSX(html) {
  let jsx = html;
  
  // Replace HTML comments
  jsx = jsx.replace(/<!--(.*?)-->/gs, '{/* $1 */}');
  
  // Replace class= with className=
  jsx = jsx.replace(/class=/g, 'className=');
  // Replace for= with htmlFor=
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  
  // Fix unclosed tags
  jsx = jsx.replace(/<img([^>]*[^/])>/g, '<img$1 />');
  jsx = jsx.replace(/<input([^>]*[^/])>/g, '<input$1 />');
  jsx = jsx.replace(/<br([^>]*[^/])?>/g, '<br$1 />');
  jsx = jsx.replace(/<hr([^>]*[^/])?>/g, '<hr$1 />');
  
  // SVG tags camelCase properties
  jsx = jsx.replace(/stroke-width/g, 'strokeWidth');
  jsx = jsx.replace(/stroke-linecap/g, 'strokeLinecap');
  jsx = jsx.replace(/stroke-linejoin/g, 'strokeLinejoin');
  jsx = jsx.replace(/fill-rule/g, 'fillRule');
  jsx = jsx.replace(/clip-rule/g, 'clipRule');
  jsx = jsx.replace(/xmlns:xlink/g, 'xmlnsXlink');

  // Fix custom attributes
  jsx = jsx.replace(/srcset=/g, 'srcSet=');
  jsx = jsx.replace(/onclick=/g, 'onClick=');
  jsx = jsx.replace(/onchange=/g, 'onChange=');
  
  return jsx;
}

// 1. Extract head styles
const headMatch = sourceHtml.match(/<head>(.*?)<\/head>/s);
let headTags = '';
if (headMatch) {
  // Extract just the link tags from head
  const links = headMatch[1].match(/<link[^>]+>/g) || [];
  headTags = links.join('\n    ');
}

// 2. Extract scripts from bottom of body
const scriptsMatch = sourceHtml.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi);
let scriptTags = '';
if (scriptsMatch) {
  scriptTags = scriptsMatch.join('\n    ');
}

// 3. Extract body content without scripts
const bodyMatch = sourceHtml.match(/<body[^>]*>(.*?)<\/body>/s);
if (!bodyMatch) {
  console.log("No body found");
  process.exit(1);
}

let bodyHtml = bodyMatch[1];
// Remove scripts
bodyHtml = bodyHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');

// Clean up some other things that break JSX
bodyHtml = bodyHtml.replace(/style="([^"]*)"/g, (match, p1) => {
    // Basic conversion of style="width: 100%; background-image: url('...')"
    // This is hard to do perfectly with regex, we'll strip them for now or try to convert
    const parts = p1.split(';').filter(Boolean);
    const obj = {};
    parts.forEach(part => {
        const [key, ...value] = part.split(':');
        if(key && value.length > 0) {
            const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            obj[camelKey] = value.join(':').trim();
        }
    });
    return `style={${JSON.stringify(obj)}}`;
});

const jsxBody = htmlToJSX(bodyHtml);

// 4. Update App.jsx
const appJsxContent = `import React from 'react';

function App() {
  return (
    <>
      ${jsxBody}
    </>
  );
}

export default App;
`;
fs.writeFileSync('./src/App.jsx', appJsxContent);

// 5. Update index.html
let newViteHtml = viteHtml.replace('</head>', `  ${headTags}\n  </head>`);
newViteHtml = newViteHtml.replace('</body>', `  ${scriptTags}\n  </body>`);

fs.writeFileSync('./index.html', newViteHtml);

console.log('App.jsx and index.html created successfully!');
