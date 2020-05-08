import React from 'react';

import { Form, Input, Select } from 'antd';

import { genres } from '../../../utility/music-genres';

const AuthInputs = ({ stateInputs, onChangeHandler }) => {
  const { Option } = Select;

  const genresOptions = [];
  for (let genre of genres) {
    genresOptions.push(<Option key={genre}>{genre}</Option>);
  }

  let inputs = [];
  for (let key in stateInputs) {
    inputs.push(
      <Form.Item
        key={key}
        name={stateInputs[key].config.name}
        label={stateInputs[key].config.label}
        rules={[stateInputs[key].validationRules]}>
        {
          (key === 'genres' || key === 'tags')
            ? <Select
              value={stateInputs[key].value}
              mode={key === 'genres' ? 'multiple' : 'tags'}
              placeholder={stateInputs[key].config.placeholder}
              tokenSeparators={key === 'genres' ? null : ['#', ',', '.']}
              onChange={onChangeHandler.bind(this, key)}
            >
              {key === 'genres' ? genresOptions : null}
            </Select>
            : <Input
              type={stateInputs[key].config.type}
              value={stateInputs[key].value}
              placeholder={stateInputs[key].config.placeholder}
              onChange={onChangeHandler.bind(this, key)}
            />
        }
      </Form.Item>
    );
  }

  return inputs;
}

export default AuthInputs;
