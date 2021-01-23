import React from "react";
import AppLayout from "../layouts/layout/index";
import UploadBlog from '../components/uploadBlog/index';

const FeedPage = (props) => {
  return (
    <AppLayout>
      <UploadBlog /> 
    </AppLayout>
  );
};

export default FeedPage;