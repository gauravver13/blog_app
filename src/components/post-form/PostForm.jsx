import React, { useCallback, useEffect, useState } from 'react'
import { Button, Input, Select, RTE, Loader } from '..'
import appwriteService  from '../../appwrite/config'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function PostForm({ post }) {

    const {register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "Title",
            slug: post?.$id || "Slug!",
            content: post?.content || "",
            status: post?.status || 'active',
            author: post?.author || "Anonymous", 
        },
    })

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false); 

    const submit = async (data) => {
        console.log('Hello world')
        setLoading(true);

                if(post) {
                    const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                    console.log("file uploaded")
                    
                    if(file) {
                        appwriteService.deleteFile(post.featuredImage);
                    }
        
                    const dbPost = await appwriteService.updatePost(post.$id, {
                        ...data,
                        featuredImage: file ? file.$id : undefined,
                    });
        
                    if(dbPost) {
                        // setLoading(false)
                        navigate(`/post/${dbPost.$id}`);
                    }
                } else {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    try {
                            
                        if (file) {
                            const fileId = file.$id;
                            data.featuredImage = fileId;
                            
                                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                
                                if(dbPost) {
                                    navigate(`/post/${dbPost.$id}`)
                                }
                        }
                        
                    } catch (error) {
                        prompt(error.message);
                    } finally {
                        setLoading(false)
                    }
                }

    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") 
            return value
                .trim()
                .toLowerCase()      
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

            return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate : true })
            }
        })
        
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

  return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full lg:w-2/3 px-2">
                <Input
                    label={<>Title<span className='text-red-500'>*</span>:</>}
                    placeholder="Title"
                    className="mb-4 border border-gray-600 rounded-lg bg-black text-white focus:bg-black focus:outline focus:ring-none"
                    style={{'backgroundColor': 'black', 'color': 'white'}}
                    {...register("title", { required: true })}
                />
                <Input
                    label={<>Slug<span className='text-red-500'>*</span>:</>}
                    placeholder="Slug"
                    className="mb-4 border border-gray-600 text-white rounded-lg bg-black focus:bg-black focus:outline focus:ring-none"
                    style={{'backgroundColor': 'black', 'color': 'white'}}
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate : true });
                    }}
                />
                <RTE label = "Content :" name="content" control={control} defaultValue={getValues("content")} />
                
                <Input 
                    label="Author :"
                    placeholder="Author"
                    style={{'backgroundColor': 'black', 'color': 'white'}}
                    className="mb-4 border border-gray-600 text-white rounded-lg bg-black focus:bg-black focus:outline focus:ring-none cursor-not-allowed"
                    {...register("author")}
                />
            </div>
            <div className="w-full lg:w-1/3 px-2">
                <Input
                    label={<>Featured Image<span className='text-red-500'>*</span>:</>}
                    type="file"
                    style={{'backgroundColor': 'black', 'color': 'white'}}
                    className="mb-4 border border-gray-600 text-white rounded-lg bg-black focus:bg-black focus:outline focus:ring-none"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    style={{'backgroundColor': 'black', 'color': 'white'}}
                    className="mb-4 border border-gray-600 text-white rounded-lg bg-black focus:bg-black focus:outline focus:ring-none"
                    {...register("status", { required: true })}
                />
                {loading? 
                    <div className='w-full grid place-items-center'> 
                    <Loader></Loader>
                    </div>
                    :        
                    <Button
                    type="submit" 
                    bgColor={post ? "bg-green-500" : undefined} 
                    className= {` ${post? "hover:shadow-green-500 text-black " : " hover:shadow-customPurple text-white "} "my-3 py-2 px-4 w-full text-white bg-blue-500  button-custom rounded-lg shadow-lg hover:bg-blue-700 hover:text-black duration-400 hover:cursor-pointer"`} >

                        {post ? "Update" : "Submit"}
                    </Button> }
            </div>
        </form>
    );
}
