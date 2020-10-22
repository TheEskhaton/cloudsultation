import Fuse from "fuse.js";
import services from "../../data/services.json";

const pageSize = 10;

const fuse = new Fuse(services.items, {
  keys: ["displayName", "useIf", "doNotUseIf"],
  minMatchCharLength: 2,
});

export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const cursor = !isNaN(Number(req.query.cursor))
    ? Number(req.query.cursor)
    : 0;
  let filteredServices = services.items;
  if (req.query.q) {
    filteredServices = fuse.search(req.query.q).map((s) => {
      return s.item;
    });
  }
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
