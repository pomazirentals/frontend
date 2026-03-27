const fs = require('fs');

const htmlContent = fs.readFileSync('../g/index.html', 'utf8');

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
  
  // SVG tags might need camelCase properties like stroke-width -> strokeWidth
  jsx = jsx.replace(/stroke-width/g, 'strokeWidth');
  jsx = jsx.replace(/stroke-linecap/g, 'strokeLinecap');
  jsx = jsx.replace(/stroke-linejoin/g, 'strokeLinejoin');
  jsx = jsx.replace(/fill-rule/g, 'fillRule');
  jsx = jsx.replace(/clip-rule/g, 'clipRule');
  jsx = jsx.replace(/xmlns:xlink/g, 'xmlnsXlink');

  // Fix custom attributes that are invalid in JSX or might cause issues
  // Like srcset to srcSet, although React handles srcset with warning, standard is srcSet
  jsx = jsx.replace(/srcset=/g, 'srcSet=');
  
  // Handle empty or badly formatted tags (if any)
  // jsx = jsx.replace(/=""/g, ''); // Sometimes empty attributes cause issues, but in React boolean attributes are fine if just name

  return jsx;
}

// Extract main parts
const bodyMatch = htmlContent.match(/<body[^>]*>(.*?)<\/body>/s);
if (!bodyMatch) {
  console.log("No body found");
  process.exit(1);
}

let bodyHtml = bodyMatch[1];

// We don't want the <script> tags at the end or in the body
bodyHtml = bodyHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

const jsxBody = htmlToJSX(bodyHtml);

// Create the App.jsx file
const appJsxContent = `import React from 'react';
import './index.css';

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
console.log('App.jsx created successfully!');
