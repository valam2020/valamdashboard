import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-dispatcher',
  templateUrl: './add-dispatcher.component.html',
  styleUrls: ['./add-dispatcher.component.scss']
})
export class AddDispatcherComponent implements OnInit{

  title:string="Add Dispatcher";
  public addDispatcherForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddDispatcherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder){
      this.addDispatcherForm =this.fb.group({
        firstName:["",[Validators.required]],
        lastName:["",[Validators.required]],
        email:["",[Validators.required]],
        password:["",[Validators.required]],
        confirmPassword:["",[Validators.required]],
        phNum:["",[Validators.required]],
        pincode:["",[Validators.required]]
      })
  }

  ngOnInit(): void {
    
  }
  closeModal()
  {
    this.dialogRef.close();
  }
}
