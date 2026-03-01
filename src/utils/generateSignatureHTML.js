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
    case "modern":
      return modernTemplate(data, primaryColor);
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
          data.website
            ? `<tr><td><span style="color:${primaryColor};">🌐 ${data.website}</span></td></tr>`
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
        ${data.phone ? `<tr><td>📞 ${data.phone}</td></tr>` : ""}
      </tbody>
    </table>
  `.trim();
}

// MODERN TEMPLATE (Photo + Social Icons) =========================

function modernTemplate(data, primaryColor) {
  const hasPhoto = !!data.photo;
  const socialIcons = renderSocialIcons(data);

  // Website icon-only link (globe PNG)
  const websiteIcon = data.website
    ? `<a href="${data.website}" style="text-decoration:none;display:inline-block;margin-right:6px;">
         <img src="https://img.icons8.com/color/48/domain.png" width="18" height="18"
              style="display:inline-block;width:18px;height:18px;" />
       </a>`
    : "";

  // Combined social + website icons row
  const allIcons = (websiteIcon + socialIcons).trim();

  // Inner info built as nested table rows — no <div>, fully Outlook-safe
  const infoRows = [
    data.name
      ? `<tr><td style="padding-bottom:2px;"><strong style="color:${primaryColor};font-size:16px;line-height:1.2;">${data.name}</strong></td></tr>`
      : "",
    // Role · Company — side by side on one row
    data.title || data.company
      ? `<tr><td style="padding-bottom:5px;font-size:14px;color:#444;">
            ${data.title || ""}${data.title && data.company ? "&nbsp;&middot;&nbsp;" : ""}${data.company || ""}
          </td></tr>`
      : "",
    // Phone row
    data.phone
      ? `<tr><td style="padding-bottom:4px;font-size:13px;color:#000;">📞&nbsp;${data.phone}</td></tr>`
      : "",
    // Website + social icons on one row (website as icon only)
    allIcons
      ? `<tr><td style="padding-top:4px;">${allIcons}</td></tr>`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#000;">
  <tbody>
    <tr>
      ${
        hasPhoto
          ? `<td style="padding-right:16px;vertical-align:top;">
               <img src="${data.photo}" width="80" height="80"
                    style="display:block;width:80px;height:80px;object-fit:cover;border-radius:${data.photoShape === "square" ? "6px" : "50%"};" />
             </td>`
          : ""
      }
      <td style="vertical-align:top;">
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tbody>
            ${infoRows}
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`.trim();
}

function renderSocialIcons(data) {
  const ICONS = {
    linkedin:
      "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    instagram:
      "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
  };

  let iconsHTML = "";

  if (data.linkedin) {
    iconsHTML += `<a href="${data.linkedin}" style="text-decoration:none;"><img src="${ICONS.linkedin}" width="18" style="display:inline-block;margin-right:6px;" /></a>`;
  }

  if (data.instagram) {
    iconsHTML += `<a href="${data.instagram}" style="text-decoration:none;"><img src="${ICONS.instagram}" width="18" style="display:inline-block;margin-right:6px;" /></a>`;
  }

  return iconsHTML;
}