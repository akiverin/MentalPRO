const formatDate = (dateInput: string | Date): string => {
  if (!dateInput) return 'Неизвестная дата';

  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Неизвестная дата';

    const formatter = new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      day: 'numeric',
      month: 'long',
    });

    return formatter.format(date).replace(/\s*г\.\s*/, '');
  } catch {
    return 'Неизвестная дата';
  }
};

export default formatDate;
