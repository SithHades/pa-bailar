import { Injectable } from "@angular/core"
import { Client, Account, Databases } from 'appwrite';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AppwriteService {
    private client: Client;
    public account: Account;
    public database: Databases;

    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(environment.appwrite.endpoint)
            .setProject(environment.appwrite.projectId);
        this.account = new Account(this.client);
        this.database = new Databases(this.client);
    }

    getClient() {
        return this.client;
    }

    getAccount() {
        return this.account;
    }

    getDatabase() {
        return this.database;
    }
}