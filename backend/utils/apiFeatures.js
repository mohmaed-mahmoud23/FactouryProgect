class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  // methods:filter() لتنفيذ مهام معينة عند استدعاء هذه الدالة
  filter() {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "sort", "limit", "fields", "keyword"];
    excludesFields.forEach((field) => delete queryStringObj[field]);
    // Apply filtration using [gte, gt, lte, lt]
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.Query = this.mongooseQuery.find(JSON.parse(queryStr));
    // return this : you can chain another method in the same object
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.Query = this.mongooseQuery.sort(sortBy);
    } else {
      this.Query = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.Query = this.mongooseQuery.select(fields);
    } else {
      this.Query = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  paginate(countDocuments) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    // Pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    // const count = await .countDocuments();
    pagination.numberOfPages = Math.ceil(countDocuments / limit); // to avoid 0.2 number of pagess

    // next page
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    // previous page
    if (skip > 0) {
      pagination.prev = page - 1;
    }
    this.Query = this.mongooseQuery.skip(skip).limit(limit);

    this.paginationResult = pagination;
    return this;
  }

  keyword() {
    if (this.queryString.keyword) {
      // let query = {}; // $or :operator in mongo
      const query = {
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } }, // option i :to search for uppercase and lowercase
          { description: { $regex: this.queryString.keyword, $options: "i" } },
          { name: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      };

      this.Query = this.mongooseQuery.find(query);
    }
    return this;
  }
}

module.exports = ApiFeatures;
