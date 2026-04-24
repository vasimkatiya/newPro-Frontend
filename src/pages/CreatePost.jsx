import React, { useContext, useState } from 'react'
import api from '../config/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HomeContext } from '../context/hoem.context';

const CreatePost = () => {
    const [Image, setImage] = useState(null);
    const [Caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);

    const { setPosts } = useContext(HomeContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!Caption || !Image) {
            return toast.error("image or caption is not define");
        }

        const formData = new FormData();
        formData.append("image", Image);
        formData.append("caption", Caption);

        try {
            setLoading(true); 

            const res = await api.post('/post/create', formData);

            const resp = await api.get('post/all');
            setPosts(resp.data.fetchPost);

            toast.success(res.data?.message, {
                style: {
                    background: 'green',
                    color: 'white'
                }
            });

            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || "fail to upload", {
                style: {
                    background: 'red',
                    color: 'white',
                }
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="form-container h-screen flex items-center justify-center flex-col gap-2">
                <div className="heading text-2xl capitalize font-bold">
                    create post
                </div>

                <form onSubmit={submitHandler} className='bg-violet-500 md:py-16 flex gap-10 flex-col px-7 py-10 rounded-3xl'>

                    <input
                        className='md:w-[30vw] md:px-10 h-[5vh] px-3 rounded-3xl bg-white text-center'
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <input
                        className='h-[5vh] px-3 rounded-3xl md:w-[30vw] md:px-10 bg-white'
                        type="text"
                        placeholder='caption'
                        value={Caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`md:px-1 py-3 w-40 capitalize font-semibold rounded-full m-auto 
                        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#ebe6ce]"}`}
                    >
                        {loading ? "Uploading..." : "Upload"} 
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreatePost;