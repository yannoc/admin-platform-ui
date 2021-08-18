import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoticeDataService } from "../../../../../_mock/notice-data.service";

@Component({
    selector: 'cs-personal-notice',
    templateUrl: './personal-notice.component.html',
    styleUrls: ['./personal-notice.component.less']
})
export class PersonalNoticeComponent implements OnInit {

    @Output() countEvent = new EventEmitter<number>();

    tabActiveID: string | number = 'notice';


    notifications: any[] = [];
    messages: any[] = [];
    todos: any[] = [];

    constructor(private noticeService: NoticeDataService) {
    }

    ngOnInit(): void {
        this.noticeService.getNotifications().subscribe((notifications) => {
            this.notifications = notifications;
        });
        this.noticeService.getMessages().subscribe((messages) => {
            this.messages = messages;
        });
        this.noticeService.getTodos().subscribe((todos) => {
            this.todos = todos;
        });
        setTimeout(() => {
            this.countEvent.emit(this.notifications.length + this.messages.length + this.todos.length);
        });
    }

    handleNoticeClick(type: string, id: string) {
        if (type === 'notice') {
            let index = this.notifications.findIndex((n) => n.id === id);
            this.notifications[index].status = 1;
            this.countEvent.emit(
                this.notifications.filter((n) => !n.status).length +
                this.messages.filter((m) => !m.status).length +
                this.todos.filter((t) => !t.status).length
            );
        }
        if (type === 'message') {
            let index = this.messages.findIndex((m) => m.id === id);
            this.messages[index].status = 1;
            this.countEvent.emit(
                this.notifications.filter((n) => !n.status).length +
                this.messages.filter((m) => !m.status).length +
                this.todos.filter((t) => !t.status).length
            );
        }
        if (type === 'todo') {
            let index = this.todos.findIndex((t) => t.id === id);
            this.todos[index].status = 1;
            this.countEvent.emit(
                this.notifications.filter((n) => !n.status).length +
                this.messages.filter((m) => !m.status).length +
                this.todos.filter((t) => !t.status).length
            );
        }
    }

    handleClean(type: string) {
        if (type === 'notice') {
            this.notifications = [];
            this.countEvent.emit(this.messages.filter((m) => !m.status).length + this.todos.filter((t) => !t.status).length);
        }
        if (type === 'message') {
            this.messages = [];
            this.countEvent.emit(this.notifications.filter((n) => !n.status).length + this.todos.filter((t) => !t.status).length);
        }
        if (type === 'todo') {
            this.todos = [];
            this.countEvent.emit(this.notifications.filter((n) => !n.status).length + this.messages.filter((m) => !m.status).length);
        }
    }
}
