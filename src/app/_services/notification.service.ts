import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

constructor() { }
  public toast(icon: any, message: any):void {
  Toast.fire({
    icon: icon,
    title: message,
  })
  }
}
