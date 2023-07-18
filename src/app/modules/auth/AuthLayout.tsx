import {useEffect} from 'react'
<<<<<<< HEAD
import {Outlet, Link} from 'react-router-dom'

=======
import {Outlet} from 'react-router-dom'
>>>>>>> 97e48de4548e311edeefc54cc98366b4ef2e603b

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          <div className='w-lg-500px p-10'>
            <Outlet />
          </div>
        </div>
<<<<<<< HEAD
        {/* end::Form */}
      </div>
      {/* end::Body */}
=======
      </div>
>>>>>>> 97e48de4548e311edeefc54cc98366b4ef2e603b
    </div>
  )
}

export {AuthLayout}
