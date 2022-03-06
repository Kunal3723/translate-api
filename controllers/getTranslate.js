import translate from "translate-google";
import cache from "persistent-cache";
const Cache = cache();

// function to get translation
export const getTranslate = async (req, res) => {
    //extracting data from request
    const { text, language, from } = req.body;
    try {

        translate(text, { from: from, to: language, }).then(resp => {
            // store response in cache folder with key
            Cache.putSync(text + language + from, resp);
            //sending response to frontend
            return res.status(200).send(resp);
        }).catch(err => {
            
            console.error(err);
            return res.status(500).json({ message: err.message });
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}