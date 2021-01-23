import React from "react";
import AppLayout from '../../layouts/layout/index'
import Article from '../../components/article/index'
import {useRouter} from 'next/router';

const ArticlePage = (props) => {
    const router = useRouter();
  return (
    <AppLayout>
        <Article id={router.query.pid}/>
    </AppLayout>
  );
};

export default ArticlePage;
