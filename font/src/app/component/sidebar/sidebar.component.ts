import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  items: any[] = [
    { label: 'Giang Admin', styleClass: 'title' },
    { label: 'Task', icon: 'pi pi-box', routerLink: 'task' },
    { label: 'Status', icon: 'pi pi-box', routerLink: 'status' },
  ];
}
