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
function getUrlParams(name) { // ??????name???????????????????????????????????????
    var url = window.location.search;
    if (url.indexOf('?') == 1) { return false; }
    url = url.substr(1);
    url = url.split('&');
    var name = name || '';
    var nameres;
    // ???????????????????????????
    for(var i=0;i<url.length;i++) {
        var info = url[i].split('=');
        var obj = {};
        obj[info[0]] = decodeURI(info[1]);
        url[i] = obj;
    }
    // ????????????????????????????????????????????????
    if (name) {
        for(var i=0;i<url.length;i++) {
            for (const key in url[i]) {
                if (key == name) {
                    nameres = url[i][key];
                }
            }
        }
    } else {
        nameres = url;
    }
    // ????????????
    return nameres;
}

function EditPage({ employees, dispatch }){
    // useEffect(() => {
    //     dispatch({
    //         type: 'employees/addEmployee',
    //     })
    // }, [])

    let name=getUrlParams('name');
    let department=getUrlParams('department');
    let birthDate=getUrlParams('birthDate');
    let gender=getUrlParams('gender');
    let nativePlace=getUrlParams('nativePlace');
    let myid=getUrlParams('id');

    return (
        <Form
            {...formItemLayout}
            // form={Form.useForm()}
            name="register"
            // onFinish={(values) => {
            //     console.log('Received values of form: ', values);
            // }}
            initialValues={{
                name:getUrlParams('name'),
                gender:getUrlParams('gender'),
                birthDate:getUrlParams('birthDate'),
                department:getUrlParams('department'),
                place:getUrlParams('nativePlace'),
                nativePlace:getUrlParams('nativePlace')
            }}
            scrollToFirstError
        >
            <Form.Item
                name="name"
                label="??????"
                tooltip="?????????????????????"
                rules={[
                    {
                        required: true,
                        message: '????????????????????????',
                        whitespace: true,
                    },
                ]}
            >
                <Input onChange={(e)=>{name=e.target.value}}/>
            </Form.Item>

            <Form.Item
                name="department"
                label="??????"
                rules={[
                    {
                        required: true,
                        message: '??????????????????????????????',
                        whitespace: true,
                    },
                ]}
            >
                <Input onChange={(e)=>{department=e.target.value}}/>
            </Form.Item>

            <Form.Item
                name="birthDate"
                label="????????????"
                rules={[
                    {
                        required: true,
                        message: '??????????????????????????????',
                    },
                ]}
            >
                <Input onChange={(e)=>{department=e.target.value}}/>
            </Form.Item>

            <Form.Item
                name="place"
                label="??????"
                tooltip="??????????????????"
                rules={[
                    {
                        required: true,
                        message: '????????????????????????',
                    },
                ]}
            >
                <Input onChange={(e)=>{nativePlace=e.target.value}}/>
            </Form.Item>

            <Form.Item
                name="gender"
                label="??????"
                rules={[
                    {
                        required: true,
                        message: '????????????????????????',
                    },
                ]}
            >
                <Select placeholder="select your gender" onSelect={(e)=>{gender=e}}>
                    <Option value="male" onChange={(e)=>{gender='male'}}>???</Option>
                    <Option value="female" onChange={(e)=>{gender='female'}}>???</Option>
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
                    {/*    ??????*/}
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
                    >??????</Link>
                </Button>
            </Form.Item>
        </Form>
    );
}

export default connect(({ employees }) => ({ employees }))(EditPage);
