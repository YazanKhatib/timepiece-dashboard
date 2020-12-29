import React from 'react';
import { Col, Row } from 'react-grid-system';
import { useTranslation } from 'react-multi-lang';

// Components
import { LineChart, NumberBox } from '../../components/Statistics/Statistics';

export default () => {
  const t = useTranslation();

  const LineChartLabels = [
    t('sa'),
    t('su'),
    t('mo'),
    t('tu'),
    t('we'),
    t('th'),
    t('fr'),
  ];
  const LineChartDatasets = [
    {
      color: '#FF0077',
      label: t('users'),
      data: [10, 5, 7, 5, 12, 10, 2],
    },
    {
      color: '#FFBB52',
      label: t('dealers'),
      data: [5, 2, 3, 6, 0, 4, 2],
    },
    {
      color: '#00ABFF',
      label: t('watches'),
      data: [8, 6, 4, 15, 8, 5, 4],
    },
  ];

  const GrowthLabels = [
    t('jan'),
    t('feb'),
    t('mar'),
    t('apr'),
    t('may'),
    t('jun'),
    t('jul'),
    t('aug'),
    t('sep'),
    t('oct'),
    t('nov'),
    t('dec'),
  ];
  const GrowthDatasets = [
    {
      color: '#FF0077',
      label: t('growth'),
      data: [1, 2, 3, 4, 7, 10, 13, 15, 20, 25, 27, 28, 30],
    },
  ];

  return (
    <Row style={{ width: '100%' }}>
      <Col md={4}>
        <NumberBox
          filterTrigger={(selected: string) => console.log(selected)}
          label={t('users')}
          value={
            <>
              595{' '}
              <small style={{ color: '#2ecc71' }}>+20 {t('this_week')}</small>
            </>
          }
        />
      </Col>

      <Col md={4}>
        <NumberBox
          label={t('dealers')}
          value={
            <>
              257{' '}
              <small style={{ color: '#2ecc71' }}>+12 {t('this_week')}</small>
            </>
          }
        />
      </Col>

      <Col md={4}>
        <NumberBox
          label={t('watches')}
          value={
            <>
              712{' '}
              <small style={{ color: '#2ecc71' }}>+32 {t('this_week')}</small>
            </>
          }
        />
      </Col>

      <Col md={6}>
        <LineChart
          title={t('items_by_time')}
          labels={LineChartLabels}
          datasets={LineChartDatasets}
        />
      </Col>

      <Col md={6}>
        <LineChart
          title={t('growth_rate')}
          labels={GrowthLabels}
          datasets={GrowthDatasets}
        />
      </Col>
    </Row>
  );
};
