import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Path } from 'src/app/enum/path';
import { IProduct } from 'src/app/model/product';
import { IUser } from 'src/app/model/user';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal/modal.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentUser: IUser;
  products: IProduct[] = [];
  addItemForm: FormGroup;
  modal: boolean;
  editModal: boolean;
  maxId = 0;
  currentId: BehaviorSubject<number> = new BehaviorSubject(null);
  constructor(private userService: UserService, private apiService: ApiService, private http: HttpClient,private modalService: ModalService) {
    this.initializeForm();
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.getProductsAccToUser();
      this.modalService.getModal().subscribe((res)=> {
        this.modal = res;
      })
    });
  }

  getProductsAccToUser() {
    if(this.currentUser != null) {
      this.apiService.get(Path.GET_ALL_PRODUCTS_FOR_A_USER).subscribe((products: IProduct[]) => {
        this.products = products.filter((product) => {
          return product.userId === this.currentUser.id;
        });
        console.log(this.products);
      })
    }
  }

  initializeForm() {
    this.addItemForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(100000)]),
      price: new FormControl('', [Validators.required, Validators.maxLength(100000)])
    });
  }

  displaymodal(flag: boolean) {
    this.modalService.setModal(flag);
  }

  onSubmit() {
    var newProduct = this.addItemForm.value;
    if(this.products.length >0)
    {
      this.maxId = this.products[0].id ? this.products[0].id : 0;
      if (this.addItemForm.valid) {
        this.products.forEach(product => {
          if (product.id > this.maxId) this.maxId = product.id;
        });
    }}
    
      newProduct.id = this.maxId + 1;
      newProduct.userId = this.currentUser.id;
      this.apiService.post(Path.GET_ALL_PRODUCTS_FOR_A_USER, newProduct).subscribe(() => { }, (err) => {
        console.log(err);
      });
    this.modalService.setModal(false);
    this.modalService.getModal().subscribe((res)=>{
      this.modal = res;
    })
  }

  edit(flag: boolean,id: number) {
    this.editModal = flag;
    this.currentId.next(id);
  }

  saveEdit() {
    this.currentId.subscribe((res)=> {
      var currentId = res;
      var product : IProduct = {id: currentId, name: this.addItemForm.value.name, description: this.addItemForm.value.description, price: this.addItemForm.value.price, userId: this.currentUser.id}
      this.apiService.put(Path.GET_ALL_PRODUCTS_FOR_A_USER + "/" + currentId,product).subscribe(() => { }, (err) => {
        console.log(err);
      });
      this.getProductsAccToUser();
      this.editModal = false;
    })
   
  }

  delete(product: IProduct) {
    this.apiService.delete(Path.GET_ALL_PRODUCTS_FOR_A_USER + "/" + product.id).subscribe(() => { }, (err) => {
      console.log(err);
    });
    this.getProductsAccToUser();
  }
}
