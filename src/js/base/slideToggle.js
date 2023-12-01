import { slideDown } from '@js/base/slideDown';
import { slideUp } from '@js/base/slideUp';

export let slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
}