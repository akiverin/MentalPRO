import './Chart.scss';

const Chart = ({
  value = 7,
  ranges = [
    { min: 0, max: 3, title: 'Низкий', color: '#4CAF50' },
    { min: 4, max: 8, title: 'Высокий', color: '#F44336' },
  ],
}) => {
  const minValue = Math.min(...ranges.map((range) => range.min));
  const maxValue = Math.max(...ranges.map((range) => range.max));

  return (
    <div className="chart">
      <div className="chart__scale">
        {ranges.map((range, index) => {
          const width = ((range.max - range.min + 1) / (maxValue - minValue + 1)) * 100;
          return (
            <div
              key={index}
              className="chart__range"
              style={{
                width: `${width}%`,
                backgroundColor: range.color,
              }}
            >
              <span className="chart__range-title">{range.title}</span>
            </div>
          );
        })}
      </div>

      <div className="chart__ticks">
        {Array.from({ length: maxValue - minValue + 1 }, (_, i) => minValue + i).map((tick) => (
          <div key={tick} className="chart__tick">
            <div className={`chart__tick-mark ${tick === value ? 'chart__tick-mark--active' : ''}`} />
            {(tick % 5 == 0 || tick === value) && (
              <span className={`chart__tick-value ${tick === value ? 'chart__tick-value--active' : ''}`}>{tick}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
