import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { LoadingController } from 'ionic-angular';
import { Config } from './../../config';

@Injectable()
export class AuthProvider {
  apiUrl = Config.baseUrl;
  constructor(
      public http: HttpClient , public loadingCtrl: LoadingController
    ) {
    
    console.log(Config.baseUrl)
      }
    

    login(data:object):Observable<any>{
      console.log(data);
       return this.http.post(this.apiUrl +'users/token.json',data).map((res:Response)=>{
         return res;
       });
     }

     signup(data:object):Observable<any>{
      console.log(data);
       return this.http.post(this.apiUrl +'users/register.json',data).map((res:Response)=>{
         return res;
       });
     }

forgotPassword(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'users/forgotpassword.json',data).map((res:Response)=>{
     return res;
   });
 }



 changePassword(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'users/changepassword.json',data).map((res:Response)=>{
     return res;
   });
 }
    
 
 editProfile(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'users/edituserprofile.json',data).map((res:Response)=>{
     return res;
   });
 }

 verifyOtp(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'users/verifyotp.json',data).map((res:Response)=>{
     return res;
   });
 }







 categoryListing ()
 {
   return this.http.get(this.apiUrl +'products/categorylisting.json').map((res: Response) => {
     return res;
   });
 }
 
listProduct(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/listproduct.json',data).map((res:Response)=>{
     return res;
   });
 }

 wishlistall(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/wishlist.json',data).map((res:Response)=>{
     return res;
   });
 }
 


 productDetails(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/productdetails.json',data).map((res:Response)=>{
     return res;
   });
 }

 addToCart(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/addcart.json',data).map((res:Response)=>{
     return res;
   });
 }

 cartList(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/cart.json',data).map((res:Response)=>{
     return res;
   });
 }

 checkout(data:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  console.log(data);
   return this.http.post(this.apiUrl +'products/proceedtocheckout.json',data, httpOptions).map((res:Response)=>{
     return res;
   });
 }


brandListing ()
 {
   return this.http.get(this.apiUrl +'products/brands.json').map((res: Response) => {
     return res;
   });
 }

 addProduct(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/addalcohol.json',data).map((res:Response)=>{
     return res;
   });
 }

 prductlisting(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/listalcohol.json',data).map((res:Response)=>{
     return res;
   });
 }
 deletePrductlisting(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/deletealcohol.json',data).map((res:Response)=>{
     return res;
   });
 }

 editPrductlisting(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/editalcohol.json',data).map((res:Response)=>{
     return res;
   });
 }
 
 addwishlist(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/addwish.json',data).map((res:Response)=>{
     return res;
   });
 }


 orderlist(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/orderlist.json',data).map((res:Response)=>{
     return res;
   });
 }

sellerorderlist(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/orderlistseller.json',data).map((res:Response)=>{
     return res;
   });
 }

 orderDetails(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/orderdetails.json',data).map((res:Response)=>{
     return res;
   });
 }
 
 
 sellerorderStatus(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/orderstatus.json',data).map((res:Response)=>{
     return res;
   });
 }


 sellerorderDetails(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/orderdetailsseller.json',data).map((res:Response)=>{
     return res;
   });
 }


 updateCart(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/updatecart.json',data).map((res:Response)=>{
     return res;
   });
 }

 removeCart(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/removefromcart.json',data).map((res:Response)=>{
     return res;
   });
 }


 cancelOrder(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/orderstatus.json',data).map((res:Response)=>{
     return res;
   });
 }


 search(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/searchalcohol.json',data).map((res:Response)=>{
     return res;
   });
 }


 addressList(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/addresslist.json',data).map((res:Response)=>{
     return res;
   });
 }
 

 productRating(data:object):Observable<any>{
  console.log(data);
   return this.http.post(this.apiUrl +'products/addratingreview.json',data).map((res:Response)=>{
     return res;
   });
 }
 
}
