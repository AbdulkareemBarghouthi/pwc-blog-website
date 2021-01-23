import React, { useEffect, useState } from "react";
import AppLayout from "../../layouts/layout/index";
import Article from "../../components/article/index";
import { useRouter } from "next/router";

const ArticlePage = (props) => {
  const router = useRouter();
  const [id, setId] = useState(router.query.pid)
  
  useEffect(()=>{
    setId(router.query.pid);
  },[router.query.pid]);

  return (
    <AppLayout>
      <Article id={id} />
    </AppLayout>
  );
};

export default ArticlePage;
