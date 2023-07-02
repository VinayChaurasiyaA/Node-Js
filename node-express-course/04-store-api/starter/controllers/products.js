const preProducts = require("../products.json")
const products = require("../models/product")

const getAllProducts = async (req , res) => {
  //  /api/users?name=John&age=25

    const getAllProduct = await products.find({price : $gt = 30}).sort("price").select("name price");
    // it means that show me all the data which are greater than 30
    if(!getAllProduct) {
        res.status(401).send({message : " no data found"})
    }
    else {
        res.status(200).send({message : "ok" , data : getAllProduct})
    }
}

const getAllProductsStatic = async (req , res) => {
    const {featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};
    if(featured) {
        queryObject.featured = featured === 'true' ?true :  false
    }
    if(company) {
        queryObject.company = company;
    }
    if(name) {
        queryObject.name = {$regex : name , $options : 'i'}; //$options: 'i' is an option that specifies case-insensitive matching. The i flag indicates that the regular expression should be evaluated in a case-insensitive manner. 
    }
    if(numericFilters) {
        const operatorMap = {
            '>=' : '$gte',
            '=' : '$eq',
            '<=' : '$lte',
            '>' : '$gt',
            '<' :'$lt'
        }
        const regEx = '/\b(<|>|>=|=|<|<=)\b/g;' //means that \b are the boundaries, if you get this all then only check and /g is the defination of checking them globally
        let filters = numericFilters.replace(regEx , (match) => {
            `-${operatorMap[match]}-`
        }) // if you find any matches like >= or anything then change them into -$gte-
        const options = ['price' ,'rating'];
        // -price-$gte-120 // if the query will be like this then we can have a excludations of them
        filers = filters.split(',').forEach(item => {
            const [field , options , value] = item.split('-');
            if(options.includes(field)) {
                queryObject[field] = {[operator] : Number(value)} 
            }
        });
    }
    let result = products.find(queryObject);
    if(sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList);
    }
    else {
        result = result.sort('createdAt');
    }
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    // 23
    // 4 7 7 7 2

    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}