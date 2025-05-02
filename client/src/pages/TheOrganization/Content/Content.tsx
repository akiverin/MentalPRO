import React from 'react';
import './Content.scss';
import { observer } from 'mobx-react-lite';

const Content: React.FC = observer(() => {
  return (
    <div className="organization-content">
      <h2 className="organization-content__title">Результаты участников организации</h2>
    </div>
  );
});

export default Content;
