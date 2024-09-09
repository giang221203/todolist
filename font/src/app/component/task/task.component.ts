import { Component } from '@angular/core';
import { ITask } from '../../interface/task.interface';
import { TaskService } from '../../service/task.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StatusService } from '../../service/status.service';
import { IStatus } from '../../interface/status.interface';
import { DatePipe } from '@angular/common';
import { DropdownFilterOptions } from 'primeng/dropdown';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  providers: [MessageService],
})
export class TaskComponent {
  taskList: ITask[] = [];
  statusList: IStatus[] = [];
  nameTask: string = '';
  priorityTask: string = '';
  idStatusOfTheTask!: number;
  page: number = 1;
  limit: number = 1;
  totalEL!: number;
  first: number = 0;
  taskDetail!: any;
  task: ITask = {
    id: 0,
    name: '',
    priority: '',
    idStatus: 0,
    description: '',
  };
  limitStatus!: number;
  onSelectStatus!: IStatus;
  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private statusService: StatusService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getAllTask(
      this.nameTask,
      this.priorityTask,
      this.idStatusOfTheTask,
      this.page,
      this.limit,
      this.formatCreateTime(this.createTime),
      this.formatCreateTime(this.updateTime)
    );
    this.getAllStatus();
  }
  updateGetAll() {
    this.getAllTask(
      this.nameTask,
      this.priorityTask,
      this.idStatusOfTheTask,
      this.page,
      this.limit,
      this.formatCreateTime(this.createTime),
      this.formatCreateTime(this.updateTime)
    );
  }
  // chuyển đổi số bản ghi trong một trang
  onLimitChange(event: any) {
    // console.log(event);
    this.limit = event.rows;
    this.first = event.first;
    console.log(this.first);
    this.page = this.first / this.limit + 1;
    this.getAllTask(
      this.nameTask,
      this.priorityTask,
      this.idStatusOfTheTask,
      this.page,
      this.limit,
      this.formatCreateTime(this.createTime),
      this.formatCreateTime(this.updateTime)
    );
  }
  getAllStatus() {
    this.statusService
      .getAllStatus('', 1, this.limitStatus)
      .subscribe((data) => {
        this.statusList = data.content;
      });
  }
  getAllTask(
    name: string,
    priority: string,
    idStatus: number,
    page: number,
    limit: number,
    createTime: string | null,
    updateTime: string | null
  ) {
    this.taskService
      .getAllTask(name, priority, idStatus, page, limit, createTime, updateTime)
      .subscribe((data) => {
        console.log(data);

        this.taskList = data.content;
        this.totalEL = data.totalElement;
      });
  }

  // modal
  visible: boolean = false;
  subtaskModal: boolean = false;
  showDialog() {
    this.visible = true;
  }

  clearForm() {
    this.task.id = 0;
    this.task.name = '';
    this.task.priority = '';
    this.task.idStatus = null;
    this.task.description = '';
  }

  searchStatus() {
    this.getAllTask(
      this.nameTask,
      this.priorityTask,
      this.idStatusOfTheTask,
      this.page,
      this.limit,
      this.formatCreateTime(this.createTime),
      this.formatCreateTime(this.updateTime)
    );
  }

  createTime!: string | null;
  updateTime!: string | null;
  searchCreateTime() {
    this.getAllTask(
      this.nameTask,
      this.priorityTask,
      this.idStatusOfTheTask,
      this.page,
      this.limit,
      this.formatCreateTime(this.createTime),
      this.formatCreateTime(this.updateTime)
    );
  }
  searchUpdateTime() {
    this.getAllTask(
      this.nameTask,
      this.priorityTask,
      this.idStatusOfTheTask,
      this.page,
      this.limit,
      this.formatCreateTime(this.createTime),
      this.formatCreateTime(this.updateTime)
    );
  }
  // Add

  createTask() {
    if (
      this.task.name == '' ||
      this.task.priority == '' ||
      this.task.idStatus == null ||
      this.task.description == ''
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Vui lòng nhập đầy đủ thông tin',
      });
    } else {
      this.taskService.createTask(this.task).subscribe((data) => {
        this.getAllTask(
          this.nameTask,
          this.priorityTask,
          this.idStatusOfTheTask,
          this.page,
          this.limit,
          this.formatCreateTime(this.createTime),
          this.formatCreateTime(this.updateTime)
        );
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
  statusChecked!: number | null;
  getTaskById(listTask: any) {
    this.task.id = listTask.id;
    this.task.name = listTask.name;
    this.task.description = listTask.description;
    this.task.priority = listTask.priority;
    this.task.idStatus = listTask.status.id;
    this.statusChecked = listTask.status.id;
    this.visibleUpdate = true;
    console.log('dsfd', this.task.idStatus);
    console.log('dsfd', this.statusChecked);
  }

  updateTask() {
    if (
      this.task.name == '' ||
      this.task.priority == '' ||
      this.task.idStatus == null ||
      this.task.description == ''
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Vui lòng nhập đầy đủ thông tin',
      });
    } else {
      this.taskService.updateTask(this.task).subscribe((data) => {
        this.messageService.add({
          severity: data.status ? 'success' : 'error',
          summary: data.status ? 'Success' : 'Error',
          detail: data.message,
        });
        this.getAllTask(
          this.nameTask,
          this.priorityTask,
          this.idStatusOfTheTask,
          this.page,
          this.limit,
          this.formatCreateTime(this.createTime),
          this.formatCreateTime(this.updateTime)
        );
        this.visibleUpdate = false;
        this.clearForm();
      });
    }
  }
  // delete
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe((data) => {
      this.messageService.add({
        severity: data.status ? 'success' : 'error',
        summary: data.status ? 'Success' : 'Error',
        detail: data.message,
      });
      this.getAllTask(
        this.nameTask,
        this.priorityTask,
        this.idStatusOfTheTask,
        this.page,
        this.limit,
        this.formatCreateTime(this.createTime),
        this.formatCreateTime(this.updateTime)
      );
      this.clearForm();
    });
  }

  formatDateTime(dateTime: string): string | null {
    return this.datePipe.transform(dateTime, 'dd/MM/yyyy HH:mm');
  }

  formatCreateTime(dateTime: string | null): string | null {
    return this.datePipe.transform(dateTime, 'yyyy-MM-dd');
  }
  showSubTask(listTask: ITask) {
    this.subtaskModal = true;
    this.taskDetail = listTask;
  }
  confirm() {
    console.log('nè');
    console.log('dsfd', this.statusChecked);
    console.log(this.task.idStatus);

    this.confirmationService.confirm({
      header: 'Cảnh báo',
      message: `  ${
        this.statusChecked == 2
          ? 'Tất cả các subtask sẽ chuyển thành done nếu task done'
          : 'Tất cả các subtask sẽ chuyển thành open nếu task chuyển trạng thái'
      }`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.task.idStatus = this.statusChecked;
      },
      reject: () => {
        this.statusChecked = this.task.idStatus;
      },
    });
  }
}
