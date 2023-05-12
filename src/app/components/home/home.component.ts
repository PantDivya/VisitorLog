import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor (
    private _cookieService:CookieService,
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  Logout(){
    this._cookieService.delete('access_token');
    this._router.navigateByUrl("login");
  }
}
