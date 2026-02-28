import { generateSignatureHTML } from "../utils/generateSignatureHTML";

export default function SignaturePreview({ data, template, color }) {
  const html = generateSignatureHTML(data, template, color);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
