import axios from "axios";
import fetch from "node-fetch";

export function translate(req, res) {
    console.log("aaaa")
    axios.post("https://libretranslate.de/translate",
        {
            q: req.body.text,
            source: "tr",
            target: "en",
            format: "text"
        },

    ).then((r) => {

        console.log(r.data);
        return res.status(200).json(r.data)
    });

}