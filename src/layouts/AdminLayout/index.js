import AdminHeader from '../AdminHeader';

function AdminLayout({ children }) {
   return (
      <div>
         <AdminHeader />
         <div>{children}</div>
      </div>
   );
}

export default AdminLayout;
