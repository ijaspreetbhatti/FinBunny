import { animate, animateChild, animation, group, keyframes, query, stagger, state, style, transition, trigger, useAnimation } from "@angular/animations";

export const fade = trigger('fade', [
    state('void', style({
        opacity: 0
    })),
    transition(':enter, :leave', [
        animate(450)
    ])
])

export const slideIn = trigger('slideIn', [
    transition(':enter', [
        animate('300ms ease-in', keyframes([
            style({
                opacity: 0,
                height: '0px',
                transform: 'translateX(-100%)'
            }),
            style({
                opacity: 1,
                height: 'unset',
                transform: 'translateX(0)'
            }),
        ])),
    ])
])

export const roll = trigger('roll', [
    state('void', style({
        opacity: 0,
        height: 0
    })),
    transition(':enter, :leave', [
        animate(300),
    ])
])

