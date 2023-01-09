import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cn = classNames.bind(styles);

function Button({
   primary,
   onlytext,
   border,
   to,
   href,
   children,
   lefticon,
   righticon,
   onClick,
   disable,
   ...passProps
}) {
   let Comp = 'button';

   const props = {
      onClick,
      ...passProps,
   };

   if (to) {
      props.to = to;
      Comp = Link;
   } else if (href) {
      props.href = href;
      Comp = 'a';
   }

   if (disable) {
      delete props.onClick;
   }

   const cName = cn('wrapper', {
      primary,
      border,
      onlytext,
      disable,
   });

   return (
      <Comp className={cName} {...props}>
         {lefticon}
         <span>{children}</span>
         {righticon}
      </Comp>
   );
}

export default Button;
