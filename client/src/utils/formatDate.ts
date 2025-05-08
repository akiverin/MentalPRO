const formatDate = (dateInput: string): string => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Неизвестная дата';

    const formatter = new Intl.DateTimeFormat();

    return formatter.format(date).replace(/\s*г\.\s*/, '');
  } catch {
    return 'Неизвестная дата';
  }
};

export default formatDate;
