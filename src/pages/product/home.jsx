import React, { Component } from 'react';
import {Card,Select,Input,Button,Table, message} from "antd"
import {PlusSquareFilled } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import {reqProducts,reqUpdateStatus, reqSearchProducts} from '../../api'
import {PAGE_SIZE} from '../../utils/Constants'
import memoryUtils from '../../utils/memoryUtils';
import throttle from 'lodash.throttle'
const Option=Select.Option
class ProductHome extends Component {
  state={
    loading:false,
    products:[ ],
    total:0,
    searchType:"productName",
    searchName:""

  }
  updateStatus= throttle(
    async (productId,status)=>{
      status=status===1?2:1
      const result=await reqUpdateStatus(productId,status)
      if(result.status===0){
        message.success("更新商品状态成功")
        this.getProducts(this.pageNum)
      }
    },2000)

  initColumns=()=>{
    this.columns=[
      {
        title:"商品名称",
        dataIndex:"name"
    },
      {
        title:"商品描述",
        dataIndex:"desc"
    },
      {
        title:"价格",
        dataIndex:"price",
        render:(price)=>"￥"+price
    },
      {
        title:"状态",
        width:100,
       // dataIndex:"status",
        render:({_id,status})=>{
          let btnText="下架"
          let text="在售"
          if(status===2){
            btnText="上架"
            text="已下架"
          }else{

          }
          return(
          <span>
            <button onClick={()=>{this.updateStatus(_id,status)}}>{btnText}</button><br/>
            <span >{text}</span>
          </span>
        )
        }
    },
    {
      title:"操作",
    
      render:(product)=>(
        <span>
          <LinkButton
           onClick={()=>{
             memoryUtils.product=product
             this.props.history.push("/product/detail/:id",product._id)
            }}
           >详情
           </LinkButton>
          <LinkButton
           onClick={()=>{
             memoryUtils.product=product
             this.props.history.push('/product/addupdate')
           }}>修改</LinkButton>
        </span>
      )
  },
    ]
  }

  getProducts= async(pageNum)=>{
    this.pageNum=pageNum
    const {searchType,searchName}=this.state
    let result
    if(!this.isSearch){
       result= await reqProducts(pageNum,PAGE_SIZE)
    }else{
       result= await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
    }
   
   if(result.status===0){
     const {total,list}=result.data
     this.setState({
       products:list,
       total
     })
   }
  }
  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
    this.getProducts(1)
  }
  render() {
    const {loading,products,total,searchName,searchType}=this.state

    const title=(
      <span>
        <Select style={{width:200}} value={searchType}
         onChange={(value)=>this.setState({searchType:value})}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>

        </Select>
      <Input
       style={{width:200,margin:"0 10px"}}
        placeholder="关键字"
         value={searchName}
         onChange={(event)=>this.setState({searchName:event.target.value})}
         ></Input>
        <Button type="primary" onClick={()=>{
          this.isSearch=true
          this.getProducts(1)
        }}>搜索</Button>
      </span>
    )
    const extra=(
      <Button type="primary" onClick={()=>{
        memoryUtils.product={}
        this.props.history.push('/product/addupdate')
      }}>
        <PlusSquareFilled></PlusSquareFilled>
        添加商品
      </Button>
    )
    return (
      <div>
        <Card title={title} extra={extra}>
        <Table
      columns={this.columns}
      dataSource={products}
      rowKey="_id"
      loading={loading}
      pagination={{total,
        defaultPageSize:PAGE_SIZE,
        showQuickJumper:true,
        onChange:this.getProducts,
      current:this.pageNum
    }}
     bordered
     />

        </Card>
      </div>
    );
  }
}

export default ProductHome;