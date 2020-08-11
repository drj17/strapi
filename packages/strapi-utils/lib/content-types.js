'use strict';

const _ = require('lodash');

const PUBLICATION_ATTRIBUTES = ['published_at'];
const CREATOR_ATTRIBUTES = ['created_by', 'updated_by'];

const NON_WRITABLE_ATTRIBUTES = ['id', 'created_by', 'updated_by', 'published_at'];
const NON_ENUMERABLE_ATTRIBUTES = ['id', 'created_by', 'updated_by', 'published_at'];

const constants = {
  PUBLICATION_ATTRIBUTES,
  CREATOR_ATTRIBUTES,
};

const getTimestamps = model => {
  return _.get(model, ['options.timestamps'], []);
};

const getNonWritableAttributes = model => {
  return _.uniq([model.primaryKey, ...getTimestamps(model), ...NON_WRITABLE_ATTRIBUTES]);
};

const getNonEnumerableAttributes = model => {
  return _.uniq([model.primaryKey, ...getTimestamps(model), ...NON_ENUMERABLE_ATTRIBUTES]);
};

const getEnumerableAttributes = model => {
  return _.difference(_.keys(model.attributes), getNonEnumerableAttributes(model));
};

module.exports = {
  constants,
  getNonWritableAttributes,
  getEnumerableAttributes,
};
