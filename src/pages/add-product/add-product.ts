import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,Platform,ToastController,LoadingController} from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import {AuthProvider} from '../../providers/auth-service/authservice';

import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms'

 import { Camera, CameraOptions } from '@ionic-native/camera';
 import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
 import { FilePath } from '@ionic-native/file-path';
 import { File } from '@ionic-native/file';
// import { identifierModuleUrl } from '@angular/compiler';
/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  public images:any;
  categoryArray:any;
  brandArray:any;
  lastImage:any;
  formGroup:FormGroup;
  user_details:any;
  user_id:any
  productId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public imagePicker:ImagePicker,
    public authProvider:AuthProvider,
     private transfer: FileTransfer,
     private actionSheetCtrl: ActionSheetController,
     private camera: Camera,
     public platform: Platform,
     private filePath: FilePath,
     private file: File, 
     public toastCtrl:ToastController,
     public loadingCtrl: LoadingController,
     
  ) {

    this.user_details =  JSON.parse(localStorage.getItem('userDetails'));
    console.log(this.user_details)
    this.user_id = this.user_details.id;

    this.formGroup = new FormGroup ({
      
      cat_id: new FormControl ('', Validators.required),
      brand_id: new FormControl ('', Validators.required),
      product_name: new FormControl ('', Validators.required),
      description: new FormControl ('', Validators.required),
      price: new FormControl ('', Validators.required),
      discount: new FormControl ('', Validators.required),
      quantity: new FormControl ('', Validators.required),
      available: new FormControl ('', Validators.required),

    });


    this.authProvider.categoryListing().subscribe((res:any) => {
     

      if (res.Ack==1)
      {
        console.log('my data: ');
        this.categoryArray=res.categories;
      
      }
  });


  this.authProvider.brandListing().subscribe((res:any) => {
     

      if (res.ack==1)
      {
        console.log('my data: ');
        this.brandArray=res.brands;
      console.log (this.brandArray)
      }
  });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }


 /* getPictures(){ 
   
    this.imagePicker.getPictures({
    }).then( results =>{
      console.log ("hello");
      console.log(results);
   
        this.images=results;
        console.log (this.images);
     
    });

  //   var filename = this.lastImage;
   
  //   var options = {
  //     fileKey: "file",
  //     file: filename,
  //     chunkedMode: false,
  //     mimeType: "multipart/form-data",
  //     params : {
  //     'file':filename,
  //     'gear_id':localStorage.getItem('gear_id')
  //      }
  //    // params : {'fileName': filename}
  //   };
  //   console.log("OPTIONS",options);
  //   const fileTransfer:FileTransferObject = this.transfer.create();
  //  console.log(targetPath);
   
  //  this.loading.dismissAll()
  //   // Use the FileTransfer to upload the image
  //   fileTransfer.upload(targetPath, url, options).then((data:any) => {
  //     console.log(data);
  //     let det = JSON.parse(data.response)
  //     console.log('UPLOADDDD',det.data);
    
  }*/

  addProduct(data)
  {
    data.seller_id=this.user_id;
    //data.file=this.images;
    //console.log (data);


    this.authProvider.addProduct(data).subscribe(res => {
     
      console.log(res);
      console.log('hello');
      let details = res
      this.uploadImage(details.id);
      if(details.ack == 1){
        this.productId=details.id
        console.log(this.productId)
        this.navCtrl.push('ListProductPage');
      }

    });
      
  }




  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
            this.uploadFromCamera(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'From gallery',
          icon: 'images',
          handler: () => {
            this.uploadFromCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }
      ]
    });
    actionSheet.present();
  }



  uploadFromCamera(sourceType){

    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });

  }

  private createFileName(currentName) {
    var d = new Date(),
    n = d.getTime(),
   // newFileName=n+".jpg";
    newFileName=currentName;
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
   console.log("CURRENTFILENAME",currentName);
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      console.log("NEWFILENAMEEEEEE",this.lastImage);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public pathForImage(img) {
    console.log("IMAGGGEGGEGGEGE",img);
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage(id) {
    // Destination URL
    var url = "http://111.93.169.90/team6/alcohol/api/products/productimageinsert.json";
   
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
   
    // File name only
    var filename = this.lastImage;
   
    var options = {
      fileKey: "photo",
      photo: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {
      'photo':filename,
      'product_id':id
       }
     // params : {'fileName': filename}
    };
    console.log("OPTIONS",options);
    const fileTransfer:FileTransferObject = this.transfer.create();
   
    let loading = this.loadingCtrl.create({
      content: 'Uploading Please Wait...'
    });
    loading.present();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      console.log('UPLOADDDD',data);
      loading.dismiss();
      this.presentToast('Image succesful uploaded.');
      //this.navCtrl.push('HomePage');
    }, err => {
      console.log("Error",err);
      loading.dismiss();
      this.presentToast('Error while uploading file.');
    });
  }







  

}
