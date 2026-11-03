/** True for the hostnames that serve the Kit splash instead of the portfolio. */
export function isKitStudioHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host === 'kitstudio.dev' || host === 'www.kitstudio.dev';
}
