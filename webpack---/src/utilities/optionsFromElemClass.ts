import { elemClasses } from './elem.js';
import { queryParamsToObject } from './url.js';
import { cast } from './obj.js';

export const optionsFromElemClass = (elem: HTMLElement): object => {
  const optionClasses: string[] = [];
  const classes = elemClasses(elem) as string[];

  classes.forEach((className) => {
    if (className.indexOf('=') > 0) {
      optionClasses.push(className);
    }
  });

  const options = queryParamsToObject(optionClasses.join('&'));
  return cast(options) as object;
};
