import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/MyAddresses.module.css';
import { Tenant } from '../../types/Tenant';
import { getCookie, setCookie } from "cookies-next";
import { User } from '../../types/User';
import { useAuthContext } from '../../contexts/auth';
import Head from 'next/head';
import { Header } from '../../components/Header';

import { useFormatter } from '../../libs/useFormatter';
import { useRouter } from 'next/router';
import { Button } from '../../components/Button';
import { Address } from '../../types/Address';



const MyAddresses = (data : Props) => {

  const formatter = useFormatter()
  const router = useRouter()

  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext()

  useEffect(()=>{
    setTenant(data.tenant)
    setToken(data.token)
    if(data.user) setUser(data.user)
  }, [])
 
  
  //Functions
  const handleNewAddress = () => {
    router.push(`/${data.tenant.slug}/newaddress`)
  }

  return (
    <div className={styles.container}>
        <Head>
            <title>Meus Endereços | {data.tenant.name}</title>
        </Head>
        <Header
            backHref={`/${data.tenant.slug}/checkout`}
            color={data.tenant.mainColor}
            title="Meus Endereços"
        />

        <div className={styles.list}>
        {data.addresses.map((item, index)=>(
            <div key={index}>{item.street} - {item.number}</div>
        ))}
        </div>
        <div className={styles.btnArea}>
            <Button
                color={data.tenant.mainColor}
                label="Novo Endereço"
                onClick={handleNewAddress}
                fill
            />
        </div>
  
    </div>
  )
}

export default MyAddresses


type Props = {
  tenant : Tenant;
  token: string;
  user: User | null;
  addresses: Address[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { tenant : tenantSlug } = context.query;
  const api = useApi(tenantSlug as string)
  const tenant = await api.getTenant()
  
  // Get tenant
  if(!tenant){
    return  {
      redirect : {destination : '/', permanent : false}
    }
  }

  // Get Logged User
  //const token = context.req.cookies.token;
  const token =  getCookie('token', context) ?? ""
  const user = await api.authorizeToken(token as string) 
  if(!user){
    return { redirect: {destination : '/login', permanent: false} }
  }

  // Get  Addresses from logged User
  const addresses = await api.getUserAddresses(user.email)
  

  return {
    props: {
      tenant,
      user,
      token,
      addresses
    }
  }
}