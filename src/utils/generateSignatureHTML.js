export function generateSignatureHTML(
  data,
  template,
  primaryColor = "#2563eb"
) {
  switch (template) {
    case "compact":
      return compactTemplate(data, primaryColor);
    case "minimal":
      return minimalTemplate(data, primaryColor);
    case "inline":
      return inlineTemplate(data, primaryColor);
    case "card":
      return cardTemplate(data, primaryColor);
    default:
      return classicTemplate(data, primaryColor);
  }
}


// CLASSIC TEMPLATE =======================================

function classicTemplate(data, primaryColor) {
  return `
    <table cellpadding="0" cellspacing="0" style="font-family:Arial;font-size:14px;line-height:1.4;color:#000;">
      <tbody>
        ${
          data.name
            ? `<tr><td><strong style="color:${primaryColor};">${data.name}</strong></td></tr>`
            : ""
        }
        ${data.title ? `<tr><td>${data.title}</td></tr>` : ""}
        ${data.company ? `<tr><td>${data.company}</td></tr>` : ""}
        ${data.phone ? `<tr><td>📞 ${data.phone}</td></tr>` : ""}
        ${
          data.email
            ? `<tr><td style="color:${primaryColor};">✉️ ${data.email}</td></tr>`
            : ""
        }
        ${
          data.website
            ? `<tr><td style="color:${primaryColor};">🌐 ${data.website}</td></tr>`
            : ""
        }
      </tbody>
    </table>
  `.trim();
}


// COMPACT TEMPLATE ========================================

function compactTemplate(data, primaryColor) {
  return `
    <table cellpadding="0" cellspacing="0" style="font-family:Arial;font-size:13px;line-height:1.4;color:#000;">
      <tbody>
        ${
          data.name || data.title || data.company
            ? `<tr>
                <td>
                  <strong style="color:${primaryColor};">${data.name || ""}</strong>
                  ${data.title ? ` · ${data.title}` : ""}
                  ${data.company ? ` · ${data.company}` : ""}
                </td>
              </tr>`
            : ""
        }
        ${data.phone ? `<tr><td>📞 ${data.phone}</td></tr>` : ""}
        ${data.email ? `<tr><td>✉️ ${data.email}</td></tr>` : ""}
        ${
          data.website
            ? `<tr><td style="color:${primaryColor};">🌐 ${data.website}</td></tr>`
            : ""
        }
      </tbody>
    </table>
  `.trim();
}


// MINIMAL TEMPLATE =========================================

function minimalTemplate(data, primaryColor) {
  return `
    <table cellpadding="0" cellspacing="0" style="font-family:Arial;font-size:14px;color:#000;">
      <tbody>
        ${
          data.name
            ? `<tr><td><strong style="color:${primaryColor};">${data.name}</strong></td></tr>`
            : ""
        }
        ${
          data.title || data.company
            ? `<tr><td>${data.title || ""}${
                data.title && data.company ? " - " : ""
              }${data.company || ""}</td></tr>`
            : ""
        }
        ${
          data.email || data.website
            ? `<tr><td>
                ${data.email ? `✉️ ${data.email}` : ""}
                ${data.email && data.website ? " | " : ""}
                ${
                  data.website
                    ? `<span style="color:${primaryColor};">🌐 ${data.website}</span>`
                    : ""
                }
              </td></tr>`
            : ""
        }
      </tbody>
    </table>
  `.trim();
}


// INLINE TEMPLATE ===================================

function inlineTemplate(data, primaryColor) {
  return `
    <table cellpadding="0" cellspacing="0" style="font-family:Arial;font-size:13px;color:#000;">
      <tbody>
        <tr>
          <td>
            <strong style="color:${primaryColor};">${data.name || ""}</strong>
            ${data.title ? ` | ${data.title}` : ""}
            ${data.company ? ` | ${data.company}` : ""}
            ${data.phone ? ` | 📞 ${data.phone}` : ""}
            ${data.email ? ` | ✉️ ${data.email}` : ""}
          </td>
        </tr>
      </tbody>
    </table>
  `.trim();
}

//  CARD TEMPLATE ===================================

function cardTemplate(data, primaryColor) {
  return `
    <table cellpadding="8" cellspacing="0" style="font-family:Arial;font-size:14px;border:1px solid #ddd;color:#000;">
      <tbody>
        ${
          data.name
            ? `<tr><td><strong style="font-size:16px;color:${primaryColor};">${data.name}</strong></td></tr>`
            : ""
        }
        ${data.title ? `<tr><td>${data.title}</td></tr>` : ""}
        ${data.company ? `<tr><td>${data.company}</td></tr>` : ""}
        ${
          data.phone || data.email
            ? `<tr><td>
                ${data.phone ? `📞 ${data.phone}` : ""}
                ${data.phone && data.email ? " | " : ""}
                ${data.email ? `✉️ ${data.email}` : ""}
              </td></tr>`
            : ""
        }
      </tbody>
    </table>
  `.trim();
}