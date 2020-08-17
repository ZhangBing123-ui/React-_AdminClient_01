import React, { Component } from 'react';
import {Card,List,} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import jsonp from 'jsonp';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect } from 'react-router-dom';
import {BASE_IMG} from '../../utils/Constants'
import {reqCategory} from '../../api'

const Item=List.Item
class ProductDetail extends Component {

  state={
    categoryName:'',
    product:memoryUtils.product
  }
  getCategory= async(categoryId)=>{
    const result=await reqCategory(categoryId)
    if(result===0){
      const categoryName=result.data.name
      this.setState({categoryName})
    }
  }

  componentDidMount(){
    const product=memoryUtils.product
    if(product._id){
        this.getCategory(product.categoryId)
    }
    if(this.state.product._id){
        
    }
  
  }
  render() {
    const {categoryName}=this.state
    const product=this.state.product
    
    const title=(
      <span>
        <LinkButton onClick={()=>this.props.history.goBack()}>
        <ArrowLeftOutlined/>
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className='detail'>
         <List>
          <Item>
            <span className="detail-left">商品名称:</span> <span>{product.name}</span>
          </Item>
          <Item>
            <span className="detail-left">商品描述:</span> <span>{product.desc}</span>
          </Item>
          <Item>
            <span className="detail-left">商品价格:</span> <span>{product.price}元</span>
          </Item>
          <Item>
            <span className="detail-left">所属分类:</span> <span>{categoryName}</span>
          </Item>
          <Item>
            <span className="detail-left">商品图片:</span> <span>
              {
                product.imgs && product.imgs.map(img => <img className="detail-img" key={img} src={BASE_IMG + img} alt="img" />)
              }
              
            </span>
          </Item>
          <Item>
            <span className="detail-left">商品详情:</span> <span dangerouslySetInnerHTML={{ __html: product.detail}}></span>
          </Item>
        </List>

      </Card>
    );
  }
}

export default ProductDetail;