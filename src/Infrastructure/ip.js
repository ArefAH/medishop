import axios from 'axios';

let ip = {
  address: "http://localhost:3306",
};

const updateIpAddress = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    const userIp = response.data.ip;
    ip.address = `http://${userIp}:3306`;
    
  } catch (error) {
    console.error('Error fetching the IP address:', error);
  }
};

updateIpAddress();

export default ip;
