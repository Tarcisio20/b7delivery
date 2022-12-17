import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAppContext } from '../../../contexts/app';
import { useApi } from '../../../libs/useApi';
import styles from '../../../styles/Product-id.module.css';
import { Product } from '../../../types/Product';
import { Tenant } from '../../../types/Tenant';
import { Header } from '../../../components/Header';
import { Button } from '../../../components/Button';
import { useFormatter } from '../../../libs/useFormatter';
import { Quantity } from '../../../components/Quantity';
import { CartCookie } from '../../../types/CartCookie';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const Product = (data : Props) => {
  const router = useRouter()

  const { tenant, setTenant } = useAppContext()
  const [qtCount, setQtCount] = useState(0)
  const formatter = useFormatter()

  useEffect(()=>{
    setTenant(data.tenant)
  }, [])

  const handleAddtoCart = () => {
    let cart: CartCookie[] = []
    //create or get existing
    if(hasCookie('cart')){
      const cartCookie = getCookie('cart')
      const cartJson: CartCookie[] = JSON.parse(cartCookie as string)
      
      for(let i in cartJson){
        if(cartJson[i].qt && cartJson[i].id){
          cart.push(cartJson[i])
        }
      }
    }

    //Search product in cart
    const cartIndex = cart.findIndex(item => item.id === data.product.id)
    if(cartIndex > -1){
      cart[cartIndex].qt += qtCount
    }else{
      cart.push({id: data.product.id, qt: qtCount})
    }

    //setting cookie
    setCookie('cart', JSON.stringify(cart))

    //going to cart
    router.push(`/${data.tenant.slug}/cart`)
    
  }

  const handleUpdateQt = (newCount : number) => {
    setQtCount(newCount)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.product.name} | {data.tenant.name}</title>
      </Head>

      <div className={styles.headerArea}>
        <Header
        color={data.tenant.mainColor}
        backHref={`/${data.tenant.slug}`}
        title="Produto"
        invert
        />
      </div>
      <div 
      className={styles.headerBg}
      style={{backgroundColor : data.tenant.mainColor}}
      ></div>

      <div className={styles.productImage}>
        <img src={data.product.image} />
      </div>

      <div className={styles.category}>{data.product.categoryName}</div>
    
    <div className={styles.title}
    style={{borderBottomColor: data.tenant.mainColor}}
    >{data.product.name}</div>
    <div className={styles.line}></div>

    <div className={styles.description}>{data.product.description}</div>
    
    <div className={styles.qtText}>Quantidade</div>

    <div className={styles.area}>
        <div className={styles.areaLeft}>
            <Quantity
                color={data.tenant.mainColor}
                count={qtCount}
                onUpdateCount={handleUpdateQt}
                min={1}
                max={10}
            />
        </div>
        <div className={styles.areaRight}
        style={{color : data.tenant.mainColor}}
        >{formatter.formatPrice(data.product.price)}</div>
    </div>

    <div className={styles.buttonArea}>
        <Button
        color={data.tenant.mainColor}
        label="Adicionar a sacola"
        onClick={handleAddtoCart}
        fill
        />
    </div>

    </div>
  )
}

export default Product


type Props = {
  tenant : Tenant
  product : Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { tenant : tenantSlug, id } = context.query;
  const api = useApi(tenantSlug as string)
  const tenant = await api.getTenant()
  
  // Get tenant
  if(!tenant){
    return  {
      redirect : {destination : '/', permanent : false}
    }
  }

  // Get Product
  const product = await api.getProduct(parseInt(id as string))

  return {
    props: {
      tenant,
      product
    }
  }
}