/*
 * @Author: lucian
 * @Date: 2021-03-11 10:45:11
 * @LastEditors: lucian
 * @LastEditTime: 2021-03-15 16:14:54
 * @Descripttion: 支持自定义输入的radio组件
 */
import React, { useState, useEffect } from 'react';
import { Radio, Input } from 'antd';
import './index.less';

const RadioInput = ({ options, onChange = () => {}, value, ...other }) => {
    const [val, setVal] = useState(value);

    useEffect(() => {
        setVal(value);
    }, [value]);

    const handleChange = (e) => {
        let val = e.target.value;
        onChange(val);
    };

    const handleFocus = () => {
        setVal(null);
        onChange(null);
    };

    return (
        <Radio.Group {...other} onChange={handleChange} value={val} className="radio-input">
            {options.map((item, index) => {
                let { label, value } = item;
                if (label == 'input') {
                    return (
                        <Input
                            style={{ width: 80 }}
                            size="small"
                            onFocus={handleFocus}
                            onChange={handleChange}
                            placeholder="其它"
                        />
                    );
                } else {
                    return (
                        <Radio.Button key={index} value={value}>
                            {label}
                        </Radio.Button>
                    );
                }
            })}
        </Radio.Group>
    );
};

export default RadioInput;
