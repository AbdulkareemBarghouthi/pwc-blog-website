import React, { useState, useEffect } from "react";
import { Container, Header, Content } from "./styles";
import { BsPlusCircleFill } from "react-icons/bs";
import BlogCard from "../blogCard/index";
import Loader from "react-spinners/ClipLoader";
import axios from "axios";
import { useRouter } from 'next/router';

const Feed = (props) => {
  const [data, setData] = useState([1, 3, 4, 5]);
  const [feedsState, setFeedsState] = useState("loading");
  const router = useRouter();

  const renderFeeds = () => {
    switch (feedsState) {
      case "loading":
        return <Loader size={70} />;
      case "error":
        return <p>Something went Wrong</p>;
      case "ok": {
        if (data.length === 0) return <p>No Feeds available</p>;
        return data.map((item) => (
            <BlogCard {...item} />
        ));
      }
      default:
        return <p>No Feeds available</p>;
    }
  };

  const handleFeedsData = async () => {
    try {
      const response = await axios.get("/api/blog");
      setFeedsState("ok");
      setData(response.data.data);
    } catch (error) {
      setFeedsState("error");
      console.log(error);
    }
  };

  useEffect(() => {
    handleFeedsData();
  }, []);

  return (
    <Container>
      <Header>
        <BsPlusCircleFill onClick={()=>{
          router.push('/upload');
        }} size={40} color={"#4a708b"} />
      </Header>
      <Content>
        {renderFeeds()}
      </Content>
    </Container>
  );
};

export default Feed;
