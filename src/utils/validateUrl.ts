export function isValidUrlOrDomain(input: string): boolean {
  if (!input || typeof input !== 'string') return false;
  const trimmed = input.trim();
  if (!trimmed) return false;

  // Check if starts with protocol or matches domain pattern
  const domainPattern = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/;
  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?(\/.*)?$/;

  try {
    const urlToCheck = trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`;
    const parsed = new URL(urlToCheck);
    return Boolean(parsed.hostname);
  } catch {
    return domainPattern.test(trimmed) || ipPattern.test(trimmed);
  }
}

export function sanitizeTarget(input: string): {
  normalizedUrl: string;
  domain: string;
  protocol: string;
} {
  const trimmed = input.trim();
  let withProto = trimmed;
  if (!/^https?:\/\//i.test(trimmed)) {
    withProto = `https://${trimmed}`;
  }

  try {
    const parsed = new URL(withProto);
    return {
      normalizedUrl: parsed.href,
      domain: parsed.hostname,
      protocol: parsed.protocol.replace(':', ''),
    };
  } catch {
    const cleanDomain = trimmed.replace(/^https?:\/\//i, '').split('/')[0];
    return {
      normalizedUrl: `https://${cleanDomain}`,
      domain: cleanDomain,
      protocol: 'https',
    };
  }
}
