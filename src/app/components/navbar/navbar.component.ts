import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  OturumKapat() {
    this.fbServis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });

  }
}
