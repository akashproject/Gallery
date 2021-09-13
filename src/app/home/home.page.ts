import { Component } from '@angular/core';
import { CameraPermissionType, Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SigninService } from 'src/app/services/signin.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  uploadStatus = false;
  images : any = [];
  constructor(private actionSheetController: ActionSheetController,private signinService: SigninService,) {}

  async openLink() {
    const actionSheet = await this.actionSheetController.create({
      header: "Choose from",
      buttons: [
        {
          text: "Camera",
          icon: "camera",
          handler: () => {
            console.log("camera clicked");
            this.upload("camera");
          },
        },
        {
          text: "Gallery",
          icon: "images",
          handler: () => {
            console.log("gallery clicked");
            this.upload("gallery");
          },
        },
        {
          text:"Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });

    await actionSheet.present();
  }

  upload(type) {

    try {
      const options: ImageOptions = {
        quality: 100,
        height: 400,
        width: 400,
        resultType: CameraResultType.DataUrl,
        // encodingType: this.camera.EncodingType.JPEG,
        // mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        source:
          type === "camera"
            ? CameraSource.Camera
            : CameraSource.Photos,
      };
      Camera.getPhoto(options).then((dataUrl) => {

        console.log("uploading");
        const alpha = {
          mobile: localStorage.getItem("mobile"),
          img: dataUrl,
          type: "jpg",
        };
        this.uploadStatus = true;
        this.add_photo(dataUrl.dataUrl);
        

      });
    } catch (error) {
      console.log();
     
    }
  }

  add_photo(dataUrl) {
    if (dataUrl) {
      this.images.push(dataUrl);
      this.signinService.uploadPhofilephoto(dataUrl).subscribe((data: any) => {
        this.images.push(data);
        //this.spinner.hide();
        if (data && data.status === 200 && data.data) {
          //this.logo = data.data;
        }
      }, (err: any) => {
        console.log(err);
      });
    } else {
      console.log('no');
    }
  }

  removeElement(params) {
    this.images.splice(params, 1);
  }
  
}
