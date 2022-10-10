import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/services/task.service';
import { Task } from '../shared/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchText: any;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskService.fetchDataAsPromise()
      .then((data) => {
        this.tasks = data.response.data
        this.filteredTasks = this.tasks.slice()
      })
      .catch((error) => {
        console.log("Promise rejected with " + JSON.stringify(error));
      });
  }

  search(eventValue: any) {
    this.searchText = eventValue
    if (this.searchText !== "") {
      let searchValue = this.searchText.toLocaleLowerCase();
      this.filteredTasks = this.tasks.filter(task => {
        return task.description.toLocaleLowerCase().match(searchValue)
      });
    } else {
      this.getTasks()
    }
  }

}
