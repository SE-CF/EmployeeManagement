import React, {useEffect, useState} from 'react';
import {Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Table} from 'antd';
import { Calendar, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from "dva";
import {Link} from "umi";
// import api from '../../api';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

Date.prototype.format = function(format)
{
    var o = {
        "y+" : this.getFullYear(),
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1 ? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}

function onPanelChange(value, mode) {
    console.log(value, mode);
}

class BirthCalendar extends React.Component{
    render() {
        return(
            <>
                <div style={{
                    width: '300px',
                    // border: 1px solid #f0f0f0,
                    // borderradius: '10px',
                }}>
                    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                </div>
            </>
        );
    }
}

// class AddPage extends React.Component{
//
//     render() {
//
//     }
// }

function AddPage({ employees, dispatch }){
    // useEffect(() => {
    //     dispatch({
    //         type: 'employees/addEmployee',
    //     })
    // }, [])

    let name='default';
    let department='default';
    var d = new Date();
    let birthDate=d.format("yyyy-MM-dd");
    let gender='male';
    let nativePlace='default';
    let myid=parseInt(+new Date() + Math.random())%10000;

    return (
        <Form
            {...formItemLayout}
            // form={Form.useForm()}
            name="register"
            // onFinish={(values) => {
            //     console.log('Received values of form: ', values);
            // }}
            initialValues={{
                gender:'male',
            }}
            scrollToFirstError
        >

            <Form.Item
                name="name"
                label="姓名"
                tooltip="您的真实名字。"
                rules={[
                    {
                        required: true,
                        message: '请输入您的姓名！',
                        whitespace: true,
                    },
                ]}
            >
                <Input  onChange={(e)=>{name=e.target.value}}/>
            </Form.Item>

            <Form.Item
                name="department"
                label="部门"
                rules={[
                    {
                        required: true,
                        message: '请选择您所在的部门！',
                        whitespace: true,
                    },
                ]}
            >
                <Input onChange={(e)=>{department=e.target.value}}/>
            </Form.Item>

            <Form.Item
                name="birthDate"
                label="出生日期"
                // rules={[
                //     {
                //         required: true,
                //         message: '请选择您的出生日期！',
                //     },
                // ]}
            >
                <div style={{
                    width: '300px',
                    border: '1px solid #f0f0f0',
                    borderRadius:'2px',
                }}>
                    <Calendar fullscreen={false}
                              onChange={(e)=>{
                                  // console.log(e.format("YYYY-MM-DD"))
                                  birthDate=e.format("YYYY-MM-DD")
                              }} />
                </div>
            </Form.Item>

            <Form.Item
                name="place"
                label="籍贯"
                tooltip="您的出生地。"
                rules={[
                    {
                        required: true,
                        message: '请输入您的籍贯！',
                        whitespace: true,
                    },
                ]}
            >
                <Input  onChange={(e)=>{nativePlace=e.target.value}}/>
            </Form.Item>

            <Form.Item
                name="gender"
                label="性别"
                rules={[
                    {
                        required: true,
                        message: '请选择您的性别！',
                    },
                ]}
            >
                <Select placeholder="select your gender" onSelect={(e)=>{gender=e}}>
                    <Option value="male" onChange={(e)=>{gender='male'}}>男</Option>
                    <Option value="female" onChange={(e)=>{gender='female'}}>女</Option>
                </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    {/*<a*/}
                    {/*    onClick={() =>*/}
                    {/*        dispatch({*/}
                    {/*            type: 'employees/addEmployee',*/}
                    {/*            payload: {*/}
                    {/*                // value:{'id':myid,'name':name,'gender':gender,'birthdate':birthDate,'nativePlace':nativePlace,'department':department},*/}
                    {/*                id:myid,*/}
                    {/*                name:name,*/}
                    {/*                gender:gender,*/}
                    {/*                birthdate:birthDate,*/}
                    {/*                nativePlace:nativePlace,*/}
                    {/*                department:department,*/}
                    {/*            },*/}
                    {/*        })*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*    添加*/}
                    {/*</a>*/}
                    <Link
                        to={'/employee'}
                        onClick={() =>
                            dispatch({
                                type: 'employees/addEmployee',
                                payload: {
                                    // value:{'id':myid,'name':name,'gender':gender,'birthdate':birthDate,'nativePlace':nativePlace,'department':department},
                                    id:myid,
                                    name:name,
                                    gender:gender,
                                    birthdate:birthDate,
                                    nativePlace:nativePlace,
                                    department:department,
                                },
                            })
                        }
                    >查看</Link>
                </Button>
            </Form.Item>
        </Form>
    );
}

export default connect(({ employees }) => ({ employees }))(AddPage);
