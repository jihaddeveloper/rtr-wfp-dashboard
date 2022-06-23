import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  const getYear = () => {
    return new Date().getFullYear()
  }
  return (
    <CFooter>
      <div>
        <a
          href="https://www.roomtoread.org/countries/bangladesh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Room to Read
        </a>
        <span className="ms-1">&copy; {getYear()}</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a
          href="https://www.roomtoread.org/countries/bangladesh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Room to Read MIS Team
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
