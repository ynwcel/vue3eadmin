
import { h, defineComponent, ref, reactive } from "vue";
import { NIcon } from "naive-ui";

export function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

export function fwidth(width){
    if (window.innerWidth>width + 10){
        return width;
    }else{
        return parseInt(0.90 * window.innerWidth);
    }
}

export function breakpoint(tag){
    let tags = {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
    }
    if(typeof(tags[tag]) == 'undefined'){
        throw new Error(`breakpoint tag[${tag}] not found` );
    }
    return window.innerWidth >= tags[tag];
}