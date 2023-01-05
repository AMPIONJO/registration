import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiResult, LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  logins : any
  public toggled: boolean = false;
  searchTerm: String = '';
  public items: any;

  constructor(private loginService: LoginService, private loadingCtrl: LoadingController) {
    this.toggled = false;
   }

   public toggle(): void {
    this.toggled = !this.toggled;
 }

 initializeItems() {
  this.items = this.logins;
}

  ngOnInit() {
    this.loadLoginDetails()
  }

  async loadLoginDetails(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles'
    })
    await loading.present()

    this.loginService.getLoginDetails().subscribe(res => {
      loading.dismiss()
      console.log(res)
      this.logins = res
      console.log(res)
      this.initializeItems()

      event?.target.complete()
    })
  }

  searchThis( ev: any ) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.userName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }  
  }
  
}
