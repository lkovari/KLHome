import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolidPrincipleKind } from '../solid-principle-kind.enum';

@Component({
  selector: 'app-solid-principles',
  templateUrl: './solid-principles.component.html',
  styleUrls: ['./solid-principles.component.scss']
})
export class SolidPrinciplesComponent implements OnInit {
  title: string;
  explanation: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  private evaluateSolidPrincipleEnumKind(solidPrincipleKind: SolidPrincipleKind): Array<string> {
    let title = '';
    let desc = '';
    const res = new Array<string>();
    switch (solidPrincipleKind) {
      case SolidPrincipleKind.S: {
        title = 'Single Responsibility Principle';
        desc =
          `
        This principle states that “a class should have only one reason to change” which means every class should have a single responsibility or single job or single purpose. Take the example of developing software. The task is divided into different members doing different things as front-end designers do design, the tester does testing and backend developer takes care of backend development part then we can say that everyone has a single job or responsibility. Most of the time it happens that when programmers have to add features or new behavior they implement everything into the existing class which is completely wrong. It makes their code lengthy, complex and consumes time when later something needs to be modified. Use layers in your application and break God classes into smaller classes or modules.
        `;
        break;
      }
      case SolidPrincipleKind.O: {
        title = 'Open / Close Principle';
        desc =
          `
        This principle states that “software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification” which means you should be able to extend a class behavior, without modifying it. Suppose developer A needs to release an update for a library or framework and developer B wants some modification or add some feature on that then developer B is allowed to extend the existing class created by developer A but developer B is not supposed to modify the class directly. Using this principle separates the existing code from the modified code so it provides better stability, maintainability and minimizes changes as in your code.
        `;
        break;
      }
      case SolidPrincipleKind.L: {
        title = 'Liskov Substitution Principle';
        desc =
          `
        The principle was introduced by Barbara Liskov in 1987 and according to this principle “Derived or child classes must be substitutable for their base or parent classes“. This principle ensures that any class that is the child of a parent class should be usable in place of its parent without any unexpected behavior. You can understand it in a way that a farmer’s son should inherit farming skills from his father and should be able to replace his father if needed. If the son wants to become a farmer then he can replace his father but if he wants to become a cricketer then definitely the son can’t replace his father even though they both belong to the same family hierarchy. One of the classic examples of this principle is a rectangle having four sides. A rectangle’s height can be any value and width can be any value. A square is a rectangle with equal width and height. So we can say that we can extend the properties of the rectangle class into square class. In order to do that you need to swap the child (square) class with parent (rectangle) class to fit the definition of a square having four equal sides but a derived class does not affect the behavior of the parent class so if you will do that it will violate the Liskov Substitution Principle.
        `;
        break;
      }
      case SolidPrincipleKind.I: {
        title = 'Interface Segregation Principle';
        desc =
          `
        This principle is the first principle that applies to Interfaces instead of classes in SOLID and it is similar to the single responsibility principle. It states that “do not force any client to implement an interface which is irrelevant to them“. Here your main goal is to focus on avoiding fat interface and give preference to many small client-specific interfaces. You should prefer many client interfaces rather than one general interface and each interface should have a specific responsibility. Suppose if you enter a restaurant and you are pure vegetarian. The waiter in that restaurant gave you the menu card which includes vegetarian items, non-vegetarian items, drinks, and sweets. In this case, as a customer, you should have a menu card which includes only vegetarian items, not everything which you don’t eat in your food. Here the menu should be different for different types of customers. The common or general menu card for everyone can be divided into multiple cards instead of just one. Using this principle helps in reducing the side effects and frequency of required changes.
        `;
        break;
      }
      case SolidPrincipleKind.D: {
        title = 'Dependency Inversion Principle';
        desc =
          `
        At first please keep in mind that Dependency Inversion and Dependency Injection both are different concepts. Most of the people get confused about it and consider both are the same. Now two key points are here to keep in mind about this principle.
        High-level modules/classes should not depend on low-level modules/classes. Both should depend upon abstractions.
        Abstractions should not depend upon details. Details should depend upon abstractions.
        The above lines simply state that if a high module or class will be dependent more on low-level modules or class then your code would have tight coupling and if you will try to make a change in one class it can break another class which is risky at the production level. So always try to make classes loosely coupled as much as you can and you can achieve this through abstraction. The main motive of this principle is decoupling the dependencies so if class A changes the class B doesn’t need to care or know about the changes.
        `;
        break;
      }
    }
    res.push(title);
    res.push(desc);
    return res;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      if (param) {
        if (param.get('solidPrincipleKind')) {
          const solidPrincipleKind = +param.get('solidPrincipleKind')!;
          const principle = this.evaluateSolidPrincipleEnumKind(solidPrincipleKind);
          this.title = principle[0];
          this.explanation = principle[1];
        }
      }
    });
  }

}
