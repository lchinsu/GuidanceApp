import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Services/Token/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private tokenstorage : TokenStorageService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  title = 'Guidance';

  Logout():void{
    this.tokenstorage.signOut();
    this.router.navigate([`/Login/`]);
  }

}
