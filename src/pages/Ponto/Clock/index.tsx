import React, { useEffect, useState } from 'react';

const Clock: React.FC = () => {
  const [ time, setTime ] = useState<any>();

  useEffect(() => {
    setInterval(() => {
      getCurrentTime();
    }, 1000);
  }, [])

  const getCurrentTime = () => {
    let hour: any = new Date().getHours();
    let minutes: any = new Date().getMinutes();
    let seconds: any = new Date().getSeconds();
    let am_pm: any = 'pm';

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hour == 0) {
      hour = 12;
    }

    if (new Date().getHours() < 12) {
      am_pm = 'am';
    }

    setTime(`${hour} : ${minutes} : ${seconds}`);
  }

    return (
      <div style={{ flex: 1, marginTop: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <p style={{ fontSize: 50, color: '#104670' }}>{time}</p>
        </div>
      </div>
    );
}

export default Clock;
