import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [ProductService]
})
export class CheckoutComponent implements OnInit {
  EMAIL_REGEX =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  checkoutForm = new FormGroup({
    name : new FormControl(null, [Validators.required, Validators.minLength(6)]),
    email: new FormControl('av@xyz.com', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]),
    pincode : new FormControl(null, [Validators.required, this.pincodeValidator()])
  });
  
  pincodeValidator() {
    return (control:FormControl) => {
      if(!control.value || control.value == 123456){
        return null;
      }
     return {
       pinCode: {
        allowedCode: 123456,
        enteredCode: control.value
       }
     }
    }
  }
  onLoading() {
    const data: any = {
      name : 'suraj',
      email: 'qwerty@gmail.com',
      // pincode: '123456'
    }
    this.checkoutForm.setValue(data);
  }

  patching() {
    const data: any = {
      name: 'Vinesh',
      email: 'vinnu@gmail.com'
    }
    this.checkoutForm.patchValue(data);
  }

  submitedForm() {
    if(this.checkoutForm.valid) {
      console.log("Form Validation Successfull", this.checkoutForm.value);
      this.provideService.doCheckout(this.checkoutForm.value).subscribe(
        (data) => {
          console.log('SUCCESS',data);
        },
        (error) => {
          console.log('ERROR', error);
        }
      )
    }
    else{
      console.log("Form Validation failed");
    }
  }
  constructor(private provideService: ProductService) { }

  ngOnInit(): void {
  }

}
