const logger = require("../config/logger");
const { formDataModel } = require("../model");

/**
 * * Note Replace the modelName with the Your Model
 */

const create = async (payload) => {
  const newRecord = new formDataModel(payload);
  return await newRecord.save();
};

const find = async (id) => {
  return await formDataModel.findById(id);
};

const findAll = async (query) => {
  return await formDataModel.find();
};

const update = async (id, payload) => {
  return await formDataModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );
};

const remove = async (id) => {
  return await formDataModel.findByIdAndDelete(id);
};

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
};
