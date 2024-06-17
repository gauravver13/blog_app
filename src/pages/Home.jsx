import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard, Button } from '../components';
import HomeDummyPostcard from '../components/HomeDummy/HomeDummyPostCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
    const status = useSelector((state) => state.auth.status);
    const userId = useSelector((state) => state.auth.userData?.$id);
    const [posts, setPosts] = useState([])

    useEffect(() => { 
        appwriteService.getPosts().then((posts) => {
            if(posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

  
    const navigate = useNavigate()

    const navigateProfile = () => {
        if (status) {
            navigate(`/all-posts`);
            }
            else {
                navigate("/signup");
            }
        };
    const navigateAddPost = () => {
      navigate(`/add-post`)
    }
    
    const navigateAllPost = () => {
      navigate(`/all-post`)
    }
    
    // const videoRef = useRef(null);

    // useEffect(() => {
    // if (videoRef.current) {
    //     videoRef.current.playbackRate = 1.5;
    // }
    // }, []);
  
    return ( 
        <div className="w-full my-20 md:py-8 text-center md:min-h-auto">
          {/* <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          /> */}
          <Container>
            <div className="flex flex-col gap-20 my-20 md:my-14 items-center justify-around">
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-[52px] md:text-[52px] lg:text-[72px] hero-heading mx-auto glowing-head-hero">
                  Welcome to the <span className="text-customPurple hero-heading-span">BlogHub!</span>
                </h1>

                <div className="mx-auto my-7 lg:mt-10 flex gap-4 flex-col lg:flex-row">
                  <Button
                    onClick={() => navigateProfile()}
                    className="md:py-[0.7rem] py-0 px-5 gradient-btn text-white font-weight-400 border border-gray-600 rounded-lg shadow-lg duration-200 hover:cursor-pointer md:mx-2 md:my-6"
                  >
                    {status ? "See Posts" : "Get Started"}
                  </Button>
                  {status && (
                  <Button
                    onClick={() => navigate(`/all-posts`)}
                    className=" md:py-[0.7rem] btn-shadow py-0 px-5 text-white font-weight-400 border border-gray-600 rounded-lg shadow-lg duration-200 hover:cursor-pointer md:mx-2 md:my-6"
                  >
                    Visit Profile
                  </Button>
                  )}
                   {status && (
                  <Button
                    onClick={() => navigate(`/add-post`)}
                    className=" md:py-[0.7rem] btn-shadow py-0 px-5 text-white font-weight-400 border border-gray-600 rounded-lg shadow-lg duration-200 hover:cursor-pointer md:mx-2 md:my-6"
                  >
                    Add Post
                  </Button>
                  )}
                </div>
              </div>
            </div>
    
            <div className="flex flex-col-reverse lg:flex-row my-5 lg:mt-[7rem] gap-5">
              <HomeDummyPostcard />
              <div className="lg:min-h-[12rem] flex flex-col items-end justify-center w-full">
                <div className="h-50 w-full border-b flex justify-end gradient-text border-gray-500 text-md md:text-xl py-1">
                  {" "}
                  Find the Best Reads
                </div>
                <div className="text-gray-300 text-sm text-start py-1">
                  Login to unlock a world of blogs posted by others
                </div>
              </div>
            </div>
          </Container>
        </div>
      );
    }

export default Home