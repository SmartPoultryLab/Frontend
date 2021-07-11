import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { MatCard } from "@angular/material/card";

const newLocal: string = `
    .title {
      font-weight:bold;
      font-size: 24px;
    }
    .about-card {
      display: grid;
      justify-content: center;
      text-align: center;
    }
    .subheader{
      font-size: 46px;
      color:darkcyan;
      padding-top: 50px;
      padding-bottom: 50px
    }
    .content {
      padding: 26px;
      font-size: 18px;
      text-align: center;
      line-height: 2em;
    }
    .logo-img{
    margin-left:100px;
    }
    .logo-img img{
      width:200px;
      margin-right:100px;
    }
    .announcement{
    padding: 26px;
      font-size: 18px;
      text-align: left;
      line-height: 2em;
    }
    .announcement img{
    width:250px;
    }
    .footer-test{
      display:flex;
      flex-direction:row;
      justify-content:space-around;
    }
  `;

@Component({
  selector: "about",
  styles: [
    newLocal
  ],
  template: `
    <div class="about-card">
      <div class="logo-img">
        <img src="/assets/img/logo.png">
        <img src="http://www.aast.edu/getData/retreiveOnePIC.php?unit=353&img=1_1_1_unnamed.png">
      </div>
      <p class="subheader">
        Smart Poultry Laboratory
      </p>
      <p class="content">
        This Project was developed as a graduation project for Arab Academy for science, technology and maritime transport<br>
        Smart Poultry Laboratory is an application that aims to help vets to manage farm's
        lifecycles and differentiate between diseases in the postmortem form due to the similar
        symptoms form the examination data.
      </p>
      <div class="footer-test">
        <div class="announcement">
          <b>Supervised by :</b><br>
          <i>Prof.Dr Emad El-Samahy<br>
            Prof.Dr Fahima Maghraby</i><br>
        </div>
        <div class="announcement">
          <b>Developed by :</b><br>
          Mohamed Ahmed Shawky<br>
          Ali Gamal ElKelany<br>
          Ahmed El Saify<br>
          Omar Ahmed El Baz<br>
          Lo'ay Ehab Mokhtar<br>
        </div>
      </div>

    </div>

  `
})
export class AboutComponent implements OnInit {
  public localState: any;
  pageTitle: string = "About";

  constructor(public route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.data.subscribe((data: any) => {
      /**
       * Your resolved data from route.
       */
      this.localState = data.yourData;
    });

  }

}
