import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import styles from './styles.module.scss';

const dummyLine = {
  options: {
    chart: {
      id: 'basic-line',
    },
    xaxis: {
      categories: [
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
      ],
    },
    markers: {
      size: 6,
      strokeWidth: 3,
      fillOpacity: 0,
      strokeOpacity: 0,
      hover: {
        size: 8,
      },
    },
  },
  series: [
    {
      name: '該時間點總人數',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ],
};

const dummyBar = {
  options: {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: ['教職員工', '訪客'],
    },
  },
  series: [
    {
      name: '今日總人數',
      data: [75, 30],
    },
  ],
};

const Home = () => {
  const [lineOptions] = useState(dummyLine.options);
  const [lineSeries, setLineSeries] = useState(dummyLine.series);

  const [barOptions] = useState(dummyBar.options);
  const [barSeries, setBarSeries] = useState(dummyBar.series);

  let screenWidth;

  if (screen.availWidth < 500) {
    screenWidth = screen.availWidth * (9 / 10);
  } else {
    screenWidth = 500;
  }

  const onMemberAdd = (type) => {
    const newLineSeries = [];

    lineSeries.map((s) => {
      const data = [...s.data];
      const length = data.length;
      data[length - 1] = data[length - 1] + 1;
      newLineSeries.push({ data, name: s.name });
    });

    const newBarSeries = [];
    barSeries.map((s) => {
      const data = [...s.data];
      if (type === 'crew') {
        data[0]++;
      } else if (type === 'visitor') {
        data[1]++;
      }
      newBarSeries.push({ data, name: s.name });
    });

    setLineSeries(newLineSeries);
    setBarSeries(newBarSeries);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.chartWrapper}>
        <h3 className={styles.h3}>人潮變化</h3>
        <Chart
          options={lineOptions}
          series={lineSeries}
          type="line"
          width={screenWidth}
        />
      </div>
      <div className={styles.chartWrapper}>
        <h3 className={styles.h3}>今日進出總人口數比例</h3>
        <Chart
          options={barOptions}
          series={barSeries}
          type="bar"
          width={screenWidth}
        />
      </div>
      <div className={styles.buttonGroup}>
        <Button text="新增一位教職員" onClick={() => onMemberAdd('crew')} />
        <Button text="新增一位訪客" onClick={() => onMemberAdd('visitor')} />
      </div>
    </div>
  );
};

const Button = ({ text, onClick }) => {
  return (
    <div onClick={onClick} className={styles.button}>
      {text}
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Home;
