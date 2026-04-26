type SafeHtmlProps = {
  html?: string | null;
  className?: string;
};

export function SafeHtml({ html, className = "" }: SafeHtmlProps) {
  if (!html) return null;
  return <div className={`prose-content ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
