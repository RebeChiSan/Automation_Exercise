export function generateDynamicEmail(baseEmail: string): string {
  return baseEmail.replace('@', `+${Date.now()}@`);
}
