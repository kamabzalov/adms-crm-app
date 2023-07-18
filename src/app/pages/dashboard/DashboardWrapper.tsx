
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'


const DashboardPage: FC = () => (
  <>
<<<<<<< HEAD
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt nesciunt esse necessitatibus id ipsum nobis eum sequi reprehenderit, vero ipsam deleniti dolore asperiores maxime odio harum quam hic fuga illo.</p>
=======
  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam ex ab sapiente magnam eligendi obcaecati, iusto ducimus suscipit, nesciunt debitis officia dolor. Voluptatum quos nostrum ullam dolor consequatur fugiat mollitia.</p>
>>>>>>> 97e48de4548e311edeefc54cc98366b4ef2e603b
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
