import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
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

  async createTransaction({
    transactionId,
    userId,
    amount,
    date,
    description,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdTransaction,
        transactionId,
        {
          amount,
          date,
          description,
          users: userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updateTransaction(
    transactionId,
    { userId, amount, date, description }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdTransaction,
        transactionId,
        {
          userId,
          amount,

          description,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async deleteTransaction(transactionId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdTransaction,
        transactionId
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getTransaction(transactionId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdTransaction,
        transactionId
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async addUser({ userId, username }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdUser,
        userId,
        {
          username,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: addUser :: error", error);
      return false;
    }
  }

  async updateBalance({ userId, balance }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdUser,
        userId,
        {
          balance,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateBalance :: error", error);
      return false;
    }
  }

  async getUserData(userId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdUser,
        userId
      );
    } catch (error) {}
  }
}

const service = new Service();

export default service;
