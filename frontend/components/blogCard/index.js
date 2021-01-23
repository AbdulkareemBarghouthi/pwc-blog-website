import React, { useEffect, useState } from "react";
import { Container, Header, Body } from "./styles";
import { RiSendPlaneLine } from "react-icons/ri";
import { Button, Input } from "../../styles/generalComponents";
import moment from "moment";
import { useRouter } from "next/router";
import Loader from "react-spinners/ClipLoader";
import axios from "axios";
import { FiSave } from "react-icons/fi";
import { getUser } from "../../helpers/auth";

const BlogCard = (props) => {
  const router = useRouter();
  const [editable, setEditable] = useState(false);
  const [commentState, setCommentState] = useState("loading");
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [blogUpdateLoading, setBlogUpdateLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const renderComments = () => {
    switch (commentState) {
      case "loading":
        return <Loader size={30} />;
      case "error":
        return <p>something went wrong</p>;
      case "ok": {
        if (comments.length === 0) return <p>No comments on this blog</p>;
        return comments.map((item) => (
          <div key={Math.random() * 10} className="comment">
            <p className="date-commented">
              Date Uploaded: {moment(item.dateCommented).format("DD MM YYYY")}{" "}
              at {moment(item.dateCommented).format("hh:mm a")}
            </p>
            <p className="comment-content">{item.comment}</p>
            <p className="commenter">Uploaded By: {item.commentedBy}</p>
          </div>
        ));
      }
      default:
        return <p>something went wrong</p>;
    }
  };

  const updateBlog = async () => {
    setBlogUpdateLoading(true);
    try {
      const response = await axios.put(`/api/blog/${props._id}`, {
        title: title,
        content: content,
      });

      if (response.status === 200) {
        alert("Blog updated Succesfully");
        location.reload();
        return;
      }

      alert("Something went wrong");
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setBlogUpdateLoading(false);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(`/api/blog/${props._id}/comment`);
      setCommentState("ok");
      setComments(response.data.data);
    } catch (error) {
      setCommentState("error");
    }
  };

  const addComment = async () => {
    if(comment.length === 0) return;
    setCommentLoading(true);
    try {
      const response = await axios.post(`/api/blog/${props._id}/comment`, {
        comment: comment,
      });

      if (response.status === 200) {
        getComments();
        setCommentLoading(false);
      }
    } catch (error) {
      alert("Something went wrong");
      setCommentLoading(false);
    }
  };

  useEffect(() => {
    if (getUser()) {
      setUser(getUser().data);
    }
  }, []);

  useEffect(() => {
    if (props._id) {
      getComments();
    }
  }, [props._id]);

  useEffect(() => {
    setEditable(props.editable);
  }, [props.editable]);

  useEffect(() => {
    setTitle(props.title);
    setContent(props.content);
  }, [props.title, props.content]);

  useEffect(() => {
    setTitle(props.title);
    setContent(props.content);
  }, [props.cancel]);

  return (
    <Container
      key={props._id}
      onClick={() => {
        if (!router.pathname.includes("feeds")) return;
        router.push(`/article/${props._id}`);
      }}
      key={props.key}
    >
      <Header>
        <p className="time-uploaded">
          Date Uploaded:{" "}
          {moment(props.dateCreated).format("ddd MM YYYY").toString()} at{" "}
          {moment(props.dateCreated).format("hh:mm a").toString()}
        </p>
        {editable ? (
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h2 className="title">{title}</h2>
        )}

        <p className="uploaded-by">Uploaded By: {props.postedBy}</p>
      </Header>
      {props.type === "article" && (
        <Body>
          <div className="blog-content-holder">
            {editable ? (
              <textarea
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                className="content-edit"
                value={content}
              />
            ) : (
              <p>{content}</p>
            )}
          </div>
          {editable && (
            <Button onClick={updateBlog}>
              {blogUpdateLoading ? (
                <Loader size={20} color={"white"} />
              ) : (
                <FiSave size={20} color={"white"} />
              )}
            </Button>
          )}
          <div className="comments-section">
            <p>Comments:</p>
            <div className="comments-holder">{renderComments()}</div>
            {user ? (
              <div className="comment-submission">
                <input
                  type="text"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  placeholder={"Leave a comment"}
                  value={comment}
                />
                <div className="send-button">
                
                  {commentLoading ? (
                    <Loader size={10} color={"white"} />
                  ) : (
                    <RiSendPlaneLine onClick={addComment} color={"white"} size={20} />
                  )}
                </div>
              </div>
            ) : (
              <p className="login-messsage">Login to be able to comment</p>
            )}
          </div>
        </Body>
      )}
    </Container>
  );
};

export default BlogCard;
