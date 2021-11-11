export declare global {
  interface Window {
    gtag: (event: string, action: string, config: Record<string, string | undefined>) => void;
  }
}
