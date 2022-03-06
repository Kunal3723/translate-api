import cache from "persistent-cache";
const Cache = cache();

//function which is middleware and it checks whether the cache contains key already or not
// if it contains then it will send response to frontend directly without calling api else
//it will call api
export default async function middle(req, res, next) {
    //extracting data from request
    const { text, language,from } = req.body;
    try {

        Cache.get(text + language+from, function (err, data) {
            if (err) {
                console.log(err);
            }
            //checking if cache has data or not
            if (data) {
               
                return res.status(200).send(data)
            }
            //calling api then
            else {
                next();
            }
        });



    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}