const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionIdUser: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_USER
  ),
  appwriteCollectionIdTransaction: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_TRANSACTION
  ),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
