import Navbar from '../navbar/index'

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default layout
