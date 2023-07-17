/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'


const DashboardPage: FC = () => (
  <>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt nesciunt esse necessitatibus id ipsum nobis eum sequi reprehenderit, vero ipsam deleniti dolore asperiores maxime odio harum quam hic fuga illo.</p>
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
