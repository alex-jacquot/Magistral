import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { UserService } from '../providers/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    listeUsers : AngularFireList<any>;

    constructor(private db: AngularFireDatabase) { }

    ngOnInit() {
        this.listeUsers = this.db.list('/Users');
    }
}
