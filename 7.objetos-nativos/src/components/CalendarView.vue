<script setup lang="ts">
import { computed } from 'vue';
import { isSameDay } from '@/utils/dateUtils';

interface CalendarEvent {
  date: Date;
  title: string;
  type: 'busy' | 'tentative' | 'holiday';
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

const props = defineProps<{
  year: number;
  month: number; 
  events: CalendarEvent[];
}>();

const calendarGrid = computed<CalendarDay[]>(() => {
  const grid: CalendarDay[] = [];
  
  const firstDayOfMonth = new Date(props.year, props.month, 1);
  const daysInMonth = new Date(props.year, props.month + 1, 0).getDate();
  
  let startDay = firstDayOfMonth.getDay(); 
  const paddingDaysStart = startDay === 0 ? 6 : startDay - 1;

  // Relleno mes anterior
  for (let i = paddingDaysStart; i > 0; i--) {
    const date = new Date(props.year, props.month, 1 - i);
    grid.push({ date, isCurrentMonth: false, events: [] });
  }

  // 3. Días del mes actual [cite: 964]
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(props.year, props.month, i);
    // Filtrar eventos para este día [cite: 966]
    const dayEvents = props.events.filter(e => isSameDay(e.date, date));
    
    grid.push({ date, isCurrentMonth: true, events: dayEvents });
  }

  const remainingCells = 7 - (grid.length % 7);
  if (remainingCells < 7) {
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(props.year, props.month + 1, i);
      grid.push({ date, isCurrentMonth: false, events: [] });
    }
  }

  return grid;
});
</script>

<template>
  <div class="calendar">
    <div class="header" v-for="day in ['L','M','X','J','V','S','D']" :key="day">
      {{ day }}
    </div>
    
    <div 
      v-for="(day, index) in calendarGrid" 
      :key="index"
      class="day-cell"
      :class="{ 'is-not-current-month': !day.isCurrentMonth }"
    >
      <span class="day-number">{{ day.date.getDate() }}</span>
      
      <div class="events">
        <div 
          v-for="event in day.events" 
          :key="event.title"
          class="event-badge"
          :class="`type-${event.type}`"
        >
          {{ event.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #ccc;
  border: 1px solid #ccc;
}
.day-cell {
  background: white;
  min-height: 80px;
  padding: 4px;
}
.is-not-current-month {
  background: #f9f9f9;
  color: #aaa;
}
.event-badge {
  font-size: 0.8em;
  padding: 2px;
  margin-top: 2px;
  border-radius: 4px;
  color: white;
}
.type-busy { background-color: #e74c3c; }
.type-tentative { background-color: #f1c40f; }
.type-holiday { background-color: #2ecc71; }
.day-number {
  color: black;
}
.header {
  color: black;
  font-weight: bold;
}
</style>