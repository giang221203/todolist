import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  items: any[] = [
    {
      label: 'Admin:  Giang',
      style: {
        fontWeight: 'bold',
        fontSize: '30px',
        marginBottom: '20px',
        marginTop: '10px',
      },
    },
    { label: 'Task', icon: 'pi pi-briefcase', routerink: 'task' },
    { label: 'Status', icon: 'pi pi-box', routerink: 'status' },
  ];
}
