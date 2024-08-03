import UsersResume from './UsersResume'
import CompanyResume from './CompanyResume'
import MadResume from './MadResume'



const Admin = () => {
  return (
      <div className="w-full flex justify-start items-center sm:flex-wrap lg:flex-nowrap gap-2 p-4">
        <UsersResume/>
        <CompanyResume/>
        <MadResume/>
      </div>
  )
}

export default Admin
