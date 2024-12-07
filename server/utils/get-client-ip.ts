export function getClientIp(event) {
  const headers = event.node.req.headers;

  // Extract the X-Forwarded-For header
  const forwardedFor = headers['x-forwarded-for'] || '';

  // Take the leftmost (original client) IP and sanitize it
  const userIp = forwardedFor.split(',')[0]?.trim() || event.node.req.socket.remoteAddress;

  // Validate the IP address (simple regex for IPv4/IPv6)
  const isValidIp = /^(\d{1,3}\.){3}\d{1,3}$|^[0-9a-fA-F:]+$/.test(userIp);
  return isValidIp ? userIp : 'Invalid IP';
}
