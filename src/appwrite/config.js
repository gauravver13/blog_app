import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import authService from "./auth.js";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // create likes and author with captions!

    // CRUD:
    async createPost({title, slug, content, featuredImage, status, userId, author }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,                
                //try slug,
                // attributes to take information,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    author
                }
            )
        } catch (error) {
            console.log("Appwrite service:: createPost :: error", error);
        }
    }

    
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return false
        }
    }


    async updatePost(slug, 
        {title, content, featuredImage, status, author, likes}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    author
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }


    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return false
        }
    }


    // Learn Pagination just after queries 
    // Queries:
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return false
        }
    } 

    // async createLike(postId) {

    //     const userId = await authService.userId();
    //     const lastFiveChars = userId.slice(-5);
    //     const likeId = `${lastFiveChars}_${postId}`

    //     try {
    //         const likeExists = await this.getLikesByUserAndPost(userId, postId);

    //         // check if the like already exists or not!
    //         if(likeExists){
    //             return;
    //         } else {
    //             // like doesn't exist, proceed to create it
    //             await this.databases.createDocumentcreateDocument(
    //                 conf.appwriteDatabaseId,
    //                 conf.appwriteCollectionId,
    //                 likeId,
    //                 { 
    //                     likeId,
    //                     userId,
    //                     postId
    //                 }
    //             );

    //             // Increment likes count in the blog post document!
    //             const post = await this.getPost(postId)
    //             const currentLikes = post.likes || 0
    //             const newLikes = currentLikes + 1
    //             await this.databases.updateDocument(
    //                 conf.appwriteDatabaseId,
    //                 conf.appwriteCollectionId,
    //                 postId,
    //                 {
    //                     likes : newLikes
    //                 }
    //             )

    //         }
    //     } catch (error) {
    //         console.log("Appwrite Service :: Create Like :: Error ", error);
    //     }
    // }

    // async deleteLike(likeId) {
    //     try {
    //         await this.databases.deleteDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             likeId
    //         )

    //         const postId = likeId.split("_")[1];
    //         const post = await this.getPost(postId)
    //         const currentLikes = post.likes || 0;

    //         const newLikes = Math.max(currentLikes - 1, 0)

    //         //Update likes count in the blog post document
    //         await this.databases.updateDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             postId,
    //             { likes: newLikes }
    //         )

    //     } catch (error) {
    //         console.log("Appwrite Service :: delete Like :: Error ", error);
    //     }
    // }

    // async displayLike(postId){
    //     console.log(postId);

    //     try {
    //         const query = [
    //             Query.equal("postId", postId)
    //         ];

    //         const result = await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             query
    //         )

    //         return result.documents.map((user) => user.userId)

    //     } catch (error) {
    //         console.log('Error showing usernames');
    //     }
    // }

    // async getLikesByUserAndPost(userId, postId){
    //     try {
    //         const query = [
    //             Query.equal("userId", userId),
    //             Query.equal("postId", postId)
    //         ];
    //         const result = await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             query
    //         );
      
    //         // Check if any likes were found
    //         if (result.documents.length > 0) {
    //             return true; // Return true if likes exist for the given user and post
    //         } else {
    //             return false; // Return false if no likes were found
    //         }
    //     } catch (error) {
    //         console.log("Appwrite Service :: Get Likes By User And Post :: Error :: ", error);
    //         throw error; 
    //     }
    // }


    // File upload Service|Method
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service 
