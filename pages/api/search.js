import Fuse from "fuse.js";
import services from "../../data/services.json";

const pageSize = 10;

const fuse = new Fuse(services.items, {
  keys: ["displayName", "useIf", "doNotUseIf"],
  minMatchCharLength: 2,
  threshold: 0.4,
});

export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const cursor = !isNaN(Number(req.body.cursor)) ? Number(req.body.cursor) : 0;
  let filteredServices = services.items;
  if (req.body.q) {
    filteredServices = fuse.search(req.body.q).map((s) => {
      return s.item;
    });
  }
  let hasMore = true;

  filteredServices = filteredServices.filter((s) => {
    return req.body.providers.find((p) => p.selected && p.name === s.provider);
  });

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
