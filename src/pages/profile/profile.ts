import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,LoadingController,Platform,ToastController } from 'ionic-angular';
import {Events} from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import {Storage} from '@ionic/storage'
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userName:any;
  userEmail:any;
  userPhone:any;
  userAddress:any;
  lastImage:any;
  uploadsuccess:any;
  // loginuser:any;
  userId:any;
  loginUser:any;
  userImg:any;
  sellerimage:any;
  bfrLogin:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public events:Events,
  private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private filePath: FilePath,
    private file: File,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public toastCtrl:ToastController,
    private transfer: FileTransfer,
    public storage: Storage) {


      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot ('VieworderPage');
      });
    

    console.log(JSON.parse(localStorage.getItem('userDetails')));
    this.loginUser=JSON.parse(localStorage.getItem('userDetails'));
    this.userName=this.loginUser.first_name + this.loginUser.last_name
    this.userEmail=this.loginUser.email
    this.userPhone=this.loginUser.phone

    this.userId=this.loginUser.id
    this.bfrLogin=this.loginUser.pimg
    console.log(this.bfrLogin)

     if (localStorage.getItem('sellerimage'))
    {
    this.userImg=JSON.parse(localStorage.getItem('sellerimage'));
    console.log(this.userImg)
    }


    else if (this.bfrLogin==null)
    {
      this.userImg='assets/imgs/noimage.png';
    
    console.log('pimg',this.bfrLogin)
    }

    else if (this.bfrLogin)
    {
      this.userImg=this.loginUser.image_url+this.loginUser.pimg
      console.log(this.userImg)
      
    }
    // console.log(this.userImg)
   
    


    // if (loginUser.country!=null)
    // {
    //   this.userAddress=loginUser.country+ ","+loginUser.city+","+loginUser.address
    // }
    // else{
    //   this.userAddress==""
    // }
    
    console.log (this.userName)
    console.log (this.userEmail)
    console.log (this.userPhone)
    console.log (this.userAddress)

  }

  editSellerProfile ()
  {
   
    this.navCtrl.push ('EditProfilePage');
  }
  goTochnagepassword()
  {
    this.navCtrl.push ('ChangePasswordPage');  
  }

  ionViewDidLoad() {
    this.events.publish('hideFooter', { isHidden: true});
    console.log('ionViewDidLoad ProfilePage');
  }

  editSellerimage()
  {
    console.log('image')
    console.log('edit profile picture')
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
      this.uploadImage(this.lastImage); 
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
    // this.uploadImage();
    console.log("IMAGGGEGGEGGEGE",img);
    
    if (img === undefined) {
      return this.userImg;
    } 
    else {
      return cordova.file.dataDirectory + img;
    }
    
  }

  public uploadImage(lastimage) {
    console.log('uploadImage')
    // if(JSON.parse(localStorage.getItem('userDetails')))
    // {
    //   this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
    //   this.userId=this.loginuser.id
    //        console.log ( this.userId)
    // }
    // Destination URL
    var url = "http://111.93.169.90/team6/alcohol/api/users/userimageinsert.json";
   
    // File for Upload
    var targetPath = this.pathForImage(lastimage);
   
    // File name only
    var filename = this.lastImage;
   
    var options = {
      fileKey: "photo",
      photo: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {
      'photo':filename,
      'user_id':this.userId
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
      console.log('UPLOADDDD',JSON.parse(data.response));
      this.uploadsuccess=JSON.parse(data.response);
      if(this.uploadsuccess.ack==1){
        loading.dismiss();
        this.presentToast('Image succesful uploaded.');
        this.sellerimage=this.uploadsuccess.image_url+this.uploadsuccess.image_name



        this.storage.ready().then(() => {
        localStorage.setItem ('sellerimage',JSON.stringify(this.sellerimage))
        });
       
      }else{

        loading.dismiss();
        this.presentToast('Time out. Try again.');

      }

    }, err => {
      console.log("Error",err);
      loading.dismiss();
      this.presentToast('Error while uploading file.');
    });
  }

}
