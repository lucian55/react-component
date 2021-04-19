/*
 * @Author: lucian
 * @Date: 2021-03-11 10:45:11
 * @LastEditors: lucian
 * @LastEditTime: 2021-03-15 16:14:54
 * @Descripttion: 查询面板组件
 */
import React, { useEffect } from 'react';
import { Form, Button } from 'antd';
import FormRender from '../FormRender';
import './index.less';

const noop = () => {};

const SearchBoard = ({
    children,
    onReset = noop, //重置回调
    onSearch = noop, //查询回调
    clearfix = 'search-board',
    props,
    initialValues, //初始值
    asyncInitialValues, //异步初始值
}) => {
    const [form] = Form.useForm();

    const clear = () => {
        if (initialValues) {
            let obj = {};
            Object.keys(initialValues).forEach((key) => {
                obj[key] = null;
            });
            form.resetFields();
            form.setFieldsValue(obj);
        } else {
            form.resetFields();
        }
        onReset();
    };

    const search = () => {
        form.validateFields().then((values) => {
            onSearch(values);
        });
    };

    const renderItem = () => {
        let domItem = [];
        let domRadio = [];
        for (const renderType in props) {
            if (props[renderType]) {
                props[renderType].forEach((item, index) => {
                    if (renderType != 'radio') {
                        domItem.push(<FormRender renderType={renderType} key={`${renderType}-${index}`} {...item} />);
                    } else {
                        domRadio.push(<FormRender renderType={renderType} key={`${renderType}-${index}`} {...item} />);
                    }
                });
            }
        }
        return {
            domItem,
            domRadio,
        };
    };

    useEffect(() => {
        if (asyncInitialValues) {
            asyncInitialValues().then((res) => {
                if (res) {
                    form.setFieldsValue(res);
                }
            });
        }
    }, []);

    return (
        <div className={clearfix}>
            <Form form={form} layout="inline" colon={false} validateTrigger="onBlur" initialValues={initialValues}>
                {renderItem().domItem}
                {children}
                <span className={`${clearfix}-options`}>
                    <Button onClick={search} type="primary" className={`${clearfix}-options-search`}>
                        查询
                    </Button>
                    <Button onClick={clear} className={`${clearfix}-options-reset`}>
                        重置
                    </Button>
                </span>

                {renderItem().domRadio}
            </Form>
        </div>
    );
};

export default SearchBoard;
