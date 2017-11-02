import { Ingridient } from '../shared/ingridient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
    ingridientsChanged = new Subject<Ingridient[]>();
    editItems = new Subject<number>();

    private ingridients: Ingridient[] = [
        new Ingridient('Apples', 5),
        new Ingridient('Tomatoes', 10)
    ];

    getIngridients() {
        return this.ingridients.slice();
    }
    getIngridient(index: number) {
        return this.ingridients[index];
    }
    removeIngridient(id: number) {
        this.ingridients.splice(id, 1);
        this.ingridientsChanged.next(this.ingridients.slice());
    }

    addIngridient(ingridient: Ingridient) {
        this.ingridients.push(ingridient);
        this.ingridientsChanged.next(this.ingridients.slice());
    }
    upgradeIngridient(id: number, newIngridient: Ingridient) {
        this.ingridients[id] = newIngridient;
        this.ingridientsChanged.next(this.ingridients.slice());
    }
    addIngridients(ingridients: Ingridient[]) {
        this.ingridients.push(...ingridients);
        this.ingridientsChanged.next(this.ingridients.slice());
    }

}