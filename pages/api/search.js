import services from "../../data/services.json";

const pageSize = 10;

export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const cursor = !isNaN(Number(req.query.cursor))
    ? Number(req.query.cursor)
    : 0;

  const filteredServices = services.items.filter((s) => {
    if (req.query.q) {
      return s.displayName.toLowerCase().includes(req.query.q.toLowerCase());
    }
    return true;
  });

  let hasMore = true;

  if (filteredServices.length < cursor + pageSize) {
    hasMore = false;
  }

  res.end(
    JSON.stringify({
      meta: {
        nextCursor: hasMore ? cursor + pageSize : false,
      },
      services: filteredServices.slice(cursor, cursor + pageSize),
    })
  );
}
