import { createContext, useEffect, useState } from "react";
import api from "../config/axios";
import toast from "react-hot-toast";

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/post/all?page=${page}`);
        const newPosts = res.data.fetchPost;

        console.log("Fetching page:", page);

        if (!newPosts || newPosts.length === 0) {
          setHasMore(false);
          return;
        }

        setPosts(prev => {
          const ids = new Set(prev.map(p => p._id));
          const filtered = newPosts.filter(p => !ids.has(p._id));
          return [...prev, ...filtered];
        });

        
        if (res.data.hasMore === false) {
          setHasMore(false);
        }

        if(res.data?.message === "post not created")
        {
          return console.log('end of the posts')
        }

      } catch (err) {
        console.log(err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

 
   useEffect(() => {
    let timeout = null;

    const handleScroll = () => {
      if (timeout) return;

      timeout = setTimeout(() => {
        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        if (
          windowHeight + scrollTop >= fullHeight - 120 &&
          !loading &&
          hasMore
        ) {
          setPage(prev => prev + 1);
        }

        timeout = null;
      }, 200); 
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <HomeContext.Provider value={{ posts, setPosts, loading }}>
      {children}
    </HomeContext.Provider>
  );
};