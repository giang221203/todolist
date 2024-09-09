import { Component } from '@angular/core';
import { IStatus } from '../../interface/status.interface';
import { StatusService } from '../../service/status.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css',
  providers: [MessageService],
})
export class StatusComponent {
  statusList: IStatus[] = [];
  nameStatus: string = '';
  page: number = 1;
  limit!: number;
  status: IStatus = {
    id: 0,
    name: '',
    description: '',
  };
  constructor(
    private statusService: StatusService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllStatus();
  }

  // chuyển đổi số bản ghi trong một trang
  onLimitChange(event: any) {
    console.log(event);
    this.limit = event.rows;
    this.getAllStatus();
  }
  getAllStatus() {
    console.log(this.limit);

    this.statusService
      .getAllStatus(this.nameStatus, this.page, this.limit)
      .subscribe((data) => {
        this.statusList = data.content;
      });
  }

  // modal
  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }

  clearForm() {
    this.status.id = 0;
    this.status.name = '';
    this.status.description = '';
  }

  // Add
  createStatus() {
    if (this.status.name == '' || this.status.description == '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Vui lòng nhập đầy đủ thông tin',
      });
    } else {
      this.statusService.createStatus(this.status).subscribe((data) => {
        this.getAllStatus();
        this.messageService.add({
          severity: data.status ? 'success' : 'error',
          summary: data.status ? 'Success' : 'Error',
          detail: data.message,
        });
        this.visible = false;
        this.clearForm();
      });
    }
  }

  // modal
  visibleUpdate: boolean = false;
  getStatusById(status: IStatus) {
    this.status.id = status.id;
    this.status.name = status.name;
    this.status.description = status.description;
    this.visibleUpdate = true;
  }
  updateStatus() {
    if (this.status.name == '' || this.status.description == '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Vui lòng nhập đầy đủ thông tin',
      });
    } else {
      this.statusService.updateStatus(this.status).subscribe((data) => {
        this.messageService.add({
          severity: data.status ? 'success' : 'error',
          summary: data.status ? 'Success' : 'Error',
          detail: data.message,
        });
        this.getAllStatus();
        this.visibleUpdate = false;
        this.clearForm();
      });
    }
  }
  // delete
  deleteStatus(id: number) {
    this.statusService.deleteStatus(id).subscribe((data) => {
      this.messageService.add({
        severity: data.status ? 'success' : 'error',
        summary: data.status ? 'Success' : 'Error',
        detail: data.message,
      });
      this.getAllStatus();
      this.clearForm();
    });
  }
}
