/*
 * @Author: lucian
 * @Date: 2021-03-11 10:45:11
 * @LastEditors: lucian
 * @LastEditTime: 2021-03-18 11:32:37
 * @Descripttion: 基于antd封装的phone组件，支持选择区号，无缝适配form
 */
import React, { useState } from 'react';
import { Input, Select } from 'UI';
import { phonePrefix } from './fixedData';

const Option = Select.Option;

const Phone = ({ value, onChange = () => {}, ...other }) => {
    const [prefix, setPrefix] = useState('86');

    const handlePhoneChange = (val) => {
        setPrefix(val);
        if (value) {
            let ary = value.split('-');
            let v = ary[1];
            onChange(val + '-' + v);
        }
    };

    const handleChange = (e) => {
        let value = '';
        if (e.target.value) {
            value = prefix + '-' + e.target.value;
        }
        onChange(value);
    };

    return (
        <Input.Group compact className='form-phone'>
            <Select value={prefix} onChange={handlePhoneChange}>
                {phonePrefix.map((item, index) => (
                    <Option key={index} value={item.prefix}>
                        {item.prefix}
                    </Option>
                ))}
            </Select>
            <Input {...other} onChange={handleChange} />
        </Input.Group>
    );
};

export default Phone;
