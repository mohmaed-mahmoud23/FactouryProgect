const asyncHandler = require("express-async-handler");
const ApiFeature = require("../utils/apiFeatures");

exports.deleteone = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedDocument = await model.findByIdAndDelete({ _id: id });
    if (!deletedDocument) {
      return res
        .status(404)
        .json({ message: "No document found with the given ID" });
    }

    res.status(204).json({});
  });

exports.updateone = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return res.status(404).json({ message: "no ducument found" });
    }

    res.status(200).json({ data: document });
  });

exports.createone = (model) =>
  asyncHandler(async (req, res) => {
    const document = await model.create(req.body);
    res
      .status(201)
      .json({ data: document, message: "document added successfully" });
  });

exports.getone = (model, populateopt) =>
  asyncHandler(async (req, res, next) => {
    // build query
    let query = model.findById({ _id: req.params.id });
    if (populateopt) {
      query = query.populate(populateopt);
    }
    // execute query
    const document = await query;

    if (!document) {
      return res.status(404).json({ message: "no ducument found" });
    }
    res.status(200).json({ data: document });
  });

exports.getall = (model) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterobj) {
      filter = req.filterobj;
    }
    let documentscount = await model.countDocuments();
    const apiFeatures = new ApiFeature(model.find(filter), req.query)
      .filter()
      .limitFields()
      .keyword()
      .paginate(documentscount)
      .sort();
    let { Query, paginationResult } = apiFeatures;

    const document = await Query;
    res
      .status(200)
      .json({ results: document.length, paginationResult, data: document });
  });
