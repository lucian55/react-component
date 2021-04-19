/*
 * @Author: lucian
 * @Date: 2021-03-10 15:39:55
 * @LastEditors: lucian
 * @LastEditTime: 2021-04-13 15:18:59
 * @Descripttion: 隐形输入框
 */
import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './index.less';

const EditLine = ({ value, onBlur = () => { }, onChange = () => { }, children, title, placeholder = '请输入', size = 'small', ...other }) => {
    const _this = useRef();
    const [v, setV] = useState(value);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        setV(value);
    }, [value]);

    const handleChange = (e) => {
        setV(e.target.value);
    };

    const handleBlur = (e) => {
        let val = e.target.value;
        if (val) {
            if (val != value) {
                onBlur(val);
                onChange(val);
            }
            setIsEdit(false);
        }
    };
    const handleClick = () => {
        setIsEdit(true);
        setTimeout(() => {
            _this.current.focus();
        }, 100);
    };

    const handleKeydown = (e) => {
        if (e.keyCode == 27) {
            //按下 ESC
            setV(value);
            setIsEdit(false);
        }
    };

    return (
        <span className="edit-line">
            {isEdit ? (
                <Input
                    {...other}
                    size={size}
                    onKeyDown={handleKeydown}
                    placeholder={placeholder}
                    onPressEnter={handleBlur}
                    ref={_this}
                    value={v}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            ) : (
                <span title={title}>
                    {v}
                    {children}
                    <EditOutlined onClick={handleClick} />
                </span>
            )}
        </span>
    );
};

export default EditLine;
