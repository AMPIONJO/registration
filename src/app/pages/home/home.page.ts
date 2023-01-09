import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiResult, LoginService } from 'src/app/services/login/login.service';
import {ViewChild} from '@angular/core';
import {IonSearchbar} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  logins : any
  public toggled: boolean = false;
  public dropped: boolean = false;
  searchTerm: String = '';
  public items: any;
  public filteredItems: [];
  @ViewChild('mySearchbar', {static: false}) searchbar: IonSearchbar;

  constructor(private loginService: LoginService, private loadingCtrl: LoadingController) {
    this.toggled = false;
   }

  public toggle(): void {
    this.searchTerm = ''
    this.initializeItems()
    this.toggled = !this.toggled;
 }

 public drop(): void {
  this.dropped = !this.dropped;
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
      console.log(this.items)
      this.filteredItems = this.items.filter((item) => {
        return (item.userName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(this.filteredItems.length)
      if(this.filteredItems.length==0){
       //add display in the case nothing has been found from the search
      }
      else{
        this.items=this.filteredItems
      }
    } 
  }
  
}
