import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../interface/task.interface';
import { DatePipe } from '@angular/common';
import { SubTaskService } from '../../service/sub-task.service';
import { ISubTask } from '../../interface/subtask.interface';
import { IStatus } from '../../interface/status.interface';
import { TaskService } from '../../service/task.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.css',
})
export class SubtaskComponent {
  @Input() subtaskModal!: boolean;
  @Input() taskDetail!: any;
  @Input() statusList!: IStatus[];
  taskList: ITask[] = [];
  @Output() subtaskModalChange = new EventEmitter<boolean>();
  @Output() subtaskUpdated = new EventEmitter<void>();
  subtaskList: ISubTask[] = [];
  nameSubTask: string = '';
  prioritySubTask: string = '';
  idStatusOfTheSubTask!: number;
  pageSubTask: number = 1;
  limitSubTask: number = 3;
  selectedStatus!: IStatus;
  selectedTask!: ITask;
  subTask: ISubTask = {
    id: 0,
    name: '',
    priority: '',
    idStatus: 0,
    idTask: 0,
    description: '',
  };
  addSubTask: boolean = false;
  constructor(
    private datePipe: DatePipe,
    private subtaskService: SubTaskService,
    private taskService: TaskService,
    private messageService: MessageService
  ) {}

  ngOnChanges() {
    if (this.taskDetail?.id) {
      this.getAllSubTaskById(
        this.taskDetail?.id,
        this.nameSubTask,
        this.prioritySubTask,
        this.idStatusOfTheSubTask,
        this.pageSubTask,
        this.limitSubTask,
        this.formatTimeReq(this.createTime),
        this.formatTimeReq(this.updateTime)
      );
    }
    this.taskService
      .getAllTask(
        this.nameSubTask,
        this.prioritySubTask,
        this.idStatusOfTheSubTask,
        this.pageSubTask,
        undefined,
        null,
        null
      )
      .subscribe((data) => {
        this.taskList = data.content;
      });
  }
  // show subtask
  closeDialog() {
    this.subtaskModal = false;
    this.subtaskModalChange.emit(this.subtaskModal); // Phát sự kiện với giá trị mới
  }

  getAllSubTaskById(
    idTask: number,
    name: string,
    priority: string,
    idStatus: number,
    page: number,
    limit: number,
    createTime: string | null,
    updateTime: string | null
  ) {
    this.subtaskService
      .getAllSubTaskById(
        idTask,
        name,
        priority,
        idStatus,
        page,
        limit,
        createTime,
        updateTime
      )
      .subscribe((data) => {
        console.log('sfsfs', data.content);
        this.subtaskList = data.content;
      });
  }

  clearFormSubTask() {
    this.subTask.id = 0;
    this.subTask.name = '';
    this.subTask.priority = '';
    this.subTask.idStatus = null;
    this.subTask.idTask = 0;
    this.subTask.description = '';
  }

  // chuyển đổi số bản ghi trong một trang
  onLimitChange(event: any) {
    // console.log(event);
    this.limitSubTask = event.rows;
    this.getAllSubTaskById(
      this.taskDetail.id,
      this.nameSubTask,
      this.prioritySubTask,
      this.idStatusOfTheSubTask,
      this.pageSubTask,
      this.limitSubTask,
      this.formatTimeReq(this.createTime),
      this.formatTimeReq(this.updateTime)
    );
  }

  createTime!: string | null;
  updateTime!: string | null;
  searchCreateTime() {
    this.getAllSubTaskById(
      this.taskDetail.id,
      this.nameSubTask,
      this.prioritySubTask,
      this.idStatusOfTheSubTask,
      this.pageSubTask,
      this.limitSubTask,
      this.formatTimeReq(this.createTime),
      this.formatTimeReq(this.updateTime)
    );
  }
  searchUpdateTime() {
    this.getAllSubTaskById(
      this.taskDetail.id,
      this.nameSubTask,
      this.prioritySubTask,
      this.idStatusOfTheSubTask,
      this.pageSubTask,
      this.limitSubTask,
      this.formatTimeReq(this.createTime),
      this.formatTimeReq(this.updateTime)
    );
  }

  //format ngày giờ
  formatDateTime(dateTime: string): string | null {
    return this.datePipe.transform(dateTime, 'dd/MM/yyyy HH:mm');
  }
  formatTimeReq(dateTime: string | null): string | null {
    return this.datePipe.transform(dateTime, 'yyyy-MM-dd');
  }
  showAddSubTask() {
    this.subTask.idTask = this.taskDetail.id;
    this.addSubTask = true;
    this.subtaskModal = false;
  }
  createSubTask() {
    if (
      this.subTask.name == '' ||
      this.subTask.priority == '' ||
      this.subTask.idStatus == 0 ||
      this.subTask.description == ''
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Vui lòng nhập đầy đủ thông tin',
      });
    } else {
      this.subtaskService.createSubTask(this.subTask).subscribe((data) => {
        this.messageService.add({
          severity: data.status ? 'success' : 'error',
          summary: 'Success',
          detail: data.message,
        });
        this.subtaskModal = true;
        this.addSubTask = false;
        this.getAllSubTaskById(
          this.taskDetail?.id,
          this.nameSubTask,
          this.prioritySubTask,
          this.idStatusOfTheSubTask,
          this.pageSubTask,
          this.limitSubTask,
          this.formatTimeReq(this.createTime),
          this.formatTimeReq(this.updateTime)
        );
        this.subtaskUpdated.emit();
        this.clearFormSubTask();
      });
    }
  }

  visibleUpdateSubTask: boolean = false;
  getSubTaskById(listSubTask: any) {
    this.subTask.id = listSubTask.id;
    this.subTask.name = listSubTask.name;
    this.subTask.description = listSubTask.description;
    this.subTask.priority = listSubTask.priority;
    this.subTask.idStatus = listSubTask.status.id;
    this.subTask.idTask = listSubTask.task.id;
    this.visibleUpdateSubTask = true;
    this.subtaskModal = false;
  }
  updateSubTask() {
    if (
      this.subTask.name == '' ||
      this.subTask.priority == '' ||
      this.subTask.idStatus == 0 ||
      this.subTask.description == ''
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Vui lòng nhập đầy đủ thông tin',
      });
    } else {
      this.subtaskService.updateSubTask(this.subTask).subscribe((data) => {
        this.messageService.add({
          severity: data.status ? 'success' : 'error',
          summary: 'Success',
          detail: data.message,
        });
        this.subtaskModal = true;
        this.visibleUpdateSubTask = false;
        this.getAllSubTaskById(
          this.taskDetail?.id,
          this.nameSubTask,
          this.prioritySubTask,
          this.idStatusOfTheSubTask,
          this.pageSubTask,
          this.limitSubTask,
          this.formatTimeReq(this.createTime),
          this.formatTimeReq(this.updateTime)
        );
        this.clearFormSubTask();
        this.subtaskUpdated.emit();
      });
    }
  }

  deleteSubTask(id: number) {
    this.subtaskService.deleteSubTask(id).subscribe((data) => {
      this.messageService.add({
        severity: data.status ? 'success' : 'error',
        summary: 'Success',
        detail: data.message,
      });
      this.getAllSubTaskById(
        this.taskDetail?.id,
        this.nameSubTask,
        this.prioritySubTask,
        this.idStatusOfTheSubTask,
        this.pageSubTask,
        this.limitSubTask,
        this.formatTimeReq(this.createTime),
        this.formatTimeReq(this.updateTime)
      );
      this.subtaskUpdated.emit();
      this.clearFormSubTask();
    });
  }
}
