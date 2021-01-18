import { Urun } from './../models/urun';
import { Uye } from './../models/uye';
import { Kayit } from './../models/kayit';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  private dbKayit = '/Kayitlar';
  private dbUye = '/Uyeler';
  private dbUrunler = '/Urunler';
  kayitRef: AngularFireList<Kayit> = null;
  uyeRef: AngularFireList<Uye> = null;
  urunlerRef: AngularFireList<Urun> = null;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.kayitRef = db.list(this.dbKayit);
    this.uyeRef = db.list(this.dbUye);
    this.urunlerRef = db.list(this.dbUrunler);

  }

  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  OturumKapat() {
    return this.afAuth.signOut();
  }
  OturumKontrol() {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }
  UyeOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }

  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }
  KayitListele() {
    return this.kayitRef;
  }
  UrunListele() {
    return this.urunlerRef;
  }
  KayitListeleByUID(uid: string) {
    return this.db.list('/Kayitlar', q => q.orderByChild('uid').equalTo(uid));
  }
  KayitByKey(key: string) {
    return this.db.object('/Kayitlar/' + key);
  }
  KayitEkle(kayit: Kayit) {
    return this.kayitRef.push(kayit);
  }
  UrunEkle(urun: Urun) {
    return this.urunlerRef.push(urun);
  }
  KayitDuzenle(kayit: Kayit) {
    return this.kayitRef.update(kayit.key, kayit);
  }
  UrunDuzenle(urun: Urun) {
    return this.urunlerRef.update(urun.key, urun);
  }
  KayitSil(key: string) {
    return this.kayitRef.remove(key);
  }
  UrunSil(key: string) {
    return this.urunlerRef.remove(key);
  }


}
