import styled from "styled-components";

const Container = styled.div`
  width: 700px;
  background-color: white;
  border: solid 1px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  cursor: pointer;
  padding: 0 10px;
  min-height: 120px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  height: 120px;
  padding-left: 15px;
  .time-uploaded {
    color: rgba(0, 0, 0, 0.7);
    padding: 0;
    margin-top: 5px;
    font-size: 14px;
  }

  .title {
    font-weight: 300;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 600px;
  }

  .uploaded-by {
    padding: 0;
    margin: 0;
    text-align: right;
    font-weight: 200;
    font-size: 14px;
  }
`;

const Body = styled.div`
  .content-edit {
    min-height: 300px;
    width: 100%;
    border: none;
  }
  
  .comments-section {
    .comment-submission{
        margin: 7px 0;
        display: flex;
        input {
            width: 630px;
            height: 40px;
            margin-right: 5px;
            border: solid 1px rgba(0,0,0,0.3);
            border-radius: 5px;
        }

        .send-button {
            height: 40px;
            width: 40px;
            border-radius: 20px;
            background-color: #4a708b;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .comments-holder {
      margin-bottom: 10px;
      .comment {
        border: solid 1px grey;
        background-color: #eef0f1;
        border-radius: 3px;
        padding: 0 15px;
        .comment-content{
            font-weight: 300;
        }
        .date-commented {
          font-size: 12px;
          font-weight: 200;
        }

        .commenter {
            text-align: right;
            font-size: 12px;
            font-weight: 200;
        }
      }
    }
  }
  .blog-content-holder {
    padding: 0 15px;
    border: solid 1px orchid;
    border-radius: 4px;
    margin: 10px 0;
    p {
      font-weight: 300;
    }
  }
`;

export { Container, Header, Body };
