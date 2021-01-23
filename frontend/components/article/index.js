import React, { useEffect, useState } from "react";
import BlogCard from "../blogCard/index";
import { Container, Header } from "./styles";
import { FiEdit, FiSave } from "react-icons/fi";
import { TiCancel } from "react-icons/ti";
import Loader from "react-spinners/ClipLoader";
import axios from "axios";
import { getUser } from "../../helpers/auth";

const Article = (props) => {
  const [status, setStatus] = useState("loading");
  const [articleData, setArticleData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [cancel, setCancel] = useState(false);

  const renderArticle = () => {
    switch (status) {
      case "loading":
        return <Loader size={80} />;
      case "error":
        return <p>Something went wrong</p>;
      case "ok":
        if (!articleData) return <p>No info for this blog</p>;
        return (
          <BlogCard
            cancel={cancel}
            editable={editMode}
            {...articleData}
            type={"article"}
          />
        );
      default:
        return <p>Something went wrong</p>;
    }
  };

  const handleArticle = async () => {
    try {
      const response = await axios.get(`/api/blog/${props.id}`);
      setStatus("ok");
      setArticleData(response.data.data);
    } catch (error) {
      setStatus("error");
    }
  };

  const renderTools = () => {
    const user = getUser();
    if (!user || !articleData) {
      return null;
    }

    if (user.data.role === "admin") {
      return (
        <Header>
          {editMode && (
            <>
              <TiCancel
                onClick={() => {
                  setCancel(!cancel);
                  setEditMode(false);
                }}
                size={30}
              />
            </>
          )}

          <FiEdit
            onClick={() => {
              setEditMode(true);
            }}
            size={30}
          />
        </Header>
      );
    }

    if (user.data._id !== articleData.postedBy) {
      return null;
    }

    return (
      <Header>
        {editMode && (
          <>
            <TiCancel
              onClick={() => {
                setCancel(!cancel);
                setEditMode(false);
              }}
              size={30}
            />
          </>
        )}

        <FiEdit size={30} />
      </Header>
    );
  };

  useEffect(() => {
    if (props.id) {
      handleArticle();
    }
  }, [props.id]);

  return (
    <Container>
      {renderTools()}
      {renderArticle()}
    </Container>
  );
};

export default Article;
