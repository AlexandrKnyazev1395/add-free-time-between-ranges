function addFreeTimeToRange(params) {
  const {
    rangeHourStart,
    rangeHourEnd,
    timeSlots
  } = params;
  let slotsWithFreeTime = [];
  for (let i = 0; i < timeSlots.length; i++) {
    const slot = timeSlots[i];
    const slotDateStart = new Date(slot.dateStart);
    const slotDateEnd = new Date(slot.dateEnd);
    if (i === 0) {
      const dayDateStart = new Date(new Date(slot.dateStart).setHours(rangeHourStart, 0, 0));
      if (slotDateStart > dayDateStart) {
        const durationInHours = (slotDateStart - dayDateStart) / 1000 / 60 / 60;
        const freeSlotDateStart = dayDateStart;
        const freeSlotDateEnd = slotDateEnd;
        slotsWithFreeTime.push({
          isFree: true,
          durationInHours,
          freeSlotDateStart,
          freeSlotDateEnd
        })
      }
    }
    else {
      const previousSlot = timeSlots[i - 1];
      const previousDateEnd = new Date(previousSlot.dateEnd);
      if (previousDateEnd !== slotDateStart) {
        const durationInHours = (slotDateStart - previousDateEnd) / 1000 / 60 / 60;
        const freeSlotDateStart = previousDateEnd;
        const freeSlotDateEnd = slotDateStart;
        slotsWithFreeTime.push({
          isFree: true,
          durationInHours,
          freeSlotDateStart,
          freeSlotDateEnd
        })
      }
    }
    slot.durationInHours = (slotDateStart - slotDateEnd) / 1000 / 60 / 60;
    slotsWithFreeTime.push(slot);

    if (i === timeSlots.length - 1) {
      const dayDateEnd = new Date(new Date(slot.dateEnd).setHours(rangeHourEnd, 0, 0))
      if (slotDateEnd < dayDateEnd) {
        let durationInHours = (dayDateEnd - slotDateEnd) / 1000 / 60 / 60;
        const freeSlotDateStart = slotDateEnd;
        const freeSlotDateEnd = dayDateEnd;
        slotsWithFreeTime.push({
          isFree: true,
          durationInHours,
          freeSlotDateStart,
          freeSlotDateEnd
        })
      }
    }
  }
  return slotsWithFreeTime;
}

module.exports.addFreeTimeToRange = addFreeTimeToRange;