import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { User } from '../models/user';

export class UserDataSource implements DataSource<User>{

    constructor() { }
  
    // custom Observable-based Angular CDK Data Source
}