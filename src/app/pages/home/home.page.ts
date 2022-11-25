import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiResult, LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  logins : ApiResult

  constructor(private loginService: LoginService, private loadingCtrl: LoadingController) { }

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

      event?.target.complete()
    })
  }


}
