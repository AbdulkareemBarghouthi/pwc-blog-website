import React, { useEffect, useState } from "react";
import BlogCard from "../blogCard/index";
import { Container, Header } from "./styles";
import { FiEdit, FiSave } from 'react-icons/fi';
import { TiCancel } from 'react-icons/ti';
import Loader from "react-spinners/ClipLoader";
import axios from 'axios';

const Article = (props) => {
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState({});

  const renderArticle = ()=>{
    switch(status){
      case 'loading':
        return <Loader size={80}/>
      case 'error':
        return <p>Something went wrong</p>
      case 'ok':
        if(!data) return <p>No info for this blog</p>;
        return(
          <BlogCard {...data} type={"article"}/>
        )
      default:
        return <p>Something went wrong</p>
    }
  } 

  const handleArticle = async () =>{
    try {
      const response = await axios.get(`/api/blog/${props.id}`);
      console.log(response);
      setStatus('ok');
      setData(response.data.data);
    } catch (error){
      setStatus('error');
    }
  }

  useEffect(()=>{
    handleArticle();
  },[]);

  return (
    <Container>
      <Header>
        <TiCancel size={30}/>
        <FiSave size={30}/>
        <FiEdit size={30}/>
      </Header>
      {renderArticle()}
      
    </Container>
  );
};

export default Article;
