import ajv from 'ajv';
import MobxReactForm from '../../../../src';
import svkExtend from '../../extension/svk';

const plugins = {
  svk: {
    package: ajv,
    extend: svkExtend,
  },
};

const fields = {
  username: 'SteveJobs',
  email: 's.jobs@apple.com',
  password: 'thinkdifferent',
  terms: true,
  devSkills: 10, // 10 should fail with exclusiveRange on
  revenue: '233.715',
  assets: 305.277,
};

const labels = {
  username: 'Username',
  email: 'E-mail',
  password: 'Password',
  terms: 'Accept Terms of Service',
};

const schema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 6, maxLength: 20 },
    email: { type: 'string', format: 'email', minLength: 5, maxLength: 20 },
    password: { type: 'string', minLength: 6, maxLength: 20 },
    terms: { enum: [true, false] },
    devSkills: { range: [1, 10], exclusiveRange: true },
    revenue: { type: 'number' },
    assets: { type: 'number' },
  },
};

class Form extends MobxReactForm {

  onInit(form) {
    form.update({
      username: 'JonathanIve',
      terms: false,
      assets: 0,
      revenue: 'aaa',
      undefined: true, // this field does not exists (strictUpdate)
    });
  }
}

export default new Form({ fields, labels, schema, plugins }, 'Flat-D');