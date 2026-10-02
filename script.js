'use strict';
// Use Japan time even when a visitor's device is set to another timezone.
function getHoursText(date) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', weekday: 'short', hour: '2-digit', hourCycle: 'h23' }).formatToParts(date);
  const weekday = parts.find(part => part.type === 'weekday').value;
  const hour = Number(parts.find(part => part.type === 'hour').value);
  const names = { Sun: '日', Mon: '月', Tue: '火', Wed: '水', Thu: '木', Fri: '金', Sat: '土' };
  // Saturday/Sunday before 01:00 belongs to the previous evening's usual hours.
  if (hour < 1 && (weekday === 'Sat' || weekday === 'Sun')) return '前夜からの通常営業時間：1:00まで';
  return `本日（${names[weekday]}） ${weekday === 'Fri' || weekday === 'Sat' ? '19:00〜翌1:00' : '19:00〜24:00'}`;
}
function updateHours() {
  document.getElementById('today-hours').textContent = getHoursText(new Date());
}
updateHours();
setInterval(updateHours, 60000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) updateHours(); });
