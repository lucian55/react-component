/*
 * @Author: lucian
 * @Date: 2021-03-11 10:45:11
 * @LastEditors: lucian
 * @LastEditTime: 2021-03-15 16:14:54
 * @Descripttion: form表单元素渲染组件
 */
import React from 'react';
import { Form, Input, Select, DatePicker, Radio } from 'antd';
import RadioInput from '../RadioInput';
import Phone from '../Phone';

const RangePicker = DatePicker.RangePicker;

/**
 *
 * @param {string} renderType 渲染类型,如多个input分散，可以用 input_1,input_2
 * @param {boolean} isNumber 是否只允许数字
 * @param {string} name 唯一标示,Form.Item使用
 * @param {string} label 标题,Form.Item使用
 * @param {Array} rules 校验规则
 * @param {Object} itemProps Form.Item其它属性
 * @returns
 */
const FormRender = ({ renderType = 'input', placeholder, isNumber, name, label, rules = [], itemProps, ...other }) => {
    const validatePhone = (rule, value) => {
        if (value) {
            let phone = value.split('-')[1];
            let reg = /^\d*$/;
            if (reg.test(phone)) {
                return Promise.resolve();
            } else {
                return Promise.reject('手机号格式不正确');
            }
        } else {
            return Promise.resolve();
        }
    };

    const validateNumber = (rule, value) => {
        if (value) {
            let reg = /^\d*$/;
            if (reg.test(value)) {
                return Promise.resolve();
            } else {
                return Promise.reject('数据格式错误');
            }
        } else {
            return Promise.resolve();
        }
    };

    const renderItem = () => {
        const props = {
            placeholder,
            ...other,
        };
        if (isNumber) {
            rules.push({ validator: validateNumber });
        }
        switch (renderType) {
            case 'input': //输入框,
                return <Input {...props} />;
            case 'phone': //手机号
                rules.push({ validator: validatePhone });
                return <Phone {...props} />;
            case 'select': //下拉
                return <Select {...props} />;
            case 'datepicker': //日期
                return <DatePicker {...props} />;
            case 'rangepicker': //日期区间
                return <RangePicker {...props} />;
            case 'radio': //单选
                return <Radio {...props} />;
            case 'radioinput'://单选输入
                return <RadioInput size="small" optionType="button" buttonStyle="solid" {...props} />;            
            case 'organization': //组织架构
                return <Organization {...props} />;
            default:
                return <Input {...props} />;
        }
    };

    return (
        <Form.Item label={label} name={name} rules={rules} {...itemProps} className={`form-${renderType}`}>
            {renderItem()}
        </Form.Item>
    );
};

export default FormRender;
