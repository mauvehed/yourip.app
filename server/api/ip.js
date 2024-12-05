export default defineEventHandler((event) => {
  const ip =
    getRequestHeader(event, "x-forwarded-for") || // Get IP behind a proxy
    event.node.req.connection.remoteAddress; // Fallback for direct IP

  return { ip };
});
