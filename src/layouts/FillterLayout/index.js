import classNames from 'classnames/bind';

import styles from './FillterLayout.module.scss';
import Header from '../Header/index';
import Footer from '../Footer/index';
import FillterSidebar from '~/components/FillerSidebar/index';

const cn = classNames.bind(styles);

function FilterLayout({ children }) {
   return (
      <div>
         <Header />

         <div className={cn('flex')}>
            <div className={cn('main-contents')}>
               <FillterSidebar />

               <div className={cn('children')}>{children}</div>
            </div>
         </div>

         <Footer />
      </div>
   );
}

export default FilterLayout;
