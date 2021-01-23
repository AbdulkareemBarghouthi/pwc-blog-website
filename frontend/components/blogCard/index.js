import React, { useState } from "react";
import { Container, Header, Body } from "./styles";
import { RiSendPlaneLine } from "react-icons/ri";
import { Input } from "../../styles/generalComponents";

const BlogCard = (props) => {
  const [editable, setEditable] = useState(true);
  return (
    <Container>
      <Header>
        <p className="time-uploaded">Date Uploaded: 01/22/2020 at 3:50pm</p>
        {editable? 
        <Input  value="A blog about pizza lorem"/>
        :
        <h2 className="title">A blog about pizza lorem</h2>
        }
        
        <p className="uploaded-by">Uploaded By: Abdulkareem Barghouthi</p>
      </Header>
      {props.type === "article" && (
        <Body>
          <div className="blog-content-holder">
            {editable ? (
              <textarea className="content-edit" value="Sint qui occaecat ad est excepteur magna Lorem. Sit sunt velit
              pariatur id veniam proident sit in laboris dolor minim irure.
              Ipsum fugiat eiusmod do aliquip voluptate exercitation occaecat.
              Enim cillum in veniam consequat sunt elit. Tempor tempor non
              voluptate sit dolor.Nisi ad sunt nostrud mollit. Elit magna
              magna labore incididunt consectetur. In fugiat fugiat minim
              excepteur cillum reprehenderit aliquip adipisicing adipisicing
              qui et. Est ex ad nulla reprehenderit dolore anim. Nisi Lorem
              occaecat ullamco officia sit ullamco proident in. Amet est do
              cillum sit commodo." />
                
            ) : (
              <p>
                Sint qui occaecat ad est excepteur magna Lorem. Sit sunt velit
                pariatur id veniam proident sit in laboris dolor minim irure.
                Ipsum fugiat eiusmod do aliquip voluptate exercitation occaecat.
                Enim cillum in veniam consequat sunt elit. Tempor tempor non
                voluptate sit dolor.Nisi ad sunt nostrud mollit. Elit magna
                magna labore incididunt consectetur. In fugiat fugiat minim
                excepteur cillum reprehenderit aliquip adipisicing adipisicing
                qui et. Est ex ad nulla reprehenderit dolore anim. Nisi Lorem
                occaecat ullamco officia sit ullamco proident in. Amet est do
                cillum sit commodo.
              </p>
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
