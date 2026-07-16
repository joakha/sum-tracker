import { Component, input, output} from '@angular/core';
import { Budget } from '../types';

@Component({
  selector: 'app-delete-button',
  imports: [],
  templateUrl: './delete-button.html',
  styleUrl: './delete-button.css',
})
export class DeleteButton {

  budget = input.required<Budget>();

  deleteBudgetEmitter = output<Budget>();

  deleteBudget() {
    this.deleteBudgetEmitter.emit(this.budget());
  }

}
