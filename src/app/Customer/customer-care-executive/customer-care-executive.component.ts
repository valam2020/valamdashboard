import { Component, OnInit, ViewChild } from '@angular/core';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUrls } from 'src/app/Helpers/Constant';

@Component({
  selector: 'app-customer-care-executive',
  templateUrl: './customer-care-executive.component.html',
  styleUrls: ['./customer-care-executive.component.scss']
})
export class CustomerCareExecutiveComponent implements OnInit{
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  declineRideDetails:any[]=[];
  title:string = "Decline Rides By User";
  displayedColumns = ['date','username', 'useremail','userphn','fromAddress','toAddress',"usercomment",'driver',"car","addcomment"];
  public executiveFormGroup: FormGroup;
  selectedAddComment: any={ };
  selectedCommentList: any[]=[];
  constructor(private dispatcherService:DispatcherService,public dialog: MatDialog,public fb:FormBuilder){
    this.executiveFormGroup = this.fb.group({
      comment:['',[Validators.required]],
      rideId:[''],
    })
  }

  ngOnInit(): void {
    this.getAllDeclineRides();
  }

  getAllDeclineRides(){
    this.dispatcherService.getAllDeclineRides().subscribe((data:any)=>{
      console.log(data);
      this.declineRideDetails = data;
      this.dataSource =new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDriverDailog(templateRef:any,driverId:any)
  {
   
    let deleteDialogRef = this.dialog.open(templateRef, {
      width: '600px',
      disableClose: true
    });

    deleteDialogRef.afterClosed().subscribe(result => {
    });
  }

  openCommentDailog(templateRef:any,ride_id:any,userId:any,message:any)
  {
    this.selectedCommentList=[];
   this.selectedAddComment = {
    rideId:ride_id,
    customerId:userId,
    usercomments:message
   }
   this.executiveFormGroup.patchValue({
    rideId:ride_id
   });

   this.getComments(ride_id);
    let deleteDialogRef = this.dialog.open(templateRef, {
      width: '600px',
      disableClose: true,
      autoFocus: false,
      maxHeight: '90vh'
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      this.selectedAddComment = {};
  });
  }

  getComments(ride_id:any){
    this.dispatcherService.get(ApiUrls.cust_comment.get_ride+ride_id).subscribe((data:any)=>{
      
      if(data){
        this.selectedCommentList = data;
      }
      else{
        this.selectedCommentList = [];
      }
      console.log(this.selectedCommentList);
    })
  }


  addComment(){
    this.selectedAddComment.empId = "VSA1";
    this.selectedAddComment.reason = this.executiveFormGroup.value.comment;
    this.dispatcherService.post(ApiUrls.cust_comment.add,this.selectedAddComment).subscribe((data:any)=>{
      if(data){
        alert("success")
        this.dialog.closeAll();
      }
    })
  }

  submitComment(){
  let obj =  {
      "is_reviewbyadmin": true,
      "rideId": this.executiveFormGroup.value.rideId
    }
    this.dispatcherService.post(ApiUrls.ride.updateComments,obj).subscribe((data:any)=>{
      if(data.httpStatus == 200 && data.message == "Ride Comments Updated Successfully"){
        this.dialog.closeAll();
        alert("success");
      }
    })
  }

  
}
