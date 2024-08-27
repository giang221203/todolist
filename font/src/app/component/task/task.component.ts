import { Component } from '@angular/core';
import { ITask } from '../../interface/task.interface';
import { TaskService } from '../../service/task.service';
import { MessageService } from 'primeng/api';
import { StatusService } from '../../service/status.service';
import { IStatus } from '../../interface/status.interface';
import { DatePipe } from '@angular/common';

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
  taskDetail!: any;
  task: ITask = {
    id: 0,
    name: '',
    priority: '',
    idStatus: 0,
    description: '',
  };
  limitStatus!: number;
  selectedStatus!: IStatus;
  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    this.getAllTask(
      this.nameTask,
      this.priorityTask,
      this.idStatusOfTheTask,
      this.page,
      this.limit
    );
    this.getAllStatus();
  }

  // chuyển đổi số bản ghi trong một trang
  onLimitChange(event: any) {
    console.log(event);
    this.limit = event.rows;
    this.getAllTask(
      this.nameTask,
      this.priorityTask,
      this.idStatusOfTheTask,
      this.page,
      this.limit
    );
  }
  getAllStatus() {
    this.statusService
      .getAllStatus('', 1, this.limitStatus)
      .subscribe((data) => {
        console.log(data);

        this.statusList = data.content;
      });
  }
  getAllTask(
    name: string,
    priority: string,
    idStatus: number,
    page: number,
    limit: number
  ) {
    this.taskService
      .getAllTask(name, priority, idStatus, page, limit)
      .subscribe((data) => {
        console.log(data.content);
        this.taskList = data.content;
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
    this.task.idStatus = 1;
    this.task.description = '';
  }

  searchStatus() {
    this.idStatusOfTheTask = this.selectedStatus?.id;
    console.log(this.selectedStatus?.id);
    this.getAllTask(
      this.nameTask,
      this.priorityTask,
      this.idStatusOfTheTask,
      this.page,
      this.limit
    );
  }
  // Add

  createTask() {
    this.taskService.createTask(this.task).subscribe((data) => {
      console.log(this.task);
      this.getAllTask(
        this.nameTask,
        this.priorityTask,
        this.idStatusOfTheTask,
        this.page,
        this.limit
      );
      this.messageService.add({
        severity: data.status ? 'success' : 'error',
        summary: 'Success',
        detail: data.message,
      });
      this.visible = false;
      this.clearForm();
    });
  }

  // modal
  visibleUpdate: boolean = false;
  getTaskById(listTask: any) {
    this.task.id = listTask.id;
    this.task.name = listTask.name;
    this.task.description = listTask.description;
    this.task.priority = listTask.priority;
    this.task.idStatus = listTask.status.id;
    console.log('dsfs', this.task.idStatus);
    this.visibleUpdate = true;
  }

  updateTask() {
    // console.log(this.task);
    this.taskService.updateTask(this.task).subscribe((data) => {
      this.messageService.add({
        severity: data.status ? 'success' : 'error',
        summary: 'Success',
        detail: data.message,
      });
      this.getAllTask(
        this.nameTask,
        this.priorityTask,
        this.idStatusOfTheTask,
        this.page,
        this.limit
      );
      this.visibleUpdate = false;
      this.clearForm();
    });
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
        this.limit
      );
      this.clearForm();
    });
  }

  formatDateTime(dateTime: string): string | null {
    return this.datePipe.transform(dateTime, 'dd/MM/yyyy HH:mm');
  }
  showSubTask(listTask: ITask) {
    this.subtaskModal = true;
    this.taskDetail = listTask;
  }
}
