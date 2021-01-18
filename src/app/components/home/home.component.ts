import { Kayit } from './../../models/kayit';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Urun } from 'src/app/models/Urun';
import { Sonuc } from './../../models/sonuc2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  urunler;
  secUrun: Urun = new Urun();
  sonuc2: Sonuc = new Sonuc();
  ekleduzenle = false;
  detay = false;
  silme = false;
  adsoyad: string;
  uid: string;
  kayitlar: Kayit[];
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.KayitListele();
    this.UrunListele();
  }
  Kaydet() {
    if (this.secUrun.key == null) {
      this.secUrun.islem1 = false;
      this.fbServis.UrunEkle(this.secUrun).then(d => {
        this.sonuc2.islem1 = true;
        this.sonuc2.mesaj1 = 'Urun Eklendi';
      });
    } else {
      this.fbServis.UrunDuzenle(this.secUrun).then(d => {
        this.sonuc2.islem1 = true;
        this.sonuc2.mesaj1 = 'Urun Güncellendi';
      });

    }
  }
  UrunSec(k: Urun) {
    Object.assign(this.secUrun, k);
  }


  UrunListele() {
    this.fbServis.UrunListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key2: c.payload.key, ...c.payload.val() })

        )
      )
    ).subscribe(data => {
      this.urunler = data;
    });
  }
  TamamlaIptal(k: Urun, islem: boolean) {

    k.islem1 = islem;
    this.fbServis.UrunDuzenle(k).then(d => {
      this.sonuc2.islem1 = true;
      this.sonuc2.mesaj1 = 'Urun Güncellendi';
    });

  }


  Sil() {

    this.fbServis.UrunSil(this.secUrun.key).then(d => {
      this.sonuc2.islem1 = true;
      this.sonuc2.mesaj1 = 'Urun Silindi';
      this.silme = false;
    });
  }

  OturumKapat() {
    this.fbServis.OturumKapat().then(d => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });

  }
  KayitListele() {
    this.fbServis.KayitListeleByUID(this.uid).snapshotChanges().subscribe(data => {
      this.kayitlar = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.kayitlar.push(y as Kayit);
      });
    });
  }
}

