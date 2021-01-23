import React, { useState, useEffect } from "react";
import { Container, Header, Content } from "./styles";
import { BsPlusCircleFill } from "react-icons/bs";
import BlogCard from "../blogCard/index";
import Loader from "react-spinners/ClipLoader";
import axios from "axios";

const Feed = (props) => {
  const [data, setData] = useState([1, 3, 4, 5]);
  const [feedsState, setFeedsState] = useState("loading");

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
      console.log(response, "response");
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
        <BsPlusCircleFill size={40} color={"#4a708b"} />
      </Header>
      <Content>
        {/* {data.map((item) => (
          <BlogCard />
        ))}  */}
        {renderFeeds()}
      </Content>
    </Container>
  );
};

export default Feed;
