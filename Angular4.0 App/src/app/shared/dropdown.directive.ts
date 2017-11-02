import { Directive, ElementRef, OnInit, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
    @HostBinding('class.open') dropdownStatus = false;
    @HostListener('click') toggleDropdown() {
        this.dropdownStatus = !this.dropdownStatus;
    }
    constructor(private eRef: ElementRef) { }

    ngOnInit() {

    }

}