import React, { useState } from "react";
import { Container, Content, TextArea } from "./styles";
import { Input, Button } from "../../styles/generalComponents";
import Link from "next/link";
import axios from 'axios';
import Loader from 'react-spinners/ClipLoader';
import {useRouter} from 'next/router';

const UploadBlog = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const uploadBlog = async ()=>{
    if(title.length === 0 || description.length === 0){
      alert('Please fill all the fields');
      return;
    }

    setLoading(true);

    try{
      const response = await axios.post('/api/blog', {
        title: title,
        content: description,
      });
      
      if(response.status === 200){
        alert('Uploaded successfully');
        router.push('/feeds');
        return;
      }
      alert('something went wrong');
    } catch (error){
      alert('something went wrong');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Container>
      <Content>
        <h2>Upload a blog</h2>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="What's your title?"
        />
        <TextArea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Add Your content here"
        />
        <span className="submit-holder">
          <p>
            <Link href="/feeds">
              <a>Cancel</a>
            </Link>
          </p>
          <Button onClick={uploadBlog}>{
            loading ?
            <Loader size={10}/>
            :
            "Submit"
          }</Button>
        </span>
      </Content>
    </Container>
  );
};

export default UploadBlog;
