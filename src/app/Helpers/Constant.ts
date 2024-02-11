export const ApiUrls:any={
    dispatcher:{
        getAll:"dispatcher/all",
        delete:"dispatcher/delete",
        add:"dispatcher/signup",
        update:"dispatcher/update"
    },
    roles:{
        all:"roles/all",
        create:"roles/create",
        update:"roles/update",
        delete:"roles/delete"
    },
    customer_login:{
        all:"customer_login/all",
        signup:"customer_login/signup",
        delete:"customer_login/delete",
        update:"customer_login/update",
        login:"customer_login/login"
    },
    timesheet:{
        all:"timehsheet/all"
    },
    ride:{
        declineRides:"ride/declined_rides",
        updateComments:"ride/updateride_comments",
        dispatcherScheduler:"ride/dispatcher/",
    },
    scheduler:{
        dispatcherSchedulerFecth:"dispSch/fetch"
    },
    cust_comment:{
        add:"cust_comment/add",
        get_ride:"cust_comment/ride/"
    },
    car:{
        getCar:"car/{id}",
        getCarsUnderDispatcher:"car/fetch?dispatcher_id=",
        carComfortList:'car/carsList',
        AddCar:'car/add' ,
        GetCarDetails:'car/Cars',
        UpdateCarDetails:'car/update',
        DeleteCarData:'car/delete',
    },
    driver:{
        id:"driver/auth/{id}",
        getAll:"driver/fetch?dispatcher_id=",
        UpdateDispatcherDriver:'driver/updatedispId',
    },
    dispatcherScheduler:{
       getSchedulers:"dispSch/fetchByDispatcher/"
    },
    defaultDispatcherValue:1
}

export const Mesages={
    password:"@123456"
}