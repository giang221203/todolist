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

  ngOnInit() {
    this.taskService
      .getAllTask(
        this.nameSubTask,
        this.prioritySubTask,
        this.idStatusOfTheSubTask,
        this.pageSubTask,
        undefined
      )
      .subscribe((data) => {
        this.taskList = data.content;
      });
  }
  ngOnChanges() {
    if (this.taskDetail?.id) {
      this.getAllSubTaskById(
        this.taskDetail?.id,
        this.nameSubTask,
        this.prioritySubTask,
        this.idStatusOfTheSubTask,
        this.pageSubTask,
        this.limitSubTask
      );
    }
  }
  // show subtask
  closeDialog() {
    this.subtaskModal = false;
    this.subtaskModalChange.emit(this.subtaskModal); // Phát sự kiện với giá trị mới
    console.log(this.taskDetail);
  }

  showAddSubTask() {
    this.addSubTask = true;
    this.subtaskModal = false;
  }
  getAllSubTaskById(
    idTask: number,
    name: string,
    priority: string,
    idStatus: number,
    page: number,
    limit: number
  ) {
    this.subtaskService
      .getAllSubTaskById(idTask, name, priority, idStatus, page, limit)
      .subscribe((data) => {
        console.log('sfsfs', data.content);
        this.subtaskList = data.content;
      });
  }

  clearFormSubTask() {
    this.subTask.id = 0;
    this.subTask.name = '';
    this.subTask.priority = '';
    this.subTask.idStatus = 0;
    this.subTask.idTask = 0;
    this.subTask.description = '';
  }

  // chuyển đổi số bản ghi trong một trang
  onLimitChange(event: any) {
    console.log(event);
    this.limitSubTask = event.rows;
    this.getAllSubTaskById(
      this.taskDetail.id,
      this.nameSubTask,
      this.prioritySubTask,
      this.idStatusOfTheSubTask,
      this.pageSubTask,
      this.limitSubTask
    );
  }
  //format ngày giờ
  formatDateTime(dateTime: string): string | null {
    return this.datePipe.transform(dateTime, 'dd/MM/yyyy HH:mm');
  }

  createSubTask() {
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
        this.limitSubTask
      );
      this.clearFormSubTask();
    });
    console.log(this.subTask);
  }
}
