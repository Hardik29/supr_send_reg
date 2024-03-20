const {Suprsend, Event} = require("@suprsend/node-sdk");

export default function handler(req, res) {
    const supr_client = new Suprsend("h56viah2ngCZspePqTzQ", "SS.WSS.QmnDEPm9GqWUKxCW0ItqrphVfmHYDr9Q5ClJVb47");
    const distinct_id = `${req.query.id}`
    const user = supr_client.user.get_instance(distinct_id);
    const userReg = user.save()
    .then(response => {
        console.log("Suprsend User Saved:", response);
        const event = new Event(distinct_id, "REGISTRATION");
        const eventResponse = supr_client.track_event(event)
        .then(res=>{
            console.log("User Created and Event Trigered", res);
            res.status(202).json({ event: "done" });
        })
        .catch(err=>{
            console.error("Suprsend API Error:", err);
            res.status(500).json({ error: "An error occured while triggering event" });
        })
    })
    .catch(error => {
        console.error("Suprsend API Error:", error);
        res.status(500).json({ error: "An error occurred while saving user" });
    });
  }