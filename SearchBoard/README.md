# 查询区域项目组件

- 提供默认布局
- 展示 查询、重置 按钮 及 按钮回调
- 支持 `input`,`phone`,`select`,`datepicker`,`rangepicker`,`radio` 等基础配置
- 可通过 `children` 扩展自定义表单元素

## api

|参数|类型|说明|默认值|
|:--|:---|:--|:---|
|onReset|function|重置回调|-|
|onSearch|function|查询回调|-|
|initialValues|object|初始值|-|
|asyncInitialValues|object|异步初始值|-|

更多说明参考[这里](https://liushaozhen.github.io/2021/04/19/antd-SearchBoard%E5%9F%BA%E4%BA%8Eandt%E5%B0%81%E8%A3%85%E6%9F%A5%E8%AF%A2%E5%8C%BA%E7%BB%84%E4%BB%B6/)

## 使用

```js
<SearchBoard
    props={{
        input:[//输入框组件
            {
                name:'id',//form表单元素标识
                placeholder:'',
                //...其它input属性
            },
            {
                name:'name',
                placeholder:'',
                //...其它input属性
            },
        ],
        phone:[//手机号组件（带有手机区域前缀）
            {
                name:'phone1',
                placeholder:'',
                //...其它input属性
            },
            {
                name:'phone2',
                placeholder:'',
                //...其它input属性
            },
        ],
        select:[
            {
                name:'sources',
                placeholder:'',
                options:[],//选项，参考antd
                //...其它select属性
            },
        ],
        datepicker:[
            {
                name:'date',
                placeholder:'',
            },
        ],
        rangepicker:[
            {
                name:'range',
                lable:'售卖时间段',//订单管理-售卖时间段筛选
            },
        ],
        radio:[
            {
                name:'type',
                lable:'课程类型',
                options:[
                    { label: 'Apple', value: 'Apple' },
                    { label: 'Pear', value: 'Pear' },
                    { label: 'input' },//lable为input时，显示输入框，订单管理-课节数筛选
                ],//选项，参考antd
            },
            {
                name:'status',
                lable:'订单状态',
                options:[],//选项，参考antd
            },
        ],
        
    }}
>

    {/* 自定义其它类型， */}
    <Form.Item name="classId">
        <Input placeholder="请输入班级ID" />
    </Form.Item>
</SearchBoard>

```

## 注意事项

暂无
