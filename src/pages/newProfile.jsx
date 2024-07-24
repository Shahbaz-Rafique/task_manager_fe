import { Col, Row, Progress } from 'antd';
import UserInfo from '../component/userinfo';
import ProgressList from '../component/progress';
import Buttons from '../component/buttons';
import { Fourprogresses } from '../constant/index';


const NewProfile = ({ title, children }) => (
    <main className='bg-white pt-10 px-8 pb-16 rounded'>
        {/* Progress */}
        <h1 className='sm-heading font-bold'>{title}</h1>
        <section className='pt-8 md:ps-8'>
            <Row gutter={[{ xs: 0, sm: 0, md: 50, }, { xs: 30, sm: 30, md: 30 }]}>
                <Col xs={24} md={12} className='block myShadow set-padding'>
                    <h3 className='font-medium text-xl mb-6'>Progress</h3>
                    <ProgressList title={title} progresses={Fourprogresses} />
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
            </Row>
        </section>
    </main>
);

export default NewProfile;
