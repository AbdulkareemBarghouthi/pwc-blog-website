import React, { useState } from "react";
import { Container, Header, Body } from "./styles";
import { RiSendPlaneLine } from "react-icons/ri";
import { Input } from "../../styles/generalComponents";
import moment from "moment";
import {useRouter} from 'next/router';

const BlogCard = (props) => {
  const router = useRouter(); 
  
  const [editable, setEditable] = useState(false);

  return (
    <Container key={props._id} onClick={()=>{
      if(!router.pathname.includes('feeds')) return;
      router.push(`/article/${props._id}`)
    }} key={props.key}>
      <Header>
        <p className="time-uploaded">
          Date Uploaded:{" "}
          {moment(props.dateCreated).format("ddd MM YYYY").toString()} at{" "}
          {moment(props.dateCreated).format("hh:mm a").toString()}
        </p>
        {editable ? (
          <Input value={props.title} />
        ) : (
          <h2 className="title">{props.title}</h2>
        )}

        <p className="uploaded-by">Uploaded By: {props.postedBy}</p>
      </Header>
      {props.type === "article" && (
        <Body>
          <div className="blog-content-holder">
            {editable ? (
              <textarea className="content-edit" value={props.content} />
            ) : (
              <p>{props.content}</p>
            )}
          </div>
          <div className="comments-section">
            <p>Comments:</p>
            <div className="comments-holder">
              <div className="comment">
                <p className="date-commented">
                  Date Uploaded: 01/22/2020 at 3:50pm
                </p>
                <p className="comment-content">A blog about pizza lorem</p>
                <p className="commenter">Uploaded By: Abdulkareem Barghouthi</p>
              </div>
            </div>
            <div className="comment-submission">
              <input type="text" placeholder={"Leave a comment"} />
              <div className="send-button">
                <RiSendPlaneLine color={"white"} size={20} />
              </div>
            </div>
          </div>
        </Body>
      )}
    </Container>
  );
};

export default BlogCard;
