
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'


const DashboardPage: FC = () => (
  <>
  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam ex ab sapiente magnam eligendi obcaecati, iusto ducimus suscipit, nesciunt debitis officia dolor. Voluptatum quos nostrum ullam dolor consequatur fugiat mollitia.</p>
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
