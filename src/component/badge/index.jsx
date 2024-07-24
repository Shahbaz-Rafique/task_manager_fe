import { Avatar, Badge, Space } from 'antd';
import Silver from '../../assets/images/silver.png';
import Gold from '../../assets/images/gold.png';
import Platinum from '../../assets/images/platinum.png';

// Component to display a badge based on the provided badge type
const App = ({ badge }) => (
  <Space size="middle">
    {/* Badge component from Ant Design */}
    <Badge>
      {/* Conditionally render the badge image based on the badge prop */}
      {badge === "silver" ? (
        // Render silver badge image
        <img src={Silver} alt="Silver Badge" style={{ width: "30px", marginTop: "-6px" }} /> 
      ) : badge === "gold" ? (
        // Render gold badge image
        <img src={Gold} alt="Gold Badge" style={{ width: "30px", marginTop: "-6px" }} /> 
      ) : badge === "platinum" ? (
        // Render platinum badge image
        <img src={Platinum} alt="Platinum Badge" style={{ width: "30px", marginTop: "-6px" }} /> 
      ) : (
        // Render nothing if the badge type doesn't match
        ""
      )}
    </Badge>
  </Space>
);

export default App;
