import services from "../../data/services.json";

export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  console.log(req.query.q);
  res.end(
    JSON.stringify(
      services.items.filter((s) =>
        s.displayName.toLowerCase().includes(req.query.q.toLowerCase())
      )
    )
  );
}
