import { Col, Row, Progress } from 'antd';
import UserInfo from '../component/userinfo';
import ProgressList from '../component/progress';
import Buttons from '../component/buttons';
import { Fourprogresses } from '../constant/index';
import Tasklist from '../component/taskList';
import Datepicker from '../component/datepicker';
import Cookies from 'js-cookie';
import ActivitiesList from '../component/activities';
import Table from '../component/table';

const App = () => (
  <main className='bg-white pt-10 px-8 pb-16 rounded'>
    <Row gutter={[{ xs: 0, sm: 0, md: 0, lg: 30 }, { xs: 30, sm: 30, md: 30 }]}>
      <Col xs={24} sm={24} lg={16} style={{border:"2px solid #374151",padding:"15px",borderRadius:"19px"}}>
        <Row className='justify-cent' gutter={[10, 10]}>
          <Col xs={24} sm={6} className='justify-cent'>
            <img className='lg:w-24' src={`${import.meta.env.VITE_API_URL}/files/${Cookies.get('image')}`} alt="Profile" />
          </Col>
          <Col xs={24} md={12}>
            <UserInfo />
          </Col>
          <Col xs={24} sm={6} className='justify-cent mt-6 md:mt-0'>
          </Col>
          <div className='flex justify-center w-full pt-8'>
            <Buttons />
          </div>
        </Row>
      </Col>
      <Col xs={24} sm={24} lg={8} className='mt-2'>
        <Datepicker style={{ width: '100%' }} />
      </Col>
    </Row>

    {/* Leaderboard */}
    <section className='pt-8 md:ps-8'>
      <Row className='' gutter={[{ xs: 0, sm: 0, md: 0, lg: 50 }, { xs: 30, sm: 30, md: 30 }]}>
        <Col xs={24} lg={12} className='myShadow set-padding h-full'>
          <Table />
        </Col>
        <Col xs={24} lg={12}>
          <ActivitiesList />
        </Col>
      </Row>
    </section>
  </main>
);

export default App;
