import React, { Component } from 'react';
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

           
  
   const Item=Form.Item
class AddUpdateFrom extends Component {
static propTypes={
  categoryName:PropTypes.string
}
  
  componentDidMount(){
    this.props.setForm(this.form)
    
  }

  componentDidUpdate() {
    this.form.setFieldsValue({
        categoryName: this.props.categoryName,
    });
}

    render() {
      const {categoryName}=this.props
    return (
      <Form
      ref={(ref)=>{
        this.form=ref
      }}
      
      >
        <Item
       
       name="categoryName"
       initialValue={categoryName||""}
       rules={[{ required: true,whitespace:true,message: '用户名是必须的!' },
           
        ]}
      
    >
      <Input 
      type="text"
       placeholder="请输入分类名称" />
    </Item>

      </Form>
    );
  }
}

export default AddUpdateFrom;