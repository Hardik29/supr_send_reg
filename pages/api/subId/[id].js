import crypto from "crypto";

function hmac_rawurlsafe_base64_string(distinct_id, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(distinct_id)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function handler(req, res) {
  const id = hmac_rawurlsafe_base64_string(`${req.query.id}`, process.env.INBOX_SECRET);
  console.log(req.query.id)
  res.status(200).json({ id: id });
}
