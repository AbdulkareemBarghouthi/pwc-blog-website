import { useRouter } from 'next/router';
import { useEffect } from "react";
import Loader from 'react-spinners/ClipLoader';

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    router.push('/feeds');
  },[])

  return (
    <Loader size={100}/>
  )
}
