module.exports = function (startDate, endDate, isSlpitByHour) {

    const totalDurationInHours = (endDate - startDate) / 1000 / 60 / 60;

    const freeSlotDateStart = startDate;
    const freeSlotDateEnd = endDate;
    let freeSlots = [];

    if (!isSlpitByHour) {
        const durationInHours = (freeSlotDateEnd - freeSlotDateStart) / 1000 / 60 / 60;
        freeSlots.push({
            durationInHours,
            freeSlotDateStart,
            freeSlotDateEnd
        })
        return {
            freeSlots
        }
    }
    
    let tempHour = freeSlotDateStart.getHours();
    let tempDateStart = new Date(freeSlotDateStart);
    tempHour += 1;
    let tempDateEnd = new Date(freeSlotDateStart.setHours(tempHour, 0, 0, 0));
    const endHour = freeSlotDateEnd.getHours();
    while (tempHour <= endHour) {
        const durationInHours = (tempDateEnd - tempDateStart) / 1000 / 60 / 60;
        freeSlots.push({
            durationInHours,
            freeSlotDateStart: new Date(tempDateStart),
            freeSlotDateEnd: new Date(tempDateEnd)
        });
        tempDateStart = new Date(tempDateEnd.setHours(tempHour, 0, 0, 0));
        tempHour += 1;
        tempDateEnd = new Date(tempDateEnd.setHours(tempHour, 0, 0, 0));
    }
    tempDateEnd = new Date(freeSlotDateEnd);
    if (tempDateEnd.getTime() - tempDateStart.getTime() > 1000) {
        debugger;
        const durationInHours = (tempDateEnd - tempDateStart) / 1000 / 60 / 60;
        freeSlots.push({
            durationInHours,
            freeSlotDateStart: tempDateStart,
            freeSlotDateEnd: tempDateEnd
        })
    }

    return {
        totalDurationInHours,
        freeSlots
    }

}