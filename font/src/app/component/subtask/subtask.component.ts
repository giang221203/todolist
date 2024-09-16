import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  @Input() taskList!: ITask[];
  @Output() subtaskModalChange = new EventEmitter<boolean>();
  @Output() subtaskUpdated = new EventEmitter<void>();
  subtaskList: ISubTask[] = [];
  nameSubTask: string = '';
  prioritySubTask: string = '';
  idStatusOfTheSubTask!: number;
  pageSubTask: number = 1;
  limitSubTask: number = 2;
  firstSubTask: number = 0;
  totalEL!: number;
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
  taskById: any = [];
  addSubTask: boolean = false;
  directionSort: string = 'DESC';
  nameSort: string = 'updatedAt';
  constructor(
    private datePipe: DatePipe,
    private subtaskService: SubTaskService,
    private taskService: TaskService,
    private messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskDetail'] && this.taskDetail?.id) {
      this.getAllSubTaskById(
        this.taskDetail.id,
        this.nameSubTask,
        this.prioritySubTask,
        this.idStatusOfTheSubTask,
        this.pageSubTask,
        this.limitSubTask,
        this.formatTimeReq(this.createTime),
        this.formatTimeReq(this.updateTime),
        this.nameSort,
        this.directionSort
      );
      this.apiGetTaskById(this.taskDetail.id);
    }
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
    updateTime: string | null,
    nameSort: string,
    directionSort: string
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
        updateTime,
        nameSort,
        directionSort
      )
      .subscribe((data) => {
        this.subtaskList = data.content;
        this.totalEL = data.totalElement;
      });
  }
  apiGetTaskById(id: number) {
    this.taskService.getById(id).subscribe((data) => {
      this.taskById = data.content;
      console.log(this.taskById);
    });
  }

  clearFormSubTask() {
    this.subTask.id = 0;
    this.subTask.name = '';
    this.subTask.priority = '';
    this.subTask.idStatus = null;
    this.subTask.idTask = 0;
    this.subTask.description = '';
    this.subtaskModal = true;
  }

  // chuyển đổi số bản ghi trong một trang
  onLimitChange(event: any) {
    // console.log(event);
    this.firstSubTask = event.first;
    this.limitSubTask = event.rows;
    this.pageSubTask = this.firstSubTask / this.limitSubTask + 1;
    this.getAllSubTaskById(
      this.taskDetail.id,
      this.nameSubTask,
      this.prioritySubTask,
      this.idStatusOfTheSubTask,
      this.pageSubTask,
      this.limitSubTask,
      this.formatTimeReq(this.createTime),
      this.formatTimeReq(this.updateTime),
      this.nameSort,
      this.directionSort
    );
  }

  createTime!: string | null;
  updateTime!: string | null;

  searchSubTask() {
    this.firstSubTask = 0;
    this.pageSubTask = 1;
    this.getAllSubTaskById(
      this.taskDetail.id,
      this.nameSubTask,
      this.prioritySubTask,
      this.idStatusOfTheSubTask,
      this.pageSubTask,
      this.limitSubTask,
      this.formatTimeReq(this.createTime),
      this.formatTimeReq(this.updateTime),
      this.nameSort,
      this.directionSort
    );
  }

  sort(nameSort: string) {
    this.nameSort = nameSort;
    if (this.directionSort == 'DESC') {
      this.directionSort = 'ASC';
    } else {
      this.directionSort = 'DESC';
    }
    this.getAllSubTaskById(
      this.taskDetail.id,
      this.nameSubTask,
      this.prioritySubTask,
      this.idStatusOfTheSubTask,
      this.pageSubTask,
      this.limitSubTask,
      this.formatTimeReq(this.createTime),
      this.formatTimeReq(this.updateTime),
      this.nameSort,
      this.directionSort
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
    console.log(this.taskDetail);

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
        this.firstSubTask = 0;
        this.pageSubTask = 1;
        this.getAllSubTaskById(
          this.taskDetail?.id,
          this.nameSubTask,
          this.prioritySubTask,
          this.idStatusOfTheSubTask,
          this.pageSubTask,
          this.limitSubTask,
          this.formatTimeReq(this.createTime),
          this.formatTimeReq(this.updateTime),
          (this.nameSort = 'updatedAt'),
          (this.directionSort = 'DESC')
        );

        this.apiGetTaskById(this.taskDetail.id);
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
        this.firstSubTask = 0;
        this.pageSubTask = 1;
        this.getAllSubTaskById(
          this.taskDetail?.id,
          this.nameSubTask,
          this.prioritySubTask,
          this.idStatusOfTheSubTask,
          this.pageSubTask,
          this.limitSubTask,
          this.formatTimeReq(this.createTime),
          this.formatTimeReq(this.updateTime),
          (this.nameSort = 'updatedAt'),
          (this.directionSort = 'DESC')
        );

        this.apiGetTaskById(this.taskDetail.id);
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
        this.formatTimeReq(this.updateTime),
        this.nameSort,
        this.directionSort
      );
      this.apiGetTaskById(this.taskDetail.id);
      this.subtaskUpdated.emit();
      this.clearFormSubTask();
    });
  }
}
