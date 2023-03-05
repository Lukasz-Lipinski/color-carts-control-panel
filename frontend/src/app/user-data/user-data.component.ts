import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../components/auth/auth.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class UserDataComponent implements OnInit {
  userData!: Observable<UserData>;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userData = this.activatedRoute.data.pipe(
      map(({ userData }) => {
        return userData;
      })
    );
  }
}
